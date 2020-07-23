const puppeteer = require('puppeteer');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
})

let data;

const scrapper = () => {
	const scrape = async () => {
		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		await page.setDefaultNavigationTimeout(0);
		// await page.goto("https://www.instagram.com/accounts/login/");

		// Login form
		// await page.screenshot({ path: "1.png" });

		// await page.type("[name=username]", "fireship_dev");

		// await page.type("[name=password]", "some-pa$$word");

		// await page.screenshot({ path: "2.png" });

		// await page.click("[type=submit]");

		// Social Page

		await page.waitFor(5000);

		await page.goto(`https://www.instagram.com/advertere.tms`);

		await page.waitForSelector("img ", {
			visible: true,
		});
		// await page.waitForSelector("img ", {
		// 	visible: true,
		// timeout: 0(wait for infinite time)(to avoid navigation timeout error)
		// });

		// await page.screenshot({ path: "3.png" });

		// Execute code in the DOM
		const data1 = await page.evaluate(() => {
			const images = document.querySelectorAll("img");
			const doc = document.querySelectorAll("span.g47SY");
			const urls = Array.from(images).map((v) => v.src);

			// return urls;
			const content = Array.from(doc).map((d) => d.innerHTML);
			return { content: content, urls: urls };
		});

		await browser.close();
		data = data1;
	}
	scrape();
}

app.get('/getdata',(req, res, next) => {
		scrapper();
		// console.log(data);

		res.json({ msg: "Rukoo zara......sabar karooo....1 mint lagega kam se kam" });
		// res.send(data);
		// return data;
})

app.get('/getdata1', (req, res, next) => {
	res.json(data);
})

app.listen(process.env.PORT, () => {
  console.log(`successfully connected to port ${process.env.PORT}`);
});




