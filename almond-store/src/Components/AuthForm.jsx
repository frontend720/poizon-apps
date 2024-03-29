import React, { useState, useEffect, useRef } from "react";

const AuthForm = ({
  email,
  username,
  password,
  submit,
  authText,
  feedbackText,
  userChange,
  btnText,
  passwordChange,
  emailChange,
  toggleText,
  toggler,
  display,
  isDisabled,
  confirmPassword,
  confirmPasswordChange
}) => {
  return (
    <form className="auth_form" onSubmit={submit}>
      <h2 className="auth_title">{authText}</h2>
      {/* <input className="input auth_input" type="text" name="username" value={username} placeholder="Display name" onChange={userChange}  /> */}
      <input
        className="input auth_input"
        type="text"
        name="email"
        value={email}
        placeholder="Email"
        onChange={emailChange}
      />
      <input
        className="input auth_input"
        type="text"
        name="password"
        value={password}
        placeholder="Password"
        onChange={passwordChange}
      />
      <input
        style={{ display: display }}
        className="input auth_input"
        type="text"
        placeholder="Confirm password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={confirmPasswordChange}
      />
      <button disabled={isDisabled} id="submit_btn" className="button auth_button" type="submit">
        <label className="btn_text" htmlFor="submit_btn">
          {btnText}
        </label>
      </button>
      {feedbackText}
      <label className="toggle_text" onClick={toggler} htmlFor="">
        {toggleText}
      </label>
    </form>
  );
};

export default AuthForm;
