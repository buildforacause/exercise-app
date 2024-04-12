import axios from "axios";

const domain = "http://localhost:5000";
const TOKEN = "token";

export const HTTP_METHODS = {
	POST: 'POST',
	GET: 'GET',
};


export const HttpRequest = async (url, method = 'GET', data = null) => {
	try {
		if (method === 'POST' && (data === null || data === undefined)) {
			return {"success": 0, "message": "No data was sent in this route."}
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
		return response.data;

	} catch (error) {
		if (error.response) {
			return error.response.data
		} else if (error.request) {
			return {"success": 0, "message": "Connection refused due to server downtime."}
		} else {
			return {"success": 0, "message": error.message}
		}
	}
};