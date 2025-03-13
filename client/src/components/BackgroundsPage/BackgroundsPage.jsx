import React, { useState } from "react";
import styles from "./BackgroundsPage.module.css";
import logoImg from "../../assets/logo.png"
import preview from "../../assets/pg3.gif"
// import preview2 from "../../assets/small.gif"
import playIcon from "../../assets/play.png"
import { tailChase } from 'ldrs'
import Typewriter from "typewriter-effect";
import axios from "axios"
import { useEffect } from "react";

const BackgroundsPage = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [clipPopup, setClipPopup] = useState({
    isOpened: false,
    clip: {}
  })
  const [clips, setClips] = useState([])
  const url = "https://pub-70afb9dcfa934980b35e0d79bfed253a.r2.dev"

  tailChase.register()


  const handleDownload = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/download?file=${clipPopup.clip.key}.mp4`);

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

  useEffect(() => {
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

  }, [])


  return (
    <div className={`${styles.wrapper} ${clipPopup.isOpened && styles.noScroll}`}>

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

          {clips?.map(el => (
            <div className={styles.clip}>
              {/* preview */}
              <video
                src={`${url}/${el?.key}-preview.mp4`}
                autoPlay
                loop
                muted
                playsInline
                className={styles.clipPreview}
              />

              <div className={styles.clipHover} onClick={() => setClipPopup(prev => ({
                isOpened: true,
                clip: el
              }))}>
                <img src={playIcon} alt="" className={styles.playIcon} />
                <span>Watch full clip</span>
              </div>
            </div>
          ))}



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

        <div>
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </div>
      </div>

      <div className={`${styles.clipPopup} ${clipPopup.isOpened && styles.clipPopupActive}`}>
        <div className={styles.container}>
          <button className={styles.clipPopupReturnButton} onClick={() => setClipPopup(prev => ({
            isOpened: false,
            clip: {}
          }))}>Go back</button>
          <img src={logoImg} alt="" className={styles.clipPopupLogo} />

          <div className={styles.clipPopupInfo}>
            <video
              src={`${url}/${clipPopup.clip?.key}.mp4`}
              autoPlay
              loop
              playsInline
              controls
              className={styles.clipPopupVideo}
            />

            <div className={styles.clipPopupInfoText}>
              <p>Duration: <span>{clipPopup.clip?.duration || ""}</span></p>
              <p>Authors: <a href={clipPopup.clip?.linkForAuthors || ""} target="_blank">{clipPopup.clip?.authors || ""}</a></p>
              <p>Resolution: <span>{clipPopup.clip?.resolution || ""}</span></p>
              <p>Frame rate: <span>{clipPopup.clip?.frameRate || ""} fps</span></p>
              <p>Format: <span>{clipPopup.clip?.format || ""}</span></p>
              <p>Aspect Ration: <span>{clipPopup.clip?.aspectRation || ""}</span></p>
              <p>Size: <span>{clipPopup.clip?.size || ""}</span></p>
              <p>Sound: <span>{clipPopup.clip?.sound == true ? "Yes" : "No"}</span></p>

              {clipPopup.clip?.description && (
                <div className={styles.clipPopupDescription}>
                  <span>Description:</span>
                  <p>{clipPopup.clip?.description || ""}</p>
                </div>
              )}

              <button
                onClick={handleDownload}
                className={styles.clipPopupDownloadButton}
              >Download clip</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundsPage;