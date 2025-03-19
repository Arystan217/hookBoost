import React, { useEffect, useState } from "react";
import styles from "./SignUpPage.module.css";
import hideIcon from "../../assets/hide.png"
import showIcon from "../../assets/show.png"
import logoImg from "../../assets/logo.png"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { tailChase } from 'ldrs'
// import { smartRequest } from "../../utils/smartRequest";

const SignUpPage = () => {

  const navigate = useNavigate()

  tailChase.register()

  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // check auth
    const checkAuth = async () => {
      try {
        /* const res = await smartRequest({
          method: "POST",
          endpoint: "api/checkAuth",
          payload: {},
          headers: {
            // "ngrok-skip-browser-warning": "69420",
          },
          navigate
        }) */
        await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/api/checkAuth`)

        console.log("authorized");
        navigate("/mainPage")
      } catch (e) {
      }
    }

    checkAuth()
  }, [])

  const loginHandler = async e => {
    e.preventDefault();
    setErrorMsg("")
    setIsLoading(true)

    try {
      // validating credentials
      if (!login.trim().length || !password.trim().length) {
        setIsLoading(false)
        setErrorMsg("Almost there! Just make sure all fields are filled in.")
      }

      const res = await axios.post(`http://localhost:5000/api/signup`, {
        login,
        password,
        navigate
      }, { withCredentials: true })

      console.log(res)

      navigate("/mainPage")

      setIsLoading(false)
    } catch (e) {
      console.log(e)
      setIsLoading(false)
      setErrorMsg(e?.response?.data?.message || "Something went wrong, please try later")
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>

        <Link to="/"><img src={logoImg} alt="" className={styles.logo} /></Link>

        <div className={styles.content}>
          <h1>Sign up</h1>

          <form>
            <div className={styles.inputContainer}>
              <input
                value={login}
                onChange={e => setLogin(e.target.value)}
                type="text"
                id="login"
                placeholder=" "
                autoComplete="off"
              />
              <label htmlFor="login">Login</label>
            </div>

            <div className={styles.inputContainer}>
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder=" "
                autoComplete="off"
              />
              <label htmlFor="password">Password</label>
              <img
                onClick={() => setShowPassword(!showPassword)}
                src={showPassword ? showIcon : hideIcon}
                className={styles.showPassword}
                title={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
              />
            </div>

            {errorMsg.length !== 0 && <p className={styles.error}>{errorMsg}</p>}

            <button className={`${styles.submitButton} ${isLoading && styles.submitButtonLoading}`} onClick={e => loginHandler(e)}>
              {isLoading ? (
                <l-tail-chase
                  size="35"
                  speed="1.75"
                  color="#fff"
                ></l-tail-chase>
              ) : "Sign up"}
            </button>

            <p className={styles.hasAnAccount}>Already has an account? <Link to="/login">Sign in</Link></p>
          </form>

        </div>
      </div>
    </div>
  );
};

export default SignUpPage;