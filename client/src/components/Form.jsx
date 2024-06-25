import { useState } from "react";
import "../styles/form.css";

const Form = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const patientData = {
    firstname,
    lastname,
    email,
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(patientData);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname">Firstname:</label>
        <input
          type="text"
          id="firstname"
          placeholder="Firstname"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br />
        <label htmlFor="lastname">Lastname:</label>
        <input
          type="text"
          id="lastname"
          placeholder="Lastname"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default Form;
