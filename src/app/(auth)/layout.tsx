import ReduxProvider from "@/redux/redux-provider";
import styles from "../../themes/styles/authlayout.module.scss";
import Image from "next/image";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.layout}>
      <div className={styles.left}>
        <Image src="/logo.svg" alt="Logo" className={styles.logo} height={33.72} width={202} />
        <div className={styles.overlay}>
        </div>
      </div>
      <ReduxProvider>
        <div className={styles.layoutContent}>{children}</div>
      </ReduxProvider>
    </div>
  );
}