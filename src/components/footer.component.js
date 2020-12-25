import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

export default function Footer() {
    return (
        <Navbar expand="sm" bg="dark" variant="dark" fixed="bottom" >
            <Container>
                <Navbar.Text>Created by <a href="https://github.com/minhd-vu/">Minh Vu</a>. Project on <a href="https://github.com/minhd-vu/assassins">GitHub</a>.</Navbar.Text>
            </Container>
        </Navbar>
    );
}