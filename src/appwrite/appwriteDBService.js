import { Client, Storage, Databases, TablesDB, Query, ID } from "appwrite";
import config from "../config/config.js";

class appWriteDB {
  client = new Client();
  databases;
  tablesDB;
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteURL)
      .setProject(config.appwriteProjectID);

    this.databases = new Databases(this.client);
    this.tablesDB = new TablesDB(this.client);
    this.storage = new Storage(this.client);
  }

  // Database Services

  async createArticle({ title, slug, content, userid, status, featuredimage }) {
    try {
      return await this.tablesDB.createRow({
        databaseId: config.appwriteDataBaseID,
        tableId: config.appwriteArticleID,
        rowId: ID.unique(),
        data: { title, slug, content, userid, status, featuredimage },
      });
    } catch (error) {
      return { type: "CreateArticle Error", Error: error };
    }
  }

  async listArticles() {
    try {
      return await this.tablesDB.listRows({
        databaseId: config.appwriteDataBaseID,
        tableId: config.appwriteArticleID,
        queries: [Query.equal("status", ["Active"])],
      });
    } catch (error) {
      return { type: "ListArticles Error", Error: error };
    }
  }

  async updateArticle($id, { title, slug, content, status, featuredimage }) {
    try {
      return await this.tablesDB.updateRow({
        databaseId: config.appwriteDataBaseID,
        tableId: config.appwriteArticleID,
        rowId: $id,
        data: { title, slug, content, status, featuredimage },
      });
    } catch (error) {
      return { type: "UpdateArticle Error", Error: error };
    }
  }

  async getArticle($id) {
    try {
      return await this.tablesDB.getRow({
        databaseId: config.appwriteDataBaseID,
        tableId: config.appwriteArticleID,
        rowId: $id,
      });
    } catch (error) {
      return { type: "GetArticle Error", Error: error };
    }
  }

  async deleteArticle($id) {
    try {
      await this.tablesDB.deleteRow({
        databaseId: config.appwriteDataBaseID,
        tableId: config.appwriteArticleID,
        rowId: $id,
      });

      return true;
    } catch (error) {
      return { type: "deleteArticle Error", Error: error };
    }
  }

  //   Storage Services

  async uploadFile(File) {
    try {
      return await this.storage.createFile({
        bucketId: config.appwriteBucketID,
        fileId: ID.unique(),
        file: File,
      });
    } catch (error) {
      return { type: "CreateFile Error", Error: error };
    }
  }

  async deleteFile(FileID) {
    try {
      await this.storage.deleteFile({
        bucketId: config.appwriteBucketID,
        fileId: FileID,
      });
      return true;
    } catch (error) {
      return { type: "DeleteFile Error", Error: error };
    }
  }

  getFilePreview(FileID) {
    return this.storage.getFilePreview({
      bucketId: config.appwriteBucketId,
      fileId: FileID,
    });
  }
}

const appwriteDBService = new appWriteDB();

export default appwriteDBService;
