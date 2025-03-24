import React from "react"
import styles from "./Footer.module.css"
import logoImg from "../../assets/logo.png"

const Footer = ({ isMarginTop }) => {
  return (
    <footer /* style={{ marginTop: isMarginTop ? "calc(100vh - 100px)" : "100px" }} */>
      <div className={styles.container}>
        <div className={styles.footerCompany}>
          <img src={logoImg} alt="" className={styles.footerLogo} />

          <p>The ultimate source for eye-catching, high-retention video clips.</p>
        </div>

        <p className={styles.reserved}>©2025 HookBoost. All rights reserved.</p>

        <div className={styles.footerContact}>
          <p className={styles.footerContactTitle}>Contact Us</p>
          <p className={styles.footerContactSubtitle}>Have questions or need support? Reach out at:</p>
          <a href="mailto:contact@hookboost.com">contact@hookboost.com</a>
        </div>
      </div>

    </footer>
  )
}

export default Footer