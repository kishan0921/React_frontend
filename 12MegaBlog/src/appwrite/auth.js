import  {Client, Account, ID} from "appwrite";
import conf from "../conf/conf";


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
}


const authService = new AuthService();

//Ab hum yaha ye AuthService , class ko export kr dete hai
export default AuthService