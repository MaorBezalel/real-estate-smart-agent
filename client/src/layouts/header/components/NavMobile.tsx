type NavMobileProps = {
    children: React.ReactNode;
};

export default function NavMobile({ children }: NavMobileProps): React.JSX.Element {
    return (
        <nav
            className="container mx-auto flex items-center justify-between px-4 py-4
            tablet-lg:hidden"
        >
            {children}
        </nav>
    );
}
