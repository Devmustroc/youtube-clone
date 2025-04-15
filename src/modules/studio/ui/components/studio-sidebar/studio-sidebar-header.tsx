'use client'

import {useUser} from "@clerk/nextjs";
import {SidebarHeader, SidebarMenuButton, useSidebar} from "@/components/ui/sidebar";
import Link from "next/link";
import {UserAvatar} from "@/components/user-avatar";
import {Skeleton} from "@/components/ui/skeleton";

export const StudioSidebarHeader = () => {
	const { user } = useUser();
	const { state } = useSidebar();

	if (!user) {
		return (
			<SidebarHeader
				className="flex items-center justify-center pb4"
			>
				<Skeleton className="size-[112px] rounded-full"/>
				<div
					className="flex flex-col items-center gap-y-2"
				>
					<Skeleton className="w-[80px] h-4" />
					<Skeleton className="w-[120px] h-4" />
				</div>
			</SidebarHeader>
		);
	}

	if (state === "collapsed") {
		return (
			<SidebarHeader
				className="flex items-center justify-center pb4"
			>
				<SidebarMenuButton
					tooltip={"Your Profile"}
					asChild
				>
					<Link href={"/users/current"}>
						<UserAvatar
							imageUrl={user?.imageUrl || ''}
							name={user?.fullName || 'User'}
							size="sm"
						/>
						<span className="text-sm font-medium">
							Your profile
						</span>
					</Link>
				</SidebarMenuButton>
			</SidebarHeader>
		)
	}
	return (
		<SidebarHeader
			className="flex items-center justify-center pb4"
		>
			<Link
				href='/users/current'
			>
				<UserAvatar
					imageUrl={user?.imageUrl || ''}
					name={user?.firstName || ''}
					className="size-[112px] hover:opacity-80 transition-opacity"
				/>
			</Link>
			<div
				className="flex flex-col items-center mt-2"
			>
				<p
					className="text-sm font-medium"
				>
					Your Profile
				</p>
				<p
					className="text-xs text-muted-foreground"
				>
					{ user.fullName }
				</p>
			</div>
		</SidebarHeader>
	);
};
