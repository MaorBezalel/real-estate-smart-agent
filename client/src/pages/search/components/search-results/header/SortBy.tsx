import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

type SortByProps = {
    options: string[];
    selectedOption: string;
    setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
};

export default function SortBy({
    options,
    selectedOption,
    setSelectedOption,
}: SortByProps): React.JSX.Element {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        closeDropdown();
    };

    return (
        <div
            className="flex items-center
            justify-between tablet-sm:items-baseline tablet-sm:gap-6"
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
                    data-is-open={isDropdownOpen}
                    onClick={toggleDropdown}
                >
                    <label className="cursor-pointer" htmlFor="dropdown-menu">
                        {selectedOption}
                    </label>
                </button>
                <FontAwesomeIcon
                    icon={faCaretDown}
                    className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer text-accent transition duration-200 ease-in-out
                    peer-data-[is-open=true]:rotate-180 peer-data-[is-open=true]:scale-110 peer-data-[is-open=true]:brightness-110
                    tablet-sm:text-lg 
                    laptop-sm:text-xl
                    laptop-md:text-2xl"
                    onClick={toggleDropdown}
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
