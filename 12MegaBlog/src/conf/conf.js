

// Sabse pehle 1 constant banayenge conf
const conf = {
    // ab hum key , value ke form me fields likhange.
    // appwriteUrl : milega hmesha String ke form me
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    // fir project Id le lete h
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    // fir database Id le lete h
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    // fir Collection Id le lete h
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    // Fir bucket Id le lete h
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}


// and AB export bhi kr lenge issko 
export default conf



