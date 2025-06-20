"use client"
import { UserAvatar } from "@/components/Avatar";
import { SidebarHeader, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/nextjs"
import Link from "next/link";

export const StudioSidebarHeader = () => {
    const { user } = useUser();
    const { state } = useSidebar();


    if (!user) {
        return (
            <SidebarHeader className="flex items-center justify-center pb-4" >
                <Skeleton className="size-[112px] rounded-full"/>
                <div className="flex flex-col items-center mt-2">
                    <Skeleton className="h-4 w-[80px]"/>
                    <Skeleton className="h-4 w-[100px]"/>
                </div>
            </SidebarHeader>
        )
    }
    return (
        <SidebarHeader className="flex items-center justify-center pb-4">
            <Link href="/users/current">
            <UserAvatar imageUrl={user?.imageUrl} name={user?.fullName ?? "User"} className="size-[112px] hover:opacity-50 transition-opacity"/>
            </Link>
            <div className="flex flex-col items-center mt-2">
                <p className="text-sm font-medium">Your profile</p>
                <p className="text-xs text-muted-foreground">
                    {user.fullName}
                </p>
            </div>
        </SidebarHeader>
    )
}