'use client'

import { Button } from "@/components/ui/button";
import {Loader2, PlusIcon} from "lucide-react";
import {trpc} from "@/trpc/client";

export const StudioUploadModal = () => {
    const utils = trpc.useUtils();
    const create = trpc.videos.create.useMutation({
        onSuccess: () => {
            utils.studio.getMany.invalidate();
        },
    });
    return (
        <Button
            variant="secondary"
            onClick={() => create.mutate()}
            disabled={create.isPending}
        >
            { create.isPending ? <Loader2 className="animate-spin"/> : <PlusIcon /> }

            Create
        </Button>
    );
};
