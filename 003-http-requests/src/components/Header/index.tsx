import styles from "./styles.module.css";

export const Header = () => {
    return (
        <header className={styles.header}>
            <h3>Logo</h3>

            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Contacts</a></li>
                    <li><a href="#">Gallery</a></li>
                </ul>
            </nav>
        </header>
    )
}