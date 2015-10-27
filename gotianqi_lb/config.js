module.exports = {
  seaport: 8001,
  loadbalancePort: 8000,
  
  allowedCORSOrigins: "*",
  DB_SERVER: process.env.DB_SERVER || 'http://localhost:3000'
};