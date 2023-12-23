import { useEffect } from 'react';
import { SubmitErrorHandler, SubmitHandler, useFormContext } from 'react-hook-form';
import { useSearchParams, useLocation } from 'react-router-dom';

import { FormDataInputs } from '..';
import { formatPrice } from '../helpers';

const useSubmitFormIfSearchParamsPresent = (
    onSubmit: SubmitHandler<FormDataInputs>,
    onError: SubmitErrorHandler<FormDataInputs>
) => {
    const { handleSubmit, setValue } = useFormContext<FormDataInputs>();
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    useEffect(() => {
        const dealType = searchParams.get('dealType') ?? '';
        const settlement = searchParams.get('settlement') ?? '';
        const minPrice = searchParams.get('minPrice') ?? '';
        const maxPrice = searchParams.get('maxPrice') ?? '';

        const hasAnyValidSearchParams = dealType || settlement || minPrice || maxPrice;
        if (!hasAnyValidSearchParams) {
            setSearchParams({});
            return;
        }

        setValue('dealType', dealType);
        setValue('settlement', settlement);
        setValue('minPrice', formatPrice(minPrice, false));
        setValue('maxPrice', formatPrice(maxPrice, false));

        handleSubmit(onSubmit, onError)();
    }, [location.search]);
};

export default useSubmitFormIfSearchParamsPresent;
