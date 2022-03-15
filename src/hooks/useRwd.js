import { useState, useLayoutEffect } from 'react';

/**
 * Get current device type
 *
 * @returns {string}    desktop, tablet, mobile
 */
const useRWD = () => {
    const [rwdMode, setRwdMode] = useState('desktop'); // RWD mode - desktop, mobile
    const mobileDevice = ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone'];

    /**
     * Set the device type by the userAgent
     *
     * @returns {string}
     */
    const getDevice = () => {
        let mobileType = false; // Mobile type device flag
        // Get the platform is mac or not (for print)
        for (let i = 0; i < mobileDevice.length; i++) {
            if (navigator.userAgent.match('iPhone')) {
                setRwdMode('iPhone');
                mobileType = true;
            } else if (navigator.userAgent.match(mobileDevice[i])) {
                setRwdMode('mobile');
                mobileType = true;
            }
        }

        // Set device by screen resolution when desktop
        if (!mobileType) {
            if (window.innerWidth <= 576) {
                setRwdMode('mobile');
            } else if (window.innerWidth <= 768) {
                setRwdMode('tablet');
            } else {
                setRwdMode('desktop');
            }
        }
    };

    /**
     * Get current device type when before render
     */
    useLayoutEffect(() => {
        window.addEventListener('resize', getDevice);
        getDevice();
        return () => window.removeEventListener('resize', getDevice);
    }, []);

    return rwdMode;
};

export default useRWD;