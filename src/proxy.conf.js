const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
      "/api/Users",
      "/api"
    ],
    target: "https://taskhero-api.azurewebsites.net",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
