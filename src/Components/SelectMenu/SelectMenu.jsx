import React, { memo } from 'react';
import styles from './SelectMenu.module.css';

const SelectMenu = memo(function SelectMenu({ center, setCenter }) {
  function handleCenterChange(event) {
    setCenter(event.target.value);
    localStorage.setItem('center', event.target.value);
  }

  return (
    <div className={styles.selectWrapper}>
      <label className={styles.selectCenterLabel} htmlFor="center">
        Select center
      </label>
      <select
        className={styles.dropDownBox}
        name="centers"
        id="centers"
        value={center}
        onChange={(event) => handleCenterChange(event)}
      >
        <option value="Salinas">Salinas</option>
        <option value="HQ">HQ</option>
        <option value="Watsonville">Watsonville</option>
        <option value="Stockton">Stockton</option>
        <option value="Modesto">Modesto</option>
      </select>
    </div>
  );
});

export default SelectMenu;
