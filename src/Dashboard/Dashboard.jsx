import Navbar from "../components/Navbar/Navbar";
import styles from "./Dashboard.module.css"

const Dashboard = ({ title, children }) => {
  return (
    <div className={styles.dashboardContent}>
    <h2 className={styles.title}>{title}</h2>
    <div>{children}</div>
    </div>
  );
};

export default Dashboard;
