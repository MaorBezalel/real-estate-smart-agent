import { FormProvider, useForm } from 'react-hook-form';
import { FormDataInputs } from '..';

type SearchFormContextProps = {
    children: React.ReactNode;
};

export default function SearchFormContext({ children }: SearchFormContextProps): React.JSX.Element {
    const methods = useForm<FormDataInputs>({
        defaultValues: {
            dealType: '',
            settlement: '',
            minPrice: '',
            maxPrice: '',
        },
    });

    return <FormProvider {...methods}>{children}</FormProvider>;
}
