"use client";

import {z} from "zod"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem ,DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import {   CopyCheckIcon, CopyIcon,  Globe2Icon, ImagePlayIcon, LockIcon, MoreVerticalIcon, RotateCcwIcon, Save, SparklesIcon, Trash2 } from "lucide-react";
import { Suspense, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl,FormField,FormLabel,FormMessage,FormItem } from "@/components/ui/form";
import { Select, SelectContent,SelectItem,SelectTrigger,SelectValue } from "@/components/ui/select";
import { ErrorBoundary } from "react-error-boundary";
import  {videoUpdateSchema}  from "@/db/schema";
import { toast } from "sonner";
import { VideoPlayer } from "@/modules/videos/ui/components/video-player";
import Link from "next/link";
import { snakeCaseToTitle } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ThumbnailUploadModal } from "../ui/components/thumbnail-upload-modal";

interface FormSectionProps {
    videoId: string
}



export const FormSection = ({videoId} : FormSectionProps) => {
  return (
     <Suspense fallback={<FormSectionSkeleton />}>
        <ErrorBoundary fallback={<p>Error</p>}>
            <FormSectionSuspense videoId={videoId}/>
        </ErrorBoundary>
     </Suspense>
  )
}

const FormSectionSkeleton = () => {
   return ( <p>Loading</p>)
}

