const puppeteer = require('puppeteer');

(async () => {
	// set some options, set headless to false so we can see the browser in action
	let launchOptions = { headless: false, args: ['--start-maximized'] };
	
	// launch the browser with above options
	const browser = await puppeteer.launch(launchOptions);
	const page = await browser.newPage();
	
	// set viewport and user agent (just in case for nice viewing)
	await page.setViewport({width: 1366, height: 768});
	await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
	
	// go to Bit.ly
	await page.goto('https://bitly.com');
	
	// wait until the input selector for long URL available
	await page.waitForSelector('#shorten_url');
	await page.waitFor(2000);

	// this is sample of long URL
	// you can try with your own URL
	let urlToShorten = 'https://medium.com/data-from-the-trenches/text-classification-the-first-step-toward-nlp-mastery-f5f95d525d73';

	// type the long URL to the input selector
	await page.type('#shorten_url', urlToShorten);
	await page.waitFor(1000);

	// click the button to make it short URL
	await page.click('#shorten_btn');
	await page.waitFor(1000);

	// evaluate the result of short URL and put on variable
	// and pass the variable urlToShorten to page.evaluate
	const urlShortener = await page.evaluate((urlToShorten) => {
		return {
			     'long_url': urlToShorten,
		         'short_url': document.getElementsByClassName('short-link')[0].textContent
		       }
	}, urlToShorten);

	// display the result (long and short url) in JSON format
	console.log(urlShortener);

	// close the browser
	await browser.close();
})();
