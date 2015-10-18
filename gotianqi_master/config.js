// Set your own domain in "allowedCORSOrigins" instead of "http://127.0.0.1:9000"

module.exports = {
    serverPort: 5000,
    sessionCookieKey: "connect.sid",
    sessionSecret: "SESIORsecret",
    allowedCORSOrigins: "http://127.0.0.1:8000",

    AUTH_SERVER: process.env.AUTH_SERVER || 'http://www.gotianqi.com:3000',
    DB_SERVER: process.env.DB_SERVER || 'http://www.gotianqi.com:3000',
};