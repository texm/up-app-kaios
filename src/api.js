const CACHE_TIME = 30 // seconds

export default class UpApi {
	constructor(api_root, api_token) {
		this.api_root = api_root;
		this.token = api_token;
		this.next_transactions = {}

		this.callCache = {}
	}

	cacheFresh(func) {
		if (func in this.callCache) {
			let date = this.callCache[func][0];
			const age = Math.abs(date - Date.now()) / 1000;
			return age < CACHE_TIME;
		}

		return false;
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

		let http = new XMLHttpRequest({mozSystem: true});
		http.open("GET", url, false);
		http.setRequestHeader("Authorization", "Bearer " + this.token);
		http.send(null);

		return JSON.parse(http.responseText);
	}

	getAccounts() {
		if (this.cacheFresh("getAccounts")) {
			return this.callCache["getAccounts"][1];
		}

		let res = this.apiCall(this.api_root + "/accounts");
		let data = res["data"];

		this.callCache["getAccounts"] = [Date.now(), data];
		return data;
	}

	getTransactions(account_id) {
		if (this.cacheFresh("getTransactions")) {
			return this.callCache["getTransactions"][1];
		}

		let res = this.apiCall(this.api_root + 
			"/accounts/" + account_id + "/transactions", {
			"page[size]": 5,
		});
		let data = res["data"];

		this.next_transactions[account_id] = res["links"]["next"];
		this.callCache["getTransactions"] = [Date.now(), data]

		return data
	}

	getNextTransactions(account_id) {
		if (account_id in this.next_transactions) {
			let res = this.apiCall(this.next_transactions[account_id]);
			let data = res["data"];

			this.next_transactions[account_id] = res["links"]["next"];
			this.callCache["getTransactions"] = [Date.now(), 
				this.callCache["getTransactions"][1].concat(data)
			]
			return data;
		}

		return null
	}
}