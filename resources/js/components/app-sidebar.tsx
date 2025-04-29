import { sidebarData } from '@/data/sidebar-data';
import { BaggageClaim } from 'lucide-react';
import React from 'react';
import { NavGroup } from './nav-group';
import { NavUser } from './nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from './ui/sidebar';

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <BaggageClaim className="size-4" />
                                </div>
                                <div className="grid flex-1 items-center text-left text-sm leading-tight">
                                    <span className="font-qurova">Binta App</span>
                                    <span className="truncate text-xs">V.1.0.0</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {sidebarData.navGroups.map((props) => (
                    <NavGroup key={props.title} {...props} />
                ))}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={sidebarData.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
