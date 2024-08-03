import {Client, ID, Storage} from 'appwrite'
import { conf } from '../conf/conf';

class StorageService{
    client = new Client();
    storage;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.storage = new Storage(this.client);
    }
    uploadFile = async(image, fileId = ID.unique(), isAvatar=false) => {
        try {
            const file = await this.storage.createFile(
                isAvatar ? conf.appwriteAvatarBucketId : conf.appwriteBucketId,
                fileId,
                image,
            )
            return file;
        } catch (error) {
            throw error            
        }
    }
    getFile = (fileId, isAvatar=false) => {
        try {
            const file = this.storage.getFileView(
                isAvatar ? conf.appwriteAvatarBucketId : conf.appwriteBucketId,
                fileId,
            )
            return file;
        } catch (error) {
            throw error
        }
    }
    deleteFile = async(fileId, isAvatar=false) => {
        try {
            const data = await this.storage.deleteFile(
                isAvatar ? conf.appwriteAvatarBucketId : conf.appwriteBucketId,
                fileId,
            )
            return data;
        } catch (error) {
            throw error
        }
    }
    getFilePreview = (fileId, isAvatar=false) => {
        try {
            const file = this.storage.getFilePreview(
                isAvatar ? conf.appwriteAvatarBucketId : conf.appwriteBucketId,
                fileId,
            )
            return file;

        } catch (error) {
           throw error
        }
    }
}

export const storageService = new StorageService();