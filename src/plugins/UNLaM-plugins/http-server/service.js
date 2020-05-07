import axios from "axios";

export function httpGet(url) {
	let user = JSON.parse(localStorage.getItem("userData"));
	return axios.get(url, { auth: user });
}

export function httpPost(url, data) {
	let user = JSON.parse(localStorage.getItem("userData"));
	return axios.post(url, data, { auth: user });
}

export function httpPut(url, data) {
	let user = JSON.parse(localStorage.getItem("userData"));
	return axios.put(url, data, { auth: user });
}
