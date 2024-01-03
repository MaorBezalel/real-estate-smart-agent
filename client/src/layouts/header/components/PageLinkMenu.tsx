import { useMediaQuery } from '@layouts/header/hooks';

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function PageLinkMenu(): React.JSX.Element {
    const isMobile = useMediaQuery('(max-width: 1023px)');
    const ListItem = isMobile ? MobileListItem : DesktopListItem;

    const routes = [
        { name: 'דף הבית', path: '/' },
        { name: 'חיפוש נדל"ן', path: '/search' },
        { name: 'אודות', path: '/about' },
    ];

    return (
        <ul
            className="flex flex-col items-center justify-center gap-6
            tablet-lg:flex-row tablet-lg:gap-12"
        >
            {routes.map((route, index) => (
                <ListItem key={index} index={index}>
                    <Link
                        reloadDocument
                        to={route.path}
                        className="text-2xl font-medium text-text
                        hover:text-accent  
                        tablet-sm:text-3xl
                        tablet-lg:text-xl"
                    >
                        {route.name}
                    </Link>
                </ListItem>
            ))}
        </ul>
    );
}

const MobileListItem = ({ index, children }: { index: number; children: React.ReactNode }) => {
    return (
        <motion.li
            key={index}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.1 + index / 10,
            }}
        >
            {children}
        </motion.li>
    );
};
const DesktopListItem = ({ index, children }: { index: number; children: React.ReactNode }) => {
    return (
        <li
            key={index}
            className="text-2xl font-medium text-text
            hover:text-accent  
            tablet-sm:text-3xl
            tablet-lg:text-xl"
        >
            {children}
        </li>
    );
};
