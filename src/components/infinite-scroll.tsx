import { useIntersectionObserver } from "@/hooks/use-intersection-obeserver";
import { useEffect } from "react";
import { Button } from "./ui/button";

interface InfiniteScrollProps {
    isManual?: boolean;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
}

export const InfiniteScroll = ({
    isManual ,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
} :InfiniteScrollProps) => {
    const {targetRef, isIntersecting} = useIntersectionObserver({
        threshold: 0.5,
        rootMargin:"100px"
    });
    useEffect(() => {
        if(isIntersecting && hasNextPage && !isFetchingNextPage && !isManual){
          fetchNextPage()  
        }
    },[isIntersecting, hasNextPage, fetchNextPage, isFetchingNextPage, isManual])
    return(
        <div className="flex flex-col items-center gap-4 p-4">
            <div ref={targetRef } className="h-1"/>
            {hasNextPage ?
            (<Button disabled ={!hasNextPage || isFetchingNextPage} onClick={() => fetchNextPage()} className="rounded-full bg-transparent text-white border-neutral-500 border hover:bg-transparent" >
                {isFetchingNextPage ? "Loading.." : "Load More"}
            </Button>)
            : (
                <p className="text-xs text-muted-foreground">
                    You have Reached the end
                </p>
            )}
        </div>
    )
}