import React from 'react';
import { Dropdown, Menu } from 'antd';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

const { SubMenu } = Menu;

interface NavbarProps {
    children?: React.ReactNode;
}

const AuthNavbar: React.FC<NavbarProps> = ({ children }) => {
    const menu = (
        <Menu>
            <Menu.Item key="1">Profile</Menu.Item>
            <Menu.Item key="2">Settings</Menu.Item>
            <Menu.Item key="3" onClick={() => signOut({ callbackUrl: "/auth/signin" })}>Logout</Menu.Item>
        </Menu>
    );

    return (
        <div className="bg-white shadow-md py-2 h-[80px] px-4 flex items-center justify-between sticky top-0 z-10">
            {/* Search Bar */}
            <div className="w-1/3 relative">
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full py-2 px-4 h-[44px] rounded-lg border border-[#DDDDDD]"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg
                        className="h-5 w-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                    </svg>
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <div className='h-[44px] w-[44px] flex items-center justify-center rounded-lg border border-[#0099CC33]'>
                    <Image src="/svgs/message.svg" alt='...' height={18} width={18} />
                </div>
                <div className='h-[44px] w-[44px] flex items-center justify-center rounded-lg border border-[#0099CC33]'>
                    <Image src="/svgs/notification.svg" alt='...' height={18} width={18} />
                </div>
                <div className="relative">
                    <Dropdown overlay={menu} trigger={['click']}>
                        <div className='h-[44px] flex items-center justify-center gap-2 rounded-lg cursor-pointer'>
                            <Image src="/svgs/default-avatar.svg" alt='...' height={44} width={44} className='rounded-lg' />
                            <div className='flex flex-col'>
                                <div className='text-sm font-medium text-[#4B4B4B]'>Alison Jordon</div>
                                <div className='text-sm font-normal text-[#999999]'>Broker</div>
                            </div>
                            <div>
                                <Image src="/svgs/arrow-down.svg" alt='...' height={18} width={18} />
                            </div>
                        </div>
                    </Dropdown>
                </div>
            </div>
            {children}
        </div>
    );
};

export default AuthNavbar;