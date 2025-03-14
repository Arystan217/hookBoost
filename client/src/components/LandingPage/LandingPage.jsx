import React from "react";
import styles from "./LandingPage.module.css";
import logoImg from "../../assets/logo.png"
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";

const BackgroundsPage = () => {

  


  // fetching clips
  /* useEffect(() => {
    const fetchClips = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/getClipsInfo`);

        console.log(res)

        setClips(res.data)


      } catch (error) {
        console.error("Download failed:", error);
      }
    }

    fetchClips()

  }, []) */


  return (
    <div className={styles.wrapper}>

      <header>
        <div className={styles.container}>
          <a className={styles.logo} href="/">
            <img src={logoImg} alt="" className={styles.logoImg} />
          </a>

          {/* <a href="mailto: arystan.working@gmail.com" className={styles.headerLink}>contact@hookboost.com</a> */}
          <div className={styles.headerLinks}>
            <Link to="/login" className={styles.headerLink}>Sign in</Link>
            <Link to="/signup" className={styles.headerOfferButton}>Try free</Link>
          </div>
        </div>
      </header>

      <div className={styles.container}>

        <span className={`${styles.blurredBg} ${styles.blob1}`}></span>
        <span className={`${styles.blurredBg} ${styles.blob2}`}></span>

        <div className={styles.offer}>
          <h1 className={styles.title}>
            <span className={styles.titleFirstPart}>
              Make your
            </span>
            {" "}
            <span className={styles.typing}>
              <Typewriter
                options={{
                  strings: ["TikToks", "Reels", "Shorts"],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 75,
                  delay: 70,
                  pauseFor: 2500
                }}
              />
            </span>
            {" "}
            <span className={styles.underline}>unskippable</span>
            {/* Hook Your Viewers' Attention */}
          </h1>
          <p className={styles.subtitle}>
            Keep viewers from scrolling away by adding eye-catching visuals next to your main content. Access a vast library of easy-to-watch clips — perfect for storytelling videos, stream highlights, and viral moments.
            {/* Hook More Views with Eye-catching parallel videos. Choose from wide variety of visuals that boost retention and make your short videos unskippable. */}
          </p>

          <Link to="/signup" className={styles.heroButton}>Try now for free!</Link>
        </div>






        

        {/* <div className={styles.clip}>
            {isLoading &&
              <div className={styles.clipLoader}>
                <l-tail-chase
                  size="42"
                  speed="1.75"
                  color="#fff"
                ></l-tail-chase>
              </div>
            }
          </div> */}


      </div>

    </div>
  );
};

export default BackgroundsPage;