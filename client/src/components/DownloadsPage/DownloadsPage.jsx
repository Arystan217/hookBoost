import React, { useState } from "react"
import styles from "./DownloadsPage.module.css"
import AuthorizedHeader from "../AuthorizedHeader/AuthorizedHeader"
import { useEffect } from "react"
import { smartRequest } from "../../utils/smartRequest"
import { Link, useNavigate } from "react-router-dom"
import { tailChase } from 'ldrs'
import playIcon from "../../assets/play.png"

const DownloadsPage = () => {

  const navigate = useNavigate()
  tailChase.register()

  const url = "https://pub-70afb9dcfa934980b35e0d79bfed253a.r2.dev"

  const [clips, setClips] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const res = await smartRequest({
          method: "GET",
          endpoint: "api/getUserDownloads",
          payload: {},
          headers: {
            // "ngrok-skip-browser-warning": "69420",
          },
          navigate
        })

        console.log(res)
        setClips(res.data.downloads)
        setIsLoading(false)
      } catch (e) {
        setIsLoading(false)
        console.log(e)
      }
    }

    fetchDownloads()
  }, [])


  return (
    <div className={styles.wrapper}>

      <AuthorizedHeader />

      <div className={styles.downloads}>
        <div className={styles.container}>


          <div className={`${styles.loader} ${isLoading && styles.loaderVisible}`}>
            <l-tail-chase
              size="52"
              speed="1.75"
              color="#fff"
            ></l-tail-chase>
          </div>

          <div className={`${styles.fadingContent} ${!isLoading && styles.fadingContentVisible}`}>
              {(!isLoading && !clips.length) ? (
                <div className={styles.noContent}>You haven't downloaded any clips yet. <Link to="/mainPage">Let's start exploring!</Link></div>
              ) : (
                <><h1 className={styles.downloadsTitle}>Your downloads:</h1>

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
                </>
              )
              }
            </div>


        </div>
      </div>

    </div>
  )
}

export default DownloadsPage