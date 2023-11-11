import React, { useState } from "react";


export default function AuthForm({
  submit,
  email,
  password,
  btnText,
  emailChange,
  passwordChange,
  authType,
}) {
  return (
    <section className="auth_panel">
      <h1 className="app_title">{authType}</h1>
      <form onSubmit={submit} action="" className="auth_form"></form>
      <label htmlFor="">email</label>
      <input
        name="email"
        value={email}
        onChange={emailChange}
        className="auth_inputs"
        type="text"
      />
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
    </section>
  );
}
