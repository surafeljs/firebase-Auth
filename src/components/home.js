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
      <section className="flex justify-center items-center bg-[#00ADB5] h-screen ">
        <Form
          className="rounded-lg border border-neutral-600 w-[450px] p-24 "
          onSubmit={handler}
        >
          <div className=" flex-row text-center mb-4 ">
            <div className="mb-5">
              <FormLabel className="text-2xl font-sans  font ">Email</FormLabel>
            </div>

            <div>
              <FormControl
                required
                autoFocus
                type="email"
                className="border rounded-lg w-72 h-12 text-lg :text-7xl   "
                onChange={(e) => setEmail(e.target.value)}
              ></FormControl>
            </div>
          </div>
          <div className=" flex-row text-center">
            <div className="mb-5">
              <FormLabel className="text-2xl font-sans font ">
                password
              </FormLabel>
            </div>
            <div>
              <FormControl
                className="border rounded-lg w-72 h-12 text-lg :text-7xl   "
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              ></FormControl>
            </div>
          </div>
          {success ? <p>{success}</p> : <p> </p>}
          {error ? <p>{error}</p> : <p>{user}</p>}

          <div className="flex justify-center mt-14 bg-[#FFE3BB] w-72 rounded-lg p-2 ">
            <FormControl
              className="text-2xl font-sans font   "
              type="submit"
            ></FormControl>
          </div>
        </Form>
      </section>
      {/* ---------------------------------------------------------------
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
      </Form> */}
    </>
  );
};

export default Home;
