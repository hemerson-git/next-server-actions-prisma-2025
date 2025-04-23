import { Container, Navigation, NavItem, NavLink } from "./styles"


export const Footer = () => {
    return (
        <Container $theme="dark">
            <Navigation>
                <NavItem>
                  <NavLink href="#">Home</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href="#">Contacts</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href="#">Gallery</NavLink>
                </NavItem>
            </Navigation>
        </Container>
    )
}