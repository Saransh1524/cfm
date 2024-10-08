import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import app from '../../Config/FirebaseConfig'
import { useSession } from 'next-auth/react'
import StorageSize from '../../Services/StorageSize';

function StorageInfo() {
  const { data: session } = useSession();
  const db = getFirestore(app);
  const [totalSizeUsed, setTotalSizeUsed] = useState(0);
  const [imageSize, setImageSize] = useState(0);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (session) {
      getAllFiles();
    }
  }, [session]);

  useEffect(() => {
    setImageSize(StorageSize.getStorageByType(fileList, ['png', 'jpg']));
  }, [fileList]);

  const getAllFiles = async () => {
    const q = query(collection(db, "files"), where("createdBy", "==", session.user.email));
    const querySnapshot = await getDocs(q);
    const files = [];
    let totalSize = 0;
    
    querySnapshot.forEach((doc) => {
      const fileData = doc.data();
      totalSize += fileData['size'];
      files.push(fileData);
    });

    setFileList(files);
    setTotalSizeUsed((totalSize / 1024 ** 2).toFixed(2) + " MB");
  };

  return (
    <div className='mt-7'>
      <h2 className="text-[22px] font-bold text-black">
        {totalSizeUsed} {" "}
        <span className="text-[14px] font-medium">
          used of{" "}
        </span>{" "}
        50 MB
      </h2>
      <div className='w-full bg-gray-200 h-2.5 flex'>
        <div className='bg-blue-600 h-2.5' style={{ width: `${(totalSizeUsed / 50) * 100}%` }}></div>
        <div className='bg-green-600 h-2.5 w-[35%]'></div>
        <div className='bg-yellow-400 h-2.5 w-[15%]'></div>
      </div>
    </div>
  );
}

export default StorageInfo;
