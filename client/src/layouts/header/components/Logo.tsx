import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.svg';

export default function Logo() {
    return (
        <Link reloadDocument to="/">
            <img
                src={logo}
                alt="Real Estate Smart Agent Logo"
                className="h-28 w-28"
            />
        </Link>
    );
}
