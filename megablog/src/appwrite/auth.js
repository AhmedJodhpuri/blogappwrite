import conf from "../conf/conf";
import {Client, ID , Account} from "appwrite"


 //class banao
 //class ka object export karo

export class AuthService{
    client = new Client;
    account;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }
    //create account(signup)
    async createAccount({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                //if account exists, call another methid(login)
                return this.login({email, password});
            }else{
                return userAccount;
            }
        }catch(error){
            console.error('Error getting current user:', error);
            throw error;
        }
    }

    async login({email, password}){
        try{
            return await this.account.createEmailPasswordSession(email, password);
        }catch(error){
            console.error('Error getting current user:', error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }


    async logout(){
        try{
            await this.account.deleteSessions();
        }catch(error){
            throw console.log(error);
        }
    }
}

const authService = new AuthService();

export default authService;