const FormSectionSuspense = ({videoId}: FormSectionProps) => {
 const [thumbnailModalOpen , setThumbnailModalOpen] = useState(false)
 const router = useRouter()
 const utils = trpc.useUtils();
 const [categories] = trpc.categories.getMany.useSuspenseQuery();
 const [ video ] = trpc.studio.getOne.useSuspenseQuery({id: videoId});
 const update = trpc.videos.update.useMutation({
    onSuccess: () =>  {
        utils.studio.getMany.invalidate();
        utils.studio.getOne.invalidate({id: videoId})
        toast.success(" Video updated")
    },
    onError: () => {
        toast.error("Something went wrong")
    }
 })

  const remove = trpc.videos.remove.useMutation({
    onSuccess: () =>  {
        utils.studio.getMany.invalidate();
        utils.studio.getOne.invalidate({id: videoId})
        toast.success(" Video Deleted")
        router.push("/studio")
    },
    onError: (error) => {
        toast.error("Something went wrong")
    }
 })
  const restoreThumbnail = trpc.videos.restoreThumbnail.useMutation({
    onSuccess: () =>  {
        utils.studio.getMany.invalidate();
        utils.studio.getOne.invalidate({id: videoId})
        toast.success(" Thumbnail Restored")
    },
    onError: (error) => {
        toast.error("Something went wrong")
    }
 })
 
  const generateThumbnail = trpc.videos.generateThumbnail.useMutation({
    onSuccess: () =>  {
        toast.success("Background job started", {description: "This may take some time"})
    },
    onError: (error) => {
        toast.error("Something went wrong")
    }
 })

 const form = useForm<z.infer<typeof videoUpdateSchema>>({
    resolver: zodResolver(videoUpdateSchema),
    defaultValues: video
 })

 const onSumbit = async (data: z.infer<typeof videoUpdateSchema>) => {
    update.mutate(data);
    console.log(data)
 }

 const fullUrl = `${process.env.VERCEL_URL || "https://localhost:3000"}/videos/${videoId}`
 const [isCopied , setIsCopied] = useState(false)
 const onCopy = () => {
    navigator.clipboard.writeText(fullUrl)

    setIsCopied(true)

    toast.success("Copied")

    setTimeout(() => {
        setIsCopied(false);
    }, 2000)
 }


 return (
    <>
    <ThumbnailUploadModal open={thumbnailModalOpen} onOpenChange={setThumbnailModalOpen} videoId={videoId}/>
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSumbit)}>
    <div className="flex items-center justify-between mb-6">
        <div>
            <h1 className="text-2xl font-bold">Videos details</h1>
            <p className="text-xs text-muted-foreground">Manage your video details</p>
        </div>
        <div className="flex items-center gap-x-2">
            <Button type="submit" disabled={update.isPending} className="rounded-full bg-transparent text-white border hover:bg-transparent border-neutral-600" >
                Save <Save className="size-3"/>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <MoreVerticalIcon/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-full hover:bg-transparent" >
                    <DropdownMenuItem className="text-red-600 hover:text-red-600 " onClick={() => remove.mutate({id: videoId})}>
                        <Trash2 className="size-4 mr-2"/>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="space-y-8 lg:col-span-3">
            <FormField control={form.control} name="title" render={({field}) => (
                <FormItem>
                    <FormLabel>
                        Title
                    </FormLabel>
                    <FormControl>
                        <Input {...field} placeholder="Add A title to your video" className="rounded-full"/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>
             <FormField control={form.control} name="description" render={({field}) => (
                <FormItem>
                    <FormLabel>
                        Description
                    </FormLabel>
                    <FormControl>
                        <Textarea {...field} placeholder="Add A Description to your video"   className="rounded-2xl resize-none pr-10" value={field.value ?? ""} rows={10}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>
            <FormField name="thumbnailUrl" control={form.control} render={() => (
                <FormItem>
                    <FormLabel>Thumbnail</FormLabel>
                    <FormControl>
                        <div className="p-0.5 border border-dashed  border-neutral-400 relative h-[84px] w-[153px] group">
                            <Image fill alt="Thumbnail" src={video.thumbnailUrl ?? "/placeholder.svg"} className="object-cover"/>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild >
                                    <Button  size="icon" type="button" className="bg-black/30 hover:bg-black/30 top-1 right-1 absolute rounded-full opacity-100 md:opacity-0 group-hover:opacity-100 duration-100 size-7" >
                                        <MoreVerticalIcon className="text-white"/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" side="right">
                                    <DropdownMenuItem onClick={() => setThumbnailModalOpen(true)}>
                                        <ImagePlayIcon className="size-4 mr-1"/>
                                        Change
                                    </DropdownMenuItem>                                
                                    <DropdownMenuItem onClick={() => restoreThumbnail.mutate({ id: videoId})}>
                                        <RotateCcwIcon className="size-4 mr-1"/>
                                         Restore
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </FormControl>
                </FormItem>
            )}/>
            <FormField control={form.control} name="categoryId" render={({field}) => (
                <FormItem>
                    <FormLabel>
                        Category
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value ?? undefined} >
                    <FormControl>
                        <SelectTrigger className="rounded-full">
                            <SelectValue placeholder="Select a category"/>
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-xl">
                        {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id} className="rounded-full">
                            {category.name}
                        </SelectItem>
                        ))}

                    </SelectContent>
                    </Select>
                    <FormMessage/>
                </FormItem>
            )}/>
        </div>
        <div className="flex flex-col gap-y-8 lg:col-span-2">
            <div className="flex flex-col gap-4 rounded-xl overflow-hidden h-fit ">
                <div className="aspect-video overflow-hidden relative">
                    <VideoPlayer playbackId={video.muxPlaybackId} thumbnailUrl={video.thumbnailUrl}/>
                </div>
                <div className="p-4 flex flex-col gap-y-6">
                    <div className="fllex justify-between items-center gap-x-2">
                        <p className="text-muted-foreground text-xs">
                            Video Link
                        </p>
                        <div className="flex items-center gap-x-2">
                        <Link href={`/videos/${video.id}`}>
                        <p className="line-clamp-1 text-sm text-blue-500">
                            {fullUrl}
                        </p>
                        </Link>
                        <Button type="button" variant="ghost" className="shrink-0 rounded-full" size="icon" onClick={onCopy} disabled={isCopied}>
                          {isCopied ? ( <CopyCheckIcon/>) : ( <CopyIcon/>) }
                        </Button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center ">
                  <div className="flex flex-col gap-y-1">
                    <p className="text-muted-foreground text-xs">Video Status</p>
                    <p className="text-sm">{snakeCaseToTitle(video.muxStatus || "Preparing")}</p>
                    </div>     
                </div>
                 <div className="flex justify-between items-center ">
                  <div className="flex flex-col gap-y-1">
                    <p className="text-muted-foreground text-xs">Subtitles Status</p>
                    <p className="text-sm">{snakeCaseToTitle(video.muxTrackStatus || "No Subtiles")}</p>
                    </div>     
                </div>
            </div>
             <FormField control={form.control} name="visibility" render={({field}) => (
                <FormItem>
                    <FormLabel>
                       Visibility
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value ?? undefined} >
                    <FormControl>
                        <SelectTrigger className="rounded-full">
                            <SelectValue placeholder="Select a category"/>
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-xl">
                       
                            <SelectItem value="public">
                            <div className="flex items-center">
                            <Globe2Icon className="size-4 mr-2"/>
                            Public
                            </div>
                        </SelectItem>
                        <SelectItem value="private">
                            <div className="flex items-center">
                            <LockIcon className="size-4 mr-2"/>
                            Private
                            </div>
                            </SelectItem>

                    </SelectContent>
                    </Select>
                    <FormMessage/>
                </FormItem>
             )}/>
        </div>
    </div>
    </form>
    </Form>
    </>
 )
}