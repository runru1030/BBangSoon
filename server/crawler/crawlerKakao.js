const puppeteer = require("puppeteer");
const { Cluster } = require('puppeteer-cluster');
const { Store, Menu, Review } = require('../models');
const Op = require('Sequelize').Op
async function crawlerKakao({ storeName, address, url }) {
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT, // use one browser per worker
        maxConcurrency: 4, // cluster with four workers
    });

    const storeCrawl = async () => {
        try {
            const store = {
                storeName: storeName,
                address: address,
                fullAddress: "",
                telephone: ""
            }
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
            const sel = await page.$(".txt_address");
            store.fullAddress = await page.evaluate((el) => el.textContent, sel);
            const sel2 = await page.$(".txt_contact");
            if (sel2) {
                store.telephone = await page.evaluate((el) => el.textContent, sel2);
            }
            store.fullAddress = store.fullAddress.replace(/\n/g, ' ').replace(/  /g, '');
            const [storeData, created] = await Store.findOrCreate({
                where: {
                    storeName: store.storeName,
                    address: store.address,
                    fullAddress: store.fullAddress,
                    telephone: store.telephone
                },
                defaults: {
                    storeName: store.storeName,
                    address: store.address,
                    fullAddress: store.fullAddress,
                    telephone: store.telephone
                },
                attributes: ['id'],
            }

            );
            //menu
            for (let j = 1; ; j++) {
                const sel = await page.$(`.list_menu > li:nth-child(${j}) > div .loss_word`)
                if (!sel) break;
                menu.tit = await page.evaluate((el) => el.textContent, sel);
                const sel2 = await page.$(`.list_menu > li:nth-child(${j}) >div .price_menu`)
                menu.price = await page.evaluate((el) => el.textContent, sel2);
                //menuArr.push({ tit: tit, price: price })
                menu.price = menu.price.split(" ")[1]
                await Menu.findOrCreate({
                    where: {
                        tit: menu.tit,
                        price: menu.price,
                        StoreId: storeData.id
                    },
                    defaults: {
                        tit: menu.tit,
                        price: menu.price,
                        StoreId: storeData.id,
                    }

                })

            }
            await page.close();
        } catch (err) {
            console.log(err);
        }
    }
    const reviewCrawl = async (StoreId) => {
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
                    content: ""
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
                console.log(li, page_num);
                const sel = await page.$(`.list_evaluation > li:nth-child(${li}) > .star_info .num_rate`)
                console.log(sel);
                if (sel == null) return;
                review.star = parseFloat(await page.evaluate((el) => el.textContent, sel));
                const sel2 = await page.$(`.list_evaluation > li:nth-child(${li}) > .comment_info .txt_comment > span`)
                review.content = sel2 ? await page.evaluate((el) => el.textContent, sel2) : "";
                const sel3 = await page.$(`.list_evaluation > li:nth-child(${li}) > .comment_info .time_write`)
                review.date = await page.evaluate((el) => el.textContent, sel3);
                console.log(review);
                await Review.findOrCreate({
                    where: {
                        [Op.and]: [
                            { StoreId: StoreId },
                            { star: review.star },
                            { date: review.date },
                            { content: review.content },
                            { nickName: "익명" }]
                    },
                    defaults: {
                        StoreId: StoreId,
                        ...review,
                        nickName: "익명"
                    }
                })
            }
        } catch (err) {
            console.log(err);
        }
    }
    const getStore = () => new Promise((resolve, reject) => {
        cluster.queue(async ({ page }) => {
            storeCrawl().then(() => {
                page.close();
                resolve("sucess")
            });
        });
    })
    const getReview = (StoreId) => new Promise((resolve, reject) => {
        cluster.queue(async ({ page }) => {
            reviewCrawl(StoreId).then(() => {
                page.close();
                resolve("sucess")
            });
        });
    })
    return {
        getStore: getStore,
        getReview: getReview
    };
};
module.exports = crawlerKakao;