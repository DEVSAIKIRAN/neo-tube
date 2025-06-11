"use client"
import { Separator } from "@/components/ui/separator"
import { Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { LogOutIcon, VideoIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { StudioSidebarHeader } from "./studio-Header"
export const StudioSidebar = () => {
    const pathname = usePathname()
    return(
        <Sidebar className="pt-16 z-40 border-none" collapsible="icon">
            <SidebarContent className="bg-background">
                <div className=" p-4 flex items-center gap-1 md:hidden">
                        <Image src="/logo.svg" height={32} width={32} alt='logo' />
                        <p className="font-semibold text-xl tracking-tight">Studio</p>
                        </div>
                  <StudioSidebarHeader/>
                <Separator/>
                <SidebarGroup className="gap-y-4"><SidebarMenu><SidebarMenuItem>

                     <SidebarMenuButton tooltip="Exit studio" asChild className="rounded-full items-center justify-center " isActive={pathname === "/studio/videos"}>
                        <Link href="/studio/videos" >
                        <VideoIcon className="sixe-4"/>
                        <h1 className="text-sm">Content</h1>
                        </Link>
                    </SidebarMenuButton>
 <Separator/>
                    <SidebarMenuButton tooltip="Exit studio" asChild className="rounded-full items-center justify-center">
                        <Link href="/" >
                        <LogOutIcon className="sixe-4"/>
                        <h1 className="text-sm">Exit</h1>
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem></SidebarMenu></SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}