export const conf = {
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteAvatarBucketId : String(import.meta.env.VITE_APPWRITE_AVATAR_BUCKET_ID)
}