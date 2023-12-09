import useMediaQuery from './hooks/useMediaQuery';

import Logo from './components/Logo';
import Navbar from './components/Navbar';

export default function Header(): React.JSX.Element {
    const isMobile = useMediaQuery('(max-width: 767px)');

    return (
        <header className="relative z-10 w-full bg-secondary shadow-lg">
            <div
                className="container mx-auto flex items-center justify-between px-4
                py-4 laptop-sm:px-10"
            >
                <Logo />
                <Navbar isMobile={isMobile} />
            </div>
        </header>
    );
}
