import { useBoolean } from '@common/hooks';
import { useSearchParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import { TEST_ID } from '@common/data/constants/testIds';

type SortByDropdownMenuProps = {
    options: readonly string[];
};

export default function SortByDropdownMenu({ options }: SortByDropdownMenuProps): React.JSX.Element {
    const [searchParams, setSearchParams] = useSearchParams();
    const { value: isMenuOpen, setFalse: closeMenu, toggle: toggleMenu } = useBoolean(false);

    const handleOptionClick = (option: string) => {
        const orderId = (options.indexOf(option) + 1).toString();
        searchParams.set('orderId', orderId);
        setSearchParams(searchParams);
        closeMenu();
    };

    return (
        <div
            className="flex items-center
            justify-between tablet-sm:items-baseline tablet-sm:gap-6"
            data-testid={TEST_ID.FEATURE.RESULTS_CONTROLS.SORT_BY_DROPDOWN_MENU}
        >
            <label
                className="text-2xl font-extrabold text-secondary underline underline-offset-4 antialiased
                mobile-md:text-3xl
                mobile-lg:text-[2rem]
                tablet-md:text-4xl
                tablet-lg:text-[2.5rem]"
                style={{
                    textShadow:
                        '1px 1px 0 #001f24, -1px -1px 0 #001f24, 1px -1px 0 #001f24, -1px 1px 0 #001f24, 1px 1px 0 #001f24',
                }}
            >
                מיין לפי:{' '}
            </label>
            <div className="relative" id="dropdown">
                <button
                    className="peer w-40 rounded-md bg-white py-2 pl-4 pr-2 text-start text-base shadow-lg outline outline-1 outline-text
                    data-[is-open=true]:outline-2 data-[is-open=true]:outline-accent
                    tablet-lg:w-44 tablet-lg:py-3 tablet-lg:text-lg"
                    data-is-open={isMenuOpen}
                    onClick={toggleMenu}
                >
                    <label className="cursor-pointer" htmlFor="dropdown-menu">
                        {options[parseInt(searchParams.get('orderId') || '1') - 1]}
                    </label>
                </button>
                <FontAwesomeIcon
                    icon={faCaretDown}
                    className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer text-accent transition duration-200 ease-in-out
                    peer-data-[is-open=true]:rotate-180 peer-data-[is-open=true]:scale-110 peer-data-[is-open=true]:brightness-110
                    tablet-sm:text-lg 
                    laptop-sm:text-xl
                    laptop-md:text-2xl"
                    onClick={toggleMenu}
                />
                <menu
                    className="invisible absolute right-0 top-12 z-20 flex w-full flex-col divide-y rounded-md border border-solid border-text bg-white shadow-lg 
                    peer-data-[is-open=true]:visible
                    tablet-lg:top-[3.75rem]"
                    id="dropdown-menu"
                >
                    {options.map((option) => (
                        <li key={option}>
                            <button
                                className="w-full rounded-md py-2 pl-4 pr-2 text-start text-base hover:bg-secondary"
                                onClick={() => handleOptionClick(option)}
                            >
                                {option}
                            </button>
                        </li>
                    ))}
                </menu>
            </div>
        </div>
    );
}
