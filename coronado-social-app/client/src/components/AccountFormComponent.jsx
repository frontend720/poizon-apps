import React from "react";
import { Form, Input, Textarea, Button } from "../../StyleSheet";

export default function AccountFormComponent({
  username,
  age,
  bio,
  usernameChange,
  bioChange,
  ageChange,
  submit,
  cancelToggle,
  display,
}) {
  return (
    <div style={{ display: display, paddingTop: 48 }}>
      <Button onClick={cancelToggle} color="#3a86ff">
        Cancel
      </Button>
      <Form onSubmit={submit} action="">
        {/* <h1>Edit Account</h1> */}
        <Input
          name="username"
          value={username}
          onChange={usernameChange}
          placeholder="Display Name"
        />
        <Input name="age" value={age} onChange={ageChange} placeholder="Age" />
        <Textarea
          name="bio"
          value={bio}
          onChange={bioChange}
          placeholder="Bio"
          rows="5"
        ></Textarea>
        <Button color="#8338ec" type="submit">
          Edit Account
        </Button>
      </Form>
    </div>
  );
}
