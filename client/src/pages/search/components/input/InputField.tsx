import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCity, faShekelSign } from '@fortawesome/free-solid-svg-icons';

type InputFieldProps = InputFieldDefaultProps &
    (CitySearchFieldState | MinPriceFieldState | MaxPriceFieldState);

type InputFieldDefaultProps = {
    id: string;
    placeholder: string;
    type: React.HTMLInputTypeAttribute;
    value?: string;
};

type CitySearchFieldState = {
    state: 'city-search';
    inputMode: 'search';
};

type MinPriceFieldState = {
    state: 'min-price';
    inputMode: 'numeric';
    min: number;
};

type MaxPriceFieldState = {
    state: 'max-price';
    inputMode: 'numeric';
    max: number;
};

export default function InputField(props: InputFieldProps): React.JSX.Element {
    const tailwindCSS = {
        input: `
        peer flex w-full items-center rounded-lg py-2 pl-10 pr-1 text-text shadow-lg outline outline-1 outline-text 
        focus:outline-2 focus:outline-primary 
        tablet-sm:text-lg 
        laptop-sm:text-xl 
        laptop-md:text-2xl
        `,
        icon: `
        absolute left-2 top-1/2 -translate-y-1/2 text-accent transition duration-200 ease-in-out
        peer-focus:scale-110 peer-focus:brightness-110
        tablet-sm:text-lg 
        laptop-sm:text-xl
        laptop-md:text-2xl
        `,
    };

    switch (props.state) {
        case 'city-search': {
            const { id, placeholder, type, value, inputMode } = props;
            return (
                <div className="relative">
                    <input
                        className={tailwindCSS.input}
                        id={id}
                        placeholder={placeholder}
                        type={type}
                        value={value}
                        inputMode={inputMode}
                    />
                    <FontAwesomeIcon
                        icon={faCity}
                        className={tailwindCSS.icon}
                    />
                </div>
            );
        }
        case 'min-price': {
            const { id, placeholder, type, value, inputMode, min } = props;
            return (
                <div className="relative">
                    <input
                        className={tailwindCSS.input}
                        id={id}
                        placeholder={placeholder}
                        type={type}
                        value={value}
                        inputMode={inputMode}
                        min={min}
                        aria-valuemin={min}
                    />
                    <FontAwesomeIcon
                        icon={faShekelSign}
                        className={tailwindCSS.icon}
                    />
                </div>
            );
        }
        case 'max-price': {
            const { id, placeholder, type, value, inputMode, max } = props;
            return (
                <div className="relative">
                    <input
                        className={tailwindCSS.input}
                        id={id}
                        placeholder={placeholder}
                        type={type}
                        value={value}
                        inputMode={inputMode}
                        max={max}
                        aria-valuemax={max}
                    />
                    <FontAwesomeIcon
                        icon={faShekelSign}
                        className={tailwindCSS.icon}
                    />
                </div>
            );
        }
    }
}
