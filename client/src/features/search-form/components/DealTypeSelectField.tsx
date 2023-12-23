import { useFormContext } from 'react-hook-form';
import { useBoolean } from '../../../common/hooks';

import { TEST_ID } from '../../../common/data/constants/testIds';

import { FormDataInputs } from '..';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

export default function DealTypeSelectField(): React.JSX.Element {
    const {
        register,
        formState: { isSubmitSuccessful, errors },
    } = useFormContext<FormDataInputs>();
    const {
        value: hasSelectedOption,
        setTrue: colorTextAsSelected,
        setFalse: colorTextAsPlaceholder,
    } = useBoolean(false);

    const handleChangeOfOption = ({ target: selectElement }: React.ChangeEvent<HTMLSelectElement>) => {
        const wasAnyOptionSelected = selectElement.value !== '';
        if (wasAnyOptionSelected) {
            selectElement.blur(); // Closes the dropdown menu by unfocusing the select element.
            colorTextAsSelected();
        } else {
            colorTextAsPlaceholder();
        }
    };

    return (
        <div
            className="relative w-full
            tablet-lg:w-auto"
        >
            <select
                className="peer flex w-full appearance-none items-center rounded-lg bg-[white] py-2 pl-10 pr-1 text-[#8e8e8e] shadow-lg outline outline-1 outline-text
                hover:cursor-pointer
                focus:outline-2 focus:outline-primary
                disabled:cursor-not-allowed disabled:text-[#8e8e8e] disabled:opacity-50 
                aria-[invalid=true]:text-[red] aria-[invalid=true]:text-opacity-50
                aria-[invalid=true]:outline-[red] aria-[invalid=true]:focus:outline-[red]
                data-[has-selected-option=true]:text-text
                tablet-sm:text-lg 
                tablet-lg:w-auto
                laptop-sm:text-xl
                laptop-md:text-2xl"
                id="dealType"
                autoComplete="off"
                aria-invalid={!!errors['dealType']}
                aria-required={true}
                aria-label="בחר נכס ל"
                aria-placeholder="נכס ל..."
                aria-errormessage="dealType-error-message"
                data-has-selected-option={hasSelectedOption}
                data-testid={TEST_ID.FEATURE.SEARCH_FORM.DEAL_TYPE_SELECT_FIELD.SELECT}
                {...register('dealType', {
                    required: {
                        value: true,
                        message: 'שדה חובה',
                    },
                    onChange: handleChangeOfOption,
                    disabled: isSubmitSuccessful,
                })}
            >
                <option
                    hidden
                    value=""
                    data-testid={TEST_ID.FEATURE.SEARCH_FORM.DEAL_TYPE_SELECT_FIELD.OPTION}
                >
                    נכס ל...
                </option>
                <option
                    value="forsale"
                    className="text-text"
                    data-testid={TEST_ID.FEATURE.SEARCH_FORM.DEAL_TYPE_SELECT_FIELD.OPTION}
                >
                    מכירה
                </option>
                <option
                    value="rent"
                    className="text-text"
                    data-testid={TEST_ID.FEATURE.SEARCH_FORM.DEAL_TYPE_SELECT_FIELD.OPTION}
                >
                    השכרה
                </option>
            </select>
            <div
                className="absolute right-0 top-10 hidden text-sm font-medium text-[red] transition duration-200 ease-in-out
                peer-aria-[invalid=true]:inline
                mobile-md:text-base
                tablet-sm:top-12 tablet-sm:text-sm
                tablet-md:text-base"
                id="dealType-error-message"
                role="alert"
                aria-hidden={!errors['dealType']}
                data-testid={TEST_ID.FEATURE.SEARCH_FORM.DEAL_TYPE_SELECT_FIELD.ERROR_MESSAGE}
            >
                {errors['dealType']?.message || 'שגיאה'}
            </div>
            <FontAwesomeIcon
                icon={faCaretDown}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-accent transition duration-200 ease-in-out
                peer-focus:rotate-180 peer-focus:scale-110 peer-focus:brightness-110
                peer-disabled:opacity-50
                tablet-sm:text-lg 
                laptop-sm:text-xl
                laptop-md:text-2xl"
                data-testid={TEST_ID.FEATURE.SEARCH_FORM.DEAL_TYPE_SELECT_FIELD.SVG_ICON}
            />
        </div>
    );
}
