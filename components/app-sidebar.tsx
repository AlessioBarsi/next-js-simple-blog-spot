'use client';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Book, Home, Info, ScrollText, ShieldUser, StickyNote, Users } from "lucide-react"
import { HeaderButtons } from "./auth/AuthButtons"
import { ModeToggle } from "./ModeToggle"
import { useSession } from "next-auth/react"

const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Posts",
        url: "/posts",
        icon: StickyNote,
    },
    {
        title: "Categories",
        url: "/categories",
        icon: ScrollText,
    },
    {
        title: "Genres",
        url: "/genres",
        icon: Book,
    },
    {
        title: "Users",
        url: "/users",
        icon: Users,
    },
    {
        title: "Roles",
        url: "/roles",
        icon: ShieldUser,
    }
]

export function AppSidebar() {
    const { data: session } = useSession();
    const hasRoles = session?.user?.userHasRoles && session.user.userHasRoles.length > 0;
    console.log(hasRoles)
    return (
        <Sidebar>
            <SidebarHeader>

                <HeaderButtons />
                <ModeToggle />

            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup />
                <SidebarGroupLabel>Blogspot</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item) =>
                            (hasRoles || (item.title === "Home" || item.title === "Posts")) ? (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ) : null
                        )}
                    </SidebarMenu>
                </SidebarGroupContent>
                <SidebarGroup />
            </SidebarContent>

            <SidebarFooter>

                <SidebarMenuItem key="about">
                    <SidebarMenuButton asChild>
                        <a href="/about">
                            <Info />
                            <span>About</span>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>

            </SidebarFooter>
        </Sidebar>
    )
}