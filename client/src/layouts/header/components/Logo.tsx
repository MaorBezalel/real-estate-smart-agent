import { Link } from 'react-router-dom';
import logo from '@common/assets/svgs/logo.svg';

export default function Logo() {
    return (
        <Link reloadDocument to="/">
            <img src={logo} alt='סוכן נדל"ן חכם' className="h-28 w-28" />
        </Link>
    );
}
