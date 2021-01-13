export default class UpApi {
	constructor(api_root, api_token) {
		this.api_root = api_root;
		this.token = api_token;
	}

	formatParams(params) {
		return "?" + Object
			.keys(params)
			.map(function(key){
				return key+"="+encodeURIComponent(params[key])
			})
			.join("&")
	}


	apiCall(endpoint, params) {
		let url = this.api_root + endpoint;
		if (params != undefined) { 
			url = url + this.formatParams(params) 
		}

		let req = new XMLHttpRequest();
		req.open("GET", url, false);
		req.setRequestHeader("Authorization", "Bearer " + this.token)
		req.send(null);

		return JSON.parse(req.responseText);
	}

	getAccounts() {
		let res = this.apiCall("/accounts");
		return res
	}

	getTransactions(account_id) {
		let res = this.apiCall("/accounts/" + account_id + "/transactions", {
			"page[size]": 5,
		});
		return res
	}
}