import { useState, useEffect } from 'react';
import styles from './Clock.module.scss';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour12: false });
  };

  return <div className={styles.clock}>{formatTime(time)}</div>;
};

export default Clock;
