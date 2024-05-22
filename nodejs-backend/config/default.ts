import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 1337;
const DBURI = process.env.DBURI;
const PUBLICKEY = process.env.PUBLICKEY;
const PRIVATEKEY = process.env.PRIVATEKEY;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const COLLECTION_NAME = process.env.COLLECTION_NAME;
const ORIGIN = process.env.ORIGIN;

export default {
    port: PORT,
    origin: 'origin',
    dbUri: DBURI,
    collectionName: 'MVPS',
    saltWorkFactor: 10,
    accessTokenTtl: "120m",
    refreshTokenTtl: "1y",
    publicKey: PUBLICKEY,
    privateKey: PRIVATEKEY,
    refreshTokenPublicKey: "",
    googleClientId: GOOGLE_CLIENT_ID,
    googleClientSecret: GOOGLE_CLIENT_SECRET,
    googleOAuthRedirectUrl: "http://localhost:1337/api/sessions/oauth/google",
    

};

