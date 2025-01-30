import { faChevronLeft, faChevronRight, faEye } from "@fortawesome/free-solid-svg-icons";
import styles from "./Navbar.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Navbar() {
    return (
      <nav className={styles.navbar}>
        <button className={`${styles.navbarButton} ${styles.eyeButton}`} onClick={() => alert("Eye Button Clicked!")}>
          <FontAwesomeIcon icon={faEye} />
        </button>
        <button className={`${styles.navbarButton} ${styles.backwardButton}`} onClick={() => alert("Backward Button Clicked!")}>
        <FontAwesomeIcon className={styles.backwardButton} icon={faChevronLeft} />
        </button>
        <button className={`${styles.navbarButton} ${styles.todayButton}`} onClick={() => alert("Today Button Clicked!")}>
          Today
        </button>
        <button className={`${styles.navbarButton} ${styles.forwardButton}`} onClick={() => alert("Forward Button Clicked!")}>
         <FontAwesomeIcon className={styles.forwardButton} icon={faChevronRight} />
        </button>
        <button className={`${styles.navbarButton} ${styles.dateButton}`} onClick={() => alert("Date Button Clicked!")}>
          Date
        </button>
     </nav>
    );
  }
  
  export default Navbar;