"use client"
import { Card, CardContent } from '@/components/ui/card';
import axios from 'axios';
import { use, useEffect, useState } from 'react'
import verifiedImg from '@/public/assets/images/verified.gif'
import verificationFailedImg from '@/public/assets/images/verification-failed.gif'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { WEBSITE_HOME } from '@/routes/WebsiteRoute';

const EmailVerification = ({params}) => {
  const { token } = use(params);
  const [isVerified,setIsVerified] = useState(false);
   useEffect(()=>{
       const verify = async () => {
        const {data:verificationResponse} = await  axios.get(`/api/auth/verify-email?token=${token}`);
        if(verificationResponse.success){
          setIsVerified(true)
        }
       }
       verify();
   },[token])
  return (
    <Card className='w-100'>
      <CardContent>
       {isVerified ? (
        <div>
          <div className='flex justify-center items-center'>
           <Image src={verifiedImg} width={verifiedImg.width} height={verifiedImg.height} alt="verify img" className='h-25 w-auto' />
          </div>
          <div className='text-center'>
            <h1 className='text-2xl font-bold text-green-500 my-5'>Email Verification Success!</h1>
            <Button asChild>
               <Link href={WEBSITE_HOME}>Continue Shopping</Link>
            </Button>
          </div>
        </div>
       ):(
        <div>
           <div className='flex justify-center items-center'>
            <Image src={verificationFailedImg} width={verificationFailedImg.width} height={verificationFailedImg.height} alt="Failed verify img" className='h-25 w-auto' />
          </div>
          <div className='text-center'>
            <h1 className='text-2xl font-bold text-red-500 my-5'>Email Verification Failed!</h1>
            <Button asChild>
               <Link href={WEBSITE_HOME}>Continue Shopping</Link>
            </Button>
          </div>
        </div>
       )}
      </CardContent>
    </Card>
  )
}

export default EmailVerification