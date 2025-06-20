import { StudioLayout } from "@/modules/studio/ui/layout/studio-layout";

interface LayoutProps{
    children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
    return(
        <StudioLayout>
            {children}
        </StudioLayout>
    )}
    export default Layout;