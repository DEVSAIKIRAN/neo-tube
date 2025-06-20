import { formatDuration } from "@/lib/utils"
import Image from "next/image"

interface VideoThumbnailProps {
  imageUrl?:string | null
  previewUrl?: string |null
  title: string
  duration: number 
}

export const VideoThumbnail = ({imageUrl, previewUrl, title, duration}:VideoThumbnailProps) => {
    return (
        <div className="relative group rounded">
          <div className="relative w-full overflow-hidden rounded-xl aspect-video">
            <Image src={ imageUrl ?? "/placeholder.svg"} alt={title} fill className="h-full w-full object-cover   group-hover:opacity-0"/>
            <Image unoptimized={!!previewUrl} src={ previewUrl ?? "/placeholder.svg"} alt={title} fill className="h-full w-full object-cover opacity-0  group-hover:opacity-100"/>
          </div>

          <div className="absolute bottom-2 right-2 py-0.5  bg-black/80 text-white text-xs font-medium rounded-full">
          { formatDuration(duration)}</div>
        </div>
    )
}