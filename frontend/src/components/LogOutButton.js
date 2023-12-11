import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap'

export const LogOutButton = () => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <Button variant='primary' size='sm' onClick={handleLogOut}>Log Out</Button>

    );
};
