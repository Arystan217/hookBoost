import React, { useEffect, useState } from "react";
import styles from "./MainPage.module.css";
import { smartRequest } from "../../utils/smartRequest";
import { useNavigate } from "react-router-dom";
import logoImg from "../../assets/logo.png"

const MainPage = () => {

  const navigate = useNavigate()

  const [clips, setClips] = useState([])

  const [availableFilters, setAvailableFilters] = useState(["GTA 5", "Pixel Gun 3D", "Minecraft Parkour", "Minecraft Building", "Fortnite", "Forza Horizon"])
  const [selectedFilters, setSelectedFilters] = useState(["Fortnite"])

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
      } catch (e) {
        console.log(e)
      }
    }

    fetchClips()

  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header>
          <div className={styles.container}>
            <a className={styles.logo} href="/">
              <img src={logoImg} alt="" className={styles.logoImg} />
            </a>

            {/* <a href="mailto: arystan.working@gmail.com" className={styles.headerLink}>contact@hookboost.com</a> */}
            <div className={styles.headerLinks}>
              <a to="/login" className={styles.headerLink}>Downloads</a>
              <a to="/login" className={styles.headerLink}>My profile</a>
              <a to="/login" className={styles.headerOfferButton}>Upgrade to premium</a>
            </div>
          </div>
        </header>

        <div className={styles.container}>
          <div className={styles.filters}>
            <div 
              className={`${styles.filter} ${!selectedFilters.length && styles.filterActive}`}
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

          <h2>Clips:</h2>
        </div>

      </div>
    </div>
  );
};

export default MainPage;