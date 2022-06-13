import { useEffect, useState } from "react";
import axios from "axios";

function signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState([]);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/users/signup", {
        email,
        password,
      });
      console.log(response.data);
    } catch (err) {
      setErrors(err.response.data.errors);
    }
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
      {errors.length > 0 && (
        <div className="alert alert-danger">
          <h4>Ooops...</h4>
          <ul className="my-0">
            {errors.map((err, index) => (
              <li key={index}>{err.message}</li>
            ))}
          </ul>
        </div>
      )}
      <button type={"submit"} className="btn btn-primary">
        Sign Up
      </button>
    </form>
  );
}

export default signup;
