"use client";

import MuxPlayer from "@mux/mux-player-react"

interface VideoPlayerProps {
    playbackId?: string | null |undefined;
    thumbnailUrl?: string |null | undefined;
    autoPlay?: boolean;
    onPlay?: () => void;
}

export const VideoPlayer = ({ playbackId,thumbnailUrl,autoPlay,onPlay}: VideoPlayerProps) => {
   // if (!playbackId){ return null;}
    return (
       <MuxPlayer  playbackId={playbackId || ""}   poster={thumbnailUrl || "/placeholder.svg"} playerInitTime={0} autoPlay={autoPlay} thumbnailTime={0} className="h-full w-full object-contain rounded-md" accentColor="#0033ff"
  primaryColor="#ffffff"
  secondaryColor="#000000" onPlay={onPlay} />
    )
}