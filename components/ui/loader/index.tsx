import { useState } from 'react';
import styles from './loader.module.css'

const Loader = () => {
    const [isLoading, setIsloading] = useState<boolean>(false)
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.loader}></div>
        </div>
    );
}

export default Loader;