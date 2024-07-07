import { FirebaseStorage, getDownloadURL, ref, StorageReference, StringFormat, uploadBytes, UploadResult, uploadString, deleteObject } from "firebase/storage";
import { storage } from "../config/firbase.config";
import { Request } from "express";
import { UserRequest } from "../../domain/entities/RequestEntity";
import uuidv4 from "uuidv4"



/**
 * Builds a storage reference for the given Firebase storage instance, parent folder, and file name.
 *
 * @param storage - The Firebase storage instance to use.
 * @param parentFolder - The parent folder path for the storage reference.
 * @param fileName - The name of the file for the storage reference.
 * @returns A storage reference for the specified parent folder and file name.
 */
export const buildStorageReference = (
    storage: FirebaseStorage,
    parentFolder: string,
    fileName: string
) => {
    return ref(storage, `${parentFolder}/${fileName}`);
};

/**
 * Uploads a file as bytes to a storage reference and returns the download URL
 *
 * @param ref - The storage reference to upload the file string to.
 * @param file - The file to upload.
 * @returns The download URL of the uploaded file string.
 */
export const uploadFile = (ref: StorageReference, file: File): Promise<string> => {
    return uploadBytes(ref, file).then((result: UploadResult) => {
        return getDownloadURL(result.ref).then((downloadURL) => downloadURL);
    })
}

export const uploadMulterFile = (ref: StorageReference, file: Express.Multer.File): Promise<string> => {
    return uploadBytes(ref, file.buffer).then((result: UploadResult) => {
        return getDownloadURL(result.ref).then((downloadURL) => downloadURL);
    })
}


export const uploadProfilePicAsMulterfile = async (req: Request) => {
    const ref = buildStorageReference(storage, 'profileImages', `PROFILEPIC-${(req as UserRequest).user.id}.png`);
    const coverPicUrl = await uploadMulterFile(ref, req.file!);
    return coverPicUrl;
}

export const uploadPostMediaAsRowMulterfile = async (file: Express.Multer.File, postId: string) => {
    const ref = buildStorageReference(storage, 'postImages', `IMAGEPIC-${postId}-${uuidv4.uuid()}.png`);
    const postImage = await uploadMulterFile(ref, file);
    return postImage;
}


/**
 * Uploads a file as string to a storage reference and returns the download URL
 *
 * @param ref - The storage reference to upload the file string to.
 * @param str - The string to upload.
 * @returns The download URL of the uploaded file string.
 */
const uploadFromString = (ref: StorageReference, str: string): Promise<string> => {
    const blob = new Blob([str], { type: 'text/plain' });
    return uploadBytes(ref, blob).then((result: UploadResult) => {
        return getDownloadURL(result.ref).then((downloadURL) => downloadURL);
    });
}

/**
 * Uploads a file as string to a storage reference and returns the download URL
 *
 * @param ref - The storage reference to upload the file string to.
 * @param str - The string to upload.
 * @param format - The format of the string to upload the file ('raw', 'base64', 'base64url', 'data_url').
 * @returns The download URL of the uploaded file string.
 */
export const uploadFromStringFormat = (
    ref: StorageReference,
    str: string,
    format: StringFormat
): Promise<string> => {
    return uploadString(ref, str, format).then((result: UploadResult) => {
        return getDownloadURL(result.ref).then((downloadURL) => downloadURL);
    });
}

export const deleteFile = (ref: StorageReference) => {
    return deleteObject(ref);
}

