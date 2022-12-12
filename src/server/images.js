const axios = require("axios");

/*
This function takes a URL as input and attempts to fetch the image at that URL, convert it to a base64 representation, and return the resulting string. If any errors occur during this process, such as if the request fails or the response is not a valid image, the error will be logged to the console and the function will return undefined.
*/
const requestImageBase64 = async (url) => {
	try {
		// Request the image and capture the response
		const response = await axios.get(url, { responseType: "arraybuffer" });
		const buffer = response.data;

		// Convert the image to base64
		const imageBase64 = Buffer.from(buffer).toString("base64");

		// Return the base64
		return imageBase64;
	} catch (err) {
		// Handle errors, such as if the request fails or the response is not a valid image
		console.error(err);
	}
};

exports("requestImageBase64", async (url) => {
	return await requestImageBase64(url);
});

/*
This function takes a domain as input and checks if it is a "safe" domain by creating a URL object from the input domain and checking if the hostname of the URL is included in a predefined list of safe domains (Config.safeDomains). If the hostname is in the list, the function returns true, otherwise it returns false.
*/
const isUrlSafe = (domain) => {
	const urlObject = new URL(domain);
	return Config.safeDomains.includes(urlObject.hostname);
};

exports("isUrlSafe", isUrlSafe);
