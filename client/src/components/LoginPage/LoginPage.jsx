import React, { useEffect, useState } from "react";
import styles from "./LoginPage.module.css";
import hideIcon from "../../assets/hide.png"
import showIcon from "../../assets/show.png"
import logoImg from "../../assets/logo.png"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { tailChase } from 'ldrs'
import { smartRequest } from "../../utils/smartRequest";

const LoginPage = () => {

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
        const res = await smartRequest({
          method: "GET",
          endpoint: "api/getUserDownloads",
          payload: {},
          headers: {
            // "ngrok-skip-browser-warning": "69420",
          },
          navigate
        })

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

      const res = await axios.post(`http://localhost:5000/api/login`, {
        login,
        password
      }, { withCredentials: true })


      console.log(res)

      navigate("/mainPage")

      setIsLoading(false)
    } catch (e) {
      setErrorMsg(e.response.data.message || "Something went wrong, please try later")
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>

        <Link to="/"><img src={logoImg} alt="" className={styles.logo} /></Link>

        <div className={styles.content}>
          <h1>Log in</h1>

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
              ) : "Log in"}
            </button>

            <p className={styles.hasAnAccount}>Don't have an account? <Link to="/signup">Sign up</Link></p>
          </form>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;