import { type SidebarData } from "../js/types/layout";
import {
    LayoutDashboard,
    ListTodo,
    MessageCircle,
    Package2,
    UserCog,
} from "lucide-react";
export const sidebarData: SidebarData = {
    user: {
        name: "satnaing",
        email: "satnaingdev@gmail.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navGroups: [
        {
            title: "General",
            items: [
                {
                    title: "Dashboard",
                    url: "/dashboard",
                    icon: LayoutDashboard,
                },
                {
                    title: "Tasks",
                    url: "/tasks",
                    icon: ListTodo,
                },
                {
                    title: "Apps",
                    url: "/apps",
                    icon: Package2,
                },
                {
                    title: "Chats",
                    url: "/chats",
                    badge: "3",
                    icon: MessageCircle,
                },
                {
                    title: "Users",
                    url: "/users",
                    icon: UserCog,
                },
            ],
        },
        // {
        //     title: "Pages",
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
