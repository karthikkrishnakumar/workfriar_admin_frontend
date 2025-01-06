import ReduxProvider from "@/redux/redux-provider";
import styles from "../../themes/styles/page.module.css";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.layout}>
    <div className={styles.left}>
      <img src="/logo.svg" alt="Logo" className={styles.logo} />
      <img
        src="/front-view-desk.svg"
        alt="Left"
        className={styles.layoutImage}
      />
    </div>
    <ReduxProvider>
    <div className={styles.layoutContent}>{children}</div>
    </ReduxProvider>

  </div>
    
  );
}
