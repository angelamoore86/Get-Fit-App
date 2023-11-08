import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/profile'>Profile</Link>
                </li>
                <li>
                    <Link to='/fitnessgoal'>Fitness Goal</Link>
                </li>
                <li>
                    <Link to='/fitnesslog'>Fitness Log</Link>
                </li>
                <li>
                    <Link to='/intakelog'>Intake Log</Link>
                </li>
            </ul>
        </nav>
        
    );
}

export default NavBar;