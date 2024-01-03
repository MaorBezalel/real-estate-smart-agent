import { useState, useRef } from 'react';
import { useClickAway } from '@layouts/header/hooks';

import { NavDesktop, NavMobile, Logo, PageLinkMenu, IconMenu } from '@layouts/header/components';
import Hamburger from 'hamburger-react';
import Separator from '@common/components/separator/HeaderSeparator';

import { AnimatePresence, motion } from 'framer-motion';

export default function Header(): React.JSX.Element {
    const [isOpen, setOpen] = useState(false);
    const ref = useRef(null);
    useClickAway(ref, () => setOpen(false));

    return (
        <header className="relative z-10 w-full bg-secondary shadow-lg">
            <NavDesktop>
                <Logo />
                <PageLinkMenu />
                <IconMenu />
            </NavDesktop>

            <NavMobile>
                <Logo />
                <Hamburger color="#001f24" toggled={isOpen} toggle={setOpen} />
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="shadow-4xl fixed left-0 right-0 top-[9rem] flex flex-col gap-10 border-2 border-solid border-primary bg-secondary px-10 py-16"
                            ref={ref}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <PageLinkMenu />
                            <Separator />
                            <IconMenu />
                        </motion.div>
                    )}
                </AnimatePresence>
            </NavMobile>
        </header>
    );
}
