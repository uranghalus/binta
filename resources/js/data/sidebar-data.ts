import { type SidebarData } from '@/types/layout';
import { DatabaseZap, LayoutDashboard, ListTodo, MessageCircle, Package2, UserCog } from 'lucide-react';

export const sidebarData: SidebarData = {
    user: {
        name: 'satnaing',
        email: 'satnaingdev@gmail.com',
        avatar: '/avatars/shadcn.jpg',
    },
    navGroups: [
        {
            title: 'General',
            items: [
                {
                    title: 'Dashboard',
                    url: '/dashboard',
                    icon: LayoutDashboard,
                },
                {
                    title: 'Data Master',
                    icon: DatabaseZap,
                    items: [
                        {
                            title: 'Data Pengguna',
                            url: '/master-data/pengguna',
                        },
                        {
                            title: 'Data Departemen',
                            url: '/master-data/departemen',
                        },
                        {
                            title: 'Data Jabatan',
                            url: '/master-data/jabatan',
                        },
                        {
                            title: 'Data Role',
                            url: '/master-data/role',
                        },
                        {
                            title: 'Data Unit Bisnis',
                            url: '/master-data/unit-bisnis',
                        },
                        {
                            title: 'Data Karyawan',
                            url: '/master-data/karyawan',
                        },
                    ],
                },
                {
                    title: 'Tasks',
                    url: '/tasks',
                    icon: ListTodo,
                },
                {
                    title: 'Apps',
                    url: '/apps',
                    icon: Package2,
                },
                {
                    title: 'Chats',
                    url: '/chats',
                    badge: '3',
                    icon: MessageCircle,
                },
                {
                    title: 'Users',
                    url: '/users',
                    icon: UserCog,
                },
            ],
        },
        // {
        //     title: "Data Master",
        //     items: [
        //         {
        //             title: "Auth",
        //             icon: LockAccess,
        //             items: [
        //                 {
        //                     title: "Sign In",
        //                     url: "/sign-in",
        //                 },
        //                 {
        //                     title: "Sign In (2 Col)",
        //                     url: "/sign-in-2",
        //                 },
        //                 {
        //                     title: "Sign Up",
        //                     url: "/sign-up",
        //                 },
        //                 {
        //                     title: "Forgot Password",
        //                     url: "/forgot-password",
        //                 },
        //                 {
        //                     title: "OTP",
        //                     url: "/otp",
        //                 },
        //             ],
        //         },
        //         {
        //             title: "Errors",
        //             icon: Bug,
        //             items: [
        //                 {
        //                     title: "Unauthorized",
        //                     url: "/401",
        //                     icon: Lock,
        //                 },
        //                 {
        //                     title: "Forbidden",
        //                     url: "/403",
        //                     icon: UserOff,
        //                 },
        //                 {
        //                     title: "Not Found",
        //                     url: "/404",
        //                     icon: Error404,
        //                 },
        //                 {
        //                     title: "Internal Server Error",
        //                     url: "/500",
        //                     icon: ServerOff,
        //                 },
        //                 {
        //                     title: "Maintenance Error",
        //                     url: "/503",
        //                     icon: BarrierBlock,
        //                 },
        //             ],
        //         },
        //     ],
        // },
        // {
        //     title: "Other",
        //     items: [
        //         {
        //             title: "Settings",
        //             icon: Settings,
        //             items: [
        //                 {
        //                     title: "Profile",
        //                     url: "/settings",
        //                     icon: UserCog,
        //                 },
        //                 {
        //                     title: "Account",
        //                     url: "/settings/account",
        //                     icon: Tool,
        //                 },
        //                 {
        //                     title: "Appearance",
        //                     url: "/settings/appearance",
        //                     icon: Palette,
        //                 },
        //                 {
        //                     title: "Notifications",
        //                     url: "/settings/notifications",
        //                     icon: Notification,
        //                 },
        //                 {
        //                     title: "Display",
        //                     url: "/settings/display",
        //                     icon: BrowserCheck,
        //                 },
        //             ],
        //         },
        //         {
        //             title: "Help Center",
        //             url: "/help-center",
        //             icon: Help,
        //         },
        //     ],
        // },
    ],
};
