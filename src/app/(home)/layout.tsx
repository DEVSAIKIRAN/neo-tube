import { HomeLayout } from "@/modules/home/ui/layout/home-layout";

interface LayoutProps{
    children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
    return(
        <HomeLayout>
            {children}
        </HomeLayout>
    )}
    export default Layout;