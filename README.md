# Upbank KaiOS app

This is a basic (read-only) KaiOS app for Up Bank, using the v1 API.
You can browse your transactions, available spending balance, and balance in savers.

## Get started

Install the dependencies

```bash
cd upbank
npm install
```

You will need to create `src/config.js` with your [personal access token](https://api.up.com.au/getting_started) like so:
```
export default {
  "UP_TOKEN": "$YOUR_TOKEN",
  "API_URL_ROOT": "https://api.up.com.au/api/v1",
}
```

## Building for the phone

```bash
npm run build
```

You will then install the `build` folder to the phone via WebIDE ([see here](https://sites.google.com/view/bananahackers/development/webide#h.p_zvqqyAT0XBks)).
