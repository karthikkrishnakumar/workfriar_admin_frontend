import NavBar from "@/themes/components/nav-bar/nav-bar";
import './global.scss'


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div>
        <NavBar />
        {children}
      </div>
  );
}
