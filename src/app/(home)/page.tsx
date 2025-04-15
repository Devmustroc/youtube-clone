import { HomeView } from "@/modules/home/ui/views/home-view";
import { HydrateClient, trpc } from "@/trpc/server";


export const dynamic = "force-dynamic"; // Force dynamic rendering for this page

interface PageProps {
    searchParams: Promise<{
        categoryId?: string;
    }>
}

const Homepage = async ({ searchParams } : PageProps) => {
    const { categoryId } = await searchParams;
    void trpc.categories.getMany.prefetch()
    return (
        <HydrateClient>
            <HomeView categoryId={categoryId} />
        </HydrateClient>
    );
}

export default Homepage;