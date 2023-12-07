import LoginPage from "./LoginPage";
import { Container, Row, Col } from 'react-bootstrap'
import {useUser} from '../useUser'
const HomePage = () => {
    const {user} = useUser();
    return (
        <div>

            <h1>Welcome to Get Fit!</h1>
            <div className='mt-5 mb-5' >

                <p style={{ fontSize: "1.2rem" }}>Get Fit will help you track progress towards your fitness goals.
                 You will choose your target goal, whether it is to lose weight or gain muscle and show your progress.</p>
                <p style={{ fontSize: "1.2rem" }}>It is a convenient place to store your daily logs for cardio and strength training.
                You can also log your daily nutritional intake to help you towards completing your goal. Good luck with reaching your goal!</p>
                {user ? null : <><p style={{ fontSize: "1.2rem" }}>Please log in with Google to begin.</p>
                <LoginPage/></>}
            </div>
            <Container className="page-links" >
                <Row>
                    <Col md={4}>
                        <h4>Links to Workouts</h4>
                        <a href='https://humanfitproject.com' target="_blank" rel="noreferrer">Human Fit Project</a><br/>
                        <a href='https://shifttostrength.com' target="_blank" rel="noreferrer">Shift to Strength</a><br/>
                        <a href='https://muscleandstrength.com' target="_blank" rel="noreferrer">Muscle and Strength</a><br/>
                    </Col>
                    <Col md={{ span: 4, offset: 4}}>
                    <h4>Links to Healthy Eating</h4>
                        <a href='https://healthyfood.com' target="_blank" rel="noreferrer">Healthy Food Guide</a><br/>
                        <a href='https://eatingwell.com' target="_blank" rel="noreferrer">Eating Well</a><br/>
                        <a href='https://food-guide.canada.ca/en/' target="_blank" rel="noreferrer">Canada's Food Guide</a><br/>
                    </Col>
                </Row>
            </Container>
        </div>
        
    );
}

export default HomePage;