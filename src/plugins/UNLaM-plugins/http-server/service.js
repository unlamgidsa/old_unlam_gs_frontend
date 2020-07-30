import axios from "axios";

export function httpGet(url) {
	let user = JSON.parse(localStorage.getItem("userData"));
	return axios.get(url, { headers: { Authorization: "Token " + user.token }});
}

export function httpPost(url, data) {
	let user = JSON.parse(localStorage.getItem("userData"));
	return axios.get(url, { headers: { Authorization: "Token " + user.token }});
}

export function httpPut(url, data) {
	let user = JSON.parse(localStorage.getItem("userData"));
	return axios.get(url, { headers: { Authorization: "Token " + user.token }});
}
