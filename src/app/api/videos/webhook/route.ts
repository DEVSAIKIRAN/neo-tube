import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import {mux} from "@/lib/mux"
import { UTApi } from "uploadthing/server";
import { VideoAssetCreatedWebhookEvent,VideoAssetErroredWebhookEvent,VideoAssetReadyWebhookEvent,VideoAssetTrackReadyWebhookEvent, VideoAssetDeletedWebhookEvent } from "@mux/mux-node/resources/webhooks.mjs";
import { db } from "@/db";
import { videos } from "@/db/schema";

const SIGNING_SECRET = process.env.MUX_WEBHOOK_SECRET!;

type WebhookEvent = 
  | VideoAssetCreatedWebhookEvent
  | VideoAssetErroredWebhookEvent
  | VideoAssetReadyWebhookEvent
  | VideoAssetTrackReadyWebhookEvent
  | VideoAssetDeletedWebhookEvent

export const POST = async (request: Request) => {

    if (!SIGNING_SECRET) {
        throw new Error("MUX_WEBHOOK_SECRET is not set")
    }


    const headersPayload = await headers();
    const muxSignature = headersPayload.get("mux-signature")

    if (!muxSignature) {
        return new Response("Mo signature found" , {status: 401})
    }

    const payload = await request.json();
    const body = JSON.stringify(payload)

    mux.webhooks.verifySignature(
        body, 
        {
            "mux-signature": muxSignature,
        },
        SIGNING_SECRET,
    );
    switch (payload.type as WebhookEvent["type"]) {
        case "video.asset.created": {
            const data = payload.data as VideoAssetCreatedWebhookEvent["data"];

            if (!data.upload_id) {
                return new Response("NO upload ID found" , {status : 400})
            }
            await db.update(videos).set({
                muxAssestId: data.id,
                muxStatus: data.status
            }).where(eq(videos.muxUploadId, data.upload_id))

            break;
        }
        case "video.asset.ready" : {
            const data = payload.data as VideoAssetReadyWebhookEvent["data"];
            const playbackId = data.playback_ids?.[0]?.id
             const duration = data.duration ? Math.round(data.duration * 1000) : 0;
            if (!data.upload_id) {
                return new Response("Missing upload ID", {status : 400})
            }

            if (!playbackId) {
                return new Response("Missing playback ID", {status: 400})
            }

            const tempThumbnailUrl = `https://image.mux.com/${playbackId}/thumbnail.jpg`;
            const tempPreviewUrl = `https://image.mux.com/${playbackId}/animated.gif`;

            const utapi = new UTApi();
            const [
                uploadedPreview,
                uploadedThumbnail
            ] = await utapi.uploadFilesFromUrl([
                tempPreviewUrl,
                tempThumbnailUrl
            ])

            if (!uploadedPreview.data || !uploadedThumbnail.data){
                return new Response("Failed to up load thumnail or previw" , {status: 500})
            }

        const {key: thumbnailKey, ufsUrl: thumbnailUrl} = uploadedThumbnail.data
        const {key: previewKey, ufsUrl: previewUrl} = uploadedPreview.data           

            await db.update(videos).set({
                muxStatus: data.status,
                muxPlaybackId: playbackId,
                muxAssestId: data.id,
                thumbnailKey,
                previewKey,
                thumbnailUrl,
                previewUrl,
                duration
            }).where(eq(videos.muxUploadId, data.upload_id))

            break;
        }

        case "video.asset.errored" :{
            const data = payload.data as VideoAssetErroredWebhookEvent["data"];

            if (!data.upload_id) {
                return new Response("NO upload ID found" , {status : 400})
            }
            
            await db.update(videos).set({
                muxStatus: data.status,
            }).where(eq(videos.muxUploadId , data.upload_id))

            break;
        }

        case "video.asset.deleted": {
          const data = payload.data as VideoAssetDeletedWebhookEvent["data"];

            if (!data.upload_id) {
                return new Response("NO upload ID found" , {status : 400})
            }
            console.log("Deleting video", {uploadId: data.upload_id})

            await db.delete(videos).where(eq(videos.muxUploadId , data.upload_id))
            break;
        }
        case "video.asset.track.ready" : {
            const data = payload.data as VideoAssetTrackReadyWebhookEvent["data"]& {
              asset_id: string;
            }; 

            


               

            const assetId = data.asset_id
            const trackId = data.id
            const status = data.status

            if (!assetId) {
                return new Response("Missing assest ID", {status:400})

            }
             await db.update(videos).set({muxTrackId: trackId, muxTrackStatus: status}).where(eq(videos.muxAssestId , assetId))

            break;
        }
    }

    return new Response("Webhook receviced", {status: 200})
}