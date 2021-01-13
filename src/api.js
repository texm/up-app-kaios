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


	async apiCall(url, params) {
		if (params != undefined) { 
			url = url + this.formatParams(params) 
		}

		const res = await fetch(url, {
			method: "GET",
			headers: {
				"Authorization": "Bearer " + this.token
			}
		});

		return res.json();
	}

	async getAccounts() {
		return this.apiCall(this.api_root + "/accounts");
	}

	async getTransactions(account_id) {
		let res = await this.apiCall(this.api_root + 
			"/accounts/" + account_id + "/transactions", {
			"page[size]": 5,
		});
		this.next_transactions[account_id] = res["links"]["next"];
		return res
	}

	async getNextTransactions(account_id) {
		if (!(account_id in this.next_transactions)) {
			return null
		}

		let res = await this.apiCall(this.next_transactions[account_id]);

		this.next_transactions[account_id] = res["links"]["next"];

		return res;
	}
}