import { Link } from 'react-router-dom';
import { LogOutButton } from './components/LogOutButton';


const NavBar = () => {
    return (
        
        <nav>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/intakelog'>Food</Link>
                </li>
                <li>
                    <Link to='/fitnesslog'>Exercise</Link>
                </li>
                <li>
                    <Link to='/profile'>Profile</Link>
                </li>   
                <li >
                    <LogOutButton />
                </li>
            </ul>   
        </nav>
    );
}

export default NavBar;