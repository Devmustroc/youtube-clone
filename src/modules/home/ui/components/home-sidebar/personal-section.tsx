'use client';

import {FlameIcon, HistoryIcon, Home, ListVideoIcon, PlaySquareIcon, ThumbsUpIcon} from "lucide-react";
import {
	SidebarGroup,
	SidebarGroupContent, SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from "@/components/ui/sidebar";
import Link from "next/link";
import {useClerk} from "@clerk/nextjs";
import {useAuth} from "@clerk/clerk-react";

const Items = [
	{
		title: 'History',
		icon: HistoryIcon,
		href: '/playlist/history',
		auth: true,
	},
	{
		title : 'Liked Videos',
		icon : ThumbsUpIcon,
		href : '/playlist/liked',
		auth: 'true',
	},
	{
		title: 'All playlists',
		icon : ListVideoIcon,
		href : '/playlist',
	}
]

export const PersonalSection = () => {
	const clerk = useClerk();
	const { isSignedIn } = useAuth();
	return (
		<SidebarGroup>
			<SidebarGroupLabel>You</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					{Items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								tooltip={item.title}
								asChild
								isActive={false}
								onClick={(e) => {
									if (!isSignedIn && item.auth) {
										e.preventDefault();
										clerk.openSignIn();
									}
								}}
							>
								<Link
									href={item.href}
									className="flex items-center gap-4"
								>
									<item.icon />
									<span
										className="text-sm"
									>
										{item.title}
									</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
};
