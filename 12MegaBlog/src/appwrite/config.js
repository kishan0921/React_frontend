import conf from "../conf/conf";

// iss baar aap appwrite se Databases, storage,Query bhi le skte hai.
import  {Client,ID, Databases,Storage,Query} from "appwrite";


// then ab simple ek class banayenge
export class Service{
    // ab jaise auth.js me client banaya tha waise hi, new client bana lete h
    client = new Client();
    // ab pichli baar humne account liya tha, 
    // but abhi Databases lenge, and bucket
    databases;
    bucket;

    // Actually me account kab banna chahiye, jab constructor call hoga.
    // to ye raha constructor and isska call () aa gya
    constructor(){
        // ab yaha exactly jaise auth.js file me kiya tha same yaaha bhi kar do
         this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        // Now, Ab jo uppar databases hai ussko bhi fill krna hoga.
        this.databases = new Databases(this.client);
        // aur ab bucket bhi 
        this.bucket = new Storage(this.client);
    }


    // Now, Ab hum ek chota sa method banayenge....createPost 
    // and destructure kr lenge title,slug,content ..etc
    async createPost({title,slug, content, featuredImage,status,userId}){
        try {
            // now post kaise create hota hai..kuch nahi 
            // this.database.createDocument use krenge
            // now, ab creatDocuemnt ky ky value pass hoga wo dekho
            return await this.databases.createDocument(
                // ab yaha hum 
        //[DATABASE_ID], [COLLECTION_ID],[DOCUMENT_ID], then object
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            // Now last mujhe chahiye object, isske ander jo further information h issme pass kr do.
            {
                title,
                content,
                featuredImage,
                status,
                userId
            }
            )
        } catch (error) {
            // yaha error ko hum console log kr lete h
            console.log("Appwrite serive :: createPost :: error", error)
        }
    }



    // Now, Uppar create post to hogya, now agar post update krna padd gya to
    // and destructure kr lenge title,slug,content ..etc
    // same uppar jaise..
    async updatePost(slug,{title, content, featuredImage,status}){
        // ab ye failed bhi ho skta hai issliye try-catch use kr lenge
        try {
            // ab yaha bhi woohi same jo bhi value aayegi ussko return kr denge.
            // updateDocument() ek method hai usska use krenge
            return await this.databases.updateDocument(
            // ab yaha hum 
            //[DATABASE_ID], [COLLECTION_ID],[DOCUMENT_ID], then object
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }

            )

            
        } catch (error) {
            
        }
    }



    // Ab hum delete post ek method banayenge.
    // yaha slug as paramter le rahe h
    async deletePost(slug){
        try {
            // same jaise uppar kiye hai , waise hi step rahega.
            // and deleteDocument() ek method hai.
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error)
            return false
        }
    }


    // Now, Suppose karo mujhe sirf 1 post chahiye
    // yaha slug as paramter le rahe h
    async getPost (slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }


    // Now , ab mujhe sirf wo post chahiyhe jiska status active h
    // to query wagera use krna hoga

}

// Ab kyuki "new" keyboard ka use krke service wagera bannai h, to constructor bana hi padega



// Ab ek object bana lete hai...using new keyword
const service = new Service()

// Ab Service class jo uppar bani h ussko export kr dete hai.
export default service

