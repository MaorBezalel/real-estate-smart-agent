import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

export default function InfoTooltip(): React.JSX.Element {
    return (
        <div
            className="absolute left-2 top-2 hidden gap-2 transition duration-200 ease-in-out
            hover:scale-105 hover:brightness-110
            tablet-lg:flex tablet-lg:items-center"
            aria-label="לחץ לפרטים נוספים"
        >
            <p
                className="text-accent opacity-0 transition duration-300 ease-in-out
                group-hover:opacity-100"
            >
                לחץ לפרטים נוספים
            </p>
            <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="text-accent"
            />
        </div>
    );
}
