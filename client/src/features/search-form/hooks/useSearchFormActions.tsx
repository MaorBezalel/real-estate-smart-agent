import { useSearchParams, useLocation } from 'react-router-dom';
import { useFormContext, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { useSearchStateContext } from '../../../common/hooks';

import { FormDataInputs } from '..';

type UseSearchFormActionsResults = {
    onSubmit: SubmitHandler<FormDataInputs>;
    onError: SubmitErrorHandler<FormDataInputs>;
    onReset: () => void;
};

/**
 * A hook which serves as an abstraction layer for the search form functionality.
 *
 * @returns {UseSearchFormActionsResults} - The search form functionality.
 */
export default function useSearchFormActions(): UseSearchFormActionsResults {
    const { reset } = useFormContext<FormDataInputs>();
    const { setToLoading, setToInactive, isActive } = useSearchStateContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    const onSubmit: SubmitHandler<FormDataInputs> = (formDataInputs) => {
        const wasSubmittedThroughURL = location.search !== '';
        const wasSubmittedWithoutPagination = !searchParams.get('page');
        const wasSubmittedWithoutOrderId = !searchParams.get('orderId');

        if (wasSubmittedThroughURL) {
            if (wasSubmittedWithoutPagination) {
                searchParams.set('page', '1');
                setSearchParams(searchParams);
            }
            if (wasSubmittedWithoutOrderId) {
                searchParams.set('orderId', '1');
                setSearchParams(searchParams);
            }
        } else {
            // was submitted through the form itself
            setSearchParams({
                dealType: formDataInputs['dealType'] as 'forsale' | 'rent',
                settlement: formDataInputs['settlement'],
                minPrice: formDataInputs['minPrice'].toString(),
                maxPrice: formDataInputs['maxPrice'].toString(),
                page: '1',
                orderId: '1',
            });
        }

        if (!isActive()) setToLoading();
    };

    const onError: SubmitErrorHandler<FormDataInputs> = () => {
        setSearchParams({});
    };

    const onReset = (): void => {
        reset();
        setSearchParams({});
        setToInactive();
    };

    return { onSubmit, onError, onReset };
}
