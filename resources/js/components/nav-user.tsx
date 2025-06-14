import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { useInitials } from '@/hooks/use-initials';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { User } from '@/types';
import { Link, router } from '@inertiajs/react';
import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface NavUserProps {
    user: User;
}

export function NavUser({ user }: NavUserProps) {
    const { isMobile } = useSidebar();
    const getInitials = useInitials();
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll(); // opsional, jika ingin clear route
    };

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={user.karyawan.user_image || ''} alt={user.karyawan.nama || 'User'} />
                                <AvatarFallback className="rounded-lg">{getInitials(user.karyawan.nama || '')}</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{user.karyawan.nama}</span>
                                <span className="truncate text-xs">{user.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-56 rounded-lg" side={isMobile ? 'bottom' : 'right'} align="end" sideOffset={4}>
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.karyawan.user_image || ''} alt={user.karyawan.nama || 'User'} />
                                    <AvatarFallback className="rounded-lg">{getInitials(user.karyawan.nama || '')}</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{user.karyawan.nama}</span>
                                    <span className="truncate text-xs">{user.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Sparkles />
                                Upgrade to Pro
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <Link href="/settings/account">
                                    <BadgeCheck />
                                    Account
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/settings">
                                    <CreditCard />
                                    Billing
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/settings/notifications">
                                    <Bell />
                                    Notifications
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={route('logout')} method="post" as="button" onClick={handleLogout} className="block w-full">
                                <LogOut />
                                Log out
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
