import React, { useEffect, useState } from "react";
import styles from "./MainPage.module.css";
import { smartRequest } from "../../utils/smartRequest";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../assets/logo.png"
import playIcon from "../../assets/play.png"
import { tailChase } from 'ldrs'
import AuthorizedHeader from "../AuthorizedHeader/AuthorizedHeader";
import Footer from "../Footer/Footer";
import ClipPopup from "../ClipPopup/ClipPopup";


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

  const [filteredClips, setFilteredClips] = useState([])

  const [availableFilters, setAvailableFilters] = useState(["GTA 5", "Steep", /* "Minecraft Parkour", "Minecraft Building" */ "Minecraft", "Fortnite", "Forza Horizon"])
  const [selectedFilter, setSelectedFilter] = useState("")

  const [isLoading, setIsLoading] = useState(true)
  const [areClipsLoading, setAreClipsLoading] = useState(false)
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

        console.log(res.data.reverse())

        setClips(res.data.reverse())
        setFilteredClips(res.data.reverse())  // assuming that initial filter is always "All"
        setIsLoading(false)
      } catch (e) {
        console.log(e)
        setIsLoading(false)
      }
    }

    fetchClips()

  }, [])



  const filterHandler = filter => {
    setAreClipsLoading(true)
    setSelectedFilter(filter)


    setTimeout(() => {
      setFilteredClips(clips.filter(clip => clip?.genre?.toLowerCase() === filter.toLowerCase()))
    }, 250);
    setTimeout(() => {
      setAreClipsLoading(false)
    }, 350);
  }


  return (
    <div className={`${styles.wrapper} ${clipPopup.isOpened && styles.noScroll}`}>
      <AuthorizedHeader />

      <div className={styles.content}>
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
                className={`${styles.filter} ${!selectedFilter && styles.filterActive}`}
                onClick={() => {
                  setAreClipsLoading(true)
                  setSelectedFilter("");
                  setFilteredClips(clips)
                  setTimeout(() => {
                    setAreClipsLoading(false)
                  }, 300);
                }}
              >All</div>

              {availableFilters?.map(fl => (
                <div
                  className={`${styles.filter} ${selectedFilter == fl ? styles.filterActive : ""}`}
                  onClick={() => filterHandler(fl)}>
                  {fl}
                </div>
              ))}
            </div>

            <h2 className={styles.sectionTitle}>Clips:</h2>

            {/* <div className={`${styles.loader} ${areClipsLoading && styles.loaderVisible}`}>
            <l-tail-chase
              size="52"
              speed="1.75"
              color="#fff"
            ></l-tail-chase>
          </div> */}

            <div className={`${styles.clips} ${areClipsLoading && styles.clipsLoading}`}>

              {filteredClips?.map(el => (
                <div className={styles.clip} onClick={() => setClipPopup(() => ({
                  isOpened: true,
                  clip: el
                }))}>
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

                  <div className={styles.clipHover}>
                    <img src={playIcon} alt="" className={styles.playIcon} />
                    <span>Watch full clip</span>
                  </div>
                </div>
              ))}

            </div>
          </div>




        </div>

      </div>



      <ClipPopup clipPopup={clipPopup} setClipPopup={setClipPopup} />


      <Footer isMarginTop={isLoading} />
    </div>
  );
};

export default MainPage;