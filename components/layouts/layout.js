import Head from 'next/head';
import { useRouter } from "next/router";

import Nav from './nav';
import styles from './layout.module.css';

const Layout = ({children}) => {

    const router = useRouter();

    return (
        <>
            <Head>
                <title>SHome</title>
                <link rel="icon" href="/favicon.ico" />
                {/* bootstrap */}
                <link rel="stylesheet" href="/bootstrap.min.css" />
                <script src='/jquery-3.5.1.min.js'></script>
                <script src='/bootstrap.bundle.min.js'></script>
            </Head>
            
            <div className={`container ${styles.grid}`}>
                <Nav currentRout={router.pathname}/>
                {children}
            </div>
            
        </>
    )
}

export default Layout;