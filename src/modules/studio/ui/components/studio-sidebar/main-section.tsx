'use client';

import {FlameIcon, Home, PlaySquareIcon} from "lucide-react";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from "@/components/ui/sidebar";
import Link from "next/link";
import {useClerk} from "@clerk/nextjs";
import {useAuth} from "@clerk/clerk-react";

const Items = [
	{
		title: 'Home',
		icon: Home,
		href: '/home',
	},
	{
		title : 'Subscriptions',
		icon : PlaySquareIcon,
		href : '/feed/subscriptions',
		auth: true,
	},
	{
		title: 'Trending',
		icon : FlameIcon,
		href : '/feed/trending',
	}
]

export const MainSection = () => {
	const clerk = useClerk();
	const { isSignedIn } = useAuth();
	return (
		<SidebarGroup>
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
										return clerk.openSignIn();
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
