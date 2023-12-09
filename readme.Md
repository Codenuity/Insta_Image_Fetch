# Instagram Image Fetcher

## Description

This npm module allows you to fetch images from Instagram based on a specified tag. It utilizes Puppeteer, a headless browser automation library for Node.js, to scrape image links from the Instagram website.

## Installation

To install this package, use the following npm command:

```bash
npm install instagram-image-fetcher
```
```bash
import { FetchImages } from "instagram-image-fetcher";

// Specify the tag and, optionally, the maximum number of retries
const tag = "yourtag";
const maxRetries = 10;

// Fetch images
const imageLinks = await FetchImages(tag, maxRetries);

// Use the retrieved image links as needed
console.log(imageLinks);
 ```
##Parameters
tag: The Instagram tag for which you want to fetch images.
tryCount (optional): The maximum number of retries if no images are initially retrieved. Default is set to 10.

#Example

```bash
import { FetchImages } from "instagram-image-fetcher";

const tag = "nature";
const maxRetries = 5;

try {
  const imageLinks = await FetchImages(tag, maxRetries);
  console.log("Fetched images:", imageLinks);
} catch (error) {
  console.error("An error occurred:", error.message);
}
```
## Contribution

Feel free to contribute by opening issues or submitting pull requests on the [GitHub repository](https://github.com/Codenuity/Insta_Image_Fetch.git).


##License
This project is licensed under the MIT License - see the[License](LICENSE) file for details.
