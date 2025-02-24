'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { useState, useEffect, ChangeEvent } from 'react';
import InputField from '@/components/InputField';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import withAuthProtection from "@/app/authGuard";
import { Carousel } from 'antd';

interface FormData {
  email: string;
  password: string;
}

const Signin = () => {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session, status }: any = useSession();

  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  if (status === 'authenticated') {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setLoading(true);

    // const res: any = await signIn("credentials", {
    //   redirect: false,
    //   email: formData.email,
    //   password: formData.password
    // });

    // if (res.ok) {
    //   toast.success("Login Successful");
    //   router.push('/dashboard');
    // } else {
    //   console.error('Sign-in error:', res.error);
    //   toast.error(res.error || 'Failed to sign in');
    //   setLoading(false);
    // }
  };

  const images = [
    '/svgs/image.png',
    '/svgs/image.png',
    '/svgs/image.png',
  ];

  return (
    <>
      <div className="bg-[#f5f5f5] h-[100vh] flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-[1360px] px-4 mx-auto gap-3">
          <div className='relative'>
            <Carousel autoplay>
              {images.map((src, index) => (
                <div key={index}>
                  <div className='relative'>
                    <Image
                      src={src}
                      alt={`Slide ${index + 1}`}
                      height={884}
                      width={660}
                      className=' h-auto md:block hidden max-h-[95vh] object-cover rounded-[22px]'
                    />
                    <div className='absolute top-8 left-8'>
                      <div>
                        <Image
                          src="/svgs/logo-white.svg"
                          alt='Logo'
                          height={26}
                          width={113}
                        />
                      </div>
                    </div>
                    <div className='absolute top-8 right-8'>
                      <Button
                        onClick={() => router.push('/')}
                        className='rounded-full h-[36px] bg-[#434a51] text-sm font-normal text-white px-4 py-2'
                      >
                        <span className='flex gap-2 justify-center items-center'>
                          Back to website{' '}
                          <Image
                            src="/svgs/Arrow-right.svg"
                            alt='Arrow'
                            height={14}
                            width={14}
                          />
                        </span>
                      </Button>
                    </div>
                    <div className='absolute bottom-10 left-0 right-0 text-white text-3xl font-semibold text-center max-w-[430px] mx-auto'>Capturing Moments, Creating Memories</div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
          <div className='h-[100vh overflow-auto flex flex-col justify-center'>
            <div className='flex mt-5 flex-col mb-5'>
              <div className='text-black text-[40px] font-semibold'>Welcome Back, John</div>
              <div className='text-base font-normal text-[#848080]'>Don’ have an account?&nbsp;<span className='text-[#660099] cursor-pointer' onClick={() => router.push('/auth/signup')}>Sign Up</span></div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className='grid grid-cols-12 gap-3'>
                <div className='col-span-12'>
                  <InputField
                    label="Email"
                    name="email"
                    required={true}
                    type='email'
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className='col-span-12 '>
                  <InputField
                    label="Password"
                    name="password"
                    type='password'
                    required={true}
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className='col-span-12 '>
                  <div className='text-[#3F3F3F] text-sm font-normal flex justify-end items-center gap-2'>
                    Forgot Password?
                  </div>
                </div>
              </div>
              <Button type='submit' className='bg-[#FF6600] mt-8 w-full h-[60px] flex justify-center items-center py-2 px-3 rounded-xl text-white text-base font-semibold'>Sign In Your Account</Button>
              <div className='flex items-center gap-3 text-sm font-normal text-[#3F3F3F] mt-3'>
                <input type="checkbox" name="terms_condition" id="terms_condition" /> I agree terms & Conditions
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default withAuthProtection(Signin)
