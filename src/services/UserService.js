const USER_INFO_FILENAME = "userInfo";
const LOAD_OPTIONS = { decrypt: true };
const SAVE_OPTIONS = { encrypt: true };
const TOKENS_FIELD = "numTokens";
const ETHER_ADDRESS = "etherAddress";
const BETTING_HISTORY = "bettingHistory";

export default class UserService {
    static async getInfo(userSession) {
        const content = await userSession.getFile(USER_INFO_FILENAME, LOAD_OPTIONS);
        return content ? JSON.parse(content) : {};
    };

    static async setInfo(userSession, newUserInfo) {
        await userSession.putFile(USER_INFO_FILENAME, JSON.stringify(newUserInfo), SAVE_OPTIONS)
    };

    static async addTokens(userSession, newTokens) {
        let userInfo = await this.getInfo(userSession);
        const curTokens = userInfo[TOKENS_FIELD] ? userInfo[TOKENS_FIELD] : 0;
        userInfo[TOKENS_FIELD] = parseInt(curTokens) + parseInt(newTokens);
        await this.setInfo(userSession, userInfo);
    }

    static async spendToken(userSession, articleId) {
        let userInfo = await this.getInfo(userSession);
        if (!userInfo[TOKENS_FIELD] || userInfo[TOKENS_FIELD] <= 0) throw new Error("Not Enough Tokens");
        userInfo[TOKENS_FIELD]--;
        let doneList = userInfo.bettingHistory ? userInfo.bettingHistory : [];
        doneList.push('"' + articleId + '"');
        userInfo.bettingHistory = doneList;
        this.setInfo(userSession, userInfo);
    }

    static async resetArticles(userSession) {
        let userInfo = await this.getInfo(userSession);
        userInfo.bettingHistory = [];
        console.log(userInfo);
        this.setInfo(userSession, userInfo);
    }

    static async addArticleToHistory(userSession, articleId) {
        let userInfo = await this.getInfo(userSession);
        if (!userInfo[BETTING_HISTORY]) userInfo[BETTING_HISTORY] = [];
        userInfo[BETTING_HISTORY].push(articleId);
        await this.setInfo(userSession, userInfo);
    }

    static async test(userSession) {
        this.addTokens(userSession, 10);
    }
}