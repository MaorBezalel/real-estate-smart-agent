import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faExclamation } from '@fortawesome/free-solid-svg-icons';

type StatusIconProps = {
    status: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

export default function StatusIcon({
    status,
    ...rest
}: StatusIconProps): React.JSX.Element | null {
    const iconJSX = {
        new: (
            <i
                className="absolute -right-4 -top-4 flex h-8 w-8 items-center justify-center rounded-full bg-green-400 transition duration-300 ease-in-out group-data-[status='default']:opacity-0"
                data-status={status}
                {...rest}
            >
                <FontAwesomeIcon
                    icon={faPlus}
                    className="stroke-black text-white"
                />
            </i>
        ),
        updated: (
            <i
                className="absolute -right-4 -top-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-400 transition duration-300 ease-in-out group-data-[status='default']:opacity-0"
                data-status={status}
                {...rest}
            >
                <FontAwesomeIcon
                    icon={faExclamation}
                    className="stroke-black text-white"
                />
            </i>
        ),
        default: null,
    };

    return iconJSX[status as 'new' | 'updated' | 'default'];
}
