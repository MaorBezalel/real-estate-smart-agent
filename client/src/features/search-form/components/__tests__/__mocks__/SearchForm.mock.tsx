import { useFormContext, SubmitHandler } from 'react-hook-form';
import { FormDataInputs } from '../../..';

type SearchFormProps = {
    children: React.ReactNode;
};

export default function SearchForm({ children }: SearchFormProps): React.JSX.Element {
    const { handleSubmit } = useFormContext<FormDataInputs>();

    const onSubmit: SubmitHandler<FormDataInputs> = () => {
        null;
    };

    return <form onSubmit={handleSubmit(onSubmit)}>{children}</form>;
}
