import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ListPlusIcon, MoreVerticalIcon, Share2, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface VideoMenuProps {
    videoId: string
    variant?: "ghost" | "secondary";
    onRemove?: () => void
}

export const VideoMenu = ({videoId, variant,onRemove}: VideoMenuProps) => {
     const fullUrl = `${process.env.VERCEL_URL || "https://localhost:3000"}/videos/${videoId}`
     const onCopy = () => {
        navigator.clipboard.writeText(fullUrl)
    
        toast.success("Copied to clipbord")
     }
    
    return (
       <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant={variant} className="bg-muted-foreground  rounded-full bg-neutral-800 text-white hover:bg-neutral-800 " size="icon">
            <MoreVerticalIcon className="size-5"/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation}>
            <DropdownMenuItem onClick={onCopy}>
                <Share2 className="mr-2 size-4"/>
                Share
            </DropdownMenuItem>
             <DropdownMenuItem onClick={() => {}}>
                <ListPlusIcon className="mr-2 size-4"/>
                Add to playlist
            </DropdownMenuItem>
            {onRemove && (
             <DropdownMenuItem onClick={() => {}} className="text-red-700 hover:text-red-800">
                <Trash2Icon className="mr-2 size-4 text-red-700 hover:text-red-700"/>
                Remove
            </DropdownMenuItem>
            )}
        </DropdownMenuContent>
       </DropdownMenu>
    )
}