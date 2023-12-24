import { useFormContext, useWatch } from 'react-hook-form';
import { useFilteredResults, useSearchBarMenu } from '../hooks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCity } from '@fortawesome/free-solid-svg-icons';

import { FormDataInputs } from '..';
import { israeliSettlements } from '../constants';

import { TEST_ID } from '../../../common/data/constants/testIds';

/**
 * Renders a settlement search field component aswell as its dropdown menu
 * with the filtered results which is determined by the user's input.
 *
 * @returns {React.JSX.Element} The rendered settlement search field component as JSX element.
 */
export default function SettlementSearchField(): React.JSX.Element {
    const {
        register,
        formState: { isSubmitSuccessful, errors },
        setValue,
    } = useFormContext<FormDataInputs>();
    const query = useWatch<FormDataInputs>({ name: 'settlement', defaultValue: '' });

    const filteredSettlements = useFilteredResults(israeliSettlements, query, 5, 300);
    const {
        isFilteredSearchMenuOpen,
        openFilteredSearchMenu,
        closeFilteredSearchMenu,
        handleSelectedOption,
        handleSearchQueryChange,
    } = useSearchBarMenu(!query, filteredSettlements.length > 0);

    return (
        <div className="relative">
            <input
                className="peer flex w-full items-center rounded-lg py-2 pl-10 pr-1 text-text shadow-lg outline outline-1 outline-text 
                focus:outline-2 focus:outline-primary 
                disabled:cursor-not-allowed disabled:opacity-50
                aria-[invalid=true]:text-[red] aria-[invalid=true]:outline-[red] aria-[invalid=true]:placeholder:text-[red]
                aria-[invalid=true]:placeholder:text-opacity-50 aria-[invalid=true]:focus:outline-[red]
                tablet-sm:text-lg 
                laptop-sm:text-xl 
                laptop-md:text-2xl"
                id="settlement"
                type="text"
                inputMode="search"
                autoComplete="off"
                placeholder="יישוב..."
                aria-invalid={!!errors['settlement']}
                aria-required={true}
                aria-label="הכנס שם של יישוב"
                aria-placeholder="יישוב..."
                aria-errormessage="settlement-search-field-error-message"
                data-is-search-menu-open={isFilteredSearchMenuOpen}
                data-testid={TEST_ID.FEATURE.SEARCH_FORM.SETTLEMENT_SEARCH_FIELD.INPUT}
                onFocus={openFilteredSearchMenu}
                {...register('settlement', {
                    required: {
                        value: true,
                        message: 'שדה חובה',
                    },
                    pattern: {
                        value: /^[\u0590-\u05FF\s-']+$/,
                        message: 'הכנס אותיות בעברית בלבד',
                    },
                    disabled: isSubmitSuccessful,
                    onChange: handleSearchQueryChange,
                    onBlur: closeFilteredSearchMenu,
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
                data-testid={TEST_ID.FEATURE.SEARCH_FORM.SETTLEMENT_SEARCH_FIELD.SVG_ICON}
            />
            <div
                className="absolute right-0 top-10 hidden text-sm font-medium text-[red] transition duration-200 ease-in-out
                peer-aria-[invalid=true]:inline
                mobile-md:text-base
                tablet-sm:top-12 tablet-sm:text-sm
                tablet-md:text-base"
                id="settlement-search-field-error-message"
                role="alert"
                aria-hidden={!errors['settlement']}
                data-testid={TEST_ID.FEATURE.SEARCH_FORM.SETTLEMENT_SEARCH_FIELD.ERROR_MESSAGE}
            >
                {errors['settlement']?.message || 'שגיאה'}
            </div>
            <menu
                className="invisible absolute right-0 top-12 z-20 flex w-full flex-col divide-y rounded-md border border-solid border-text bg-white shadow-lg 
                peer-data-[is-search-menu-open=true]:visible
                tablet-lg:top-[3.75rem]"
                id="settlement-search-menu"
                aria-hidden={!isFilteredSearchMenuOpen}
                data-testid={TEST_ID.FEATURE.SEARCH_FORM.SETTLEMENT_SEARCH_FIELD.MENU}
            >
                {filteredSettlements.map((settlement) => (
                    <li key={settlement}>
                        <button
                            className="w-full rounded-md py-2 pl-4 pr-2 text-start text-base hover:bg-secondary"
                            type="button"
                            data-testid={TEST_ID.FEATURE.SEARCH_FORM.SETTLEMENT_SEARCH_FIELD.MENU_ITEM}
                            onClick={() => handleSelectedOption(settlement, setValue)}
                        >
                            {settlement}
                        </button>
                    </li>
                ))}
            </menu>
        </div>
    );
}
