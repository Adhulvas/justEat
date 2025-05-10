import React from 'react';
import loginImage from '../../assets/Image-login_btpq7r.avif'
// import close from '../../assets/close.svg'

const SignupForm = ({ setAuthFormType }) => {
  return (
    <>
      <div className='flex justify-between items-center'>
        <div>
          <p className='text-3xl font-medium mb-1'>Sign up</p>
          <p>
            or <span className="text-orange-500 cursor-pointer" onClick={() => setAuthFormType('login')}>login to your account</span>
          </p>
          <span>____</span>
        </div>
        <div>
          <img src={loginImage} alt="dish" className='w-24' />
        </div>
      </div>

      {/* <!-- Name Field --> */}
      <div className="relative w-full mt-6">
        <input
          type="text"
          id="name"
          placeholder="Name"
          className="peer w-full h-16 px-5 pt-5 pb-1 border border-b-0 placeholder-transparent focus:outline-none focus:ring-0"
        />
        <label
          for="name"
          className="absolute left-5 text-gray-500 transition-all 
                top-2 text-xs translate-y-0
                peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:-translate-y-1/2
                peer-focus:top-2 peer-focus:text-xs peer-focus:translate-y-0"
        >
          Name
        </label>
      </div>

      {/* <!-- Email Field --> */}
      <div className="relative w-full">
        <input
          type="text"
          id="email"
          placeholder="Email"
          className="peer w-full h-16 px-5 pt-5 pb-1 border placeholder-transparent focus:outline-none focus:ring-0"
        />
        <label
          for="email"
          className="absolute left-5 text-gray-500 transition-all 
                top-2 text-xs translate-y-0
                peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:-translate-y-1/2
                peer-focus:top-2 peer-focus:text-xs peer-focus:translate-y-0"
        >
          Email
        </label>
      </div>

      {/* <!-- Password Field --> */}
      <div className="relative w-full">
        <input
          type="text"
          id="password"
          placeholder="Password"
          className="peer w-full h-16 px-5 pt-5 pb-1 border border-t-0 placeholder-transparent focus:outline-none focus:ring-0"
        />
        <label
          for="password"
          className="absolute left-5 text-gray-500 transition-all 
                top-2 text-xs translate-y-0
                peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:-translate-y-1/2
                peer-focus:top-2 peer-focus:text-xs peer-focus:translate-y-0"
        >
          Password
        </label>
      </div>

      <button className='w-full bg-orange-500 font-semibold text-white mt-5 p-4'>SIGNUP</button>
      <p className='text-xs mt-1'>By creating an account, I accept the Terms & Conditions & Privacy Policy</p>
    </>
  );
};

export default SignupForm;
