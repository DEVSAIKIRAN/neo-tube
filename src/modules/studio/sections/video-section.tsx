"use client"

import {format} from "date-fns"
import { InfiniteScroll } from "@/components/infinite-scroll"
import { DEFAULT_LIMIT } from "@/constants"
import { trpc } from "@/trpc/client"
import { Table, TableBody,TableCaption,TableCell,TableFooter,TableHead,TableHeader,TableRow } from "@/components/ui/table"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useRouter } from "next/navigation"
import { VideoThumbnail } from "@/modules/videos/ui/components/video-thumbnail"
import { snakeCaseToTitle } from "@/lib/utils"
import { Globe2Icon, LockIcon } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export const VideoSection = () => {
    return(
    <Suspense fallback={<VideoSectionSkelton/>}>
        <ErrorBoundary fallback={<p>Error</p>}>
            <VideoSectionSuspence/>
        </ErrorBoundary>
    </Suspense>
    )
}

export const VideoSectionSkelton = () => {
    return (
        <>
        <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead className="pl-6 w-[510px]">Video</TableHead>
                            <TableHead>Visibility</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="">Views</TableHead>
                            <TableHead className="">Comments</TableHead>
                            <TableHead className="">Likes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: 5 }).map((_,index) => (
                            <TableRow key={index}>
                                <TableCell className="pl-6">
                                    <div className="flex items-center">
                                        <Skeleton className="h-20 w-36"/>
                                        <div className="flex flex-col gap-2">
                                            <Skeleton className="h-4 w-[100px] rounded-full"/>
                                            <Skeleton className="h-3 w-[150px] rounded-full"/>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                 <Skeleton className="h-4 w-[100px] rounded-full"/>
                                </TableCell>
                                <TableCell>
                                   <Skeleton className="h-4 w-[100px] rounded-full"/>
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-[100px] rounded-full"/>
                                </TableCell>
                                <TableCell>
                                 <Skeleton className="h-4 w-[100px] rounded-full"/>
                                </TableCell>
                                <TableCell>
                                   <Skeleton className="h-4 w-[100px] rounded-full"/>
                                </TableCell>
                                <TableCell>
                                   <Skeleton className="h-4 w-[100px] rounded-full"/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                    </>
    )
}

export const VideoSectionSuspence = () => {
    const router = useRouter()
    const [videos , query] = trpc.studio.getMany.useSuspenseInfiniteQuery({
        limit: DEFAULT_LIMIT,
    }, {
        getNextPageParam: (lastPage) => lastPage.nextCursor
    });
    return (
        <div >
            <div className="border-y">
                <Table>
                    <TableBody>
                        {videos.pages.flatMap((page)=> page.items).map((video) => (
                               <TableRow className="cursor-pointer" key={video.id} onClick={() => router.push(`/studio/videos/${video.id}`)}>
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        <div className="relative aspect-video w-36 shrink-0">
                                            <VideoThumbnail imageUrl={video.thumbnailUrl} previewUrl={video.previewUrl} title={video.title} duration={video.duration || 0}/>
                                        </div>
                                        <div className="flex flex-col overflow-hidden gap-y-1">
                                            <span className="text-sm line-clamp-1 ">{video.title}</span>
                                            <div className="text-sm line-clamp-1 text-muted-foreground">{video.description || "No description"}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center">
                                   {video.visibility === "private" ? (
                                    <LockIcon className="size-4 mr-2"/>
                                   ): (
                                    <Globe2Icon className="size-4 mr-2"/>
                                   )}
                                   {snakeCaseToTitle(video.visibility || "public")}
                                   </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center">
                                        { snakeCaseToTitle(video.muxStatus || "error")}
                                    </div>
                                </TableCell>
                                <TableCell className="text-sm truncate">
                                    {format( new Date(video.createdAt) , "d,MMM,yyyy")}
                                </TableCell>
                                <TableCell>
                                    Views
                                </TableCell>
                                <TableCell>
                                    Comments
                                </TableCell>
                                <TableCell>
                                    Likes
                                </TableCell>
                                </TableRow> 
                        ))}
                    </TableBody>
                </Table>
            </div>
           
            <InfiniteScroll isManual hasNextPage={query.hasNextPage} isFetchingNextPage={query.isFetchingNextPage} fetchNextPage={query.fetchNextPage}/>
        </div>
    )
}