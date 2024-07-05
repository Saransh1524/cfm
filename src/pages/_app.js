import { SessionProvider } from "next-auth/react"
import SideNavBar from "../../components/SideNavBar"
import '../styles/globals.css';
import Toast from "../../components/Toast";
import { ShowToastContext } from "../../context/ShowToastContext";
import { useState } from "react";
import { ParentFolderIdContext } from "../../context/ParentFolderIdContext";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [ShowToastMsg, setShowToastMsg] = useState();
  const [ParentFolderId, setParentFolderId] =  useState();
  return (
    <SessionProvider session={session}>
      <ParentFolderIdContext.Provider value={{ParentFolderId,setParentFolderId}}>
      <ShowToastContext.Provider value={{ShowToastMsg, setShowToastMsg}}>
      <div className="flex">
      <SideNavBar/>
      <div className="grid grid-cols-1 md:grid-cols-3 w-full ">
      <div className="col-span-2 bg-sky-200">
      <Component {...pageProps} /></div>
      <div className="bg-white p-5">Storage</div>
      </div>
      </div>
      {ShowToastMsg?<Toast msg = {ShowToastMsg}/>:null}
      </ShowToastContext.Provider>
      </ParentFolderIdContext.Provider>
    </SessionProvider>
  )
}