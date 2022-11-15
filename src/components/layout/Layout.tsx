import { HeaderMegaMenu } from "../header/HeaderMegaMenu";

interface LayoutProps {
  children: any;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <HeaderMegaMenu />
      {children}
    </>
  );
}
