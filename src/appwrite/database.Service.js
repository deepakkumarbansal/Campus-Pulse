import {Client, Databases, ID} from 'appwrite'
import { conf } from '../conf/conf';

class DataBaseService {
    client = new Client();
    database;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.database = new Databases(this.client);
    }

    createPost = async(data) => {
        try {
            const post = await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                data,
            )
            console.log("Inside",post);

            return post;
        } catch (error) {
            throw error;
        }
    }
    updatePost = async(docId, data) => {
        try {
            const post = await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                docId,
                data,
            )
            console.log(post);
            return post;
        } catch (error) {
            throw error;
        }
    }
    deletePost = async(docId) => {
        try {
            const data = await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                docId,
            )
            return true;
        } catch (error) {
            throw error;
        }
    }
    getPosts = async(queries = []) => {
        try {
            const posts = await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
            return posts;
        } catch (error) {
            throw error;
        }
    }
    getPost = async(docId) => {
        try {
            const post = await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                docId,
            )
            return post;
        } catch (error) {
            throw error;
        }
    }
}

export const databaseService = new DataBaseService();