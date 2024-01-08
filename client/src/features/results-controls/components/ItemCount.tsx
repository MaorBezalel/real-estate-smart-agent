import { TEST_ID } from '@common/data/constants/testIds';

type ItemCountProps = {
    count: number;
};

export default function ItemCount({ count }: ItemCountProps): React.JSX.Element {
    return (
        <div
            className="flex items-baseline gap-2 self-center tablet-lg:self-auto"
            data-testid={TEST_ID.FEATURE.RESULTS_CONTROLS.ITEM_COUNT}
        >
            <label
                className="inline-block min-w-max text-2xl font-extrabold text-secondary underline underline-offset-4 antialiased
                mobile-md:text-3xl
                mobile-lg:text-[2rem]
                tablet-md:text-4xl
                tablet-lg:text-[2.5rem]"
                style={{
                    textShadow:
                        '1px 1px 0 #001f24, -1px -1px 0 #001f24, 1px -1px 0 #001f24, -1px 1px 0 #001f24, 1px 1px 0 #001f24',
                }}
                id="item-count"
            >
                כמות התוצאות:{' '}
            </label>
            <p
                className="text-2xl text-primary
                mobile-md:text-3xl
                mobile-lg:text-[2rem]
                tablet-md:text-4xl
                tablet-lg:text-[2.5rem]"
                style={{
                    textShadow:
                        '1px 1px 0 #001f24, -1px -1px 0 #001f24, 1px -1px 0 #001f24, -1px 1px 0 #001f24, 1px 1px 0 #001f24',
                }}
                aria-labelby="item-count"
            >
                {count}
            </p>
        </div>
    );
}
