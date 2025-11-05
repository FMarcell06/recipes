import axios from "axios";
import { db } from "./firebaseApp";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import imageCompression from "browser-image-compression";

const apiKey = import.meta.env.VITE_IMGBB_API_KEY
const imgbbUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`

const uploadToImgBB = async(file)=>{
    const formData = new FormData()
    formData.append("image",file)
    try {
        const resp = await axios.post(imgbbUrl,formData)
        const {url,delete_url} = resp.data.data
        return {url, delete_url}
    } catch (error) {
        console.log("Képfeltöltési hiba: " + error);

        
    }
}

export const addRecipe = async(recipe,file)=>{
    try {
        let imageUrl= ""
        let deleteUrl = ""
        const compressed=await imageCompression(file,{maxWidthOrHeight:800,useWebWorker:true})
        const results = await uploadToImgBB(compressed)
        if(results){
            imageUrl= results.url
            deleteUrl = results.delete_url
            
            const collectionref = collection(db, "recipes")
            await addDoc(collectionref, {...recipe, imageUrl, deleteUrl, timestamp:serverTimestamp()})
        }
        console.log("Siker");
        
    } catch (error) {
        console.log("Nem sikreült hozzáadni! " + error);
        
    }
}