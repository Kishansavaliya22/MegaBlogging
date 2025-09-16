import { Client, Storage, Databases, Query, ID } from "appwrite";
import config from "../config/config.js";

class appWriteDB {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteURL)
      .setProject(config.appwriteProjectID);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  // Database Services

  async createArticle({ title, slug, content, userid, status, featuredimage }) {
    try {
      return await this.databases.createDocument({
        databaseID: config.appwriteDataBaseID,
        collectionId: config.appwriteArticleID,
        documentId: slug,
        data: { title, userid, content, status, featuredimage, slug },
      });
    } catch (error) {
      return { type: "CreateArticle Error", Error: error };
    }
  }

  async listArticles() {
    try {
      return await this.databases.listDocuments({
        databaseId: config.appwriteDataBaseID,
        collectionId: config.appwriteArticleID,
        queries: [Query.equal("status", ["Active"])],
      });
    } catch (error) {
      return { type: "ListArticles Error", Error: error };
    }
  }

  async updateArticle(slug, { title, content, status, featuredimage }) {
    try {
      return await this.databases.updateArticle(
        config.appwriteDataBaseID,
        config.appwriteArticleID,
        slug,
        { title, content, status, featuredimage }
      );
    } catch (error) {
      return { type: "UpdateArticle Error", Error: error };
    }
  }

  async getArticle(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDataBaseID,
        config.appwriteArticleID,
        slug
      );
    } catch (error) {
      return { type: "GetArticle Error", Error: error };
    }
  }

  async deleteArticle(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDataBaseID,
        config.appwriteArticleID,
        slug
      );

      return true;
    } catch (error) {
      return { type: "deleteArticle Error", Error: error };
    }
  }

  //   Storage Services

  async createFile() {
    try {
      return await this.storage.createFile(
        config.appwriteBucketID,
        ID.unique(),
        File
      );
    } catch (error) {
      return { type: "CreateFile Error", Error: error };
    }
  }

  async deleteFile(FileID) {
    try {
      await this.storage.deleteFile(config.appwriteBucketID, FileID);
      return true;
    } catch (error) {
      return { type: "DeleteFile Error", Error: error };
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
  }
}

const appwriteDBService = new appWriteDB();

export default appwriteDBService;
