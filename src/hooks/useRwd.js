import { useState, useLayoutEffect } from 'react';

/**
 * get current device type
 *
 * @param {object} props
 * @param {boolean} props.isActualDevice  是否要實際裝置值，而非解析度判斷
 *
 * @returns {string} // desktop, tablet, mobile
 */
const useRWD = (props) => {
    const [rwdMode, setRwdMode] = useState('desktop'); // RWD mode - desktop, tablet, mobile
    const mobileDevice = ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone'];

    /**
     * Set the device type by the userAgent
     *
     * @returns {string}
     */
    const getDevice = () => {
        let mobileType = false; // mobile type device flag

        /**  get device by userAgent --start--*/
        if (navigator.userAgent.match('iPad')) {
            setRwdMode('tablet');
            mobileType = true;
        } else {
            for (let i = 0; i < mobileDevice.length; i++) {
                if (navigator.userAgent.match(mobileDevice[i])) {
                    setRwdMode('mobile');
                    mobileType = true;
                }
            }
        }
        /**  get device by userAgent --end--*/

        // set device by screen resolution when desktop
        if (!mobileType && !props?.isActualDevice) {
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
     * get current device type when before render
     *
     */
    useLayoutEffect(() => {
        window.addEventListener('resize', getDevice);
        getDevice();
        return () => window.removeEventListener('resize', getDevice);
    }, []);

    return rwdMode;
};

export default useRWD;