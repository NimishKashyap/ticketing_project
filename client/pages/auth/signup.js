import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/useRequest";

function signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push("/"),
  });
  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
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
      {errors}

      <button type={"submit"} className="btn btn-primary">
        Sign Up
      </button>
    </form>
  );
}

export default signup;
