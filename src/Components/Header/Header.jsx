
      import React from "react";
      import styles from "./Header.module.css"

      function Header () {
        // const [count, setCount] = React.useState(0)
        // const [firstName, setFirstName] = React.useState("")

        // function increment () {
        //   setCount(count + 1);
        // }

        return (
          <header className={styles.header}>
            <h1>Greeting from Header</h1>
            <p>{count}</p>
            <button onClick={increment}>Click Me</button>
          </header>
        )
      }

      export default Header;

