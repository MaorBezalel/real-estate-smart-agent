import { useBoolean } from '@common/hooks';
import useTimeout from './hooks/useTimeout';

import { LoadingResultsContent } from '@common/components/content';
import { LoadingResultsIllustration } from '@common/components/illustration/';

export default function LoadingResults(): React.JSX.Element {
    const { value: isServerPossiblyIdle, setTrue: assumeServerIsIdle } = useBoolean(false);
    useTimeout(assumeServerIsIdle, 1000 * 3); // 3 seconds

    return (
        <div className="flex flex-col place-items-center gap-14 tablet-lg:gap-28">
            <LoadingResultsIllustration />
            {isServerPossiblyIdle && <LoadingResultsContent />}
        </div>
    );
}
