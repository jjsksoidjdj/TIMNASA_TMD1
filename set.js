const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'XPLOADER~eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUJzY0UvaWVjd1E4NzFlN055ZWdiUnFDQ0JtZ0hldzhEU2lFS1B2b2RYZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaEI0SElvOVJzNVI0c2FlR1RUVUU5UUNjT2MxZ1BRYlZBelI1Y3Q0c1htdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5RW5tQlpvaWo0Q2xvK0VEOEFpcFdSZFp3ODRmSTJMY3IvY1Q3dGVHclU4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtaW0xcHBaOVE3UzZWQ0ZkSnl5SlFBSy85Uk5iS1JmQ0ExRUhUeld2c2pFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZKMmdFclB6Wnl4WGYyUUsxdlArQlNTTVFNOXd6V0dxaGp4WkdVVE80MVE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZab0FGelphMS92RzkwNmxwVlpLVjNja3FCZGFMOVV4OGdKTHFMQ2N1QjQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia1BUM01lWHdJMjNYR3pzQ2YzdjFESzBQaFBPeXZDV0JYRWpvZTliNkoxRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibzBYb2UyQlBETHJMbzhwRC9Vd2ZLTVAvTzFsb0VWR3BWYzZWaUpZcU5UQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlB0SjczRkVCak9FWjVSem1oUmx3c0NTN0VGMnlmOVVSTmQ4ZkFSSGdKNkFvNkFELysvdHhsV0Y0aEVlTUF5blpuQlhGZmplakgvUnJGZmxrbENrSmd3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTMzLCJhZHZTZWNyZXRLZXkiOiIwcTNsUDZPTEJGYm5jOUNqaXZrNER3S045TFpxWEN4NUpBWDVqd0YzV3I4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6Ijk0NzIyODI5Mzc3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkQwRDc5Q0Q2OTc2MTI4MDdBRDcxOTkzMzg3RDEzMjEyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MzU3ODQ0MTN9LHsia2V5Ijp7InJlbW90ZUppZCI6Ijk0NzIyODI5Mzc3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjhCRjI0MTcyRDIyNkNBQjQ3NEJBRTVEN0RDNUIwMTE3In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MzU3ODQ0MTR9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IklrMkR6SnA2UjBtNHBCTFFEWGF2bnciLCJwaG9uZUlkIjoiZGQyYzg2ZmItYmY1Ni00Mzk1LTg5ZjQtNTMzMzFlZDU4NTJlIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJ5WEtiQWtoNWpaSHN3bHZOdUFQb21UdVVXUT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJicUZDNUJoVUNSdlIzMkZZUjc2Z3ZBQmVGVDg9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiNTg1MUdMMVgiLCJtZSI6eyJpZCI6Ijk0NzIyODI5Mzc3OjUwQHMud2hhdHNhcHAubmV0IiwibmFtZSI6ImtrZ3JzYWRhcnV3YW43MCIsImxpZCI6IjEwMDk3OTU0NzAxNDY1OjUwQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSmVoN3NjQkVNN3YxN3NHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiMjJBVlBHSFl5bHo1cys4VHBwd3RvQUVJOGNhOWdNTVBNbExDcndFSFpsdz0iLCJhY2NvdW50U2lnbmF0dXJlIjoidUs0dkMybngwaWJwelpxSGVCek9yWTV1aXZLUnoxcHRoK29EYkRrRU0vOWQ3S2hGRHNHSmhPZjFLTWdiWW01VnkrajBkaWdER3NBdjZwaWgwZFpRQmc9PSIsImRldmljZVNpZ25hdHVyZSI6IlhjRXp6eHlIVytOclBLNDdEWTdUZ2JJenFuWWMyVWtIUmZ5bXJmd3FJVWJQclNuVExaSncySWw5VXkyRTJWZmtwQjlNNmhhclRZcVljRVhMU0RBSmdBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTQ3MjI4MjkzNzc6NTBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZHRnRlR4aDJNcGMrYlB2RTZhY0xhQUJDUEhHdllERER6SlN3cThCQjJaYyJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczNTc4NDQxMCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFGaEYifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "TIMNASA-TMD",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255784766591",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    TIMNASA_TMD : process.env.AUTO_LIKE_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
