import { db } from './firebase'; // Ensure path is correct
import { collection, doc, setDoc } from "firebase/firestore";
// IMPORTANT: Check if you used 'export const data' or 'export default' in data.js
import { data } from './data'; 

export const uploadData = async () => {
  // Safety check: Is the data actually there?
  if (!data) {
    console.error("❌ Error: 'data' is undefined. Check your import in seed.js");
    return;
  }

  try {
    console.log("🚀 Starting upload of", data.length, "items...");
    
    for (const item of data) {
      // We use String(item.id) to ensure the Firestore ID is a string
      const docId = item.id ? String(item.id) : doc(collection(db, "Rooms")).id;
      await setDoc(doc(db, "Rooms", docId), item);
      console.log(`✅ Uploaded: ${docId}`);
    }
    
    console.log("🏁 All data uploaded successfully!");
  } catch (error) {
    console.error("❌ No No Error uploading data:", error);
  }
};
