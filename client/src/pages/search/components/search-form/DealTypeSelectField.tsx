import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormDataInputs } from './SearchForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

export default function DealTypeSelectField(): React.JSX.Element {
    const {
        register,
        formState: { isSubmitSuccessful, errors },
    } = useFormContext<FormDataInputs>();
    const [isSelected, setIsSelected] = useState(false);

    const handleOptionClick = (
        e: React.ChangeEvent<HTMLSelectElement>
    ): void => {
        const select = e.target;

        select.blur(); // Closes the dropdown menu by unfocusing the select element.
        setIsSelected(true);
    };

    return (
        <div
            className="relative w-full
            tablet-lg:w-auto"
        >
            <select
                className="peer flex w-full appearance-none items-center rounded-lg py-2 pl-10 pr-1 text-[#8e8e8e] shadow-lg outline outline-1 outline-text
                hover:cursor-pointer
                focus:outline-2 focus:outline-primary
                disabled:cursor-not-allowed disabled:text-[#8e8e8e] disabled:opacity-50 
                aria-selected:text-text
                aria-[invalid=true]:text-[red] aria-[invalid=true]:outline-[red] aria-[invalid=true]:focus:outline-[red]
                tablet-sm:text-lg 
                tablet-lg:w-auto
                laptop-sm:text-xl
                laptop-md:text-2xl"
                id="deal-type"
                autoComplete="off"
                aria-selected={isSelected}
                aria-invalid={!!errors['deal-type']}
                aria-required={true}
                aria-label="בחר נכס ל..."
                aria-placeholder="נכס ל..."
                {...register('deal-type', {
                    required: {
                        value: true,
                        message: 'שדה חובה',
                    },
                    onChange: handleOptionClick,
                    disabled: isSubmitSuccessful,
                })}
            >
                <option hidden value="">
                    נכס ל...
                </option>
                <option value="forsale" className="text-text">
                    מכירה
                </option>
                <option value="rent" className="text-text">
                    השכרה
                </option>
            </select>
            <label
                className="absolute right-0 top-10 hidden text-sm font-medium text-[red] transition duration-200 ease-in-out
                peer-aria-[invalid=true]:inline
                mobile-md:text-base
                tablet-sm:top-12 tablet-sm:text-sm
                tablet-md:text-base"
                htmlFor="settlement"
            >
                {errors['deal-type']?.message || 'שגיאה'}
            </label>
            <FontAwesomeIcon
                icon={faCaretDown}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-accent transition duration-200 ease-in-out
                peer-focus:rotate-180 peer-focus:scale-110 peer-focus:brightness-110
                peer-disabled:opacity-50
                tablet-sm:text-lg 
                laptop-sm:text-xl
                laptop-md:text-2xl"
            />
        </div>
    );
}
