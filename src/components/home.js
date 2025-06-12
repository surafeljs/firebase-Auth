import React, { use, useEffect, useState } from "react";
import { auth } from "./firebase/db";
import { Form, FormControl, FormLabel } from "react-bootstrap";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const u = user.providerId;
        console.log(u);
        setUser(u);
      } else {
        console.log("fhfg");
      }
    });
    return () => unsubscribe();
  }, []);

  const handler = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (crediantial) => {
          const user = crediantial.user;
          console.log(user);
        }
      );
    } catch (error) {
      const err = error.message;
      console.log(err);
      console.log(error);
      setError(err);
    }
  };
  return (
    <>
      {error ? <p>{error}</p> : <p>{user}</p>}

      <Form className="" onSubmit={handler}>
        <FormLabel>Email</FormLabel>
        <FormControl
          required
          autoFocus
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        ></FormControl>
        <FormLabel>password</FormLabel>

        <FormControl
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        ></FormControl>
        <FormControl type="submit"></FormControl>
      </Form>
    </>
  );
};

export default Home;
