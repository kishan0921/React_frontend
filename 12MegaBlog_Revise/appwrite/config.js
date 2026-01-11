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


    // Now , ab mujhe sirf wo post chahiyhe jiska status "active" h
    // to query wagera use krna hoga
    // ab wohi async use krenge
    // yaha "queries" variable name hai. 
    // inside queries hum value passwd kar rahe h, ki queries hai 
    // and mujhe equal waala sirf chahiye, and status - equal honi chahiye.
    async getPosts (queries = [Query.equal('status', "equal")]){
        // https://appwrite.io/docs/products/databases/queries
        try {
            // jaise uppar se krte aa rahe h, waise hi krna h 
            // bss yaha ab hum listDocuments () method use krenge
            return await this.databases.listDocuments(
                // ab yaha hum 
            //[DATABASE_ID], [COLLECTION_ID],[Queries] denge
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            // aur yaha queries fill kr diye, and yaha jo uppar value assigned h wo aayega.
            queries,
            )
            
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }



    // Part - 02 : File upload service 
    // File upload waala ek method bana lete hai.
    async uploadFile (file){
        try {
            // ab file create krna hai, to .createFile() method ka use kr lenge.
            // kyuki async hai , to await use krna hoga.
            return await this.bucket.createFile(
                // Ab bucket id 
                conf.appwriteBucketId,
                // Ab unique Id de do, ye uppar import kr rakhe hai
                ID.unique(),
                // ab 3rd parameter jo hoga wo File hota h
                file
                // bas itna hi kaam h
            )
            
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }


    // Ab file delete waala method bana lete hai
    // delete krte time fileId dena hoga.
    async deleteFile(fileId){

        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }


    // Ab ek aur service hum bana lete hai, file Preview ka
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

    




}

// Ab kyuki "new" keyboard ka use krke service wagera bannai h, to constructor bana hi padega
// Ab ek object bana lete hai...using new keyword
const service = new Service()

// Ab Service class jo uppar bani h ussko export kr dete hai.
export default service

