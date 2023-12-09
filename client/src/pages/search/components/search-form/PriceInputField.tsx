import { useFormContext } from 'react-hook-form';
import { FormDataInputs } from './SearchForm';
import { keepOnlyDigits, formatPrice } from '../../utils/helpers';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShekelSign } from '@fortawesome/free-solid-svg-icons';

type PriceFieldProps = {
    type: 'min-price' | 'max-price';
};

export default function PriceInputField({
    type,
}: PriceFieldProps): React.JSX.Element {
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
                aria-[invalid=true]:text-[red] aria-[invalid=true]:outline-[red] aria-[invalid=true]:focus:outline-[red]
                tablet-sm:text-lg 
                laptop-sm:text-xl 
                laptop-md:text-2xl"
                id={type}
                type="text"
                inputMode="numeric"
                autoComplete="off"
                placeholder={
                    type === 'min-price' ? 'מחיר מינימלי...' : 'מחיר מקסימלי...'
                }
                aria-invalid={!!errors[type]}
                aria-required={true}
                aria-label={`הכנס מחיר ${
                    type === 'min-price' ? 'מינימלי' : 'מקסימלי'
                }`}
                aria-placeholder={`מחיר ${
                    type === 'min-price' ? 'מינימלי' : 'מקסימלי'
                }...`}
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
                    setValueAs: (value: string) =>
                        Number(keepOnlyDigits(value)), // WARNING: TypeScript will still consider the value as a string.
                    validate: {
                        minPrice: (value: string, values: FormDataInputs) => {
                            if (type === 'max-price') return true;
                            return (
                                Number(value) <= Number(values['max-price']) ||
                                'מחיר מינימלי חייב להיות נמוך ממחיר מקסימלי'
                            );
                        },
                        maxPrice: (value: string, values: FormDataInputs) => {
                            if (type === 'min-price') return true;
                            return (
                                Number(value) >= Number(values['min-price']) ||
                                'מחיר מקסימלי חייב להיות גבוה ממחיר מינימלי'
                            );
                        },
                    },
                })}
            />
            <label
                className="absolute right-0 top-10 hidden text-sm font-medium text-[red] transition duration-200 ease-in-out
                peer-aria-[invalid=true]:inline
                mobile-md:text-base
                tablet-sm:top-12 tablet-sm:text-sm
                tablet-md:text-base"
                htmlFor={type}
            >
                {errors[type]?.message || 'שגיאה'}
            </label>
            <FontAwesomeIcon
                icon={faShekelSign}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-accent transition duration-200 ease-in-out
                peer-focus:scale-110 peer-focus:brightness-110
                peer-disabled:opacity-50
                peer-aria-[invalid=true]:text-[red]
                tablet-sm:text-lg 
                laptop-sm:text-xl
                laptop-md:text-2xl"
            />
        </div>
    );
}
