import { useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { ExportButtonsController } from '../ExportButtons/ExportButtons.ctrl';
import styles from './Header.module.scss';
import logo from '../../assets/logo.svg';
import Clock from '../Clock/Clock';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user } = useAuth();
  const controller = new ExportButtonsController();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const userDropdownClassNames = clsx(
    isDropdownOpen ? styles.open : styles.closed,
    styles.userDropdown
  );

  const headerContentClassNames = clsx(styles.headerContent, 'content-width');

  return (
    <header className={styles.header}>
      <div className={headerContentClassNames}>
        <Link to='/dashboard'>
          <img src={logo} alt='Logo' className={styles.logo} />
        </Link>
        {user && (
          <div className={styles.rightSide}>
            {/* <span>{user.username}</span> */}
            <Clock />
            {/* <button onClick={controller.logout}>Logout</button> */}
            <div className={styles.userDropdownWrapper}>
              <button
                className={userDropdownClassNames}
                onClick={toggleDropdown}
              >
                {user.username}
              </button>
              {isDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <button onClick={controller.logout}>Logout</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
