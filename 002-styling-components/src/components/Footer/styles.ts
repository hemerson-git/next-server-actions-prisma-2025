import styled from "styled-components";

export const Container = styled.footer<{ $theme: "dark" | "light" }>`
    display: flex;
    background-color: #d6d6e1;
    align-items: center;
    justify-content: center;
    padding: 16px;

    a {
        color: ${props => props.$theme === "light" ? "white" : "#333"}
    }
`

export const Navigation = styled.nav`
    display: flex;
    flex-direction: column;
    list-style: none;
    align-items: center;
    gap: 6px;
`

export const NavLink = styled.a`
    font-weight: 500;
    text-transform: uppercase;
    text-decoration: none;

    &:hover {
        cursor: pointer;
        text-decoration: underline;
    }
`

export const NavItem = styled.li`
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.2);
    }
`
