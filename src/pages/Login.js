import React from 'react'
import {signIn} from 'next-auth/react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
function Login() {
    const {data:session}=useSession();
    const router=useRouter();
    useEffect(()=>{
 
      if(session)
      {
        router.push("/")
      }
     
    },[session])
  return (
    <div className='flex justify-center 
    items-center mt-[25%] ml-[0%] md:ml-[50%] flex-col gap-6'>
        <button  className=' text-white bg-blue-400 p-2 rounded-xl px-3'  onClick={()=>signIn()}>Login with Google</button>
    </div>
  )
}

export default Login