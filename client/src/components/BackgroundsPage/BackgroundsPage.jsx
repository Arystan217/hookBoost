import React, { useState } from "react";
import styles from "./BackgroundsPage.module.css";
import logoImg from "../../assets/logo.png"
import preview from "../../assets/pg3.gif"
import { tailChase } from 'ldrs'

const BackgroundsPage = () => {

  const [isLoading, setIsLoading] = useState(true)

  tailChase.register()

  return (
    <div className={styles.wrapper}>

      <header>
        <div className={styles.container}>
          <a className={styles.logo} href="/">
            <img src={logoImg} alt="" className={styles.logoImg} />
          </a>

          <a href="mailto: arystan.working@gmail.com" className={styles.headerLink}>contact@hookboost.com</a>
        </div>
      </header>

      <div className={styles.container}>

        {/* <span className={`${styles.blurredBg} ${styles.blob1}`}></span> */}
        <span className={`${styles.blurredBg} ${styles.blob2}`}></span>

        <div className={styles.offer}>
          <h1 className={styles.title}>Hook Your Viewers' Attention</h1>
          <p className={styles.subtitle}>
          Keep viewers from scrolling away by adding eye-catching visuals next to your main content. Access a vast library of easy-to-watch clips — perfect for stream highlights, viral moments, and storytelling videos.
            {/* Hook More Views with Eye-catching parallel videos. Choose from wide variety of visuals that boost retention and make your short videos unskippable. */}
          </p>
        </div>






        <div className={styles.animations}>

        <div className={styles.animation}>
            <img src={preview} alt="" className={styles.animationPreview} />
          </div>

          <div className={styles.animation}>
            {isLoading &&
              <div className={styles.animationLoader}>
                <l-tail-chase
                  size="42"
                  speed="1.75"
                  color="#fff"
                ></l-tail-chase>
              </div>
            }
          </div>

          
        </div>

        <div>
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </div>
      </div>
    </div>
  );
};

export default BackgroundsPage;