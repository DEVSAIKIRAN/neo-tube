"use client";
import { UserButton,SignInButton,SignedIn,SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"
import { Clapperboard, UserCircle } from "lucide-react"

export const AuthButton = () => {
    return (
        <>
        <SignedIn>
            <UserButton>
                <UserButton.MenuItems>
                    <UserButton.Link  label="Studio" href="/studio"  labelIcon={<Clapperboard size={16} className="font-bold"/>}/>
                    <UserButton.Link label="My Profile" href="/" labelIcon={<Clapperboard size={16}/>}/>
                    <UserButton.Action label="manageAccount"/>
                </UserButton.MenuItems>
            </UserButton>
        </SignedIn>
        <SignedOut>
            <SignInButton mode="modal">
     <Button variant="outline" className="px-4 py-2 text-sm font-medium text-blue-500 hover:border-blue-500/25 hover:text-blue-500 rounded-full shadow-none [&_svg]:size-5">
        <UserCircle/>
        <span className="hidden md:inline-flex">Sign in</span>
     </Button>
     </SignInButton>
     </SignedOut>
     </>
    )
}