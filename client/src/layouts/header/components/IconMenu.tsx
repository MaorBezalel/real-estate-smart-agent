import { useMediaQuery } from '@layouts/header/hooks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';

export default function IconMenu(): React.JSX.Element {
    const isMobile = useMediaQuery('(max-width: 1023px)');
    const ListItem = isMobile ? MobileListItem : DesktopListItem;

    const socialRoutes = [
        {
            href: 'https://github.com/MaorBezalel/real-estate-smart-agent',
            icon: faGithub,
            color: 'black',
        },
        {
            href: 'https://youtu.be/8YtzmtPDKsA',
            icon: faYoutube,
            color: 'red',
        },
    ];

    return (
        <ul className="flex items-center justify-center gap-20">
            {socialRoutes.map((route, index) => (
                <ListItem key={index} index={index}>
                    <a href={route.href} target="_blank" rel="noreferrer noopener">
                        <FontAwesomeIcon
                            icon={route.icon}
                            className={`relative h-9 w-10 transition-transform duration-[294ms] ease-out text-[${route.color}]
                            hover:text-opacity-60
                            tablet-sm:scale-125
                            tablet-lg:h-7 tablet-lg:w-7
                            laptop-sm:h-8 laptop-sm:w-8`}
                        />
                    </a>
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
    return <li key={index}>{children}</li>;
};
