import { Link } from 'react-router-dom';
import {Nav, Navbar, Container} from 'react-bootstrap'
import { LogOutButton } from './components/LogOutButton';
import userProfileData from "./pages/ProfilePage";
import './App.css'


const NavigationBar = () => {
    return (
        <header>
            <Navbar bg='secondary' data-bs-theme='dark' expand='lg' variant='light' sticky>
                <Container>
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
                    <Navbar.Text>Signed in as: <a href='/login'>{userProfileData.name}</a></Navbar.Text>
                </Container>
            </Navbar>
        </header>

    );
}

export default NavigationBar;