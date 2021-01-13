export default class UpApi {
	constructor(api_root, api_token) {
		this.api_root = api_root;
		this.token = api_token;
		this.next_transactions = {}
	}

	formatParams(params) {
		return "?" + Object
			.keys(params)
			.map(function(key) {
				return key + "=" + encodeURIComponent(params[key])
			})
			.join("&")
	}


	apiCall(url, params) {
		if (params != undefined) { 
			url = url + this.formatParams(params) 
		} else {
			params = "";
		}

		let http = new XMLHttpRequest();
		http.open("GET", url, false);
		http.setRequestHeader("Authorization", "Bearer " + this.token);
		http.send(null);

		return JSON.parse(http.responseText);
	}

	getAccounts() {
		return this.apiCall(this.api_root + "/accounts");
	}

	getTransactions(account_id) {
		let res = this.apiCall(this.api_root + 
			"/accounts/" + account_id + "/transactions", {
			"page[size]": 5,
		});
		this.next_transactions[account_id] = res["links"]["next"];
		return res
	}

	getNextTransactions(account_id) {
		if (!(account_id in this.next_transactions)) {
			return null
		}

		let res = this.apiCall(this.next_transactions[account_id]);

		this.next_transactions[account_id] = res["links"]["next"];

		return res;
	}
}