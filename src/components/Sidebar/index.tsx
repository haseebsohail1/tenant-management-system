import React, { useState, useEffect } from 'react';
import {
    BellOutlined,
    SettingOutlined,
    HomeOutlined,
    BookOutlined,
    TruckOutlined,
    UnorderedListOutlined,
    HistoryOutlined,
    QuestionCircleOutlined,
    CarOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Button from '../Button';
import { signOut } from 'next-auth/react';

interface SidebarProps {
    children?: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname(); // Get the current pathname
    const [activeItem, setActiveItem] = useState<string>('Dashboard');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // State for sidebar visibility

    const navItems = [
        { name: 'Dashboard', icon: <HomeOutlined />, path: '/dashboard' },
        { name: 'My Bookings', icon: <BookOutlined />, path: '/bookings' },
        { name: 'My Loads', icon: <CarOutlined />, path: '/my-loads' },
        { name: 'Trucker Requests', icon: <UnorderedListOutlined />, path: '/trcuker-requests' },
        { name: 'Post a Load', icon: <TruckOutlined />, path: '/post-load' },
        { name: 'Find Trucks', icon: <TruckOutlined />, path: '/find-trucks' },
        { name: 'History', icon: <HistoryOutlined />, path: '/history' },
        { name: 'Documents', icon: <HistoryOutlined />, path: '/document' },
    ];

    const supportItems = [
        { name: 'Settings', icon: <SettingOutlined />, path: '/settings' },
        { name: 'Notifications', icon: <BellOutlined />, path: '/notifications' },
        { name: 'Help', icon: <QuestionCircleOutlined />, path: '/help' },
    ];

    useEffect(() => {
        const allItems = [...navItems, ...supportItems];
        const active = allItems.find((item) => item.path === pathname);
        if (active) {
            setActiveItem(active.name);
        }
    }, [pathname]);

    const handleMenuItemClick = (path: string, name: string) => {
        router.push(path);
        setActiveItem(name); 
    };

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed); 
    };

    return (
        <div className="flex">
            <div
                className={`bg-white w-64 flex-shrink-0 border-r border-[#DDDDDD] h-[100vh] overflow-y-auto overflow-x-hidden  transition-all duration-300 fixed lg:relative z-50 ${
                    isSidebarCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'
                }`}
            >
                <div className='flex flex-col justify-between'>
                    <div className='flex justify-center items-center border-b border-[#DDDDDD] w-full h-[80px] px-4'>
                        <Image src="/svgs/logo.svg" alt='...' height={27} width={113} />
                        {/* <button
                            onClick={toggleSidebar}
                            className="text-xl text-[#4B4B4B]"
                        >
                            {isSidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        </button> */}
                    </div>
                    <div className="mb-4 mt-6 px-3">
                        <h6 className="text-[#848080] uppercase text-sm font-normal mb-3">General</h6>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={[activeItem]}
                            selectedKeys={[activeItem]}
                            style={{ width: 236, borderRight: 0 }}
                        >
                            {navItems.map((item) => (
                                <Menu.Item
                                    key={item.name}
                                    icon={item.icon}
                                    className={`flex items-center py-2 px-2 !text-base !text-[#4B4B4B] hover:bg-gray-200 rounded-md ${activeItem === item.name ? '!bg-[#FF66001A] !text-[#FF6600] !font-normal' : ''}`}
                                    onClick={() => handleMenuItemClick(item.path, item.name)}
                                >
                                    {item.name}
                                </Menu.Item>
                            ))}
                        </Menu>
                    </div>

                    <div className='mb-4 mt-6 px-3'>
                        <h6 className="text-[#848080] uppercase text-sm font-normal mb-3">Support</h6>
                        <Menu
                            mode="inline"
                            selectedKeys={[activeItem]}
                            style={{ width: 236, borderRight: 0 }}
                        >
                            {supportItems.map((item) => (
                                <Menu.Item
                                    key={item.name}
                                    icon={item.icon}
                                    className={`flex items-center py-2 px-2 !text-base !text-[#4B4B4B] hover:bg-gray-200 rounded-md ${activeItem === item.name ? '!bg-[#FF66001A] !text-[#FF6600] !font-normal' : ''}`}
                                    onClick={() => handleMenuItemClick(item.path, item.name)}
                                >
                                    {item.name}
                                </Menu.Item>
                            ))}
                        </Menu>
                    </div>
                    <div className='mb-4 mt-6 px-3'>
                        <ul>
                            <Button onClick={() => signOut({ callbackUrl: "/auth/signin" })} className='w-full h-[44px] text-base font-normal bg-[#660099] rounded-lg text-white flex items-center justify-start'>
                                <span className='flex items-center'>
                                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                    </svg>
                                    Log Out
                                </span>
                            </Button>
                        </ul>
                    </div>
                </div>
            </div>

            <div
                className={`flex-1 transition-all duration-300 ${
                    isSidebarCollapsed ? 'lg:ml-0' : 'lg:ml-0'
                }`}
            >
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden fixed top-4 left-4 bg-white p-2 rounded-lg shadow-lg z-50"
                >
                    {isSidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </button>

                {children}
            </div>
        </div>
    );
};

export default Sidebar;