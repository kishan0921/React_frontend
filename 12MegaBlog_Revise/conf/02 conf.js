// Sabse pehle 1 constant banayenge conf
const conf = {
  // ab hum key , value ke form me fields likhange.
  // appwriteUrl :ki value milega hmesha String ke form me, To string() me value wrap
  // kar diya then, Access kaise krenge value? - import... directly string ke ander paste kr do.
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  // fir project Id le lete h
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  // fir database Id le lete h
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  // fir Collection Id le lete h
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  // Fir bucket Id le lete h
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

// and jo object banaya conf, AB export bhi kr lenge issko
export default conf;
