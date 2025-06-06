import React from "react"
import styles from "./PricingPage.module.css"
import logoImg from "../../assets/logo.png"
import AuthorizedHeader from "../AuthorizedHeader/AuthorizedHeader"

const PricingPage = () => {
  return (
    <div className={styles.wrapper}>
      <AuthorizedHeader />

      <div className={styles.pricing}>
        <div className={styles.container}>
          <div className={styles.offer}>

            <h1 className={styles.offerTitle}>Unlock Viral Potential with Visual Hooks</h1>
            <p className={styles.offerSubtitle}>
              Want your short videos to go viral? Eye-catching visuals keep viewers watching longer. With HookBoost Premium and Ultimate, you'll access a massive library of dynamic, satisfying, and engaging clips designed to make your content unskippable. Boost retention, drive engagement, and stand out from the crowd — all with just a few clicks.
            </p>
          </div>

          <div className={styles.tariffs}>
            <div className={styles.tariff}>
              <p className={styles.tariffName}>Free</p>
              <p className={styles.tariffPrice}>$0<span></span></p>

              <div className={styles.tariffOptions}>
                <div className={styles.tariffOption}>3 downloads per day</div>
                <div className={styles.tariffOption}>30fps only</div>
                <div className={styles.tariffOption}>1080p only resolution</div>
                <div className={styles.tariffOption}>watermark</div>
                <div className={styles.tariffOption}>limited access to library</div>
              </div>

            </div>

            <div className={styles.tariff}>
              <p className={styles.tariffName}>Premium</p>
              <p className={styles.tariffPrice}>$12.50<span>/mo</span></p>

              <div className={styles.tariffOptions}>
                <div className={styles.tariffOption}>275 downloads per month</div>
                <div className={styles.tariffOption}>30 or 60fps</div>
                <div className={styles.tariffOption}>1080p, 1440p, 2160p resolutions</div>
                <div className={styles.tariffOption}>No watermark</div>
                <div className={styles.tariffOption}>Full content library</div>
                <div className={styles.tariffOption}>$5 for 100 extra downloads</div>
              </div>

              <button className={styles.purchaseTariff}>Purchase</button>
            </div>

            <div className={styles.tariff}>
              <p className={styles.tariffName}>Ultimate</p>
              <p className={styles.tariffPrice}>$29.95<span>/mo</span></p>

              <div className={styles.tariffOptions}>
                <div className={styles.tariffOption}>1000 downloads per month</div>
                <div className={styles.tariffOption}>30 or 60fps</div>
                <div className={styles.tariffOption}>1080p, 1440p, 2160p resolutions</div>
                <div className={styles.tariffOption}>No watermark</div>
                <div className={styles.tariffOption}>Full content library</div>
                <div className={styles.tariffOption}>$4 for 100 extra downloads</div>
              </div>

              <button className={styles.purchaseTariff}>Purchase</button>
            </div>


          </div>
        </div>
      </div>



    </div>
  )
}

export default PricingPage