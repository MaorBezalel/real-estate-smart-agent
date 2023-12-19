import { TEST_ID } from '../data/constants/testIds';

type ContainerProps = {
    className?: string;
    children: React.ReactNode;
};

export default function Container({ className, children }: ContainerProps): React.JSX.Element {
    return (
        <div className={className} data-testid={TEST_ID.COMMON.CONTAINER}>
            {children}
        </div>
    );
}
