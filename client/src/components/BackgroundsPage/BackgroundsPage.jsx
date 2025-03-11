import React, { useState } from "react";
import styles from "./BackgroundsPage.module.css";
import logoImg from "../../assets/logo.png"
import preview from "../../assets/pg3.gif"
import preview2 from "../../assets/small.gif"
import playIcon from "../../assets/play.png"
import { tailChase } from 'ldrs'
import Typical from "react-typical";

const BackgroundsPage = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [isClipPopupOpened, setIsClipPopupOpened] = useState(false)

  tailChase.register()

  // const handleDownload = () => {
  //   // Create an iframe element (hidden)
  //   const iframe = document.createElement('iframe');
  //   iframe.style.display = 'none';
  //   document.body.appendChild(iframe);

  //   // Write a form to the iframe that will submit automatically
  //   iframe.contentDocument.write(`
  //     <form action="https://pub-70afb9dcfa934980b35e0d79bfed253a.r2.dev/small.gif" method="get">
  //       <input type="hidden" name="download" value="1">
  //     </form>
  //     <script>document.forms[0].submit();</script>
  //   `);

  //   // Clean up the iframe after a delay
  //   setTimeout(() => {
  //     document.body.removeChild(iframe);
  //   }, 2000);
  // };

  const handleDownload = () => {
    const baseUrl = "https://pub-70afb9dcfa934980b35e0d79bfed253a.r2.dev/small.gif";
    const downloadUrl = `${baseUrl}?download=1&filename=final_video`;

    window.location.href = downloadUrl;
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
              <Typical
                steps={[
                  "TikToks", 2500,
                  "Reels", 2500,
                  "Shorts", 2500
                ]}
                loop={Infinity}
                wrapper="p"
              />
            </span>{" "} 
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
            <img src={preview2} alt="" className={styles.clipPreview} />

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
            <img src={preview2} alt="" className={styles.clipPopupVideo} />

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