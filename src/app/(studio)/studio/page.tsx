import { StudioView } from '@/modules/studio/ui/view/studio-view';
import {HydrateClient, trpc} from '@/trpc/server';
import {DEFAULT_LIMIT} from "@/app/constants/constants";

const Page = async () => {
	void await trpc.studio.getMany.prefetchInfinite({
		limit: DEFAULT_LIMIT,
	});
	return (
		<HydrateClient>
			<StudioView />
		</HydrateClient>
	);
};

export default Page;