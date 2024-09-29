import { TfiDashboard } from "react-icons/tfi"
import { LuListTodo } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from 'react';
import { Menu } from "antd";
import { useTheme } from "../../../contexts/ThemeContext";

interface MenuItem {
    label: string;
    path: string;
    icon: JSX.Element;
    children?: MenuItem[];
}

const items: MenuItem[] = [
    {
        label: "Dashboard",
        path: "/home/dashboard",
        icon: <TfiDashboard />
    },
    {
        label: "To-Do",
        path: "/home/to-do",
        icon: <LuListTodo />
    },
    {
        label: "Settings",
        path: "/home/settings",
        icon: <IoSettingsOutline />
    }
];


export const MainTypes = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        navigate("/home/dashboard");
    }, []);

    const { palette } = useTheme();

    const getBreadcrumbItems = () => {
        const pathnames = location.pathname.split('/').filter(x => x);
        return pathnames.map((value, index) => {
            const path = `/${pathnames.slice(0, index + 1).join('/')}`;
            const item = items.find(item => item.path === path);

            return {
                label: item ? item.label : value.charAt(0).toUpperCase() + value.slice(1),
                path
            };
        });
    };

    const breadcrumbItems = getBreadcrumbItems();

    const renderSubMenu = (
        parentPath: string,
        items: MenuItem[],
        label: string,
        icon: JSX.Element
    ) => (
        <Menu.SubMenu key={parentPath} icon={icon} title={label} >
            {items.map((item) =>
                item.children ? (
                    renderSubMenu(item.path, item.children, item.label, item.icon)
                ) : (
                    <Menu.Item key={item.path} icon={item.icon} style={{ color: palette.fontColor }}>
                        <Link style={{ color: palette.fontColor }} to={item.path}>{item.label}</Link>
                    </Menu.Item>
                )
            )}
        </Menu.SubMenu>
    );

    return {
        renderSubMenu,
        items,
        navigate,
        Outlet,
        breadcrumbItems
    }
}