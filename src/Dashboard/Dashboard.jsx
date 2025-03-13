import Navbar from '../components/Navbar/Navbar';
import useAuth from '../hooks/useAuth';
import styles from './Dashboard.module.css';

const Dashboard = ({ title, children }) => {
  return (
    <div className={styles.dashboardContent}>
      <h2 className={styles.title}>{title}</h2>
      <button className={styles.bookRoomButton}>Book a Room</button>
      <div>{children}</div>
    </div>
  );
};
<button onClick={useAuth}>Log out</button>
export default Dashboard;
