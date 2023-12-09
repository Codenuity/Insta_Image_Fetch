import puppeteer from "puppeteer";


const fetchInstagramImages = async (tag) => {
  const instagramUrl = `https://www.instagram.com/explore/tags/${tag}`;
  let browser;
  try {
    browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.goto(instagramUrl, { waitUntil: "networkidle2" });
    await page.waitForSelector("img");

    const imageLinks = await page.evaluate(() => {
      const images = document.querySelectorAll("img");
      const imageLinks = [];
      images.forEach((img) => {
        const src = img.getAttribute("src");
        if (src && src.startsWith("https://")) {
          imageLinks.push(src);
        }
      });
      return imageLinks;
    });

    return imageLinks;
  } catch (error) {
    console.error("An error occurred:", error.message);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};


export const FetchImages = async (tag) => {
  try {
    const imageLinks = await fetchInstagramImages();
    return imageLinks;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};