import { SidebarProvider } from "@/components/ui/sidebar";
import {HomeSidebar} from "@/modules/home/ui/components/home-sidebar";
import {StudioNavbar} from "@/modules/studio/ui/components/studio-navbar";
import {StudioSidebar} from "@/modules/studio/ui/components/studio-sidebar";



interface LayoutProps {
	children: React.ReactNode;
}

export const StudioLayout = ({ children }: LayoutProps) => {
	return (
		<SidebarProvider>
			<div
				className="w-full"
			>
				<StudioNavbar />
				<div
					className="flex min-h-screen pt-[4rem]"
				>
					<StudioSidebar />
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
