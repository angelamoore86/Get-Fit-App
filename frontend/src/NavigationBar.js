import {Nav, Navbar, Container, NavbarBrand, Image} from 'react-bootstrap'
import { LogOutButton } from './components/LogOutButton';
import userProfileData from "./pages/ProfilePage";
import './App.css'
import { useUser } from './useUser';


const NavigationBar = () => {
    const { user } = useUser();
    // const { email } = user;

    return (
        <header>
            <Navbar bg='secondary' data-bs-theme='dark' expand='lg' variant='light' sticky>
                <Container>
                    <NavbarBrand >
                        Get Fit
                    </NavbarBrand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav' >
                        <Nav className='ml-auto'>
                            <Nav.Link href='/'>Home</Nav.Link>
                            <Nav.Link href='/intakelog'>Food</Nav.Link>
                            <Nav.Link href='/fitnesslog'>Exercise</Nav.Link>
                            <Nav.Link href='/profile'>Profile</Nav.Link>
                            <LogOutButton />
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Text>Signed in as: {user ? <a href='/login'>{user.email}</a> : 'Guest'}</Navbar.Text>
                </Container>
            </Navbar>
        </header>
    );
}

export default NavigationBar;