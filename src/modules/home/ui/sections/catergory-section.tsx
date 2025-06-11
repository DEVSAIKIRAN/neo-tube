"use client";

import { trpc } from "@/trpc/client";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { FilterCarousel } from "@/components/filter-corousel";
import { useRouter } from "next/navigation";

interface CategorySectionProps {
    categoryId?: string;
}
export const CategorySection = ({categoryId}:CategorySectionProps) => {
    return (
        <Suspense fallback={<CategorySectionSkelton/>}>
            <ErrorBoundary fallback={<p>Error</p>}>
                <CategorySectionSuspence/>
            </ErrorBoundary>
        </Suspense>
    )
}

const CategorySectionSkelton = () => {
  return <FilterCarousel isLoading data={[]} onSelect={() => {}}/>
}

export const CategorySectionSuspence = ({categoryId}: CategorySectionProps) => {
    const router = useRouter()
    const [categories] = trpc.categories.getMany.useSuspenseQuery()

    const data = categories.map(({name, id})=> ({
        value: id,
        label: name,
    }));

    const onSelect  = (value: string | null) => {
        const url = new URL(window.location.href);

        if(value) {
            url.searchParams.set("categoryId", value);
        }
        else {
            url.searchParams.delete("categoryId");
        }
        router.push(url.toString())
    }

    return<FilterCarousel onSelect={onSelect} value={categoryId} data={data} />
}