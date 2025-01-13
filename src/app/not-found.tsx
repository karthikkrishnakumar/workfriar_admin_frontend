
import NavBar from '@/themes/components/nav-bar/nav-bar';
import styles from '../themes/styles/not-found.module.scss';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
    <NavBar />
    <div className={styles.container}>
    
    <h1 className={styles.title}>404</h1>
    <p className={styles.message}>Oops! The page you're looking for doesn't exist.</p>
    <Link href="/" className={styles.link}>
      Go Back Home
    </Link>
    </div>
  </>
  );
}
