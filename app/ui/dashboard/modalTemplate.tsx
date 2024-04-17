"use client"

const ModalTemplate = ({modalId = "my_modal_3", btnText, btnClasses, heading, description, onSubmit}: 
  {modalId: string, btnClasses: string, btnText: string, heading: string, description: string, onSubmit?: ()=>void}
  ) => {

  return (
    <>
      <button className={`btn text-white rounded-lg ${btnClasses}`} onClick={() => document?.getElementById(`${modalId}`)?.showModal()}>{btnText}</button>
      <dialog id={`${modalId}`} className="modal z-50">
        <div className="modal-box bg-base text-base-content">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">{heading}</h3>
          <p className="py-4">{description}</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn px-5 rounded-lg border-none bg-primary shadow-lg text-white hover:bg-primary hover:text-white hover:border-none hover:shadow-none ">Proceed </button>
            </form>
          </div>
        </div>
      </dialog>
    </>

  )
}

export default ModalTemplate