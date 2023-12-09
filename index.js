import puppeteer from "puppeteer";

let browser;
let startCount = 1;

const fetchInstagramImages = async (tag) => {
  const instagramUrl = `https://www.instagram.com/explore/tags/${tag}`;
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
  }finally{
    await browser.close();
  }
};

export const FetchImages = async (tag,tryCount) => {
  try {
    console.log("Fetching images for tag:", tag);
    let imageLinks = await fetchInstagramImages(tag);
    let maxCount = tryCount || 10;

    if (imageLinks.length === 0 && startCount <= maxCount) {
      startCount += 1;
      // Recursively call FetchImages with the same tag
      imageLinks = await FetchImages(tag);
    }
    return imageLinks;
  } catch (error) {
    console.error("An error occurred:", error.message);
    throw error;
  }
};
