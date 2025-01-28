import styles from "./Navbar.module.css"
import "@fortawesome/fontawesome-free/css/all.min.css";

function Navbar() {
    return (
      <nav className={styles.navbar}>
        <button className={`${styles.navbarButton} ${styles.eyeButton}`} onClick={() => alert("Eye Button Clicked!")}>
        <i className="fa-solid fa-eye"></i>
        </button>
        <button className={`${styles.navbarButton} ${styles.backButton}`} onClick={() => alert("Second Button Clicked!")}>
        &lt;
        </button>
        <button className={`${styles.navbarButton} ${styles.todayButton}`} onClick={() => alert("Today Button Clicked!")}>
          Today
        </button>
        <button className={`${styles.navbarButton} ${styles.forwardButton}`} onClick={() => alert("Fourth Button Clicked!")}>
        &gt;
        </button>
        <button className={`${styles.navbarButton} ${styles.dateButton}`} onClick={() => alert("Date Button Clicked!")}>
          Date
        </button>
     </nav>
    );
  }
  
  export default Navbar;