import React from "react";

const MainContent = () => {
  const showAlert = (event) => {
    event.preventDefault();
    alert("Form Submitted!");
  };

  return (
    <div>
      <form action="/action_page.php" onSubmit={showAlert}>
        <label htmlFor="fname">First name:</label><br />
        <input type="text" id="fname" name="fname" defaultValue="" /><br />
        <label htmlFor="lname">Last name:</label><br />
        <input type="text" id="lname" name="lname" defaultValue="" /><br /><br />
        <label htmlFor="lname">Email:</label><br />
        <input type="text" id="lname" name="lname" defaultValue="" /><br /><br />
        <label htmlFor="lname">Password:</label><br />
        <input type="text" id="lname" name="lname" defaultValue="" /><br /><br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default MainContent;