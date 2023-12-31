import { useEffect } from 'react';
import { SubmitErrorHandler, SubmitHandler, useFormContext } from 'react-hook-form';
import { useSearchParams, useLocation } from 'react-router-dom';

import { FormDataInputs } from '@features/search-form';
import { formatPrice } from '@features/search-form/helpers';

/**
 * A hook which responsible for submitting the search form if there are any search params present in the URL on mount.
 *
 * @param {SubmitHandler<FormDataInputs>} onSubmit - The submit handler for the form.
 * @param {SubmitErrorHandler<FormDataInputs>} onError - The error handler for the form.
 * @returns {void} Nothing.
 */
const useSubmitFormIfSearchParamsPresent = (
    onSubmit: SubmitHandler<FormDataInputs>,
    onError: SubmitErrorHandler<FormDataInputs>
): void => {
    const { handleSubmit, setValue } = useFormContext<FormDataInputs>();
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    useEffect(() => {
        const dealType = searchParams.get('dealType') ?? '';
        const settlement = searchParams.get('settlement') ?? '';
        const minPrice = searchParams.get('minPrice') ?? '';
        const maxPrice = searchParams.get('maxPrice') ?? '';

        const dontHaveAnyValidSearchParams = !(dealType || settlement || minPrice || maxPrice);
        if (dontHaveAnyValidSearchParams) {
            setSearchParams({});
        } else {
            setValue('dealType', dealType);
            setValue('settlement', settlement);
            setValue('minPrice', formatPrice(minPrice, false));
            setValue('maxPrice', formatPrice(maxPrice, false));

            handleSubmit(onSubmit, onError)();
        }
    }, [location.search]);
};

export default useSubmitFormIfSearchParamsPresent;
