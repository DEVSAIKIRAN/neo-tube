import { Button } from "@/components/ui/button";
import MuxUploader, {MuxUploaderDrop, MuxUploaderFileSelect,MuxUploaderProgress,MuxUploaderStatus} from "@mux/mux-uploader-react"
import { UploadIcon } from "lucide-react";

interface StudioUploaderProps {
    endpoint?: string |null;
    onSuccess: () => void;
}


export const StudioUploader = ({endpoint, onSuccess}: StudioUploaderProps) => {
  const UPLOADER_ID= "video-uploader";
  return (
    <div>
    <MuxUploader endpoint={endpoint} className="hidden group/uploader" id={UPLOADER_ID} onSuccess={onSuccess}/>
    <MuxUploaderDrop muxUploader={UPLOADER_ID} className="group/drop">
    <div className="flex flex-col items-center gap-6" slot="heading">
      <div className="flex items-center justify-center gap-2 rounded-full h-32 w-32 bg-muted">
        <UploadIcon className="size-10 text-muted-foreground group/drop-[&[active]]:animate-bounce transition-all duration-300"/>
      </div>
      <div className="flex flex-col gap-2 text-center">
        <p className="text-sm">Drag and drop video files to upload</p>
        <p className="text-xs text-muted-foreground">Your videos will be private untill you publish them</p>
      </div>
      <MuxUploaderFileSelect muxUploader={UPLOADER_ID}>
        <Button className="rounded-full bg-muted text-white hover:bg-muted" type="button">
          Select Files
        </Button>
      </MuxUploaderFileSelect>
    </div>
     <div slot="separator" className="hidden"/>
     <MuxUploaderStatus muxUploader={UPLOADER_ID} className="text-sm"/>
     <MuxUploaderProgress muxUploader={UPLOADER_ID} className="text-sm" type="percentage"/>
     <MuxUploaderProgress muxUploader={UPLOADER_ID} type="bar"/>
    </MuxUploaderDrop>
    </div>
  )
}