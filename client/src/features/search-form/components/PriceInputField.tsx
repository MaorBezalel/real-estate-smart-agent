import { useFormContext } from 'react-hook-form';
import { FormDataInputs } from '..';
import { keepOnlyDigits, formatPrice } from '../helpers';

import { TEST_ID } from '../../../common/data/constants/testIds';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShekelSign } from '@fortawesome/free-solid-svg-icons';

type PriceFieldProps = {
    type: 'minPrice' | 'maxPrice';
};

/**
 * Renders a price input field component.
 *
 * @param {PriceFieldProps} type - The type of the price field (minPrice or maxPrice).
 * @returns {React.JSX.Element} The rendered price input field component as JSX element.
 */
export default function PriceInputField({ type }: PriceFieldProps): React.JSX.Element {
    const {
        register,
        formState: { isSubmitSuccessful, errors },
    } = useFormContext<FormDataInputs>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '') return;
        if (value.charAt(0) === '0') e.target.value = '0';
        else e.target.value = formatPrice(keepOnlyDigits(value), false);
    };

    return (
        <div className="relative">
            <input
                className="peer flex w-full items-center rounded-lg py-2 pl-10 pr-1 text-text shadow-lg outline outline-1 outline-text 
                focus:outline-2 focus:outline-primary 
                disabled:cursor-not-allowed disabled:opacity-50
                aria-[invalid=true]:text-[red] aria-[invalid=true]:outline-[red] aria-[invalid=true]:placeholder:text-[red] aria-[invalid=true]:placeholder:text-opacity-50 aria-[invalid=true]:focus:outline-[red]
                tablet-sm:text-lg 
                laptop-sm:text-xl 
                laptop-md:text-2xl"
                id={`${type}-input-field`}
                type="text"
                inputMode="numeric"
                autoComplete="off"
                placeholder={`מחיר ${type === 'minPrice' ? 'מינימלי' : 'מקסימלי'}...`}
                aria-invalid={!!errors[type]}
                aria-required={true}
                aria-label={`הכנס מחיר ${type === 'minPrice' ? 'מינימלי' : 'מקסימלי'}`}
                aria-placeholder={`מחיר ${type === 'minPrice' ? 'מינימלי' : 'מקסימלי'}...`}
                aria-errormessage={`${type}-input-field-error-message`}
                data-testid={
                    type === 'minPrice'
                        ? TEST_ID.FEATURE.SEARCH_FORM.PRICE_INPUT_FIELD.MIN_PRICE.INPUT
                        : TEST_ID.FEATURE.SEARCH_FORM.PRICE_INPUT_FIELD.MAX_PRICE.INPUT
                }
                {...register(type, {
                    required: {
                        value: true,
                        message: 'שדה חובה',
                    },
                    min: {
                        value: 0,
                        message: 'מחיר אינו יכול להיות נמוך מ-0 ₪',
                    },
                    max: {
                        value: 1_000_000_000,
                        message: 'מחיר אינו יכול להיות גבוה מ-1,000,000,000 ₪',
                    },
                    disabled: isSubmitSuccessful,
                    pattern: {
                        value: /^[,\d]*$/,
                        message: 'הכנס מספרים בלבד',
                    },
                    onChange: handleChange,
                    setValueAs: (value: string) => (value !== '' ? Number(keepOnlyDigits(value)) : ''),
                    validate: {
                        minPrice: (value: string, values: FormDataInputs) => {
                            if (type === 'maxPrice') return true;
                            if (values['maxPrice'] === '') return true;
                            return (
                                Number(value) <= Number(values['maxPrice']) ||
                                'מחיר מינימלי חייב להיות נמוך ממחיר מקסימלי'
                            );
                        },
                        maxPrice: (value: string, values: FormDataInputs) => {
                            if (type === 'minPrice') return true;
                            if (values['minPrice'] === '') return true;
                            return (
                                Number(value) >= Number(values['minPrice']) ||
                                'מחיר מקסימלי חייב להיות גבוה ממחיר מינימלי'
                            );
                        },
                    },
                })}
            />
            <div
                className="absolute right-0 top-10 hidden text-sm font-medium text-[red] transition duration-200 ease-in-out
                peer-aria-[invalid=true]:inline
                mobile-md:text-base
                tablet-sm:top-12 tablet-sm:text-sm
                tablet-md:text-base"
                id={`${type}-input-field-error-message`}
                role="alert"
                aria-hidden={!errors[type]}
                data-testid={
                    type === 'minPrice'
                        ? TEST_ID.FEATURE.SEARCH_FORM.PRICE_INPUT_FIELD.MIN_PRICE.ERROR_MESSAGE
                        : TEST_ID.FEATURE.SEARCH_FORM.PRICE_INPUT_FIELD.MAX_PRICE.ERROR_MESSAGE
                }
            >
                {errors[type]?.message || 'שגיאה'}
            </div>
            <FontAwesomeIcon
                icon={faShekelSign}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-accent transition duration-200 ease-in-out
                peer-focus:scale-110 peer-focus:brightness-110
                peer-disabled:opacity-50
                peer-aria-[invalid=true]:text-[red]
                tablet-sm:text-lg 
                laptop-sm:text-xl
                laptop-md:text-2xl"
                data-testid={TEST_ID.FEATURE.SEARCH_FORM.PRICE_INPUT_FIELD.SVG_ICON}
            />
        </div>
    );
}
