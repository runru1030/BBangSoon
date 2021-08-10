const puppeteer = require("puppeteer");
const { Cluster } = require('puppeteer-cluster');
const { Store, Menu } = require('../models');
const crawler = async({name, address}) => {
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT, // use one browser per worker
        maxConcurrency: 4, // cluster with four workers
      });
      
    const storeCrawl = async () => {
        try {
            const store = {
                storeName: "",
                address: "",
                telephone: ""
            }
            const menu = {
                tit:"",
                price:""
            };
            const menuArr=[];
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
            await page.goto("https://map.naver.com");
            await page.waitFor(1000);
            await page.waitForSelector('input[id^=input_search]');
            await page.waitFor(1000);
            await page.type('input[id^=input_search]', name);
            await page.keyboard.press("Enter");
            await page.waitForNavigation();
            const ele = await page.$('iframe[id="searchIframe"]');
            const frmae = await ele.contentFrame();
            await frmae.waitForSelector("div[id='_pcmap_list_scroll_container'] > ul > li");
            await frmae.click("div[id='_pcmap_list_scroll_container'] > ul > li")
            await page.waitForSelector('iframe[id="entryIframe"]');

            const ele2 = await page.$('iframe[id="entryIframe"]');
            const frmae2 = await ele2.contentFrame();
            await frmae2.waitForSelector("span[id='_title'] > span");
            const sel = await frmae2.$("span[id='_title'] > span");
            store.storeName = await frmae2.evaluate((el) => el.textContent, sel);
            const sel2 = await frmae2.$(".place_section_content > ul > li > div > span")
            store.telephone = await frmae2.evaluate((el) => el.textContent, sel2);

            const sel3 = await frmae2.$(".place_section_content > ul > li:nth-child(2) > div > a > span")
            store.address = await frmae2.evaluate((el) => el.textContent, sel3);
            
            const storeData = await Store.create({
                storeName: store.storeName,
                address: store.address,
                telephone: store.telephone
            });
            //menu
            await frmae2.waitFor(2000);
            await frmae2.click("._2kAri")
            await frmae2.waitFor(1000);
            const isNotDel = await frmae2.$(".order_list .order_list_wrap")
            if (isNotDel) {
                for (let i = 1; ; i++) {
                    let el = `.order_list .order_list_wrap:nth-child(${i})`;
                    const sel = await frmae2.$(el)
                    if (!sel) break;
                    for (let j = 1; ; j++) {
                        const sel = await frmae2.$(`.order_list_wrap:nth-child(${i}) ul > li:nth-child(${j}) .tit`)
                        if (!sel) break;
                        menu.tit = await frmae2.evaluate((el) => el.textContent, sel);
                        const sel2 = await frmae2.$(`.order_list_wrap:nth-child(${i}) ul > li:nth-child(${j}) .price`)
                        menu.price = await frmae2.evaluate((el) => el.textContent, sel2);
                        menuArr.push({ tit: tit, price: price })
                        
                        await Menu.create({
                            StoreId:storeData.id,
                            tit: menu.tit,
                            price: menu.price
                        })
                    }
                }
            }
            else {
                for (let j = 1; ; j++) {
                    const sel = await frmae2.$(`.place_section ul > li:nth-child(${j}) > a ._3yfZ1`)
                    if (!sel) break;
                    menu.tit = await frmae2.evaluate((el) => el.textContent, sel);
                    const sel2 = await frmae2.$(`.place_section ul > li:nth-child(${j}) > a ._3qFuX`)
                    menu.price = await frmae2.evaluate((el) => el.textContent, sel2);
                    menu.push({ tit: tit, price: price })
                    await Menu.create({
                        StoreId:storeData.id,
                        tit: menu.tit,
                        price: menu.price
                    })
                }
            }
            console.log(menu);
            console.log(store);
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
            await page.goto("https://map.naver.com");
            await page.waitFor(1000);
            await page.waitForSelector('input[id^=input_search]');
            await page.waitFor(1000);
            await page.type('input[id^=input_search]', name);
            await page.keyboard.press("Enter");
            await page.waitForNavigation();
            const ele = await page.$('iframe[id="searchIframe"]');
            const frmae = await ele.contentFrame();
            await frmae.waitForSelector("div[id='_pcmap_list_scroll_container'] > ul > li");
            await frmae.click("div[id='_pcmap_list_scroll_container'] > ul > li")
            await page.waitForSelector('iframe[id="entryIframe"]');
            //review
            const ele2 = await page.$('iframe[id="entryIframe"]');
            const frmae2 = await ele2.contentFrame();
            const reviewArr = [];
            await frmae2.waitForSelector(".place_detail_wrapper ._1kUrA");
            await frmae2.click(".place_detail_wrapper ._1kUrA > span:nth-child(2)")
            await frmae2.waitFor(2000);
            for (let j = 1; j<50; j++) {
                try {
                    await frmae2.click(`.place_detail_wrapper .place_section:nth-child(5) > ._2kAri`)
                } catch {
                    break;
                }
            }
            const storeData = await Store.findOne({
                where:{address:address}
            });
            for (let j = 1; ; j++) {
                const review={
                    star:0,
                    date:"",
                    content:""
                }
                const sel = await frmae2.$(`.place_detail_wrapper .place_section:nth-child(5) >div> ul > li:nth-child(${j}) > div > div:nth-child(2) span:nth-child(2)`)
                if (!sel) {
                    const sel = await frmae2.$(`.place_detail_wrapper .place_section:nth-child(5) >div> ul > li:nth-child(${j}) > div > div:nth-child(3) span:nth-child(2)`)
                    if (!sel) break;
                    review.star = await frmae2.evaluate((el) => el.textContent, sel);
                    const sel2 = await frmae2.$(`.place_detail_wrapper .place_section:nth-child(5) >div> ul > li:nth-child(${j}) > div > div:nth-child(3)> div:nth-child(2) > span`)
                    review.date = await frmae2.evaluate((el) => el.textContent, sel2);
                    const sel3 = await frmae2.$(`.place_detail_wrapper .place_section:nth-child(5) >div> ul > li:nth-child(${j}) > div > div:nth-child(4) > a > span`)
                    review.content = sel3 ? await frmae2.evaluate((el) => el.textContent, sel3) : "";
                }
                else {
                    review.star = await frmae2.evaluate((el) => el.textContent, sel);
                    const sel2 = await frmae2.$(`.place_detail_wrapper .place_section:nth-child(5) >div> ul > li:nth-child(${j}) > div > div:nth-child(2)> div:nth-child(2) > span`)
                    review.date = await frmae2.evaluate((el) => el.textContent, sel2);
                    const sel3 = await frmae2.$(`.place_detail_wrapper .place_section:nth-child(5) >div> ul > li:nth-child(${j}) >div >div:nth-child(3) >a > span`)
                    review.content = sel3 ? await frmae2.evaluate((el) => el.textContent, sel3) : "";
                }
                reviewArr.push({ star: star, date: date, content: content })
                await Review.create({
                    StoreId:storeData.id,
                    star: star, 
                    date: date, 
                    content: content,
                    nickName:"익명" 
                  })
            }
            console.log(review);
        } catch (err) {
            console.log(err);
        }
    }
    const getStore=()=>{
      cluster.queue(async ({ page }) => {
          storeCrawl();
        });
      }
    const getReview=()=>{
      cluster.queue(async ({ page }) => {
        reviewCrawl();
    });
    }
    return {
        getStore:getStore, 
        getRevoew:getReview};
};
module.exports=crawler;