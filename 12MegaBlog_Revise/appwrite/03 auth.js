// then ek mujhe service banani h, jo ki appwrite se related hai.
// so
// src/appwrite/auth.js
// src/appwrite/config.js
// ye puri auth service waali file hai, appwrite ki

// Note: TOTAL STEP 01- 14
// Appwrite ki ye auth serive ho gayi hai ready.

// Step 02: https://appwrite.io/docs/products/auth/email-password
// Ab mujhe pta hai documentation se ki, first line chahiye.
// To client , Account , Id mil gaaya hai.
import { Client, Account, ID } from "appwrite";

// Step 01: Ab mujhe pta hai mujhe appwriteURL,ProjectId, databaseId,CollectionId ye sab use hogi
// and ye sab present hai conf.js file me to ussko yaha import kr lete h
import conf from "../conf/conf.js";

// Step 03:
// Yaha hum export kar rahe hai class,and name de rahe hai- AuthSerive
// Ye ban gayi humari class - AuthService{}
export class AuthService {
  // Step 06:
  // Ab hum 2 property bana lete hai
  // 1. Client     2.Account

  // 01- Ab hum yaha pe client Banayenge.
  client = new Client();
  // 02- Uppar client ban gya, ab hume chahiye account
  account;

  // STEP : 07
  // const authService = new AuthSerive();
  // Jab ye object koi banega "authService",tab mere pass ye client banana chahiye
  // and tab properly account ka access milna chahiye.

  // INTERVIEW :
  //To jab ye object "authService" banega, tab kon sa method hai, jo apne app call hoga
  // wo hai constructor(), to mai isske andr apni saari functionality rakhunga.

  // constructor Bana lete hai:-
  // AuthService() jab call hoga, then new object banega , and
  // using constructor , contructor hmesha call hoga.
  constructor() {
    // STEP : 08
    // constructor ke ander mai,client ka reference dunga using "this" Keyword
    this.client
      // Ab mai,isske ander saare method use kr skta hu
      // Link:-https://appwrite.io/docs/products/auth/email-password
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    //Now, Abb this.client ke ander appwriteUrl, appwriteProjectId ki value aa gayi h.

    // Now, Ab account ki value ko add krenge and this.client ki value pass kr denge Account me.
    this.account = new Account(this.client);
  }

  // STEP : 08 (Create Account)
  // Ye jo bhi hoga, wo async banega..kyu? -kyuki db se interact hoga,to time leega ye.
  // ab hum account create waala method banayenge and ussko async rakhenge.
  // Create account ke liye hume kuch parameter chahiye (email, password and name) chahiye, issko humne destructure kr liye.
  // Humne, value destructure kr liye, mtlb ye values humare pass aa gayi hai.
  // Jo bhi method ye pass karega ye, wo object dega mujhe , jisske ander ye saari value hogi {email,password,name}
  //Ab jo hai, ye accountCreate waala method fail bhi ho skta hai. to "try-catch" use kr lenge.

  // Create Account method banayenge.
  async createAccount({ email, password, name }) {
    // ab ye createAccount waala method fail bhi ho skta hai, issliye try catch ka use krenge.

    // STEP : 09
    try {
      // ab mujhe 1st step me await krna h, kisschiz ke liye? - account Create ke liye ...Account kaise create hota hai ?
      // (this.account.create) -"this" Keyword se hum account ka Access/reference le liye....then usspe create() method ka use kr liye.
      // and create() method ke ander, jo mera value merepass hai as it is pass kr diya.

      // unique id generate krne ke liye ID.unique() method ka use kr lenge.
      // and issko 1 variable me store kr lete h
      // 4 chiz hum create krenge, Unique ID, email, password, name
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      // STEP : 10
      // Now ab check krenge user account create hua hai ya nhi.
      // agar userAccount exist krta h , to return kr do uss userAccount ko
      if (userAccount) {
        // yaha tk aaye ho, mtlb account exist krta hai.
        // to login krwa hi do...by calling another method.
        // call another method,
        // baiscally agar userAccount hai then, hum login waale method call kr denge.

        return this.login({ email, password });
      }

      // STEP : 11
      // agar userAccount nahi hai, then error return kr do.
      else {
        return userAccount;
      }
    } catch (error) {
      // ab error throw kr dete h
      throw error;
    }
  }

  // STEP : 12
  // ab ek aur login ke liye async method bana lete h
  // and login ke liye mujhe email,password as parameter lena hoga, then value destructure kr lete hai.
  // and login krne me, error bhi aa skta hai, so try-catch use kr lenge.

  // Login method banayenge
  async login({ email, password }) {
    try {
      // login krne ke liye , mujhe account chahiye, so using "this" account access kr lete hai.
      // then createEmailSession() method ka use kr lenge(same as documentation-
      // https://appwrite.io/docs/products/auth/email-password)
      // then iss method ko kya chahiye? - email & password
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  // STEP: 13
  // ab user logged in hai ya nahi , ye check krna hoga
  // GetCurrentuser  method baanayenge.
  async getCurrentUser() {
    // ab issme bhi issue aa skta hai , issiye try catch
    try {
      // phele yaha pe await lagao, kyuki async method hai
      // then this.account.get se account ka detail le lo
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive:: getCurrentUser :: error", error);
    }

    //Note: hume kuch return krna hoga , so null
    // and return humlog null kr rahe h
    return null;
  }

  // STEP : 14
  // Ab logout krenge account usska method
  async logout() {
    try {
      // try me obvioussly, await to krna hi hoga,
      // then account ko access kr lete using "this" Keyword
      // Method 01: particular current end kr skte hai isse.
      // then deleteSession('current'); ka use kr lenge. or,
      // deleteSession('SESSION_ID') ; ka bhi use kr skte h

      // Method 02: Hum ye use kr rahe hai.(NOTE : taaki jaga jaga bhi kis browser me open sab jagah se logout hojaye.)
      // then deleteSessions() method ka use kr lenge.

      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }
}

// Step : 05
// IMPORTANT:
// OLD WAY:
//Humne abhi tk ek class banai and ussko export kar liye,
//to jo bhi iss class ko use krega, ussko ek new object banana padega is class se.
// Tabhi to wo saare method iss class ke use kr paayega.

// NEW WAY:
// to kyu na mai aisa kru, ek object bana kar hi, issko export kr du,
// ye better approach hoga.
// to ussko kuch krna hi nahi hoga,wo directly object ko import kr lega and isspe
// saare methods laagee laagayee hue hai.
// to ye process kaise hoga ?
// AuthService class ka ek naya object (instance) bana rahe hain
// jisse hum login, logout jaise auth-related methods use kar sakte hain

// Note: Ab yaha pe kyuki humne ek new Keyword use kr liya hai.
// To obvioussly, aap constructor wagera sab kuch call kroge, and use kroge.

// Interesting Fact:
// yaha jo object pass kara hai, ye object se directly access kar skte hai, saari services/method
// Like-
// authService.logout use kr skta hu
// authService.login use kr skta hu
// authService.getCurrentUser use kr skta hu
// authService.createAccount bhi use kr skta hu
const authService = new AuthService();

// Benefits : Services like - login, logout, createAccount issi file me banayi gayi h
// to in future issi file me hum code change krenge.

// Step 04:
//Ab hum yaha ye AuthService , class ko export kr dete hai
export default AuthService;
