import NavBar from "@/themes/components/nav-bar/nav-bar";
import './global.scss'
import ModuleHeaderWrapper from "@/themes/components/module-header-wrapper/module-header-wrapper";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div>
        <NavBar />
        <ModuleHeaderWrapper />
        {children}
      </div>
  );
}
