import React from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ParentFolderIdContext } from '../../context/ParentFolderIdContext';
import { useContext } from 'react';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import app from '../../Config/FirebaseConfig';
import { ShowToastContext } from '../../context/ShowToastContext';
import { getStorage, ref } from "firebase/storage";
import { uploadBytes } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';
function UploadFileModal({ closeModal }) {
    const storage = getStorage(app);
    
    const { data: session } = useSession();
  const { ParentFolderId, setParentFolderId } = useContext(
    ParentFolderIdContext
  );
  const { showToastMsg, setShowToastMsg } = useContext(ShowToastContext);
  const docId = Date.now();
  const db = getFirestore(app);
  const onFileUpload = async (file) => {
    const fileRef = ref(storage, 'file/' + file.name);

    uploadBytes(fileRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      }).then(resp=> {
        getDownloadURL(fileRef).then(async (downloadURL) => {
            console.log('File available at', downloadURL);
            console.log("File", file);
            await setDoc(doc(db,"files",docId.toString()),{
                name:file.name,
                type:file.name.split('.')[1],
                size:file.size,
                id:docId,
                createdBy:session.user.email,
                ParentFolderId:ParentFolderId,
                imageUrl :downloadURL
            })
          });
      }) 
    closeModal(true);
    setShowToastMsg("File Uploaded Successfully!");
  }
  return (
    <div>
    <form method="dialog" className="modal-box p-9 items-center w-[360px]">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
        ✕
      </button>
      <div
        className="w-full items-center 
      flex flex-col justify-center gap-3"
      >
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={(e) => onFileUpload(e.target.files[0])}
            />
          </label>
        </div>
      </div>
    </form>
  </div>
  )
}

export default UploadFileModal