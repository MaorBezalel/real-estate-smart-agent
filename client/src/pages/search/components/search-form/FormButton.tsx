export type FormButtonProps =
    | SubmitButtonProps
    | ResetButtonProps
    | LoadingButtonProps;

type SubmitButtonProps = {
    type: 'submit';
};

type ResetButtonProps = {
    type: 'reset';
    onReset: () => void;
};

type LoadingButtonProps = {
    type: 'loading';
};

export default function FormButton(props: FormButtonProps): React.JSX.Element {
    switch (props.type) {
        case 'submit':
            return <SubmitButton />;
        case 'reset':
            return <ResetButton type={props.type} onReset={props.onReset} />;
        case 'loading':
            return <LoadingButton />;
    }
}

const SubmitButton = (): React.JSX.Element => {
    return (
        <button
            className="inline-block w-full place-self-center rounded-2xl border-4 border-solid border-text bg-primary py-3 text-center text-3xl font-extrabold text-background drop-shadow-xl duration-200 hover:scale-110 hover:filter hover:ease-in-out focus:brightness-110
            tablet-sm:col-span-2 tablet-sm:w-[15rem] tablet-sm:text-3xl
            tablet-lg:h-auto tablet-lg:w-[8rem] tablet-lg:py-2 tablet-lg:text-xl
            laptop-sm:text-2xl
            laptop-md:text-3xl"
            id="submit-button"
            type="submit"
            aria-disabled="false"
        >
            הפעל
        </button>
    );
};

const ResetButton = ({ onReset }: ResetButtonProps): React.JSX.Element => {
    return (
        <button
            className="inline-block w-full place-self-center rounded-2xl border-4 border-solid border-text bg-red-600 py-3 text-center text-3xl font-extrabold text-background drop-shadow-xl duration-200 hover:scale-110 hover:filter hover:ease-in-out focus:brightness-110
            tablet-sm:col-span-2 tablet-sm:w-[15rem] tablet-sm:text-3xl
            tablet-lg:h-auto tablet-lg:w-[8rem] tablet-lg:py-2 tablet-lg:text-xl
            laptop-sm:text-2xl
            laptop-md:text-3xl"
            id="reset-button"
            type="button"
            aria-disabled="false"
            onClick={onReset}
        >
            בטל
        </button>
    );
};

const LoadingButton = (): React.JSX.Element => {
    return (
        <button
            className="me-2 inline-block w-full items-center place-self-center rounded-2xl border-4 border-solid border-text bg-blue-700 px-5 py-3 text-center text-3xl font-medium text-background drop-shadow-xl duration-200
            hover:bg-blue-800 hover:filter hover:ease-in-out
            focus:ring-4 focus:ring-blue-300 focus:brightness-110
            tablet-sm:col-span-2 tablet-sm:w-[15rem] tablet-sm:text-3xl
            tablet-lg:h-auto tablet-lg:w-[8rem] tablet-lg:py-2 tablet-lg:text-lg"
            id="loading-button"
            type="button"
            disabled
            aria-disabled="true"
        >
            <svg
                className="me-4 inline h-8 w-8 animate-spin text-background
                tablet-lg:me-2 tablet-lg:h-4 tablet-lg:w-4"
                aria-hidden="true"
                role="status"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                />
            </svg>
            טוען...
        </button>
    );
};
