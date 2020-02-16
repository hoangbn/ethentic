const USER_INFO_FILENAME = "userInfo";
const LOAD_OPTIONS = { decrypt: true };
const SAVE_OPTIONS = { encrypt: true };
const TOKENS_FIELD = "numTokens";
const ETHER_ADDRESS = "etherAddress";
const BETTING_HISTORY = "bettingHistory";

const getInfo = async (userSession) => {
    console.log(userSession);
    const content = await userSession.getFile(USER_INFO_FILENAME, LOAD_OPTIONS);
    console.log(content);
    return content ? JSON.parse(content) : {};
};

const setInfo = (userSession, newUserInfo) => {
    userSession.putFile(USER_INFO_FILENAME, JSON.stringify(newUserInfo), SAVE_OPTIONS)
};

export default class UserService {
    static async addTokens(userSession, newTokens) {
        let userInfo = await getInfo(userSession);
        const curTokens = userInfo[TOKENS_FIELD] ? userInfo[TOKENS_FIELD] : 0;
        userInfo[TOKENS_FIELD] = curTokens + newTokens;
        setInfo(userSession, userInfo);
    }

    static async spendToken(userSession) {
        let userInfo = await getInfo(userSession);
        if (userInfo[TOKENS_FIELD]) throw new Error("Not Enough Tokens");
        userInfo[TOKENS_FIELD]--;
        setInfo(userSession, userInfo);
    }

    static async test(userSession) {
        this.addTokens(userSession, 10);
    }
}