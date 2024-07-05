import { useRouter } from 'next/router';
import React, { useEffect, useState, useContext } from 'react';
import { ParentFolderIdContext } from '../../../context/ParentFolderIdContext';
import app from "../../../Config/FirebaseConfig";
import SearchBar from '../../../components/SearchBar';
import { useSession } from 'next-auth/react';
import FolderList from '../../../components/Folder/FolderList';
import FileList from '../../../components/File/FileList';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { ShowToastContext } from '../../../context/ShowToastContext';

function FolderDetails() {
  const { data: session } = useSession();
  const router = useRouter();
  const { ParentFolderId, setParentFolderId } = useContext(ParentFolderIdContext);
  const { ShowToastMsg, setShowToastMsg } = useContext(ShowToastContext);
  const db = getFirestore(app);
  const [folderList, setFolderList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const { name, id } = router.query;

  const getFolderList = async (folderId) => {
    if (!folderId) {
      console.error("Invalid folderId:", folderId);
      return;
    }

    try {
      const q = query(
        collection(db, "Folders"),
        where("createdBy", "==", session.user.email),
        where("ParentFolderId", "==", folderId)
      );

      const querySnapshot = await getDocs(q);
      const folders = [];
      querySnapshot.forEach((doc) => {
        folders.push({ id: doc.id, ...doc.data() });
      });
      setFolderList(folders);
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  const getFileList = async (folderId) => {
    if (!folderId) {
      console.error("Invalid folderId:", folderId);
      return;
    }

    try {
      const q = query(
        collection(db, "files"),
        where("ParentFolderId", "==", folderId),
        where("createdBy", "==", session.user.email)
      );

      const querySnapshot = await getDocs(q);
      const files = [];
      querySnapshot.forEach((doc) => {
        files.push({ id: doc.id, ...doc.data() });
      });
      setFileList(files);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    if (id) {
      setParentFolderId(id);
    }
  }, [id, setParentFolderId]);

  useEffect(() => {
    if (session && id) {
      getFolderList(id);
      getFileList(id);
    }
  }, [id, session, ShowToastMsg]);

  return (
    <div className='p-5'>
      <SearchBar />
      <h2 className='text-[20px] font-bold-5'>{name}</h2>
      <FolderList folderList={folderList} />
      <FileList fileList={fileList} />
    </div>
  );
}

export default FolderDetails;
