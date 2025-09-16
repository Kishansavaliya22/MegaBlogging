import { Client, Account, ID } from "appwrite";
import config from "../config/config.js";

class appWriteAuth {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteURL)
      .setProject(config.appwriteProjectID);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userData = await this.account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });
      if (userData) {
        return this.login({ email, password });
      } else {
        return userData;
      }
    } catch (error) {
      return { type: "Signup Error", Error: error };
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession({ email, password });
    } catch (error) {
      return { type: "Login Error", Error: error };
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      return { type: "GetCurrentUser Error", Error: error };
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      return { type: "Logout Error", Error: error };
    }
  }
}

const appwriteAuth = new appWriteAuth();

export default appwriteAuth;
