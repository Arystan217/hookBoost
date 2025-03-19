import React, { useState } from "react"
import styles from "./AuthorizedHeader.module.css"
import logoImg from "../../assets/logo.png"
import { smartRequest } from "../../utils/smartRequest"
import { Link, useNavigate } from "react-router-dom"

const AuthorizedHeader = () => {

  const [isBurgerOpened, setIsBurgerOpened] = useState(false)

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
    <>
      <header>
        <div className={styles.container}>
          <a className={styles.logo} href="/mainPage">
            <img src={logoImg} alt="" className={styles.logoImg} />
          </a>

          {/* <a href="mailto: arystan.working@gmail.com" className={styles.headerLink}>contact@hookboost.com</a> */}
          <div className={styles.headerLinks}>
            <Link to="/mainPage" className={styles.headerLink}>Home</Link>
            {/* <Link to="/downloads" className={styles.headerLink}>Downloads</Link> */}
            <a className={styles.headerLink} onClick={signOutHandler}>Sign out</a>
            <Link /* to="/pricing" */ to="/downloads" className={styles.headerOfferButton}>{/* Upgrade to premium */}Downloads</Link>
          </div>

          <div className={`${styles.burger} ${isBurgerOpened && styles.burgerActive}`} onClick={() => setIsBurgerOpened(prev => !prev)}>
            <span className={styles.top}></span>
            <span className={styles.middle}></span>
            <span className={styles.bottom}></span>
          </div>
        </div>

        <div className={`${styles.burgerPopup} ${isBurgerOpened && styles.burgerPopupActive}`}>
          <div className={styles.burgerContent}>
            <Link to="/mainPage" className={styles.headerLink}>Home</Link>
            {/* <Link to="/downloads" className={styles.headerLink}>Downloads</Link> */}
            <a className={styles.headerLink} onClick={signOutHandler}>Sign out</a>
            {/* <Link to="/pricing" className={styles.headerOfferButton}>Upgrade to premium</Link> */}
            <Link /* to="/pricing" */ to="/downloads" className={styles.headerOfferButton}>{/* Upgrade to premium */}Downloads</Link>
          </div>
        </div>
      </header>
    </>
  )
}

export default AuthorizedHeader