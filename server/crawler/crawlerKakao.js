const puppeteer = require("puppeteer");
const { Cluster } = require('puppeteer-cluster');
const { Count, Menu, Review, StoreImg } = require('../models');
const Op = require('Sequelize').Op
async function crawlerKakao({ id, url }) {
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT, // use one browser per worker
        maxConcurrency: 10, // cluster with four workers
    });

    const result = {
        reviewCnt: 0,
        avgStar: 0
    };
    const storeCrawl = async () => {
        try {
            const menu = {
                tit: "",
                price: ""
            };
            const browser = await puppeteer.launch({
                headless: false,
                args: ["--window-size=1920,1080", "--disable-notifications"],
            });
            const page = await browser.newPage();
            await page.setUserAgent(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36"
            );
            await page.setViewport({
                width: 1080,
                height: 1080,
            });
            await page.goto(url);
            await page.waitFor(1000);
            //menu
            for (let j = 1; ; j++) {
                const sel = await page.$(`.list_menu > li:nth-child(${j}) > div .loss_word`)
                if (!sel) break;
                menu.tit = await page.evaluate((el) => el.textContent, sel);
                const sel2 = await page.$(`.list_menu > li:nth-child(${j}) >div .price_menu`)
                if (!sel2) break;
                menu.price = await page.evaluate((el) => el.textContent, sel2);
                //menuArr.push({ tit: tit, price: price })
                menu.price = menu.price.split(" ")[1]
                await Menu.findOrCreate({
                    where: {
                        [Op.and]: [
                            { tit: menu.tit },
                            { price: menu.price },
                            { StoreId: id }]
                    },
                    defaults: {
                        ...menu,
                        StoreId: id,
                    }

                })

            }
            await browser.close();
        } catch (err) {
            console.log(err);
        }
    }
    const reviewCrawl = async () => {
        try {
            const browser = await puppeteer.launch({
                headless: false,
                args: ["--window-size=1920,1080", "--disable-notifications"],
            });
            const page = await browser.newPage();
            await page.setUserAgent(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36"
            );
            await page.setViewport({
                width: 1080,
                height: 1080,
            });
            await page.goto(url);
            await page.waitFor(1000);
            for (let j = 1; j <= 500; j++) {
                const review = {
                    star: 0,
                    date: "",
                    content: "",
                    reviewImg: ""
                }
                let page_num = parseInt(((j + 4) / 5))
                let li = parseInt((j - 1) % 5 + 1)
                if (j != 1 && li == 1) {

                    if ((j - 1) / 5 % 5 == 0) {
                        await page.click(`.paging_mapdetail > .btn_next`)
                    }
                    else {
                        await page.click(`.paging_mapdetail > .link_page:nth-child(${page_num})`)
                    }
                    await page.waitFor(1000);
                }
                const sel = await page.$(`.list_evaluation > li:nth-child(${li}) > .star_info .num_rate`)
                console.log(sel);
                if (sel == null) await browser.close();
                review.star = parseFloat(await page.evaluate((el) => el.textContent, sel));
                const sel2 = await page.$(`.list_evaluation > li:nth-child(${li}) > .comment_info .txt_comment > span`)
                review.content = sel2 ? await page.evaluate((el) => el.textContent, sel2) : "";
                const sel3 = await page.$(`.list_evaluation > li:nth-child(${li}) > .comment_info .time_write`)
                review.date = await page.evaluate((el) => el.textContent, sel3);
                review.reviewImg = await page.$$eval(`.list_evaluation > li:nth-child(${li}) .img_profile`, imgs => imgs.map(img => img.getAttribute('src')));
                review.reviewImg = review.reviewImg.length == 0 ? "" : review.reviewImg[0]
                console.log(review.reviewImg);
                await Review.findOrCreate({
                    where: {
                        [Op.and]: [
                            { StoreId: id },
                            { star: review.star },
                            { date: new Date(review.date) },
                            { content: review.content },
                            { nickName: "익명" }]
                    },
                    defaults: {
                        StoreId: id,
                        ...review,
                        nickName: "익명"
                    }
                })
            }
            await browser.close();
        } catch (err) {
            console.log(err);
        }
    }
    const imgCrawl = async () => {
        try {
            const browser = await puppeteer.launch({
                headless: false,
                args: ["--window-size=1920,1080", "--disable-notifications"],
            });
            const page = await browser.newPage();
            await page.setUserAgent(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36"
            );
            await page.setViewport({
                width: 1080,
                height: 1080,
            });
            await page.goto(url);
            await page.waitFor(1000);
            const check=await page.$("#mArticle > div.cont_photo > div.photo_area > ul > li.size_l");
            if (check) {
                await page.click("#mArticle > div.cont_photo > div.photo_area > ul > li.size_l")
                await page.waitFor(1000);
                const sel2 = await page.$(`.num_photo > .num_g`)
                const cnt = parseInt(await page.evaluate((el) => el.textContent, sel2));
                for (let i = 1; i <= cnt && i <= 500; i++) {
                    const img = await page.$$eval(`#photoViewer > div.layer_body > div.view_photo > div.view_image > img`, imgs => imgs.map(img => img.getAttribute('src')));
                    
                    const imgurl="https://t1.kakaocdn.net/thumb"+img[0].split("local")[1];
                    console.log(imgurl);
                    await StoreImg.findOrCreate({
                        where: {
                            [Op.and]: [
                                { StoreId: id },
                                { imageUrl: imgurl }]
                        },
                        defaults: {
                            StoreId: id,
                            imageUrl: imgurl
                        }
                    })
                    await page.click("#photoViewer > div.layer_body > div.view_photo > div.view_image > a.link_direction.link_next")
                }
            }

            await browser.close();
        } catch (err) {
            console.log(err);
        }
    }
    const countCrawl = async () => {
        try {
            const browser = await puppeteer.launch({
                headless: false,
                args: ["--window-size=1920,1080", "--disable-notifications"],
            });
            const page = await browser.newPage();
            await page.setUserAgent(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36"
            );
            await page.setViewport({
                width: 1080,
                height: 1080,
            });
            await page.goto(url);
            await page.waitFor(1000);
            const sel = await page.$(`#mArticle > div.cont_essential > div:nth-child(1) > div.place_details > div > div > a:nth-child(3) > span.color_b`)
                if (sel) {result.avgStar = await page.evaluate((el) => el.textContent, sel);
                    result.avgStar=parseFloat(result.avgStar.split("점")[0]);
                }
                
                const sel2 = await page.$(`#mArticle > div.cont_evaluation > strong > span`)
                //const sel2 = await page.$(`#mArticle > div.cont_evaluation > div.evaluation_sorting > a > span.color_b`)
                if (sel2)  {
                    result.reviewCnt =''?0: parseInt(await page.evaluate((el) => el.textContent, sel2));
                }
                console.log(result);
            await Count.create({
                id: id,
                ...result
            })
            await browser.close();
        } catch (err) {
            console.log(err);
        }
    }
    const getStore = () => new Promise((resolve, reject) => {
        cluster.queue(async ({ page }) => {
            storeCrawl().then(()=>cluster.close());
            resolve();
        });
    });
    const getReview = () => new Promise((resolve, reject) => {
        cluster.queue(async ({ page }) => {
            reviewCrawl().then(()=>cluster.close());
            resolve();
        });
    })
    const getImg = () => new Promise((resolve, reject) => {
        cluster.queue(async ({ page }) => {
            imgCrawl().then(()=>cluster.close());
            resolve();
        });
    })
    const getcnt = () => new Promise((resolve, reject) => {
        cluster.queue(async ({ page }) => {
            countCrawl().then(()=>{
                resolve(result);
                cluster.close()
            });
            
        });
    })
    return {
        getStore: getStore,
        getReview: getReview,
        getImg: getImg,
        getcnt: getcnt,
    };
};
module.exports = crawlerKakao;