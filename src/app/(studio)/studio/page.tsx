import { DEFAULT_LIMIT } from "@/constants";
import {StudioView} from "@/modules/studio/views/studio-view";
import { HydrateClient, trpc } from "@/trpc/server"

const page = () => {
   void trpc.studio.getMany.prefetchInfinite({
    limit:DEFAULT_LIMIT,
   });

  return (
    <HydrateClient>
      <StudioView/>
    </HydrateClient>
  )
}

export default page