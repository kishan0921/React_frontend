// then ek mujhe service banani h, jo ki appwrite se related hai.
// so
// src/appwrite/auth.js
// src/appwrite/config.js
// ye puri database se connect krne waali service file hai, appwrite ki

// IMPORTANT : TOTAL - STEP 01 - STEPS 16

// Step 01: Ab mujhe pta hai mujhe appwriteURL,ProjectId, databaseId,CollectionId ye sab use hogi
// and ye sab present hai conf.js file me to ussko yaha import kr lete h
import conf from "../conf/conf";

// Step 02: https://appwrite.io/docs/products/auth/email-password
// Ab mujhe pta hai documentation se ki, first line chahiye.
// To client , Account , Id mil gaaya hai.
// iss baar aap appwrite se Databases, storage,Query bhi le skte hai...
//ye hume chahiye iss appwrite ki service ke liye.
import { Client, ID, Databases, Storage, Query } from "appwrite";

// STEP 03:
// then ab simple ek simple class banayenge, name de dete h "service"
export class Service {
  // STEP : 06
  // Ab hum 2 property bana lete hai
  // 1. Client     2.Databases    3.bucket

  // 01- ab jaise auth.js me client banaya tha waise hi, new client bana lete h
  client = new Client();
  // ab pichli baar humne account liya tha,
  // 02/03- but abhi Databases lenge, and bucket
  databases;
  bucket; // bucket used hua - for file upload

  // STEP : 07
  // const service = new Service();
  // Jab ye object koi banega "service",tab mere pass ye client banana chahiye
  // and tab properly database, bucket ka access milna chahiye.

  // INTERVIEW :
  //To jab ye object "service" banega, tab kon sa method hai, jo apne app call hoga
  // wo hai constructor(), to mai isske andr apni saari functionality rakhunga.

  // constructor Bana lete hai:-
  // AuthService() jab call hoga, then new object banega , and
  // using constructor , contructor hmesha call hoga.

  // Actually me account kab banna chahiye, jab constructor call hoga.
  // to ye raha constructor and isska call () aa gya
  constructor() {
    // ab yaha exactly jaise auth.js file me kiya tha same yaaha bhi kar do

    // STEP : 08
    // constructor ke ander mai,client ka reference dunga using "this" Keyword
    this.client
      // Ab mai,isske ander saare method use kr skta hu
      // Link:-https://appwrite.io/docs/products/auth/email-password
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    //Now, Abb this.client ke ander appwriteUrl, appwriteProjectId ki value aa gayi h.

    // Now, Ab jo uppar databases ki value hai ussko access krenge using "this", and ek new object banayenge database ka using new keyword.
    // and this.client ki value pass kr denge database me.
    this.databases = new Databases(this.client);
    // aur ab bucket bhi
    this.bucket = new Storage(this.client);
  }

