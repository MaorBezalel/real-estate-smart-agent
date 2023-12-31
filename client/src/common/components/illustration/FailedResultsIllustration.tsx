import Lottie from 'lottie-react';

import animationData from '@common/assets/animations/no-items-found.json';
import { TEST_ID } from '@common/data/constants/testIds';

export default function FailedResultsIllustration(): React.JSX.Element {
    return (
        <Lottie
            className="tablet-sm:h-[30rem] tablet-sm:w-[30rem] tablet-sm:self-center
            tablet-lg:h-auto tablet-lg:w-auto"
            animationData={animationData}
            loop={true}
            aria-roledescription="Lottie Illustration"
            aria-label="איור של מישהו עם זכוכית מגדלת וסביבו סימני שאלה וקריאה ושדה חיפוש ריק"
            data-testid={TEST_ID.COMMON.ILLUSTRATION.FAILED_RESULTS}
        />
    );
}
