"use client"
import { ResponsiveModal } from "@/components/responsive-dialog"
import { Button } from "@/components/ui/button"
import { trpc } from "@/trpc/client"
import { Loader2Icon, PlusIcon } from "lucide-react"
import { toast } from "sonner"
import { StudioUploader } from "./studio-uploader"
import { useRouter } from "next/navigation"

export const StudioUploadmodal = () => {
    const router = useRouter();
    const utils = trpc.useUtils();
    const create = trpc.videos.create.useMutation({
        onSuccess: () => {
            toast.success("Video Created")
            utils.studio.invalidate();
        },
        onError: () => {
            toast.error("Something Went Wrong")
        }
    })

    const onSucess = () => {
        if(!create.data?.video.id) return;

        create.reset();

        router.push(`/studio/videos/${create.data.video.id}`)
    }
    return (
        <>
        <ResponsiveModal title="Upload a video" open={!!create.data?.url} onOpenChange={() => create.reset()} >
            <StudioUploader endpoint={create.data?.url} onSuccess={onSucess}/>
        </ResponsiveModal>
       {create.isPending ? <Button variant="secondary" className="rounded-full" onClick={() => create.mutate()} disabled>          {create.isPending ? <Loader2Icon className="animate-spin"/> : <PlusIcon/>}Create</Button> : <Button variant="secondary" className="rounded-full" onClick={() => create.mutate()} >
       <PlusIcon/>
            Create
        </Button>}
        </>
    )
}