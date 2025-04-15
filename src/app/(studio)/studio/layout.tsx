import React from 'react';
import {StudioLayout} from "@/modules/studio/ui/layout/studio-layout";


interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<div>
			<StudioLayout>
				<div>
					{children}
				</div>
			</StudioLayout>
		</div>
	)
}

export default Layout;