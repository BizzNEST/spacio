import React from 'react';
import styles from './SelectMenu.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

function SelectMenu({ center, setCenter }) {
  return (
    <div className={styles.selectMenuBox}>
      <form id="centersForm" className={styles.form}>
        <label className={styles.selectCenterLabel} htmlFor="center">
          Select center:
        </label>
        <div className={styles.selectWrapper}>
          <select
            className={styles.dropDownBox}
            name="centers"
            id="centers"
            value={center}
            onChange={(event) => setCenter(event.target.value)}
          >
            <option value="Salinas">Salinas</option>
            <option value="Gilroy">Gilroy</option>
            <option value="Watsonville">Watsonville</option>
            <option value="Stockton">Stockton</option>
            <option value="Modesto">Modesto</option>
          </select>
          <FontAwesomeIcon
            className={styles.dropDownArrow}
            icon={faChevronDown}
          />
        </div>
        <br></br>
      </form>
    </div>
  );
}

export default SelectMenu;
