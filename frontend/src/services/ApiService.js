import axios from "axios";

const domain = process.env.REACT_APP_API_URL;
const TOKEN = "token";

export const HTTP_METHODS = {
	POST: 'POST',
	GET: 'GET',
};


export const HttpRequest = async (url, method = 'GET', data = null) => {
	try {
		if (method === 'POST' && (data === null || data === undefined)) {
			throw new Error(`Body is mandatory for POST Call`);
		}
		const config = {
			method: method,
			url: domain + url,
			headers: {
				'Content-Type': 'application/json'
			}
		};
		const token = localStorage.getItem(TOKEN);
		if(token) {
			config.headers['Authorization'] = 'Bearer ' + token
		}
		if (method === 'POST') {
			config.data = data;
		}
		const response = await axios(config);
        console.log(response.data)
		return response.data;

	} catch (error) {
		if (error.response) {
			console.log(error.response.data);
			return error.response.data;
		} else if (error.request) {
			console.log('No response received:', error.request);
			return error.request;
		} else {
			console.log('Error:', error.message);
		}
	}
};