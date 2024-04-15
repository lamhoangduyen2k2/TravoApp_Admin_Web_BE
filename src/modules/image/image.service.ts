import { Service } from "typedi";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { giveCurrentDateTime } from "../../helpers/ultil";

@Service()
export class ImageService {
    public uploadImage = async (file: Express.Multer.File) => {
        const storage = getStorage();

        const dateTime = giveCurrentDateTime();

        const storageRef = ref(storage, `images/${file.originalname}-${dateTime}`);

        //Create file metadata including the content type  
        const metadata = {
            contentType: file.mimetype
        };

        //Upload the file in the bucket storage
        const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);

        const downloadURL = await getDownloadURL(snapshot.ref);

        return downloadURL;
    }
}