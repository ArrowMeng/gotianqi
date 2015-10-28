// Set your own domain in "allowedCORSOrigins" instead of "http://127.0.0.1:9000"

module.exports = {
	seaport: 8001,
    serverPort: 5000,
    sessionCookieKey: "connect.sid",
    sessionSecret: "SESIORsecret",
    allowedCORSOrigins: "http://localhost:8080",

    AUTH_SERVER: process.env.AUTH_SERVER || 'http://localhost:3000',
    DB_SERVER: process.env.DB_SERVER || 'http://localhost:3000',
};