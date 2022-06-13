import { useState } from "react";

function signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();

    console.log(email, password);
  };
  return (
    <form onSubmit={onSubmit}>
      <h1>Form</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          value={email}
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
          type={"email"}
          className="form-control"
        />
        <label>Password</label>
        <input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={"password"}
          className="form-control"
        />
      </div>
      <button type={"submit"} className="btn btn-primary">
        Sign Up
      </button>
    </form>
  );
}

export default signup;
