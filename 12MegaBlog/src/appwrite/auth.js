import  {Client, Account, ID} from "appwrite";
import conf from "../conf/conf.js";


// Yaha hum export kar rahe hai class,and name de rahe hai- AuthSerive
export class AuthService {
    // Ab hum yaha pe client Banayenge.
    client = new Client();
    // Uppar client ban gya, ab hume chahiye account 
    account;

    // AuthService() jab call hoga, then new object banega , and 
    // using constructor , contructor hmesha call hoga.

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        // Now, Ab account ki value ko add krenge
        this.account = new Account (this.client);
    }

    // ab hum account create waala method banayenge and ussko async rakhenge.
    async createAccount({email,password,name}){
        // ab ye createAccount waala method fail bhi ho skta hai, issliye try catch ka use krenge.

        try{
            // ab mujhe 1st step me await krna h, kisschiz ke liye? - account Create ke liye
            // unique id generate krne ke liye ID.unique() method ka use kr lenge.
            // and issko 1 variable me store kr lete h
            const userAccount = await this.account.create(ID.unique(),email,password,name);

            // Now ab check krenge user account create hua hai ya nhi.
            // agar userAccount hai , to return kr do uss userAccount ko
            if(userAccount){
                // call another method
                return this.login({email,password});
            }
            // agar userAccount nahi hai, then error return kr do.
            else {
                return userAccount;
            }

        }catch(error){
          // ab error throw kr dete h
          throw error;  
        }
    }

    // ab ek aur login ke liye async method bana lete h
    async login({email,password}){
        try{
            return await this.account.createEmailSession
        }catch (error){
            throw error;
        }
    }


    // ab user logged in hai ya nahi , ye check krna hoga
    async getCurrentUser(){
        // ab issme bhi issue aa skta hai , issiye try catch 
        try {
            // phele yaha pe await lagao, kyuki async method hai
            // then this.account.get se account ka detail le lo
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive:: getCurrentUser :: error", error);
        }

        // and return humlog null kr rahe h
        return null;
    }

    // Ab logout krenge account usska method 
    async logout(){
        try{
            await this.account.deleteSessions();
        }catch(error){
            console.log("Appwrite serive :: logout :: error", error);
        }
    }

}


const authService = new AuthService();

//Ab hum yaha ye AuthService , class ko export kr dete hai
export default AuthService