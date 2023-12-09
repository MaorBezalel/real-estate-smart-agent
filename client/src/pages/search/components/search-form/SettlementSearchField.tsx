import { useState, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDebounce, useOnUnmount } from '../../hooks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCity } from '@fortawesome/free-solid-svg-icons';

import { FormDataInputs } from './SearchForm';
import { israeliSettlements } from '../../utils/constants';
import { getTopMatches } from '../../utils/helpers';

export default function SettlementSearchField(): React.JSX.Element {
    const {
        register,
        formState: { isSubmitSuccessful, errors },
        watch,
        setValue,
    } = useFormContext<FormDataInputs>();

    const debouncedSearchTerm = useDebounce<string>(watch('settlement'), 300);
    const filteredSettlements = useMemo(() => {
        if (!debouncedSearchTerm) return [];
        return getTopMatches(israeliSettlements, debouncedSearchTerm, 5);
    }, [debouncedSearchTerm]);

    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [blurTimeout, setBlurTimeout] = useState<NodeJS.Timeout | null>(null);
    const handleFocus = ({
        target: { value },
    }: React.FocusEvent<HTMLInputElement>) => {
        if (value) {
            setIsSearching(true);
        }
    };
    const handleBlur = () => {
        setBlurTimeout(setTimeout(() => setIsSearching(false), 100));
    };
    useOnUnmount(() => {
        if (blurTimeout) clearTimeout(blurTimeout);
    });

    const handleMenuItemClick = (settlement: string) => {
        // clear the timeout to prevent the menu from closing
        if (blurTimeout) clearTimeout(blurTimeout);
        setValue('settlement', settlement);
        setIsSearching(false); // close the menu
    };

    const handleChange = ({
        target: { value },
    }: React.ChangeEvent<HTMLInputElement>) => {
        if (!value) {
            setIsSearching(false);
        } else if (!isSearching) {
            setIsSearching(true);
        }
    };

    return (
        <div className="relative">
            <input
                className="peer flex w-full items-center rounded-lg py-2 pl-10 pr-1 text-text shadow-lg outline outline-1 outline-text 
                focus:outline-2 focus:outline-primary 
                disabled:cursor-not-allowed disabled:opacity-50
                aria-[invalid=true]:text-[red] aria-[invalid=true]:outline-[red] aria-[invalid=true]:focus:outline-[red]
                tablet-sm:text-lg 
                laptop-sm:text-xl 
                laptop-md:text-2xl"
                id={'settlement'}
                type="text"
                inputMode="search"
                autoComplete="off"
                placeholder="יישוב..."
                aria-invalid={!!errors['settlement']}
                aria-required={true}
                aria-label="הכנס שם של יישוב"
                aria-placeholder="יישוב..."
                data-is-searching={
                    isSearching &&
                    !!debouncedSearchTerm &&
                    filteredSettlements.length > 0
                }
                onFocus={handleFocus}
                {...register('settlement', {
                    required: {
                        value: true,
                        message: 'שדה חובה',
                    },
                    pattern: {
                        value: /^[\u0590-\u05FF\s-]+$/,
                        message: 'הכנס אותיות בעברית בלבד',
                    },
                    disabled: isSubmitSuccessful,
                    onChange: handleChange,
                    onBlur: handleBlur,
                })}
            />
            <FontAwesomeIcon
                icon={faCity}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-accent transition duration-200 ease-in-out
                peer-focus:scale-110 peer-focus:brightness-110
                peer-disabled:opacity-50
                peer-aria-[invalid=true]:text-[red]
                tablet-sm:text-lg 
                laptop-sm:text-xl
                laptop-md:text-2xl"
            />
            <label
                className="absolute right-0 top-10 hidden text-sm font-medium text-[red] transition duration-200 ease-in-out
                peer-aria-[invalid=true]:inline
                mobile-md:text-base
                tablet-sm:top-12 tablet-sm:text-sm
                tablet-md:text-base"
                htmlFor="settlement"
            >
                {errors['settlement']?.message || 'שגיאה'}
            </label>
            <menu
                className="invisible absolute right-0 top-12 z-20 flex w-full flex-col divide-y rounded-md border border-solid border-text bg-white shadow-lg 
                peer-data-[is-searching=true]:visible
                tablet-lg:top-[3.75rem]"
            >
                {filteredSettlements.map((settlement) => (
                    <li key={settlement}>
                        <button
                            className="w-full rounded-md py-2 pl-4 pr-2 text-start text-base hover:bg-secondary"
                            type="button"
                            onClick={() => handleMenuItemClick(settlement)}
                        >
                            {settlement}
                        </button>
                    </li>
                ))}
            </menu>
        </div>
    );
}