  // STEP : 09
  // Now, Ab hum ek chota sa method banayenge....createPost
  // and destructure kr lenge title,slug,content ..etc
  // Post create krne ke liye meri kuch requirement hai,
  // Aap mujhe title, slug, content, featuredImage, status , userId doge..ye sab hum user se le rahe hai.
  // post create krte time kuch error bhi aa skte hai, so hum try-catch ka use kr lenge.
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      // now post kaise create hota hai..kuch nahi
      // this.database.createDocument use krenge
      // now, ab creatDocuemnt ky ky value pass hoga wo dekho
      return await this.databases.createDocument(
        // ab yaha hum
        // Link [Create Document]:https://appwrite.io/docs/references/cloud/client-web/databases
        //[DATABASE_ID], [COLLECTION_ID],[DOCUMENT_ID],Object
        // ye sab value pass kr denge.
        conf.appwriteDatabaseId, // [DATABASE_ID]
        conf.appwriteCollectionId, // [COLLECTION_ID]
        slug, // [DOCUMENT_ID] - mai slug ko hi bol raha hu.
        // Now last mujhe chahiye object, isske ander jo further information h issme pass kr do.
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      // yaha error ko hum console log kr lete h
      console.log("Appwrite serive :: createPost :: error", error);
    }
  }

  // STEP : 10
  // Now, Uppar create post to hogya, now agar post update krna padd gya to
  // and destructure kr lenge title,slug,content ..etc
  // same uppar jaise..
  async updatePost(slug, { title, content, featuredImage, status }) {
    // ab ye failed bhi ho skta hai issliye try-catch use kr lenge
    try {
      // ab yaha bhi woohi same jo bhi value aayegi ussko return kr denge.
      // updateDocument() ek method hai usska use krenge
      return await this.databases.updateDocument(
        // ab yaha hum
        // Link [Create Document]:https://appwrite.io/docs/references/cloud/client-web/databases
        //[DATABASE_ID], [COLLECTION_ID],[DOCUMENT_ID],Object
        // ye sab value pass kr denge.
        conf.appwriteDatabaseId, // [DATABASE_ID]
        conf.appwriteCollectionId, // [COLLECTION_ID]
        slug, // [DOCUMENT_ID] - mai slug ko hi bol raha hu.
        // Now last mujhe chahiye object, isske ander jo further information h issme pass kr do.
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {}
  }

  // STEP : 11
  // Ab hum delete post ek method banayenge.
  // yaha slug as paramter le rahe h
  async deletePost(slug) {
    try {
      // same jaise uppar kiye hai , waise hi step rahega.
      // and deleteDocument() ek method hai.
      await this.databases.deleteDocument(
        // ab yaha hum
        // Link [Create Document]:https://appwrite.io/docs/references/cloud/client-web/databases
        //[DATABASE_ID], [COLLECTION_ID],[DOCUMENT_ID],Object
        // ye sab value pass kr denge.
        conf.appwriteDatabaseId, // [DATABASE_ID]
        conf.appwriteCollectionId, // [COLLECTION_ID]
        slug // [DOCUMENT_ID] - mai slug ko hi bol raha hu.
      );
      // kyuki hmne await use kiya tha, to ab yaha pe hum
      // conform kr dete hai "true" bhej kr ki value delete ho gya hai
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
      return false;
    }
  }

  // STEP : 12
  // Now, Suppose karo mujhe sirf 1 post chahiye
  // yaha slug as paramter le rahe h
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        // ab yaha hum
        // Link [GET Document]:https://appwrite.io/docs/references/cloud/client-web/databases
        //[DATABASE_ID], [COLLECTION_ID],[DOCUMENT_ID],Object
        // ye sab value pass kr denge.
        conf.appwriteDatabaseId, // [DATABASE_ID]
        conf.appwriteCollectionId, // [COLLECTION_ID]
        slug // [DOCUMENT_ID] - mai slug ko hi bol raha hu.
      );
    } catch (error) {
      console.log("Appwrite serive :: getPost :: error", error);
      return false;
    }
  }

  // STEP: 13
  // Now , ab mujhe sirf wo post chahiyhe jiska status "active" h
  // to query wagera use krna hoga (Simple hai, issme dekh lo)
  // ab wohi async use krenge
  // yaha "queries" variable name hai.
  // and ye queries hum pass kr rahe hai "queries = [Query.equal("status", "equal")]"
  // inside queries hum value passwd kar rahe h, ki queries hai
  // and mujhe equal waala sirf chahiye, and status - equal honi chahiye.
  async getPosts(queries = [Query.equal("status", "equal")]) {
    // https://appwrite.io/docs/products/databases/queries
    try {
      // jaise uppar se krte aa rahe h, waise hi krna h
      // bss yaha ab hum listDocuments () method use krenge
      return await this.databases.listDocuments(
        // ab yaha hum
        // Link [GET Document]:https://appwrite.io/docs/references/cloud/client-web/databases
        //[DATABASE_ID], [COLLECTION_ID],[DOCUMENT_ID],Object
        // ye sab value pass kr denge.
        conf.appwriteDatabaseId, // [DATABASE_ID]
        conf.appwriteCollectionId, // [COLLECTION_ID]
        // Method : 01aur yaha queries fill kr diye, and yaha jo uppar value queries ka use kiya hu, wo yaha use kr liye hai.
        queries
        // Mthod 02: Queries Write (aise bhi hum use kr skte the)
        //[Query.equal("status", "active")]
      );
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false;
    }
  }

  // STEP: 14
  // Part - 02 : File upload service
  // Link : https://appwrite.io/docs/references/cloud/client-web/storage
  // File upload waala ek method bana lete hai.
  // Note: upload file krte time, hume file deni padegi
  async uploadFile(file) {
    try {
      // directly return kr denge Saari value. then await krke hum le lenge saari value.
      // Ab mujhe bucket ka access chahiye, toh hum using "this" keyword se access kr lenge bucket ko.
      // then , createFile() method ka use kr lenge , for creating a file
      // kyuki async hai , to await use krna hoga.
      return await this.bucket.createFile(
        // Ab bucket id
        conf.appwriteBucketId,
        // Ab unique Id de do, ye uppar import kr rakhe hai
        ID.unique(),
        // ab 3rd parameter jo hoga wo File hota h
        file
        // bas itna hi kaam h
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }

  // STEP : 15
  // Ab file delete waala method bana lete hai
  // delete krte time , aapko file ki id (fileId) dena hoga.
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(
        // isske ander, bucket ki Id pass kr di humne
        conf.appwriteBucketId,
        // and file ki id pass kr di....Bas simple
        fileId
      );
      // and file delete ho gayi hai, to return true kr dete hai.
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      // return false kr diye , ki bhai file delete ni ho paayi
      return false;
    }
  }

  // STEP : 16
  // Ab ek aur service hum bana lete hai, file Preview ka
  // file preview krne ke liye, hume file ki id deni padegi.
  getFilePreview(fileId) {
    // then, directly pura ka pura jo bhi value/file aayega return kr denge.
    // Bucket ko access krne ke liye "this" keyword ka use kr lenge.
    // then, getFilePreview() method ka use kr lenge.
    return this.bucket.getFilePreview(
      // iss method ke ander
      // 1. BucketId de do
      conf.appwriteBucketId,
      // 2. File ki Id de do
      fileId
    );
  }
}

// STEP : 05
//Note: step 04: me service ko export krne me,itta koi sense hai ni.
// Kyuki,agar hum uss service ka object nikal kar de dete hai, to directly value hume mil jaayegi.
// Toh humne serive ka , ek object bana liya Service() using "new" keyword.
// Service() - ye mera new object hai service ka.
// and ye "service" ko hum export kr denge.... taaki bana banaya hi object hum directly de de.
const service = new Service();
// Now,
// Ab kyuki "new" keyboard ka use krke service wagera bannai h, to obvioussly constructor wagera banega hi banega.

// STEP : 04
// Ab Service class jo uppar bani h ussko directly export kr dete hai.
export default service;
