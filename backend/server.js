const dns = require('node:dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);
dns.setDefaultResultOrder('ipv4first');

require("dotenv").config();


const app = require("./src/app")

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`PORT is running on http://localhost:${PORT}`);
})

