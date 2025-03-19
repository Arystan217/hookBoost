import React from "react"
import styles from "./ClipPopup.module.css"
import logoImg from "../../assets/logo.png"
import { Link } from "react-router-dom"
import { smartRequest } from "../../utils/smartRequest"

const ClipPopup = ({ clipPopup, setClipPopup }) => {

  const url = "https://pub-70afb9dcfa934980b35e0d79bfed253a.r2.dev"

  const handleDownload = async () => {
    try {
      const res = await smartRequest({
        method: "GET",
        endpoint: "api/download",
        payload: {
          file: `${clipPopup.clip.key}.mp4`
        },
        headers: {
          // "ngrok-skip-browser-warning": "69420",
        },
        navigate
      })

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
    <div className={`${styles.clipPopup} ${clipPopup.isOpened && styles.clipPopupActive}`}>
      <div className={styles.container}>
        <button className={styles.clipPopupReturnButton} onClick={() => setClipPopup(prev => ({
          isOpened: false,
          clip: {}
        }))}>Go back</button>
        <Link to="/mainPage"><img src={logoImg} alt="" className={styles.clipPopupLogo} /></Link>

        <div className={styles.clipPopupInfo}>
          {/* <div className={styles.clipPopupVideoWrapper}> */}
          <video
            src={`${url}/${clipPopup.clip?.key}.mp4`}
            autoPlay
            loop
            playsInline
            controls
            className={styles.clipPopupVideo}
          />
          {/* </div> */}


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
  )
}

export default ClipPopup