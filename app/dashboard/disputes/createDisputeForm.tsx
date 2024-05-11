"use client"

import { useEffect, useState, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { createDispute } from "@/app/lib/actions";

const CreateDisputeForm = ({userId, trade, closeForm}: {userId: string, trade: any, closeForm: ()=>void}) =>{

  const [formData, setFormData] = useState({
    userId: "",
    tradeId: "",
    buyerId: "",
    sellerId: "",
    reason: "",
    mediaProofType: "",
    mediaProof: "",
  })
  const [postingData, setPostingData] = useState(false);
  const [message, setMessage] = useState({
    severity: "",
    message: ""
  });

  const [fileUrl, setFileUrl] = useState("");
  const [file, setFile] = useState({name: "", size: "", type: ""})
  const [isSendingFile, setIsSendingFile] = useState(false);
  const inputFileRef = useRef(null);

  useEffect(()=>{
    setFormData( prevState => ({
      ...prevState,
      userId, 
      tradeId: trade?.id,
      buyerId: trade?.buyerId,
      sellerId: trade?.sellerId
    }))
  }, [userId, trade])

  const handleChange = (prop: any) => (event: any) =>{
    setFormData( prevState =>({
      ...prevState,
      [prop]: event.target.value
    }))
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
    
    let data = {...formData};
    return console.log(data)
    if(file?.name){
      setIsSendingFile(true);
      const fileUrl = await postFile(file.name, file)
      data.mediaProof = fileUrl;
      setIsSendingFile(false);
    }

    const res = createDispute(data).then( (res: any) =>{
      setPostingData(false);
      console.log(res)
      closeForm()
    }).catch((error: any) =>{
      setPostingData(false)
      console.log(error)
      setMessage({
        severity: "error",
        message: error.message
      })
    })
  }

  return(
    <form className="p-3" style={{boxShadow: "0px -42px 61px -68px rgba(0,0,0,0.75)"}}>
      <header className="mb-3 flex items-center">
        <h5 className="font-bold text-lg">Raise Dispute</h5>
        <button className="btn btn-circle btn-sm ml-auto" onClick={closeForm}>
          <XMarkIcon className="w-4" />
        </button>
      </header>
      

      <label className="form-control w-full mb-3">
        <div className="label">
          <span className="label-text font-semibold">Reason</span>
        </div>
        <textarea className="textarea border border-gray-400 focus:outline-none rounded-lg" value={formData.reason} onChange={handleChange("reason")} rows={5} placeholder="Tell us why you are raising a dispute"></textarea>
      </label>

      <label className="form-control w-full mb-3">
        <div className="label">
          <span className="label-text font-semibold">Media Proof Type</span>
        </div>
        <select className="select select-bordered w-full rounded-lg" value={formData.mediaProofType} onChange={handleChange("mediaProofType")}>
          <option disabled value="">Select Media Type</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
      </label>

      <label className="form-control w-full mb-3">
        <div className="label">
          <span className="label-text font-semibold">Media Proof</span>
        </div>
        <input ref={inputFileRef} type="file" onChange={createFileUrl} className="file-input file-input-bordered w-full rounded-lg text-sm mb-3" />

        {(file?.name.toLowerCase()?.includes(".mp4") || file?.name?.includes(".mov") || file?.name?.includes(".avi") || file?.name?.includes(".webm")) ?
          <>
            {fileUrl &&
              <video width="320" height="240" controls>
                <source src={fileUrl} type="video/mp4" />
                <source src={fileUrl} type="video/ogg" />
                Your browser does not support the video tag.
              </video>
            }
          </> :
          <>
            {fileUrl &&
              <div>
                <img src={fileUrl} className=" max-h-40 mx-auto" alt="Preview file" />
              </div>
            }
          </>
        }
      </label>

      <button type="button" disabled={postingData || isSendingFile} onClick={handleSubmit} className={`btn text-white rounded-lg bg-primary shadow-lg hover:bg-purple-800 hover:shadow-none glass px-12 md:px-20 w-full mt-12`} > Raise Dispute {(postingData || isSendingFile) && <span className="loading loading-spinner loading-xs ml-2"></span>} </button>
    </form>
  )
}

export default CreateDisputeForm;