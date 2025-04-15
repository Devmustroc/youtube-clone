import { SidebarProvider } from "@/components/ui/sidebar";
import {HomeSidebar} from "@/modules/home/ui/components/home-sidebar";
import {HomeNavbar} from "@/modules/home/ui/components/home-navbar";



interface LayoutProps {
	children: React.ReactNode;
}

export const StudioLayout = ({ children }: LayoutProps) => {
	return (
		<SidebarProvider>
			<div
				className="w-full"
			>
				<HomeNavbar />
				<div
					className="flex min-h-screen pt-[4rem]"
				>
					<HomeSidebar />
					<main
						className="flex-1 overflow-auto"
					>
						{children}
					</main>
				</div>
			</div>
		</SidebarProvider>
	)
}
