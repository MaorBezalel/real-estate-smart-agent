import { useEffect, useMemo, useContext } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import {
    useForm,
    FormProvider,
    SubmitHandler,
    SubmitErrorHandler,
} from 'react-hook-form';

import {
    SearchPageContext,
    SearchPageContextType,
} from '../../SearchPageContext';

import {
    DealTypeSelectField,
    SettlementSearchField,
    PriceInputField,
    FormButton,
    FormButtonProps,
} from '../search-form';

import { formatPrice } from '../../utils/helpers';

export type FormDataInputs = {
    'deal-type': string;
    settlement: string;
    'min-price': string;
    'max-price': string;
};

type SearchFormProps = React.FormHTMLAttributes<HTMLFormElement>;

export default function SearchForm(props: SearchFormProps): React.JSX.Element {
    const methods = useForm<FormDataInputs>();
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const { isLoading, setIsSubmitSuccessful } = useContext(
        SearchPageContext
    ) as SearchPageContextType;

    const onSubmit: SubmitHandler<FormDataInputs> = (formDataInputs) => {
        const wasSubmittedThroughURL = location.search !== '';
        const wasSubmittedWithoutPagination = !searchParams.get('page');

        if (wasSubmittedThroughURL) {
            if (wasSubmittedWithoutPagination) {
                searchParams.set('page', '1');
                setSearchParams(searchParams);
            }
        } else {
            // was submitted through the form itself
            setSearchParams({
                dealType: formDataInputs['deal-type'] as 'forsale' | 'rent',
                settlement: formDataInputs['settlement'],
                minPrice: formDataInputs['min-price'].toString(),
                maxPrice: formDataInputs['max-price'].toString(),
                page: '1',
            });
        }

        setIsSubmitSuccessful(true);
    };

    const onError: SubmitErrorHandler<FormDataInputs> = () => {
        setSearchParams({});
    };

    const onReset = (): void => {
        methods.reset();
        setSearchParams({});
        setIsSubmitSuccessful(false);
    };

    const formButtonProps = useMemo((): FormButtonProps => {
        const { isSubmitSuccessful } = methods.formState;
        if (isLoading) return { type: 'loading' };
        if (isSubmitSuccessful) return { type: 'reset', onReset: onReset };
        else return { type: 'submit' };
    }, [isLoading, methods.formState.isSubmitSuccessful]);

    useEffect(() => {
        const dealType = searchParams.get('dealType') ?? '';
        const settlement = searchParams.get('settlement') ?? '';
        const minPrice = searchParams.get('minPrice') ?? '';
        const maxPrice = searchParams.get('maxPrice') ?? '';

        const hasAnyValidSearchParams =
            dealType || settlement || minPrice || maxPrice;
        if (!hasAnyValidSearchParams) return;

        methods.setValue('deal-type', dealType);
        methods.setValue('settlement', settlement);
        methods.setValue('min-price', formatPrice(minPrice, false));
        methods.setValue('max-price', formatPrice(maxPrice, false));

        methods.handleSubmit(onSubmit, onError)();
    }, [location.search]);

    return (
        <FormProvider {...methods}>
            <form
                className="flex w-full flex-col justify-center gap-3
                data-[has-invalid-fields=true]:gap-8
                tablet-sm:grid tablet-sm:grid-cols-2 tablet-sm:gap-4 tablet-sm:data-[has-invalid-fields=true]:gap-x-4 tablet-sm:data-[has-invalid-fields=true]:gap-y-10 
                tablet-lg:flex tablet-lg:flex-row tablet-lg:items-center tablet-lg:justify-center tablet-lg:gap-4 tablet-lg:data-[has-invalid-fields=true]:gap-4
                laptop-md:gap-5"
                onSubmit={methods.handleSubmit(onSubmit, onError)}
                data-has-invalid-fields={
                    Object.keys(methods.formState.errors).length > 0
                }
                aria-label="טופס חיפוש נכסים"
                {...props}
            >
                <DealTypeSelectField />
                <SettlementSearchField />
                <PriceInputField type="min-price" />
                <PriceInputField type="max-price" />
                <FormButton {...formButtonProps} />
            </form>
        </FormProvider>
    );
}
