import { FailedResultsIllustration } from '@common/components/illustration/';
import { FailedResultsContent } from '@common/components/content';

export default function FailedResults(): React.JSX.Element {
    return (
        <section
            className="flex flex-col gap-4
            tablet-lg:grid tablet-lg:grid-cols-[1fr,1fr]
            laptop-sm:grid-cols-[45%,55%]"
        >
            <FailedResultsContent />
            <FailedResultsIllustration />
        </section>
    );
}
