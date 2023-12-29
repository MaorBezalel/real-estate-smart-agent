import '@common/assets/animations/loading.css';
import { TEST_ID } from '@common/data/constants/testIds';

export default function LoadingResultsIllustration(): React.JSX.Element {
    return (
        <div
            className="pac-man self-end
            mobile-md:mr-48 mobile-md:self-auto
            mobile-lg:mr-52"
            data-testid={TEST_ID.COMMON.ILLUSTRATION.LOADING_RESULTS}
        />
    );
}
