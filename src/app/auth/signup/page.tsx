'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { useState, ChangeEvent, useEffect } from 'react';
import InputField from '@/components/InputField';
import Image from 'next/image';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import withAuthProtection from '@/app/authGuard';
import { Carousel } from 'antd';

interface LoaderFormData {
    email: string;
    password: string;
    confirm_password: string;
    phone_number: string;
    fullname: string;
    national_id: string;
}

interface TruckerFormData {
    email: string;
    password: string;
    confirm_password: string;
    phone_number: string;
    fullname: string;
    national_id: string;
    drivers_license_number: string;
    vehicle_type: string;
    vehicle_registration_number: string;
}

const Signup = () => {
    const [isLoader, setIsLoader] = useState<boolean>(true);
    const [loaderFormData, setLoaderFormData] = useState<LoaderFormData>({
        email: '',
        password: '',
        confirm_password: '',
        phone_number: '',
        fullname: '',
        national_id: '',
    });
    const [truckerFormData, setTruckerFormData] = useState<TruckerFormData>({
        email: '',
        password: '',
        confirm_password: '',
        phone_number: '',
        fullname: '',
        national_id: '',
        drivers_license_number: '',
        vehicle_type: '',
        vehicle_registration_number: '',
    });
    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const { data: session, status }: any = useSession();

    const router = useRouter();

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/dashboard');
        }
    }, [status, router]);

    if (status === 'authenticated') {
        return null;
    }

    const handleLoaderChange = (e: any) => {
        const { name, value } = e.target;
        setLoaderFormData({ ...loaderFormData, [name]: value });
    };

    const handleTruckerChange = (e: any) => {
        const { name, value } = e.target;
        setTruckerFormData({ ...truckerFormData, [name]: value });
    };

    const handleLoaderSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { email, password, confirm_password, phone_number, fullname, national_id } = loaderFormData;

        if (!email || !password || !confirm_password || !phone_number || !fullname || !national_id) {
            setErrors({
                email: email ? '' : 'Email is required',
                password: password ? '' : 'Password is required',
                confirm_password: confirm_password ? '' : 'Confirm Password is required',
                phone_number: phone_number ? '' : 'Phone Number is required',
                fullname: fullname ? '' : 'Full Name is required',
                national_id: national_id ? '' : 'National ID is required',
            });
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_NEXT_URL}/api/auth/sign-up`,
                loaderFormData,
            );
            toast.success(response.data.message);
            router.push('/auth/signin');
            setLoading(false);
        } catch (error: any) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const handleTruckerSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // const { email, password, confirm_password, phone_number, fullname, national_id, drivers_license_number, vehicle_type, vehicle_registration_number } = truckerFormData;

        // if (!email || !password || !confirm_password || !phone_number || !fullname || !national_id || !drivers_license_number || !vehicle_type || !vehicle_registration_number) {
        //     setErrors({
        //         email: email ? '' : 'Email is required',
        //         password: password ? '' : 'Password is required',
        //         confirm_password: confirm_password ? '' : 'Confirm Password is required',
        //         phone_number: phone_number ? '' : 'Phone Number is required',
        //         fullname: fullname ? '' : 'Full Name is required',
        //         national_id: national_id ? '' : 'National ID is required',
        //         drivers_license_number: drivers_license_number ? '' : 'Driver’s License Number is required',
        //         vehicle_type: vehicle_type ? '' : 'Vehicle Type is required',
        //         vehicle_registration_number: vehicle_registration_number ? '' : 'Vehicle Registration Number is required',
        //     });
        //     setLoading(false);
        //     return;
        // }

        // try {
        //     const response = await axios.post(
        //         `${process.env.NEXT_PUBLIC_NEXT_URL}/api/auth/sign-up`,
        //         truckerFormData,
        //     );
        //     toast.success(response.data.message);
        //     router.push('/auth/signin');
        //     setLoading(false);
        // } catch (error: any) {
        //     toast.error(error.response.data.message);
        // } finally {
        //     setLoading(false);
        // }
    };

    const images = [
        '/svgs/image.png',
        '/svgs/image.png',
        '/svgs/image.png',
    ];

    return (
        <>
            <div className="bg-[#f5f5f5] min-h-[100vh] flex items-center overflow-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 w-full md:max-w-[1360px] px-4 mx-auto gap-3">
                    <div className='relative md:block hidden'>
                        <Carousel autoplay>
                            {images.map((src, index) => (
                                <div key={index}>
                                    <div className='relative mt-5'>
                                        <Image
                                            src={src}
                                            alt={`Slide ${index + 1}`}
                                            height={884}
                                            width={660}
                                            className='h-auto md:block hidden max-h-[95vh] object-cover rounded-[22px]'
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
                    <div className='md:h-[100vh] hide-scrollbar overflow-auto'>
                        <div className='mb-3 flex mt-5 flex-col'>
                            <div className='text-black text-[40px] font-semibold'>Create An Account</div>
                            <div className='text-base font-normal text-[#848080]'>Already have an account?&nbsp;<span className='text-[#660099] cursor-pointer' onClick={() => router.push('/auth/signin')}>Log In</span></div>
                        </div>
                        <div className="flex justify-between items-center gap-4 mb-3">
                            <button
                                onClick={() => setIsLoader(true)}
                                className={`px-4 w-full py-4 mr-2 text-lg font-normal border border-[#DDDDDD] ${isLoader ? 'bg-[#056058] text-white' : 'bg-transparent text-[#848080]'} rounded-xl`}
                            >
                                As a Loader
                            </button>
                            <button
                                onClick={() => setIsLoader(false)}
                                className={`px-4 w-full py-4 border text-lg font-normal border-[#DDDDDD] ${!isLoader ? 'bg-[#056058] text-white' : 'bg-transparent text-[#848080]'} rounded-xl`}
                            >
                                As a Trucker
                            </button>
                        </div>
                        {isLoader ? (
                            <form onSubmit={handleLoaderSubmit}>
                                <div className='grid grid-cols-12 gap-3'>
                                    <div className='col-span-12 '>
                                        <InputField
                                            label="Full Name"
                                            name="fullname"
                                            required={true}
                                            placeholder="Enter Full Name"
                                            value={loaderFormData.fullname}
                                            onChange={handleLoaderChange}
                                            className='bg-transparent border border-[#DDDDDD]'
                                        />
                                        {errors.fullname && (
                                            <p className="text-sm text-red-500 mt-1">{errors.fullname}</p>
                                        )}
                                    </div>
                                    <div className='col-span-12 md:col-span-6'>
                                        <InputField
                                            label="Email"
                                            name="email"
                                            required={true}
                                            type='email'
                                            placeholder="Enter Email"
                                            value={loaderFormData.email}
                                            onChange={handleLoaderChange}
                                            className='bg-transparent border border-[#DDDDDD]'
                                        />
                                        {errors.fullname && (
                                            <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                                        )}
                                    </div>
                                    <div className='col-span-12 md:col-span-6'>
                                        <InputField
                                            label="Phone"
                                            name="phone"
                                            required={true}
                                            type='number'
                                            placeholder="Enter Phone Number"
                                            value={loaderFormData.phone_number}
                                            onChange={handleLoaderChange}
                                            className='bg-transparent border border-[#DDDDDD]'
                                        />
                                        {errors.fullname && (
                                            <p className="text-sm text-red-500 mt-1">{errors.phone_number}</p>
                                        )}
                                    </div>
                                    <div className='col-span-12 '>
                                        <InputField
                                            label="National ID"
                                            name="national_id"
                                            required={true}
                                            placeholder="Enter National ID"
                                            value={loaderFormData.national_id}
                                            onChange={handleLoaderChange}
                                            className='bg-transparent border border-[#DDDDDD]'
                                        />
                                        {errors.fullname && (
                                            <p className="text-sm text-red-500 mt-1">{errors.national_id}</p>
                                        )}
                                    </div>

                                    <div className='col-span-12 md:col-span-6 '>
                                        <InputField
                                            label="Password"
                                            name="password"
                                            required={true}
                                            type='password'
                                            placeholder="Enter Password"
                                            value={loaderFormData.password}
                                            onChange={handleLoaderChange}
                                            className='bg-transparent border border-[#DDDDDD]'
                                        />
                                        {errors.fullname && (
                                            <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                                        )}
                                    </div>
                                    <div className='col-span-12 md:col-span-6'>
                                        <InputField
                                            label="Confirm Password"
                                            name="confirm_password"
                                            type='password'
                                            required={true}
                                            placeholder="Enter Confirm Password"
                                            value={loaderFormData.confirm_password}
                                            onChange={handleLoaderChange}
                                            className='bg-transparent border border-[#DDDDDD]'
                                        />
                                        {errors.fullname && (
                                            <p className="text-sm text-red-500 mt-1">{errors.confirm_password}</p>
                                        )}
                                    </div>

                                </div>
                                <Button type='submit' className='bg-[#FF6600] w-full h-[60px] flex justify-center items-center py-2 px-3 rounded-xl text-white text-base font-semibold mt-5'>Sign Up Your Account</Button>
                                <div className='flex items-center gap-3 text-sm font-normal text-[#3F3F3F] mt-3'>
                                    <input type="checkbox" name="terms_condition" id="terms_condition" /> I agree terms & Conditions
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleTruckerSubmit}>
                                <div className='grid grid-cols-12 gap-3'>
                                    <div className='col-span-12 '>
                                        <InputField
                                            label="Full Name"
                                            name="fullname"
                                            required={true}
                                            placeholder="Enter Full Name"
                                            value={truckerFormData.fullname}
                                            onChange={handleTruckerChange}
                                            className='bg-transparent border border-[#DDDDDD]'
                                        />
                                        {errors.fullname && <p className="text-sm text-red-500 mt-1">{errors.fullname}</p>}
                                    </div>
                                    <div className='col-span-12 md:col-span-6'>
                                        <InputField
                                            label="Email"
                                            name="email"
                                            required={true}
                                            placeholder="Enter Email Address"
                                            value={truckerFormData.email}
                                            onChange={handleTruckerChange}
                                            className='bg-transparent border border-[#DDDDDD]'
                                        />
                                        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                                    </div>
                                    <div className='col-span-12 md:col-span-6'>
                                        <InputField
                                            label="Phone"
                                            name="phone_number"
                                            required={true}
                                            placeholder="Enter Phone Number"
                                            value={truckerFormData.phone_number}
                                            onChange={handleTruckerChange}
                                            className='bg-transparent border border-[#DDDDDD]'
                                        />
                                        {errors.phone_number && <p className="text-sm text-red-500 mt-1">{errors.phone_number}</p>}
                                    </div>
                                    <div className='col-span-12 md:col-span-6'>
                                        <InputField
                                            label="National ID / Iqama Number"
                                            name="national_id"
                                            required={true}
                                            placeholder="Enter National ID / Iqama Number"
                                            value={truckerFormData.national_id}
                                            onChange={handleTruckerChange}
                                            className='bg-transparent border border-[#DDDDDD]'
                                        />
                                        {errors.national_id && <p className="text-sm text-red-500 mt-1">{errors.national_id}</p>}
                                    </div>
                                    <div className='col-span-12 md:col-span-6'>
                                        <InputField
                                            label="Driver’s License Number"
                                            name="drivers_license_number"
                                            required={true}
                                            placeholder="Enter Driver’s License Number"
                                            value={truckerFormData.drivers_license_number}
                                            onChange={handleTruckerChange}
                                            className='bg-transparent border border-[#DDDDDD]'
                                        />
                                        {errors.drivers_license_number && <p className="text-sm text-red-500 mt-1">{errors.drivers_license_number}</p>}
                                    </div>
                                    <div className='col-span-12 md:col-span-6'>
                                        <InputField
                                            label="Vehicle Type"
                                            name="vehicle_type"
                                            required={true}
                                            placeholder="Enter Vehicle Type"
                                            value={truckerFormData.vehicle_type}
                                            onChange={handleTruckerChange}
                                            className='bg-transparent border border-[#DDDDDD]'
                                        />
                                        {errors.vehicle_type && <p className="text-sm text-red-500 mt-1">{errors.vehicle_type}</p>}
                                    </div>
                                    <div className='col-span-12 md:col-span-6'>
                                        <InputField
                                            label="Vehicle Registration Number"
                                            name="vehicle_registration_number"
                                            required={true}
                                            placeholder="Enter Vehicle Registration Number"
                                            value={truckerFormData.vehicle_registration_number}
                                            onChange={handleTruckerChange}
                                            className='bg-transparent border border-[#DDDDDD]'
                                        />
                                        {errors.vehicle_registration_number && <p className="text-sm text-red-500 mt-1">{errors.vehicle_registration_number}</p>}
                                    </div>
                                    <div className='col-span-12 md:col-span-6'>
                                        <InputField
                                            label="Password"
                                            name="password"
                                            type="password"
                                            required={true}
                                            placeholder="Enter Password"
                                            value={truckerFormData.password}
                                            onChange={handleTruckerChange}
                                            className='bg-transparent border border-[#DDDDDD]'
                                        />
                                        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
                                    </div>
                                    <div className='col-span-12 md:col-span-6'>
                                        <InputField
                                            label="Confirm Password"
                                            name="confirm_password"
                                            type="password"
                                            required={true}
                                            placeholder="Enter Confirm Password"
                                            value={truckerFormData.confirm_password}
                                            onChange={handleTruckerChange}
                                            className='bg-transparent border border-[#DDDDDD]'
                                        />
                                        {errors.confirm_password && <p className="text-sm text-red-500 mt-1">{errors.confirm_password}</p>}
                                    </div>
                                </div>
                                <Button type='submit' className='bg-[#FF6600] w-full h-[60px] flex justify-center items-center py-2 px-3 rounded-xl text-white text-base font-semibold mt-5'>Sign Up Your Account</Button>
                                <div className='flex items-center gap-3 text-sm font-normal text-[#3F3F3F] mt-3 mb-5'>
                                    <input type="checkbox" name="terms_condition" id="terms_condition" /> I agree terms & Conditions
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
export default withAuthProtection(Signup);