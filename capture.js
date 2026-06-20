const puppeteer = require('puppeteer');
const fs = require('fs');

const sites = [
    {
        name: 'biobonz-hero.png',
        url: 'https://biobonz.com/collections/all',
        fallbackUrl: 'https://biobonz.com/'
    },
    {
        name: 'propleadz-hero.png',
        url: 'https://propleadz.in/features',
        fallbackUrl: 'https://propleadz.in/'
    },
    {
        name: 'bbsigns-hero.png',
        url: 'https://bbsigns.co.nz/services/',
        fallbackUrl: 'https://bbsigns.co.nz/'
    },
    {
        name: 'yoyo-hero.png',
        url: 'https://www.yoyo.fashion/collections/all',
        fallbackUrl: 'https://www.yoyo.fashion/'
    },
    {
        name: 'antyodayanews-hero.png',
        url: 'https://antyodayanews.com/',
        fallbackUrl: 'https://antyodayanews.com/'
    }
];

(async () => {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    for (const site of sites) {
        console.log(`\nNavigating to ${site.url}...`);
        try {
            const response = await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 30000 });
            
            // If the inner page returns a 404, fallback to the homepage and scroll down
            if (response && response.status() === 404) {
                console.log(`404 detected. Falling back to ${site.fallbackUrl}...`);
                await page.goto(site.fallbackUrl, { waitUntil: 'networkidle2', timeout: 30000 });
                // Scroll down to capture the feature section instead of hero
                await page.evaluate(() => window.scrollBy(0, 900));
            }
            
            console.log(`Waiting 8 seconds for loaders and animations to finish...`);
            await new Promise(r => setTimeout(r, 8000));
            
            // In case there are cookie banners or modals, let's try to hide them
            await page.evaluate(() => {
                const elements = document.querySelectorAll('[id*="cookie"], [class*="cookie"], [id*="popup"], [class*="popup"]');
                elements.forEach(el => el.style.display = 'none');
            }).catch(() => {});

            console.log(`Capturing screenshot for ${site.name}...`);
            await page.screenshot({ path: `public/images/portfolio/${site.name}` });
            console.log(`Saved ${site.name} successfully.`);
        } catch (error) {
            console.error(`Failed to capture ${site.name}:`, error.message);
        }
    }

    await browser.close();
    console.log('All screenshots captured!');
})();
