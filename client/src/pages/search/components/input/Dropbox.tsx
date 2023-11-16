import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

export default function Dropbox(): React.JSX.Element {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <div
            className="relative w-full
            tablet-lg:w-auto"
        >
            <select
                className="peer flex w-full appearance-none items-center rounded-lg py-2 pl-10 pr-1 text-[#8e8e8e] shadow-lg outline outline-1 outline-text
                hover:cursor-pointer
                focus:outline-2 focus:outline-primary aria-checked:text-text
                tablet-sm:text-lg 
                tablet-lg:w-auto
                laptop-sm:text-xl
                laptop-md:text-2xl"
                id="deal-type"
                aria-checked={isChecked}
                onChange={() => setIsChecked(true)}
            >
                <option hidden value={'bad'}>
                    נכס ל...
                </option>
                <option value="forsale" className="text-text">
                    מכירה
                </option>
                <option value="rent" className="text-text">
                    השכרה
                </option>
            </select>
            <FontAwesomeIcon
                icon={faCaretDown}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-accent transition duration-200 ease-in-out
                peer-focus:rotate-180 peer-focus:scale-110 peer-focus:brightness-110
                tablet-sm:text-lg 
                laptop-sm:text-xl
                laptop-md:text-2xl"
            />
        </div>
    );
}
