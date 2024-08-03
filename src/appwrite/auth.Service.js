import { Account, Client } from 'appwrite'
import { conf } from '../conf/conf';

class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }
    signup = async ({ userId, email, password, phone, name }) => {
        try {
            const userData = await this.account.create(userId, email, password, name);
            if (userData) {
                return this.login({ email, password })
                .then((user)=>{
                    this.updatePhone(phone, password);
                    return user;
                }) 
            }
        } catch (error) {
            throw error;
        }
    }
    login = async ({ email, password }) => {
        try {
            const userData = await this.account.createEmailPasswordSession(email, password);
            return userData
        } catch (error) {
            throw error;
        }
    }
    logoutFromThisDevice = async () => {
        await this.account.deleteSession('current');
    }
    logoutFromAllDevices = async () => {
        await this.account.deleteSessions();
    }
    getCurrentUser = async () => {
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
    }
    updatePhone = async (phone, password) => {
        try {
            await this.account.updatePhone(phone, password);
        } catch (error) {
            throw error;
        }
    }
    updateName = async (name) => {
        try {
            await this.account.updateName(name);
        } catch (error) {
            throw error;
        }
    }
    updateEmail = async (email, password) => {
        try {
            await this.account.updateEmail(email, password);
        } catch (error) {
            throw error;
        }
    }
    updatePassword = async (password, oldPassword) => {
        try {
            await this.account.updatePassword(password, oldPassword);
        } catch (error) {
            throw error;
        }
    }
}
export const authService = new AuthService();
