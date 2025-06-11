import Link from "next/link";
import { VideoGetOneOutput } from "../../types";
import { UserAvatar } from "@/components/Avatar";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { SubscriptionButton } from "@/modules/subscriptions/ui/components/subscription-button";
import { UserInfo } from "@/modules/users/ui/components/user-info";
import { UseSubscription } from "@/modules/subscriptions/hooks/use-subcription";

interface VideoOwnerProps {
    user: VideoGetOneOutput["user"]
    videoId: string
}

export const VideoOwner = ({user , videoId} : VideoOwnerProps) => {
    const { userId :clerkUserId , isLoaded} = useAuth()
    const {isPending, onClick} = UseSubscription({
        userId: user.id,
        isSubscribed: user.isSubscribed,
        fromVideoId: videoId
    })
    return (
        <div className="flex items-center sm:items-start justify-between sm:justify-start gap-3 min-w-0">
            <Link href={`/users/${user.id}`}>
             <div className="flex items-center gap-3 min-w-0">
                <UserAvatar size="lg" name={user.name} imageUrl={user.imageUrl}/>
                <div className="flex flex-col gap-1">
                <UserInfo size="lg" name={user.name}/>
                  <div>
                <span className="text-sm text-muted-foreground line-clamp-1">
                    {user.subscriberCount} subscribers
                </span>
                </div>
                </div>
             </div>
            </Link>
            {clerkUserId === user.clerkId ? (
                <Button variant="secondary" className="rounded-full  bg-[#0033ff] text-white hover:bg-[#032ff]">
                    <Link href={`/studio/videos/${videoId}`}>
                    Edit Video</Link>
                </Button>
            ) : (<SubscriptionButton onClick={onClick} disabled={isPending || !isLoaded} className="flex-none" isSubscribed={user.isSubscribed} />)}
        </div>
    )
}