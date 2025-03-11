import React, { useState } from "react";
import styles from "./BackgroundsPage.module.css";
import logoImg from "../../assets/logo.png"
import preview from "../../assets/pg3.gif"
// import preview2 from "../../assets/small.gif"
import playIcon from "../../assets/play.png"
import { tailChase } from 'ldrs'
import Typewriter from "typewriter-effect";
import axios from "axios"

const BackgroundsPage = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [isClipPopupOpened, setIsClipPopupOpened] = useState(false)

  tailChase.register()


  const handleDownload = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/download?file=small.gif`);

      console.log(res)  
  
      if (res.data.url) {
        const link = document.createElement("a");
        link.href = res.data.url;
        link.download = true;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Download failed:", error);
    }
  };


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
            Keep viewers from scrolling away by adding eye-catching visuals next to your main content. Access a vast library of easy-to-watch clips — perfect for stream highlights, viral moments, and storytelling videos.
            {/* Hook More Views with Eye-catching parallel videos. Choose from wide variety of visuals that boost retention and make your short videos unskippable. */}
          </p>
        </div>






        <div className={styles.clips}>

          <div className={styles.clip}>
            <img src="https://hookboost-test.c7534afce3505cb38269b7431d83bfda.r2.cloudflarestorage.com/small.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=4b58c25c19ed2626a42df6b62930c07f%2F20250311%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250311T154505Z&X-Amz-Expires=3600&X-Amz-Signature=210944cd19fbbb6f32fa7972cd0b6583f2258e4629055bca8579f06e4b4e3adc&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3Dsmall.gif&x-amz-checksum-mode=ENABLED&x-id=GetObject" alt="" className={styles.clipPreview} />

            <div className={styles.clipHover} onClick={() => setIsClipPopupOpened(true)}>
              <img src={playIcon} alt="" className={styles.playIcon} />
              <span>Watch full clip</span>
            </div>
          </div>

          <div className={styles.clip}>
            {isLoading &&
              <div className={styles.clipLoader}>
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

      <div className={`${styles.clipPopup} ${isClipPopupOpened && styles.clipPopupActive}`}>
        <div className={styles.container}>
          <button className={styles.clipPopupReturnButton} onClick={() => setIsClipPopupOpened(false)}>Go back</button>
          <img src={logoImg} alt="" className={styles.clipPopupLogo} />

          <div className={styles.clipPopupInfo}>
            <img src="https://hookboost-test.c7534afce3505cb38269b7431d83bfda.r2.cloudflarestorage.com/small.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=4b58c25c19ed2626a42df6b62930c07f%2F20250311%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250311T154505Z&X-Amz-Expires=3600&X-Amz-Signature=210944cd19fbbb6f32fa7972cd0b6583f2258e4629055bca8579f06e4b4e3adc&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3Dsmall.gif&x-amz-checksum-mode=ENABLED&x-id=GetObject" alt="" className={styles.clipPopupVideo} />

            <div className={styles.clipPopupInfoText}>
              <p>Duration: <span>3m 45s</span></p>
              <p>Authors: <span>HookBoost's content creation team</span></p>
              <p>Frame rate: <span>60 fps</span></p>
              <p>Format: <span>mp4</span></p>
              <p>Aspect Ration: <span>1:1</span></p>
              <p>Size: <span>70MB</span></p>
              <p>Loopable: <span>No</span></p>
              <p>Sound: <span>Yes</span></p>

              <div className={styles.clipPopupDescription}>
                <span>Description:</span>
                <p>Dynamic clip from Pixel Gun 3D game.</p>
              </div>

              <button
                onClick={handleDownload}
                className={styles.clipPopupDownloadButton}
              >Download clip</button>

              <a
                href="https://pub-70afb9dcfa934980b35e0d79bfed253a.r2.dev/small.gif?filename=small"
                download="final.mp4"
                target="_blank"
              >
                <button>Download Clip</button>
              </a>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundsPage;