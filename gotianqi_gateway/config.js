module.exports = {
		
  serverPort: 8000,
  sessionCookieKey: "connect.sid",
  sessionSecret: "SESIORsecret",
  allowedCORSOrigins: "http://127.0.0.1:8080",
  
  AUTH_SERVER: process.env.AUTH_SERVER || 'http://127.0.0.1:3000',
  DB_SERVER: process.env.DB_SERVER || 'http://127.0.0.1:3000',
  MASTER_SERVER: process.env.MASTER_SERVER || '127.0.0.1:5000'
};