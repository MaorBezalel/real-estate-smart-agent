import { Link } from 'react-router-dom';

type LinkMenuProps = {
    direction: 'flex-row' | 'flex-col';
    links: { to: string; label: string }[];
};

export default function LinkMenu({ direction, links }: LinkMenuProps) {
    return (
        <ul
            className={`tablet-md:flex ${direction} lg:gap-14 tablet-md:gap-12`}
        >
            {links.map((link, index) => (
                <li key={index}>
                    <Link
                        key={link.to}
                        to={link.to}
                        reloadDocument={true}
                        className="font-medium text-text hover:text-accent tablet-md:text-lg tablet-lg:text-xl"
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
