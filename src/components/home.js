import React, { useEffect, useState, useRef } from "react";
import { auth } from "./firebase/db";
import { Form, FormControl, FormLabel } from "react-bootstrap";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";
const Home = () => {
  const refs = useRef();
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

  useEffect(() => {
    const data = [
      "sura",
      "selam",
      "bami",
      "miki",
      "abel",
      "lidiya",
      "samuel",
      "betty",
      "dani",
      "marta",
    ];
    console.log(data);
    const random = Math.floor(Math.random() * data.length);
    const chance = data.at(random);
    console.log(chance);
    let i = 10;
    while (true) {
      const intervalid = setInterval(() => {
        console.log(i);

        // refs.current = document.body.innerHTML = `<h1>${i}</h1>`;
        if (refs.current) {
          refs.current.innerHTML = `<h1>${i}</h1>`;
        }

        i--;
        if (i < 3) {
          if (refs.current) {
            refs.current.setAttribute("style", "color:red");
          }

          if (i < 0) {
            clearInterval(intervalid);
            if (refs.current) {
              refs.current.innerHTML = `<h1>Show Result</h1>`;
            }
            const chanceFun = () => {
              if (refs.current) {
                refs.current.innerHTML = `<h1>${chance}</h1>`;
              }
            };

            if (refs.current) {
              refs.current.addEventListener("click", chanceFun);
            }
          }
        }
      }, 1000);
      return () => clearInterval(intervalid);
    }
  }, []);

  return (
    <>
      <h1 className="chance" ref={refs}></h1>
      {success ? <p>{success}</p> : <p>Not Verifid Email</p>}
      {error ? <p>{error}</p> : <p>{user}</p>}
      <section className="flex justify-center items-center bg-[#00ADB5] h-screen ">
        <Form
          className="rounded-lg border border-neutral-600 w-[450px] p-24 "
          onSubmit={handler}
        >
          <div className=" flex-row text-center mb-8 ">
            <div>
              <FormLabel className="text-2xl font-sans font ">Email</FormLabel>
            </div>

            <div>
              <FormControl
                required
                autoFocus
                type="email"
                className="border rounded-lg w-72 h-9 text-lg :text-7xl   "
                onChange={(e) => setEmail(e.target.value)}
              ></FormControl>
            </div>
          </div>
          <div className=" flex-row text-center">
            <div>
              <FormLabel className="text-2xl font-sans font ">
                password
              </FormLabel>
            </div>
            <div>
              <FormControl
                className="border rounded-lg w-72 h-9 text-lg :text-7xl   "
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              ></FormControl>
            </div>
          </div>
          <FormControl
            className="text-2xl font-sans font "
            type="submit"
          ></FormControl>
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
