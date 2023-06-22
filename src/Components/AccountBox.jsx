import React from "react";
// import "../styles/accountBox.scss";

function AccountBox() {
  return (
    <div id="accountBox">
      <div>signup</div>
      <div id="secure">
        signin: <input />
        <br />
        password: <input />
      </div>
      <button type="button">submit</button>
    </div>
  );
}

export default AccountBox;
