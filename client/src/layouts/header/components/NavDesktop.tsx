type NavDesktopProps = {
    children: React.ReactNode;
};

export default function NavDesktop({ children }: NavDesktopProps): React.JSX.Element {
    return (
        <nav
            className="container mx-auto hidden px-4 py-4
            tablet-lg:flex tablet-lg:items-center tablet-lg:justify-between 
            laptop-sm:px-10"
        >
            {children}
        </nav>
    );
}
