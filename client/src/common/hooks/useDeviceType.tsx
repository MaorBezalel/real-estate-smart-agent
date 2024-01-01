import { useState, useEffect } from 'react';

type DeviceType = 'mobile' | 'desktop';

type UseDeviceTypeResult = {
    value: DeviceType;
    isMobile: boolean;
    isDesktop: boolean;
};

/**
 * A hook that determines the device type (mobile or desktop).
 * The device type is determined on mount and won't change after that (even if the viewport changes).
 *
 * @returns {UseDeviceTypeResult} - The device type and a boolean indicating whether the device is mobile or desktop.
 */
export default function useDeviceType(): UseDeviceTypeResult {
    const [value, setValue] = useState<DeviceType>('desktop');

    useEffect(() => {
        const isMobile = window.matchMedia('(max-width: 767px)').matches;
        setValue(isMobile ? 'mobile' : 'desktop');
    }, []);

    return {
        value,
        isMobile: value === 'mobile',
        isDesktop: value === 'desktop',
    };
}
