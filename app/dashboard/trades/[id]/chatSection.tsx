import { PhotoIcon, PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/outline"

const ChatSection = () => {

  return (
    <>
      <header className='p-3 bg-neutral flex items-center'>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img className='rounded-full' src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt='placeholder user' />
            </div>
          </div>
          <div>
            <div className="font-bold">Hart Hagerty</div>
            <div className="text-xs opacity-50">user@exampleemail.com</div>
          </div>
        </div>

        <label htmlFor="trade-chat-drawer" className="btn btn-circle btn-sm ml-auto">
          <XMarkIcon className="w-4" />
        </label>
      </header>

      <section className='grow overflow-y-auto p-3'>
        <div className="chat chat-start">
          <div className="chat-bubble bg-white text-base-content text-sm flex items-center font-semibold">You were the Chosen One! I am very dissapointed with the outcome of this experiment</div>
          <div className="chat-footer opacity-50">
            <time className="text-xs opacity-50">12:45</time>
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble bg-primary text-white text-sm flex items-center font-semibold">I hate you!</div>
          <div className="chat-footer opacity-50">
            <time className="text-xs opacity-50">12:46</time>
          </div>
        </div>
      </section>

      <section className='bg-neutral py-3 flex items-center'>
        <form className='w-full m-0 flex items-center'>
          <button className='btn btn-circle btn-link text-primary glass mr-2'>
            <PhotoIcon className='w-6' />
          </button>
          <label className="input input-bordered focus-within:outline-none bg-base flex items-center gap-2 pl-2 pr-0 w-full">
            {/* <input type="text" className="grow border-none outline-none" placeholder="Type a message" /> */}
            <textarea className='border-none w-full grow outline-none bg-transparent p-0 text-sm' placeholder="Type a message" rows={1}></textarea>
            <button className='btn btn-circle bg-primary text-white'>
              <PaperAirplaneIcon className='w-4' />
            </button>
          </label>
        </form>
      </section>
    </>
  )
}

export default ChatSection