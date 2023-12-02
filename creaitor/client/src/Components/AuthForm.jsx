import React, { useState } from "react";

export default function AuthForm({
  submit,
  email,
  password,
  btnText,
  emailChange,
  passwordChange,
  authType,
  toggle,
  error,
  toggleText
}) {
  return (
    <form onSubmit={submit} className="auth_panel">
      <h1 className="app_title">{authType}</h1>
      <form action="" className="auth_form"></form>
      <label htmlFor="">email</label>
      <input
        name="email"
        value={email}
        onChange={emailChange}
        className="auth_inputs"
        type="text"
      />
      <label style={{ fontWeight: "500", color: "#cc5500" }} htmlFor="">
        {error === "auth/email-already-in-use" ? "Email already in use. Try logging in." : ""}
      </label>
      <br />
      <label htmlFor="">password</label>
      <input
        className="auth_inputs"
        type="text"
        name="password"
        value={password}
        onChange={passwordChange}
      />
      <button type="submit" className="auth_btn">
        {btnText}
      </button>
      <label
        onClick={toggle}
        style={{ padding: 6, textAlign: "right" }}
        htmlFor=""
      >
        {toggleText}
      </label>
    </form>
  );
}
