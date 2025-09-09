const config = {
  appwriteURL: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteDataBaseID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteProjectID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteArticleID: String(import.meta.env.VITE_APPWRITE_ARTICLE_ID),
  appwriteBucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default config;
