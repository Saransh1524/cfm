import React, { useContext } from 'react';
import {  useState } from "react";
import Image from 'next/image';
import { getFirestore } from "firebase/firestore";
import { useSession } from 'next-auth/react';
import { doc, setDoc } from "firebase/firestore";
import  app  from "../../Config/FirebaseConfig.js";
import { ShowToastContext } from '../../context/ShowToastContext.js';
import { ParentFolderIdContext } from '../../context/ParentFolderIdContext.js';

function CreateFolderModal() {
    const docId = Date.now().toString();
    const {data:session} = useSession();
    const db = getFirestore(app);
    const {ShowToastMsg, setShowToastMsg} = useContext(ShowToastContext);
    const {ParentFolderId, setParentFolderId} = useContext(ParentFolderIdContext)
    const [folderName,setFolderName]=useState();
    const onCreate= async()=>{
        console.log(folderName)
        await setDoc(doc(db,"Folders",docId),{
            name:folderName,
            id: docId,
            createdBy: session.user.email,
            ParentFolderId : ParentFolderId
        })
        setShowToastMsg('Folder Created!')
    }
  return (
     
    <form method="dialog" className="modal-box p-8 items-center">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
        ✕
      </button>
      <div className="w-full items-center 
      flex flex-col justify-center gap-3">
        <Image src="/folder.png" alt="folder" width={50} height={50} />
        <input
          type="text"
          placeholder="Folder Name"
          className="p-2 border-[1px] outline-none
              rounded-md"
              onChange={(e)=>setFolderName(e.target.value)}
        />
        <button className="bg-blue-500
        text-white rounded-md p-2 px-3 w-full"
        onClick={()=>onCreate()}
        >Create</button>
      </div>
    </form>
  
  )
}

export default CreateFolderModal