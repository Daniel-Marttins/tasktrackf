import React from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
import logo from '../../assets/img/Logo-white.png';
import { MainTypes } from './components/MainTypes';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

const { Header, Content, Sider } = Layout;


export const Home: React.FC = () => {
    const {
        renderSubMenu,
        items,
        Outlet,
        breadcrumbItems
    } = MainTypes();
    const { palette, theme } = useTheme();

    return (
        <Layout className='w-full h-full' style={{ background: "#1F2127" }}>
            <Header style={{ display: 'flex', alignItems: 'center', justifyContent: "start" }} className='bg-transparent mt-2'>
                <div className="flex items-center justify-start w-50 h-20 transition-all ease-out duration-200">
                    <img src={logo} style={{ width: 45, height: 45 }} alt="Logo" />
                    <h1 className="text-2xl ml-2 py-2 px-4 w-full text-white rounded-md font-semibold">
                        TaskTrack
                    </h1>
                </div>
            </Header>
            <Content
                className='flex flex-col items-center justify-center'
                style={{ padding: '15px 50px', height: "50%" }}
            >
                <Breadcrumb className='flex w-full items-center justify-start text-white mb-3' style={{ color: palette.fontColor }}>
                    {breadcrumbItems.map((item, index) => (
                        <Breadcrumb.Item key={index} className='text-white'>
                            {item.label}
                        </Breadcrumb.Item>
                    ))}
                </Breadcrumb>
                <Layout
                    style={{
                        padding: '24px 0',
                        background: palette.background
                    }}
                    className='w-full rounded-md'
                >
                    <Sider width={200} style={{ background: palette.background }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={["/home/dashboard"]}
                            
                            style={{ height: '100%', background: palette.background, color: palette.fontColor }}
                            theme={theme === "dark" ? "light" : "dark"}  
                        >
                            {items.map((item) =>
                                item.children ? (
                                    renderSubMenu(item.path, item.children, item.label, item.icon)
                                ) : (
                                    <Menu.Item key={item.path} className={theme === 'dark' ? 'custom-menu-item-light' : 'custom-menu-item'} icon={item.icon} style={{ color: palette.iconsColor }}>
                                        <Link className={theme === 'dark' ? 'custom-menu-item-light' : 'custom-menu-item'} style={{ color: 'custom-menu-item-light' }} to={item.path}>{item.label}</Link>
                                    </Menu.Item>
                                )
                            )}
                        </Menu>
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280, background: palette.background, color: palette.fontColor }}><Outlet /></Content>
                </Layout>
            </Content>
        </Layout>
    );
};