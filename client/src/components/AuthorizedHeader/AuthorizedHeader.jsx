import React from "react"
import styles from "./AuthorizedHeader.module.css"
import logoImg from "../../assets/logo.png"
import { smartRequest } from "../../utils/smartRequest"
import { Link, useNavigate } from "react-router-dom"

const AuthorizedHeader = () => {

  const navigate = useNavigate()

  const signOutHandler = async () => {
    try {
      const res = await smartRequest({
        method: "POST",
        endpoint: "api/logout",
        payload: {},
        headers: {
          // "ngrok-skip-browser-warning": "69420",
        },
        navigate
      })

      localStorage.removeItem("hookBoostAccessToken")
      navigate("/login")
    } catch (e) {
      console.log(e)
    }
  }



  return (
    <header>
      <div className={styles.container}>
        <a className={styles.logo} href="/mainPage">
          <img src={logoImg} alt="" className={styles.logoImg} />
        </a>

        {/* <a href="mailto: arystan.working@gmail.com" className={styles.headerLink}>contact@hookboost.com</a> */}
        <div className={styles.headerLinks}>
          <Link to="/mainPage" className={styles.headerLink}>Home</Link>
          <Link to="/downloads" className={styles.headerLink}>Downloads</Link>
          <a className={styles.headerLink} onClick={signOutHandler}>Sign out</a>
          <Link to="/pricing" className={styles.headerOfferButton}>Upgrade to premium</Link>
        </div>
      </div>
    </header>
  )
}

export default AuthorizedHeader