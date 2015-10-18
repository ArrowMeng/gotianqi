module.exports = {
		
  serverPort: 8000,
  sessionCookieKey: "connect.sid",
  sessionSecret: "SESIORsecret",
  allowedCORSOrigins: "*",
  
  AUTH_SERVER: process.env.AUTH_SERVER || 'http://localhost:3000',
  DB_SERVER: process.env.DB_SERVER || 'http://localhost:3000',
  MASTER_SERVER: process.env.MASTER_SERVER || 'localhost:5000'
};