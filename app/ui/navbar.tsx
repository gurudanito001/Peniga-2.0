

const NavBar = () => {

  return (
    <div className="navbar bg-neutral text-base-content">
      <div className="navbar-start">
      </div>
      <div className="navbar-end">

        <div className="drawer drawer-end w-9 ml-auto z-10">
          <input id="notification-drawer" type="checkbox" className="drawer-toggle" />
          <div className='z-10'>
            {/* Page content here */}
            <label htmlFor="notification-drawer" className="btn btn-circle btn-sm btn-outline glass drawer-button text-gray-950 flex align-middle">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                <span className="badge badge-md py-2 bg-accent indicator-item text-white text-xs">7</span>
              </div>
            </label>
          </div>
          <div className="drawer-side z-30">
            <label htmlFor="notification-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-[450px] min-h-full text-base-content rounded-xl bg-base opacity-95">
              {/* Sidebar content here */}
              <li><a>Sidebar Item 1000</a></li>
              <li><a>Sidebar Item 2000</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar;