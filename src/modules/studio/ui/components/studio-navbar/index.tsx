import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { AuthButton } from "@/modules/Auth/ui/components/Auth-button";
import { StudioUploadmodal } from "../studio-upload-modal";
export const StudioNavbar = () => {
    return(
        <nav className="fixed top-0 left-0 right-0 h-16 bg-black flex items-center px-2 pr-5 z-50">
    <div className="flex items-center gap-4 w-full">
        {/**Menu and logo */}
        <div className="flex items-center flex-shrink-0">
<div className="md:hidden flex items-center">        <SidebarTrigger/> <div className=" p-4 flex items-center gap-1 ">
        <Image src="/logo.svg" height={32} width={32} alt='logo' />
        <p className="font-semibold text-xl tracking-tight">Studio</p>
        </div></div>
        <div className="hidden md:block">
        <Link href="/studio">
        <div className=" p-4 flex items-center gap-1 ">
        <Image src="/logo.svg" height={32} width={32} alt='logo' />
        <p className="font-semibold text-xl tracking-tight">Studio</p>
        </div>
        </Link>
        </div>
        </div>
        {/**Search bar */}
        <div className="flex-1"/>
        <div className="flex-shrink-0 items-center flex gap-4">
            <StudioUploadmodal/>
         <AuthButton/>
        </div>
        </div>    
    </nav>
    )
}
export default StudioNavbar;