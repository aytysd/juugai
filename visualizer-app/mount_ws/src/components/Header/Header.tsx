import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
    children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {

    return (
        <header className="header" style={styles.header}>
            <div className="logo">Visualizer App</div>
            <nav>
                <ul className="nav-links">
                    <li style={styles.navItem}>
                        <Link to="/analyzer-node">Analyzer Node</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

const styles = {
  header: {
    backgroundColor: 'Red',
    color: 'white',
    padding: '1rem 0',
    position: 'sticky' as 'sticky',
    top: 0,
    zIndex: 100,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: 'white',
  },
  nav: {
    display: 'flex',
    gap: '1rem',
  },
  navItem: {
    textDecoration: 'none',
    color: 'white',
    fontWeight: 500,
    transition: 'color 0.3s ease',
  }
};


export default Header;