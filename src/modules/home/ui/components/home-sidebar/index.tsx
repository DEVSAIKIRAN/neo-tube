import { Separator } from "@/components/ui/separator"
import { Sidebar, SidebarContent } from "@/components/ui/sidebar"
import { MainSection } from  "@/modules/home/ui/components/home-sidebar/main-section"
import { PersonalSection } from "@/modules/home/ui/components/home-sidebar/personal-section"
import Image from "next/image"
export const HomeSidebar = () => {
    return(
        <Sidebar className="pt-16 z-40 border-none" collapsible="icon">
            <SidebarContent className="bg-background">
                <div className=" p-4 flex items-center gap-1 md:hidden">
                        <Image src="/logo.svg" height={32} width={32} alt='logo' />
                        <p className="font-semibold text-xl tracking-tight">NeoTube</p>
                        </div>
                <MainSection/>
                <Separator/>
                <PersonalSection/>
            </SidebarContent>
        </Sidebar>
    )
}