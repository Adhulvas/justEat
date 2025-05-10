import React, { useState } from 'react'
import logo from '../../assets/just-eat-brand.30f1ebe5.svg'
import cart from '../../assets/cart.svg'
import close from '../../assets/close.svg'
import LoginForm from './LoginForm'
import SignupForm from './signupForm'
import hamburgerMenu from '../../assets/hamburgerMenu.svg'
import shop from '../../assets/shop.svg'
import truck from '../../assets/truck.svg'
import user from '../../assets/user.svg'

export const Header = () => {
  const [showPanel, setShowPanel] = useState(false);
  const [authFormVisible, setAuthFormVisible] = useState(false);
  const [authFormType, setAuthFormType] = useState('login');
  const [mobileAuthFormVisible, setMobileAuthFormVisible] = useState(false);
  const [mobileAuthFormType, setMobileAuthFormType] = useState('login');
  

  return (
  <div className='flex py-7 px-10 justify-between shadow-lg items-center'>
    {/* Logo */}
    <div>
      <img src={logo} alt="justEatLogo" className='w-36' />
    </div>

    {/* Right Section */}
    <div className='flex items-center gap-8'>
      {/* courier */}
      <button className='hidden lg:flex items-center gap-1 p-2 rounded-md hover:bg-gray-200 transition duration-200'>
        <img src={truck} className='w-7' alt="" />
        <p>Become a courier</p>
      </button>

      <button className='hidden lg:flex items-center gap-1 p-2 rounded-md hover:bg-gray-200 transition duration-200'>
        <img src={shop} className='w-6' alt="" />
        <p>Partner with us</p>
      </button>

      <button className='flex items-center gap-1 p-2 rounded-md hover:bg-gray-200 transition duration-200'>
        <img src={cart} className='w-6' alt="cart" />
        <p className='hidden sm:block'>Cart</p>
      </button>

      {/* Desktop Login */}
      <div className='hidden lg:flex'>
        <button className="flex bg-gradient-to-r from-orange-500 to-orange-400 text-black font-medium py-2 px-6 rounded-md shadow-md transition duration-300 ease-in-out hover:shadow-xl hover:brightness-110 hover:scale-105 active:scale-95"
        onClick={()=> {
          setAuthFormVisible(true);
          setAuthFormType('login');
        }}>
          <img src={user} className='w-6' alt="" />
          <p>Sign in</p>
        </button>
      </div>

      {authFormVisible && (
        <>
          {/* Overlay for desktop login/signup panel */}
          <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setAuthFormVisible(false)}>
          </div>
          <div className="fixed top-0 right-0 h-full bg-white shadow-lg z-50 transition-transform duration-1000 ease-in-out transform translate-x-0 pt-5 px-10" style={{ width: '36rem' }}>
            <div className='max-w-sm'>
              <button onClick={() => setAuthFormVisible(false)}>
                <img src={close} className='w-7' alt="close" />
              </button>
              <div>
                {/* Title & Toggle Link is inside the child component */}
                {authFormType === 'login'
                  ? <LoginForm setAuthFormType={setAuthFormType} />
                  : <SignupForm setAuthFormType={setAuthFormType} />}
              </div>
            </div>
          </div>
        </>
      )}


      {/* Mobile User Icon */}
      <div className='lg:hidden flex items-center'>
        <button onClick={() => setShowPanel(true)} className="text-2xl text-gray-700">
        <img src={hamburgerMenu}  className="w-8" alt="" />
        </button>
      </div>
    </div>

    {/* Sidebar Overlay */}

    {showPanel && (
      <>
        {/* Sidebar Panel */}
        <div className="fixed top-0 right-0 h-full w-full bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out transform translate-x-0">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">My account</h2>
            <button onClick={() => setShowPanel(false)} className="text-xl">
              <img src={close} className='w-8' alt="close" />
            </button>
          </div>

          {/* If form not visible, show buttons */}
          {!mobileAuthFormVisible ? (
            <>
              <div className="flex gap-2 p-6">
                <button
                  onClick={() => {
                    setMobileAuthFormVisible(true);
                    setMobileAuthFormType('login');
                  }}
                  className="flex-1 text-xl bg-gradient-to-r from-gray-500 to-gray-400 text-white py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out hover:shadow-xl hover:brightness-110 hover:scale-105 active:scale-95"
                >
                  Sign in
                </button>

                <button
                  onClick={() => {
                    setMobileAuthFormVisible(true);
                    setMobileAuthFormType('signup');
                  }}
                  className="flex-1 text-xl bg-gradient-to-r from-orange-500 to-orange-400 text-white py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out hover:shadow-xl hover:brightness-110 hover:scale-105 active:scale-95"
                >
                  Create account
                </button>
              </div>

              {/* Courier & Partner buttons - shown only on mobile */}
              <div className="flex flex-col gap-2 px-6 mt-4 lg:hidden">
                <button className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-200 transition duration-200">
                  <img src={truck} className="w-7" alt="Courier" />
                  <span className="text-lg">Become a courier</span>
                </button>

                <button className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-200 transition duration-200">
                  <img src={shop} className="w-7" alt="Partner" />
                  <span className="text-lg">Partner with us</span>
                </button>
              </div>
            </>
          ) : null}

          {/* Fullscreen Overlay for Form */}
          {mobileAuthFormVisible && (
            <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
              <div className='w-full shadow-lg p-5'>
                <button
                  onClick={() => setMobileAuthFormVisible(false)}
                  className="text-gray-700 text-2xl flex"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 text-orange-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                  </svg>
                  <img src={logo} className='w-32' alt="" />
                </button>
              </div>
              <div className='p-6'>
              {mobileAuthFormType === 'login' ? (
                <LoginForm setAuthFormType={setMobileAuthFormType} />
              ) : (
                <SignupForm setAuthFormType={setMobileAuthFormType} />
              )}
              </div>
            </div>
          )}
        </div>
      </>
    )}

  </div>
  )
}
