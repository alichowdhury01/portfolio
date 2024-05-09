import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 1337;
const DBURI = process.env.DBURI;
const PUBLICKEY = process.env.PUBLICKEY;
const PRIVATEKEY = process.env.PRIVATEKEY;

export default {
    port: PORT,
    dbUri: DBURI,
    saltWorkFactor: 10,
    accessTokenTtl: "15m",
    refreshTokenTtl: "1y",
    publicKey: PUBLICKEY,
    privateKey: PRIVATEKEY,

};
