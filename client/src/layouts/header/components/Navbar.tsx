import LinkMenu from './LinkMenu';
import IconMenu from './IconMenu';

type NavbarProps = {
    isMobile: boolean;
};

export default function Navbar({ isMobile }: NavbarProps) {
    return isMobile ? (
        <svg
            className="h-12 w-12"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                {' '}
                <path
                    d="M4 18L20 18"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                ></path>{' '}
                <path
                    d="M4 12L20 12"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                ></path>{' '}
                <path
                    d="M4 6L20 6"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                ></path>
            </g>
        </svg>
    ) : (
        <>
            <LinkMenu
                direction="flex-row"
                links={[
                    { to: '/', label: 'דף הבית' },
                    { to: '/search', label: 'חיפוש נדל"ן' },
                    { to: '/about', label: 'אודות' },
                ]}
            />
            <IconMenu />
        </>
    );
}
