import React from 'react'
import FolderItem from './FolderItem'
import { useState } from 'react'
import { useRouter } from 'next/router';
import { deleteDoc,doc } from 'firebase/firestore';
import { useContext } from 'react';
import { ShowToastContext } from '../../context/ShowToastContext';
import { getFirestore } from 'firebase/firestore'
import app from '../../Config/FirebaseConfig';
function FolderList({folderList}) {
  const db = getFirestore(app);
  const {ShowToastMsg , setShowToastMsg} = useContext(ShowToastContext);
    const router = useRouter();
    const [activeFolder, setActiveFolder] = useState();
    const onFolderClick = (index, item) => {
        setActiveFolder(index);
        router.push({
            pathname: `/folder/${item.id}`,
            query: {
              name: item.name,
              id: item.id,
            },
        })
    }
  


const deleteFolder = async (item) => {
  await deleteDoc(doc(db,"Folders",item.id.toString())).then(resp => {
          setShowToastMsg('Folder Deleted!!')
          if(item.ParentFolderId !=0){
            router.push(`/folder/${item.ParentFolderId}`)
          }
          else{
            router.push(`/`)
          }
  })
}

  return (
    <div className='p-5 mt-5 mr-2 ml-2 bg-white rounded-lg'>
        <h2 className='text-[17px] font-bold items-center text-black'>Recent Folders
            <span className='float-right text-blue-400 font-normal text-[13px]'>View All</span>
        </h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-3 gap-4'>
            {folderList.map((item,index) => {return(
                <div onClick={() => {onFolderClick(index, item)
                                    
                }} key = {index}>
              <FolderItem folder={item} activeFolder = {activeFolder === index} />
              <div onClick={()=>deleteFolder(item)}> <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 float-right text-red-500
           hover:scale-110 transition-all"
          >
            <path 
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg></div>
                </div>)
            })}
        </div>
    </div>
  )
}

export default FolderList