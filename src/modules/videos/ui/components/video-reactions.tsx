"use client"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils"
import {  ThumbsDownIcon, ThumbsUpIcon } from "lucide-react"
import { VideoGetOneOutput } from "../../types";
import { useClerk } from "@clerk/nextjs";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";

interface VideoReactionsProps {
    video:VideoGetOneOutput
    videoId:string
    likes:number
    dislikes:number
    viewerReaction: VideoGetOneOutput["viewerReaction"]
}

export const VideoReactions = ({ video,videoId, likes,dislikes, viewerReaction}:VideoReactionsProps) => {
    const clerk = useClerk()
    const utils = trpc.useUtils()

    const like = trpc.videoReactions.like.useMutation({
        onSuccess: () => {
            toast.success("Liked!")
            utils.videos.getOne.invalidate({id: videoId})
        },
        onError: (error) => {
            toast.error("Something went wrong")

            if (error.data?.code === "UNAUTHORIZED") {
                clerk.openSignIn()
            }
        }
    })
    const dislike = trpc.videoReactions.dislike.useMutation({
         onSuccess: () => {
            utils.videos.getOne.invalidate({id: videoId})
        },
        onError: (error) => {
            toast.error("Something went wrong")

            if (error.data?.code === "UNAUTHORIZED") {
                clerk.openSignIn()
            }
        }
    })
    return (
        <div className="flex items-center flex-none">
            <Button className="bg-muted-foreground  rounded-full bg-neutral-800 text-white hover:bg-neutral-800 gap-2 pr-4" variant="secondary" onClick={() => like.mutate({videoId})} disabled={like.isPending || dislike.isPending}>
                <ThumbsUpIcon className={cn("size-5", viewerReaction === "like" && "fill-white")}/>
                {video.likeCount}
            </Button>
            <Separator orientation="vertical" className="h-7"/>
            <Button className="bg-muted-foreground  rounded-full bg-neutral-800 text-white hover:bg-neutral-800  pr-3 "variant="secondary" onClick={() => dislike.mutate({videoId})} disabled={like.isPending || dislike.isPending}>
                <ThumbsDownIcon className={cn("size-5", viewerReaction === "dislike" && "fill-white")}/>
                {video.dislikeCount}
            </Button>
        </div>
    )
}