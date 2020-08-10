import axios from "axios";

export function httpGet(url) {
	let user = readUserData();
	return axios.get(url, { headers: { Authorization: "Token " + user.token }});
}

export function httpPost(url, data) {
	let user = readUserData();
	return axios.post(url, data, { headers: { Authorization: "Token " + user.token }});
}

export function httpPut(url, data) {
	let user = readUserData();
	return axios.put(url, data, { headers: { Authorization: "Token " + user.token }});
}

function readUserData() {
	let user = JSON.parse(localStorage.getItem("userData"));
	if (user == null)
		user = {token: 1};
	return user;
}
