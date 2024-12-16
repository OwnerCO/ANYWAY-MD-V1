const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0w4S212dUZJeUMzSnB5TUFhTUp4cStlVWk3OUpFaDdOR05RZHU2UlhIYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibXAwU2FGeVFITzROY2hlNUdkaG5CTFZGQXRIeVhtMzIvT3Vob2ZyNGszST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1R29VNHRjckR5SWpUeFd0UFRBZkczUzBGUmZmTUdtMjBPU3VSOVNqTEVRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPZUg0eWZDcTJJRG5PZUMyaElZRzlZbGxGZXVxb215VHMzRnFmRWRGUzFnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklOeVNmYVYxZWZiU1pSeGY1d1FwNk9Qa0c0MGJ5SkVuUUpFejQvcGFnbUk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVFUTRyd3EzcUt1aXJWZE44czI4clFZM0F1c0xMVWY1eS9PZ0o4SDJTMW89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUtqZUxIN0ZGRFRUbVRIay9tYmtmVm4vd2JQc3dveWZyeXpTNTlCTlFGST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTzRZL1I2T0pSeEJZcitHQzA3L0JZRFI1VlU0RWFsQWxSMDZCeWtXY1d5ND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdqUDJnU0NLcVptSmV0WUZOWHM4K01xdllYUmNteTdVeU5nRUovTFMyVmt4MHJGcFpnei83TWNwcVBoSEFmRy9iWWN4bjlLYS9wWFMyZE5Gelc0L0FRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzIsImFkdlNlY3JldEtleSI6IlE1cUxUaUZsL0dWY1lYMTBEeE05T0pDbFhPaGZJWExsU1ZDUkpZYnBvQTg9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiNTE5NzgxOTQ5MzNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRUQ3QTlEOTAwNUIxRDFGMTY0NUFBRTVBN0U0MUU5RDAifSwibWVzc2FnZVRpbWVzdGFtcCI6MTczNDM3OTk0Nn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoib1Z5SnF5WkxUTWUzandlVnJydkFKUSIsInBob25lSWQiOiI4M2I2NzViMi03ZWRhLTQzNWQtODMzOS1jNzE2ZTllNjA5NDQiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSEcrWDdMOEVFUmRyL3MrWG1URDRVaDlORFZFPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklHVmRpdXorRG55d0hWcURaejZYVGZSMDJMRT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJIQkdFUFA2OCIsIm1lIjp7ImlkIjoiNTE5NzgxOTQ5MzM6NDRAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiU3lzc29sdXRpb25zIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNONlFsdlVHRUp5VGdyc0dHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ6NG5RUmZMRmJIWlFqc1ZTQWFUbkV6MnpEMW5aKzg5K0Rjd09PNXBPNVJnPSIsImFjY291bnRTaWduYXR1cmUiOiJWOHBXdWNmUG1CR2NDNDY1NmtUWnJQR2Q1RnZGeTlGZlpnVzZGMllXaERaUnVUSFpPOVg0NzlIVU9ZZlhVVmJwY2hXQnFZTEZ1dlBmRnhsVlFiOVpEUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiQ1hpdUNVcm81Zk1mckxEanVGR0M3Q28vNWxuTyt2NFdWVWxhZEk4dFl2R2ZDV2hzSWF5M2gzcFBGeDZzUWVPU2JkOXU2ZHQ0dVFwa3dKV1JQbmdTQXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI1MTk3ODE5NDkzMzo0NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjK0owRVh5eFd4MlVJN0ZVZ0drNXhNOXN3OVoyZnZQZmczTURqdWFUdVVZIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM0Mzc5OTQ1LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU51cSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
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
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANYWAY_MD : process.env.AUTO_LIKE_STATUS || 'yes',
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
