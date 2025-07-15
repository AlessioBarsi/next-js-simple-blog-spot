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

    return (
        <Sidebar>
            <SidebarHeader>

                <HeaderButtons />

            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup />
                <SidebarGroupLabel>Application</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <a href={item.url}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
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