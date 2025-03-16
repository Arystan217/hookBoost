import React, { useEffect, useState } from "react";
import styles from "./MainPage.module.css";
import { smartRequest } from "../../utils/smartRequest";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../assets/logo.png"
import playIcon from "../../assets/play.png"
import { tailChase } from 'ldrs'
import AuthorizedHeader from "../AuthorizedHeader/AuthorizedHeader";


const MainPage = () => {

  // forbid inspecting code
  /* document.addEventListener("contextmenu", (e) => e.preventDefault());
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && e.key === "I") ||
      (e.ctrlKey && e.key === "u") ||
      (e.ctrlKey && e.key === "s")
    ) {
      e.preventDefault();
    }
  }); */


  const navigate = useNavigate()
  tailChase.register()

  const url = "https://pub-70afb9dcfa934980b35e0d79bfed253a.r2.dev"
  const [clips, setClips] = useState([])

  const [availableFilters, setAvailableFilters] = useState(["GTA 5", "Pixel Gun 3D", "Minecraft Parkour", "Minecraft Building", "Fortnite", "Forza Horizon"])
  const [selectedFilters, setSelectedFilters] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  const [clipPopup, setClipPopup] = useState({
    isOpened: false,
    clip: {}
  })

  useEffect(() => {
    const fetchClips = async () => {
      try {
        const res = await smartRequest({
          method: "GET",
          endpoint: "api/getClipsInfo",
          payload: {},
          headers: {
            // "ngrok-skip-browser-warning": "69420",
          },
          navigate
        })

        console.log(res)

        setClips(res.data)
        setIsLoading(false)
      } catch (e) {
        console.log(e)
        setIsLoading(false)
      }
    }

    fetchClips()

  }, [])

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
    <div className={`${styles.wrapper} ${clipPopup.isOpened && styles.noScroll}`}>
      <AuthorizedHeader />

      <div className={styles.container}>

        <div className={`${styles.loader} ${isLoading && styles.loaderVisible}`}>
          <l-tail-chase
            size="52"
            speed="1.75"
            color="#fff"
          ></l-tail-chase>
        </div>

        <div className={`${styles.fadingContent} ${!isLoading && styles.fadingContentVisible}`}>
          <div className={styles.filters}>
            <div
              className={`${styles.filter} ${selectedFilters.length == 0 && styles.filterActive}`}
              onClick={() => {
                setSelectedFilters([])
              }}
            >All</div>

            {availableFilters?.map(fl => (
              <div
                className={`${styles.filter} ${selectedFilters.includes(fl) ? styles.filterActive : ""}`}
                onClick={() => {
                  if (selectedFilters.includes(fl)) {
                    setSelectedFilters(selectedFilters.filter(el => el !== fl))
                  } else {
                    setSelectedFilters(prev => [...prev, fl])
                  }
                }}>
                {fl}
              </div>
            ))}
          </div>

          <h2 className={styles.sectionTitle}>Clips:</h2>

          <div className={styles.clips}>

            {clips?.map(el => (
              <div className={styles.clip}>
                <div className={styles.clipLoader}>
                  <l-tail-chase
                    size="42"
                    speed="1.75"
                    color="#fff"
                  ></l-tail-chase>
                </div>

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

          </div>
        </div>




      </div>




      <div className={`${styles.clipPopup} ${clipPopup.isOpened && styles.clipPopupActive}`}>
        <div className={styles.container}>
          <button className={styles.clipPopupReturnButton} onClick={() => setClipPopup(prev => ({
            isOpened: false,
            clip: {}
          }))}>Go back</button>
          <Link to="/mainPage"><img src={logoImg} alt="" className={styles.clipPopupLogo} /></Link>

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

      <div>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      </div>
    </div>
  );
};

export default MainPage;