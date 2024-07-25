import { Link } from 'react-router-dom';
import { ExportButtonsController } from '../ExportButtons/ExportButtons.ctrl';
import styles from './Header.module.scss';
import logo from '../../assets/logo.svg';
import Clock from '../Clock/Clock';

const Header = () => {
  const controller = new ExportButtonsController();
  return (
    <header className={styles.header}>
      <Link to='/dashboard'>
        <img src={logo} alt='Logo' className={styles.logo} />
      </Link>
      <div className={styles.rightSide}>
        <Clock />
        <button onClick={controller.logout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
