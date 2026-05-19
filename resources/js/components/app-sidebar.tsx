import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Building2, Car, LayoutGrid, PersonStanding, Wrench } from 'lucide-react';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Office',
        url: '/office',
        icon: Building2,
    },
    {
        title: 'Booking',
        url: '/booking',
        icon: BookOpen,
    },
    {
        title: 'Vehicle',
        url: '/vehicle',
        icon: Car,
    },
    {
        title: 'Driver',
        url: '/driver',
        icon: PersonStanding,
    },
    {
        title: 'Vehicle Service',
        url: '/service',
        icon: Wrench,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <h1 className="text-xl">Aplikasi Management Pemakaian Kendaraan</h1>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
