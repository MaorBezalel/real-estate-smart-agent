import { useFormContext } from 'react-hook-form';
import { useSearchFormActions, useSubmitFormIfSearchParamsPresent } from './hooks';

export type FormDataInputs = {
    dealType: string;
    settlement: string;
    minPrice: string;
    maxPrice: string;
};

type SearchFormProps = {
    children: React.ReactNode;
};

export default function SearchForm({ children }: SearchFormProps): React.JSX.Element {
    const {
        handleSubmit,
        formState: { errors },
    } = useFormContext<FormDataInputs>();
    const { onSubmit, onError } = useSearchFormActions();
    useSubmitFormIfSearchParamsPresent(onSubmit, onError);

    return (
        <form
            className="flex w-full flex-col justify-center gap-3
            data-[has-invalid-fields=true]:gap-8
            tablet-sm:grid tablet-sm:grid-cols-2 tablet-sm:gap-4 tablet-sm:data-[has-invalid-fields=true]:gap-x-4 tablet-sm:data-[has-invalid-fields=true]:gap-y-10 
            tablet-lg:flex tablet-lg:flex-row tablet-lg:items-center tablet-lg:justify-center tablet-lg:gap-4 tablet-lg:data-[has-invalid-fields=true]:gap-4
            laptop-md:gap-5"
            id="search-form"
            onSubmit={handleSubmit(onSubmit, onError)}
            aria-label="טופס חיפוש נכסים"
            data-has-invalid-fields={Object.keys(errors).length > 0}
        >
            {children}
        </form>
    );
}
