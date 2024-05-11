"use client"

import { getMessages } from "@/app/lib/data";
import { createMessage } from "@/app/lib/actions";
import { PhotoIcon, PaperAirplaneIcon, XMarkIcon, CheckCircleIcon, ExclamationTriangleIcon, TrashIcon, EllipsisVerticalIcon} from "@heroicons/react/24/outline"
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import moment from "moment";
import { refreshPage } from "@/app/lib/actions";
import { postImage } from "@/app/lib/actions";
import Image from "next/image";
import CreateDisputeForm from "../../disputes/createDisputeForm";

const ChatSection = ({trade, userId, messages = []}: {trade: any, userId: string | undefined, messages: any[] | undefined}) => {
  const pathname = usePathname();
  const [message, setMessage] = useState({
    severity: "",
    message: ""
  });
  const [postingData, setPostingData] = useState(false);
  const [showCreateDisputeForm, setShowCreateDisputeForm] = useState(false);
  const [commentData, setCommentData] = useState({
    senderId: "",
    receiverId: "",
    resourceId: "",
    resourceUrl: "",
    message: ""
  });
  const [value, setValue] = useState(22)

  const [fileUrl, setFileUrl] = useState("");
  const [file, setFile] = useState({name: "", size: "", type: ""})
  const [isSendingFile, setIsSendingFile] = useState(false);
  const inputFileRef = useRef(null);
  //const [open, setOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");


  const openImagePreview = (imageUrl: string) => {
    //document.getElementById("modalImageBtn")?.click();
    setModalImage(imageUrl)
  }

  const createFileUrl = () => {
    const fileInput: any = inputFileRef?.current;
    if (fileInput?.files[0]) {
      setFile(fileInput?.files[0]);
      setFileUrl(URL.createObjectURL(fileInput?.files[0]));
    } else {
      setFileUrl("");
      setFile({name: "", size: "", type: ""});
    }
  }

  const handleClickUploadImageIcon = () =>{
    const fileInput: any = inputFileRef?.current;
    fileInput?.click();
  }

  const cancelImage = () =>{
    setFileUrl("");
    setFile({name: "", size: "", type: ""})
  }


  const receiver = () =>{
    return trade?.buyerId === userId ? trade?.seller : trade?.buyer
  }

  
  useEffect(()=>{
    setCommentData( prevState =>({
      ...prevState,
      senderId: userId || "",
      receiverId: receiver()?.id || "",
      resourceId: trade?.id || "",
      resourceUrl: pathname,
    }))
  },[pathname, trade, userId])

  /* useEffect(()=>{
    let interval = setInterval( ()=>refreshPage(pathname), 10000)
    return ()=>clearInterval(interval)
  }, []) */

  const handleChangeMessage = (e: any) =>{
    setCommentData( prevState => ({
      ...prevState,
      message: e?.target?.value
    }))
  }

  const clearComment = () => {
    setCommentData( prevState => ({
      ...prevState, 
      message: ""
    }))
  }

  const postFile = async (filename: any, file: any) =>{
    const response = await fetch(
      `/api/upload?filename=${filename}`,
      {
        method: 'POST',
        body: file,
      },
    );
    const newBlob = await response.json();
    console.log(newBlob.url);
    return newBlob.url
  }


  const handleSubmit = async()=>{
    let data = {...commentData};
    
    if(file?.name){
      setIsSendingFile(true);
      const fileUrl = await postFile(file.name, file)
      data.message = fileUrl;
      setIsSendingFile(false);
      cancelImage();
    }
    if(!data?.message){
      return;
    }
    setPostingData(true)
    const res = createMessage(data).then( res =>{
      setPostingData(false);
      console.log(res)
      clearComment();
    }).catch(error =>{
      setPostingData(false)
      console.log(error)
      setMessage({
        severity: "error",
        message: error.message
      })
    })
  }


  return (
    <div className="flex flex-col h-full">
      {message?.severity === "success" &&
        <div role="alert" className="alert bg-green-200 absolute top-14 right-5 w-[350px] rounded-lg px-2">
          <CheckCircleIcon className="w-4" />
          <span>{message?.message}</span>
          <button className="btn btn-xs btn-circle bg-transparent border-none" onClick={() => setMessage({
            severity: "",
            message: ""
          })}> <XMarkIcon className="w-4" /> </button>
        </div>}
      {message?.severity === "error" &&
        <div role="alert" className="alert bg-red-200 absolute top-14 right-5 w-[350px] rounded-lg px-2">
          <ExclamationTriangleIcon className="w-4" />
          <span>{message.message}</span>
          <button className="btn btn-xs btn-circle bg-transparent border-none" onClick={() => setMessage({
            severity: "",
            message: ""
          })}> <XMarkIcon className="w-4" /> </button>
        </div>}

      <header className='p-3 bg-neutral flex items-center'>
        <div className="flex items-center gap-3 mb-auto">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img className='rounded-full' src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt='placeholder user' />
            </div>
          </div>
          <div>
            <div className="font-bold capitalize">{receiver()?.firstName} {receiver().lastName}</div>
            <div className="text-xs opacity-50">{receiver().username || receiver().email}</div>
          </div>
        </div>

        <span className="countdown font-mono text-xl mx-auto">
          <span style={{ "--value": 10 }}></span>:
          <span style={{ "--value": 24 }}></span>:
          <span style={{ "--value": 22 }}></span>
        </span>

        {!trade?.dispute &&
        <div className="dropdown dropdown-end ml-auto">
          <div tabIndex={0} role="button" className="m-1"> <EllipsisVerticalIcon className="w-7" /></div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white w-64">
            <li ><a className="text-accent font-semibold" onClick={()=>setShowCreateDisputeForm(true)}>Raise Dispute <ExclamationTriangleIcon className="w-6 ml-auto" /></a></li>
            {trade?.sellerId === userId && <li ><a className="rounded-lg text-green-700 font-semibold" > I Have Sent Giftcard <CheckCircleIcon className="w-6 ml-auto" /></a></li>}
          </ul>
        </div>}

        <label htmlFor="trade-chat-drawer" className="btn btn-circle btn-sm ml-auto lg:hidden">
          <XMarkIcon className="w-4" />
        </label>
      </header>

      <section className='grow h-auto p-3 overflow-y-auto'>
        {messages.map(item => {
          return item?.senderId === userId ?
            <div className="chat chat-end" key={item?.id}>
              <div className="chat-bubble bg-primary text-white text-sm flex items-center font-semibold">
                {item?.message.includes("public.blob.vercel-storage.com") ?
                <img src={item?.message} className="max-h-40" alt="Preview file" onClick={()=>openImagePreview(item?.message)} /> :
                item?.message
                }
              </div>
              <div className="chat-footer opacity-50">
                <time className="text-xs opacity-70">{moment(item?.createdAt).format('lll')}</time>
              </div>
            </div> :
            <div className="chat chat-start" key={item?.id}>
                <div className="chat-bubble bg-white text-base-content text-sm flex items-center font-semibold">
                  {item?.message.includes("public.blob.vercel-storage.com") ?
                  <img src={item?.message} className="max-h-40" alt="Preview file" onClick={()=>openImagePreview(item?.message)} /> :
                  item?.message
                  }
                </div>
              <div className="chat-footer opacity-50">
                <time className="text-xs opacity-70">{moment(item?.createdAt).format('lll')}</time>
              </div>
            </div>
            
        })}
        {modalImage &&
        <dialog id="modalImage" className="modal" style={{background: "rgba(0,0,0,0.5)"}} open>
          <div className="modal-box">
            <p className="py-4">
              <img src={modalImage} className="mx-auto" alt="Preview file" />
            </p>
            <div className="modal-action">
              <button className="btn" onClick={()=>setModalImage("")}>Close</button>
            </div>
          </div>
        </dialog>}
      </section>

      <section className='bg-neutral pb-3 mt-auto'>
        {showCreateDisputeForm && <CreateDisputeForm userId={userId || ""} trade={trade} closeForm={()=>setShowCreateDisputeForm(false)} />}

        {!showCreateDisputeForm &&
          <>
            {fileUrl ?
              <div className="flex flex-col mt-3">
                <header className="flex items-center px-3 mb-3">
                  <h6 className=" font-semibold">Preview Image</h6>
                  <button type="button" className="btn btn-sm btn-circle bg-transparent ml-auto" onClick={handleSubmit}>
                    {postingData ? <span className="loading loading-spinner loading-xs"></span> : <PaperAirplaneIcon className="w-5 text-green-700" />}
                  </button>
                  <button type="button" className="btn btn-sm btn-circle bg-transparent ml-3" onClick={cancelImage}>
                    <TrashIcon className="w-5 text-red-700" />
                  </button>
                </header>
                <img src={fileUrl} className=" max-h-40 mx-auto" alt="Preview file" />
              </div> :
              <div className='w-full m-0 flex items-center mt-3'>
                <button type="button" onClick={handleClickUploadImageIcon} className='btn btn-circle btn-link text-primary glass mr-2'>
                  <PhotoIcon className='w-6' />
                </button>
                <input ref={inputFileRef} accept="image/*" className="hidden" onChange={createFileUrl} type="file" id="imageUpload" name="imageUpload"></input>
                <label className="input focus:outline-none bg-base flex items-center gap-2 px-0 w-full mr-1">
                  <textarea className="textarea border-none border-gray-400 focus:outline-none rounded-lg w-full bg-transparent" value={commentData?.message} onChange={handleChangeMessage} rows={1} placeholder="Type a message ..."></textarea>
                  <button type="button" disabled={postingData} className='btn btn-circle bg-primary text-white' onClick={handleSubmit}>
                    {postingData ? <span className="loading loading-spinner loading-xs"></span> : <PaperAirplaneIcon className='w-4' />}
                  </button>
                </label>
              </div>
            }
          </>
        }
        
        
      </section>
      
      
    </div>
  )
}

export default ChatSection