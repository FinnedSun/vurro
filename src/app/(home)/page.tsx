import { HomeViews } from "@/modules/home/ui/views/home-views";
import { HydrateClient, trpc } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const dynamic = "force-dynamic";
interface PageProps {
  searchParams: Promise<{
    categoryId?: string
  }>
}

const Page = async ({ searchParams }: PageProps) => {
  const { categoryId } = await searchParams;
  void trpc.categories.getMany.prefetch();

  return (
    <HydrateClient>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary fallback={<div>Error!</div>}>
          <HomeViews categoryId={categoryId} />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  );
};
export default Page;
