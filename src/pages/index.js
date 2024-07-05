//import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
// const inter = Inter({ subsets: ['latin'] })
// import { query } from 'firebase/firestore';
import SearchBar from "../../components/SearchBar";
import FolderList from "../../components/Folder/FolderList";
import FileList from "../../components/File/FileList";
import { ParentFolderIdContext } from "../../context/ParentFolderIdContext";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import app from "../../Config/FirebaseConfig";
import { ShowToastContext } from "../../context/ShowToastContext";
export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const db = getFirestore(app);
  const [folderList,setFolderList]=useState([])
  const [fileList,setFileList]=useState([])
  const {showToastMsg , setShowToastMsg} = useContext(ShowToastContext)
  const {ParentFolderId, setParentFolderId} =  useContext(ParentFolderIdContext);
  useEffect(() => {
    if (!session) {
      router.push("/Login");
    } else {
      
      getFolderList();
      getFileList();
      console.log('user session' , session)
     
    
    }
    setParentFolderId(0);
  }, [session,showToastMsg]);

  const getFolderList = async () => {
    setFolderList([])
    const q = query(
      collection(db, "Folders"),

      where("createdBy", "==", session.user.email)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      setFolderList(folderList=>([...folderList,doc.data()]))
    });
  };


  const getFileList = async () => {
    setFileList([])
    const q = query(
      collection(db, "files"),
      where("ParentFolderId", "==" ,0),
      where("createdBy", "==", session.user.email)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      setFileList(fileList=>([...fileList,doc.data()]))
    });
  };
  return (
    <>
      <SearchBar></SearchBar>
      <FolderList folderList={folderList} />
      <FileList fileList= {fileList}/>
    </>
  );
}
