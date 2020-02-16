import axios from "axios";
import UserService from "./UserService";
const ARTICLE_URL = "http://localhost:3999/api/articles/";


export default class ArticleService {
  static async getRandomArticle(userSession) {
    const info = await UserService.getInfo(userSession);
    const doneList = info.bettingHistory ? info.bettingHistory : [];
    return (await axios.get(`${ARTICLE_URL}random?doneList=[${doneList}]`)).data;
  };

  static async doArticle(userSession, articleId) {
    await UserService.spendToken(userSession, articleId);
  }
}