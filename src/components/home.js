import React, { useEffect, useState } from "react";
import { auth } from "./firebase/db";
import { Form, FormControl, FormLabel } from "react-bootstrap";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";
const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const [emails, setEmails] = useState("");
  const [passwords, setPasswords] = useState("");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const u = user.email;
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
        async (crediantial) => {
          await sendEmailVerification(crediantial.user);
          console.log();

          setSuccess("Verification email sent!");
        }
      );
    } catch (error) {
      const err = error.code;
      console.log(err);
      console.log(error);
      setError(err);
    }
  };

  const signin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, emails, passwords)
        .then((crediantial) => {
          const user = crediantial.user;
          console.log(user);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      {success ? <p>{success}</p> : <p>Not Verifid Email</p>}
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
      ---------------------------------------------------------------
      <Form className="" onSubmit={signin}>
        <FormLabel>Email</FormLabel>
        <FormControl
          required
          autoFocus
          type="email"
          onChange={(e) => setEmails(e.target.value)}
        ></FormControl>
        <FormLabel>password</FormLabel>

        <FormControl
          type="password"
          onChange={(e) => setPasswords(e.target.value)}
        ></FormControl>
        <FormControl type="submit"></FormControl>
      </Form>
    </>
  );
};

export default Home;
