import {HomeLayout} from "@/modules/home/ui/layouts/home-layout";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <HomeLayout>
                <div>
                    {children}
                </div>
            </HomeLayout>
        </div>
    )
}

export default Layout;