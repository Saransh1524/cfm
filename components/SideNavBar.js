import React from "react";
import Image from "next/image";
import menu from "../data/menu";
import { useState } from "react";
import CreateFolderModal from "./Folder/CreateFolderModal";
import UploadFileModal from "./File/UploadFileModal";
function SideNavBar() {
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [isUploadFileModalVisible, setIsUploadFileModalVisible] = useState(false);

  const openUploadFileModal = () => {
    setIsUploadFileModalVisible(true);
  };

  const closeUploadFileModal = () => {
    setIsUploadFileModalVisible(false);
  };

  const onMenuClick = (item, index) => {
    setActiveIndex(index);
  };
  return (
    <div className="w-[200px] h-screen bg-white sticky top-0 z-10 shadow-blue-200 shadow-md p-2">
      hello
      <div className="flex flex-col justify-center items-center">
        <Image
          src="/logo.png"
          alt="logo"
          width={150}
          height={60}
          className="mt-0"
        />
        <div className="text-black">Cloudify</div>
      </div>
      <button
        className="flex gap-2 items-center bg-blue-500 p-2 text-white text-[15px] rounded-md px-3 hover:scale-105 transition-all mt-5 w-full justify-center"
        onClick={()=>window.upload_file.showModal()}
      >
        Add New File{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
      {/* <div className="justify-center align-top">{isUploadFileModalVisible && (
        <UploadFileModal onClose={closeUploadFileModal} />
      )}</div> */}
      

      <button
        className="flex gap-2 items-center bg-sky-400 p-2 text-white text-[15px] rounded-md px-3 hover:scale-105 transition-all mt-2 w-full justify-center"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        New Folder{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
      <div>
        {menu.list.map((item, index) => (
          <h2
            key={index}
            onClick={() => onMenuClick(item, index)}
            className={`flex gap-2 items-center
            p-2 mt-3 text-gray-400 rounded-md cursor-pointer
            hover:bg-blue-500 hover:text-white
            ${activeIndex == index ? "bg-blue-500 text-white" : null}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d={item.logo}
              />
            </svg>
            {item.name}
          </h2>
        ))}
      </div>
      <button className="btn"></button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-action">
          <CreateFolderModal />
        </div>
      </dialog>

      <dialog id="upload_file" className="modal">
        <div className="modal-action">
          <UploadFileModal   closeModal={()=>window.upload_file.close()}/>
        </div>
      </dialog>
    </div>
  );
}

export default SideNavBar;
