import React, { useEffect, useRef, useState } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

// Username and Password Regex for validation
const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// Phone Number Regex for validation (example: US format)
const TELNO_REGEX = /^\d{10}$/;

// Email Regex for validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 const Register = () => {
  const navigate = useNavigate();

  const usernameRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [telno, setTelNo] = useState("");
  const [validTelNo, setValidTelNo] = useState(false);
  const [telnoFocus, setTelNoFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);
  useEffect(() => {
    setValidName(USERNAME_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidTelNo(TELNO_REGEX.test(telno));
  }, [telno]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setFormError("");
  }, [username, email, password, matchPassword, telno]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/register",
        JSON.stringify({ username, email, password, telno }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(JSON.stringify(response?.data));

      setSuccess(true);
      setUsername("");
      setPassword("");
      setMatchPassword("");
      setTelNo("");
      setEmail("");
    } catch (error) {
      if (!error?.response) {
        setFormError("No Server Response");
      } else if (error.response?.status === 409) {
        setFormError("Username Taken");
      } else {
        setFormError("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <span onClick={() => navigate("/")}>Login</span>
        </section>
      ) : (
        <section className="mt-10">
          <p
            ref={errRef}
            className={
              formError ? "font-semibold text-md" : "absolute left-[-9999px]"
            }
          ></p>

          <h1 className="text-center text-lg font-bold text-primary mb-5">
            Register
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 mx-20">
            {/* Username Field */}
            <label htmlFor="username">
              Username:
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? "text-green-600 ml-5" : "hidden"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  validName || !username ? "hidden" : "text-red-700 ml-5"
                }
              />
            </label>
            <input
              type="text"
              id="username"
              ref={usernameRef}
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && username && !validName
                  ? "text-xs rounded-md bg-black text-white px-1 py-0.5 relative -bottom-2"
                  : "absolute left-[-9999px]"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            {/* Email Field */}
            <label htmlFor="email">
              Email:
              <FontAwesomeIcon
                icon={faCheck}
                className={validEmail ? "text-green-600 ml-5" : "hidden"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  validEmail || !email ? "hidden" : "text-red-700 ml-5"
                }
              />
            </label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p
              id="emailnote"
              className={
                emailFocus && email && !validEmail
                  ? "text-xs rounded-md bg-black text-white px-1 py-0.5 relative -bottom-2"
                  : "absolute left-[-9999px]"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must be a valid email address.
            </p>

            {/* Phone Number Field */}
            <label htmlFor="telno">
              Phone Number:
              <FontAwesomeIcon
                icon={faCheck}
                className={validTelNo ? "text-green-600 ml-5" : "hidden"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  validTelNo || !telno ? "hidden" : "text-red-700 ml-5"
                }
              />
            </label>
            <input
              type="text"
              id="telno"
              autoComplete="off"
              onChange={(e) => setTelNo(e.target.value)}
              value={telno}
              required
              onFocus={() => setTelNoFocus(true)}
              onBlur={() => setTelNoFocus(false)}
            />
            <p
              id="telnote"
              className={
                telnoFocus && telno && !validTelNo
                  ? "text-xs rounded-md bg-black text-white px-1 py-0.5 relative -bottom-2"
                  : "absolute left-[-9999px]"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must be a valid 10-digit phone number.
            </p>

            {/* Password Field */}
            <label htmlFor="password">
              Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPassword ? "text-green-600 ml-5" : "hidden"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  validPassword || !password ? "hidden" : "text-red-700 ml-5"
                }
              />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
            <p
              id="pwdnote"
              className={
                passwordFocus && !validPassword
                  ? "text-xs rounded-md bg-black text-white px-1 py-0.5 relative -bottom-2"
                  : "absolute left-[-9999px]"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number, and a
              special character.
            </p>

            {/* Confirm Password Field */}
            <label htmlFor="confirm_password">
              Confirm Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validMatch ? "text-green-600 ml-5" : "hidden"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  validMatch || !matchPassword ? "hidden" : "text-red-700 ml-5"
                }
              />
            </label>
            <input
              type="password"
              id="confirm_password"
              onChange={(e) => setMatchPassword(e.target.value)}
              value={matchPassword}
              required
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch
                  ? "text-xs rounded-md bg-black text-white px-1 py-0.5 relative -bottom-2"
                  : "absolute left-[-9999px]"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>

            {/* Submit Button */}
            <button
              disabled={
                !validName || !validPassword || !validMatch || !validTelNo
              }
            >
              Sign Up
            </button>
          </form>

          <p>
            Already registered?
            <br />
            <span className="line">
              <Link to="/">Sign In</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register