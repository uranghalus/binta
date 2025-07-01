import { sidebarData } from '@/data/sidebar-data';

import HasAnyPermission from '@/lib/permission';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Flame } from 'lucide-react';
import React from 'react';
import { NavGroup } from './nav-group';
import { NavUser } from './nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from './ui/sidebar';

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { auth } = usePage<SharedData>().props;
    const filteredNavGroups = sidebarData.navGroups
        .map((group) => {
            const filteredItems = group.items.filter((item) => {
                // Cek judul menu yang perlu permission
                if (item.title === 'Role Management') {
                    return HasAnyPermission(['roles index']);
                }

                if (item.title === 'Data Master') {
                    return HasAnyPermission(['users index', 'karyawan index']);
                }

                // Default tampilkan semua menu lainnya
                return true;
            });

            return {
                ...group,
                items: filteredItems,
            };
        })
        .filter((group) => group.items.length > 0);
    return (
        <Sidebar collapsible="icon" variant="floating" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <a href="#">
                                <div className="bg-sidebar-primary flex aspect-square size-8 items-center justify-center rounded-lg text-white dark:text-black">
                                    <Flame className="size-5" />
                                </div>
                                <div className="grid flex-1 items-center text-left text-sm leading-tight">
                                    <span className="font-qurova">VeriFire</span>
                                    <span className="text-muted-foreground truncate text-[10px]">V.1.0.0</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {filteredNavGroups.map((props) => (
                    <NavGroup key={props.title} {...props} />
                ))}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={auth.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
