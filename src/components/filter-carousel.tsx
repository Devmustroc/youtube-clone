"use client";

import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from "@/components/ui/carousel";
import {Badge} from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {useEffect, useState} from "react";
import {Skeleton} from "@/components/ui/skeleton";

interface FilterCarouselProps {
	value?: string | null;
	isLoading?: boolean;
	onSelect: (value: string | null) => void;
	data: {
		label: string;
		value: string;
	} [];
}

export const FilterCarousel = ({
	value,
	isLoading,
	onSelect,
	data,
}: FilterCarouselProps) => {

	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

	useEffect(() => {
		if(!api) return;
		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1);
		})
	}, [api]);

	return <div
		className="relative w-full"
	>
		{ /* Left Fade */}
		<div
			className={cn(
				"absolute left-12 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none",
				current === 1 && "hidden"
			)}
		/>
		<Carousel
			setApi={setApi}
			opts={{
				align: "start",
				dragFree: true,
			}}
			className="w-full px-12"
		>
			<CarouselContent
				className="-ml-3"
			>
				{ !isLoading && (
					<CarouselItem
						onClick={() => onSelect(null)}
						className="pl-3 basis-auto"
					>
						<Badge
							variant={!value ? "default" : "secondary"}
							className="rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap text-sm"
						>
							All
						</Badge>
					</CarouselItem>
				)}
				{/* Loading State */}
				{isLoading && (
					Array.from({ length: 15 }).map((_, index) => (
						<CarouselItem key={index}
							className="pl-3 basis-auto"
						>
							<Skeleton
								className="rounded-lg px-3 py-1 text-sm h-full w-[100px] font-semibold"
							>
								&nbsp;
							</Skeleton>
						</CarouselItem>
					))
				)}
				{/* Data */}
				{!isLoading && data.map((item) => (
					<CarouselItem
						onClick={() => onSelect(item.value)}
						key={item.value}
						className="pl-3 basis-auto"
					>
						<Badge
							variant={value === item.value ? "default" : "secondary"}
							className="rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap text-sm"
						>
							{item.label}
						</Badge>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious
				className="absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
			/>
			<CarouselNext
				className="absolute right-0 top-1/2 -translate-y-1/2 z-20 cursor-pointer"
			/>
		</Carousel>
		{ /* Right Fade */}
		<div
			className={cn(
				"absolute right-12 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none",
				current === count && "hidden"
			)}
		/>
	</div>;
};