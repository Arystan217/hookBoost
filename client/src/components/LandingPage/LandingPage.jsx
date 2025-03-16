import React from "react";
import styles from "./LandingPage.module.css";
import logoImg from "../../assets/logo.png"
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
import withoutHookboostImage from "../../assets/withoutHookboost.png"
import lackOfAttentionImage from "../../assets/lackOfAttention.jpg"
import socialLogosImage from "../../assets/socialLogos.jpg"
import viewersImage from "../../assets/viewers.jpg"
import slowIcon from "../../assets/slow.png"
import editingHassleIcon from "../../assets/editingHassle2.png"
import resolutionIcon from "../../assets/resolution.png"
import storageIcon from "../../assets/storage.png"
import exampleImage from "../../assets/example3.png"
import exampleImage2 from "../../assets/example4.png"


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
            <Link to="/signup" className={styles.headerOfferButton}>Try for free</Link>
          </div>
        </div>
      </header>

      <div className={styles.container}>

        <span className={`${styles.blurredBg} ${styles.blob1}`}></span>
        {/* <span className={`${styles.blurredBg} ${styles.blob2}`}></span> */}

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

          <Link to="/signup" className={styles.heroButton}>Boost engagement today!</Link>
          <p className={styles.belowHeroButtonText}>No credit card required</p>
        </div>

        <div className={styles.problem}>
          <div className={styles.problemContent}>
            <div className={styles.problemContentLeft}>
              <h3 className={styles.sectionTitle}>
                Why Your Videos Aren’t Getting the Views They Deserve
              </h3>
              <p className={styles.sectionText}>
                {/* In today’s world of endless scrolling, <b>grabbing attention in the first few seconds is everything</b>. But making engaging content isn’t just about the main footage—you need the perfect background to hook viewers instantly. */}
                {/* Going viral is harder than ever. With 3.7 million short videos uploaded daily, standing out is a real challenge. Studies show that the average attention span of modern platforms (TikTok, Reels, Shorts) is <b>approximately 3-5 seconds.</b> If your video <b>doesn’t grab attention immediately, it gets lost in the scroll.</b> */}
                {/* Going viral is harder than ever. With 3.7 million short videos uploaded daily, standing out is a real challenge.  */}With endless content on TikTok, Reels, and Shorts, viewers <b>decide within 3-5 seconds</b> whether to keep watching or scroll past. Miss that moment and your video gets scrolled.
              </p>
              <p className={styles.sectionText}>
                {/* That’s why we created <b>HookBoost – to make your videos impossible to ignore.</b> */}
                That’s why using <b>easy-to-watch background videos</b> is key—they boost watch time and engagement, helping the algorithm push your content to more viewers. It's not just a detail—it’s <b>a game-changer for growth</b>.
              </p>
            </div>

            <div className={styles.problemContentRight}>
              {/* <p>Searching for the right engaging background video takes hours.</p>
              <p>Cropping, editing, and resizing is frustrating.</p>
              <p>Viewers leave if your content isn’t visually engaging from the start.</p> */}
              <img src={viewersImage} alt="" />
            </div>
          </div>
        </div>

        
        <div className={styles.struggle}>
          <h3 className={styles.struggleTitle}>The Struggle of Finding the Perfect Background video</h3>
          <h3 className={styles.struggleSubtitle}>Getting a high-quality, engaging background video isn’t easy. Here’s why it’s a hassle <br /> without HookBoost:</h3>
          <div className={styles.struggleContent}>
            <div className={styles.struggleItem}>
              <img src={slowIcon} className={styles.struggleItemIcon} alt="" />

              <div className={styles.struggleItemInfo}>
                <p className={styles.struggleItemTitle}>Endless Searching</p>
                <p className={styles.struggleItemText}>Finding the right video takes ages. Many clips are low-quality, off-theme, or just not engaging enough.</p>
              </div>
            </div>

            <div className={styles.struggleItem}>
              <img src={resolutionIcon} className={styles.struggleItemIcon} alt="" />

              <div className={styles.struggleItemInfo}>
                <p className={styles.struggleItemTitle}>Expensive Downloads</p>
                <p className={styles.struggleItemText}>Want 4K quality? Most platforms require paid subscriptions or premium services to access high-resolution downloads.</p>
              </div>
            </div>

            <div className={styles.struggleItem}>
              <img src={storageIcon} className={styles.struggleItemIcon} alt="" />

              <div className={styles.struggleItemInfo}>
                <p className={styles.struggleItemTitle}>Time & Storage Waste</p>
                <p className={styles.struggleItemText}>You’re forced to download an entire large video just to use a tiny fragment, eating up time and device space.</p>
              </div>
            </div>

            <div className={styles.struggleItem}>
              <img src={editingHassleIcon} className={styles.struggleItemIcon} alt="" />

              <div className={styles.struggleItemInfo}>
                <p className={styles.struggleItemTitle}>Manual Editing Hassle</p>
                <p className={styles.struggleItemText}>After all that, you still have to crop, adjust colors, and tweak the visuals to make the background truly engaging.</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.solution}>
          <div className={styles.problemContent}>
            <div className={styles.problemContentLeft}>
              <h3 className={styles.sectionTitle}>
                Why Your Videos Aren’t Getting the Views They Deserve
              </h3>
              <p className={styles.sectionText}>
                {/* In today’s world of endless scrolling, <b>grabbing attention in the first few seconds is everything</b>. But making engaging content isn’t just about the main footage—you need the perfect background to hook viewers instantly. */}
                {/* Going viral is harder than ever. With 3.7 million short videos uploaded daily, standing out is a real challenge. Studies show that the average attention span of modern platforms (TikTok, Reels, Shorts) is <b>approximately 3-5 seconds.</b> If your video <b>doesn’t grab attention immediately, it gets lost in the scroll.</b> */}
                {/* Going viral is harder than ever. With 3.7 million short videos uploaded daily, standing out is a real challenge.  */}With endless content on TikTok, Reels, and Shorts, viewers <b>decide within 3-5 seconds</b> whether to keep watching or scroll past. Miss that moment and your video gets scrolled.
              </p>
              <p className={styles.sectionText}>
                {/* That’s why we created <b>HookBoost – to make your videos impossible to ignore.</b> */}
                That’s why using <b>easy-to-watch background videos</b> is key—they boost watch time and engagement, helping the algorithm push your content to more viewers. It's not just a detail—it’s <b>a game-changer for growth</b>.
              </p>
            </div>

            <div className={styles.solutionContentRight}>
              {/* <p>Searching for the right engaging background video takes hours.</p>
              <p>Cropping, editing, and resizing is frustrating.</p>
              <p>Viewers leave if your content isn’t visually engaging from the start.</p> */}
              <img src={exampleImage} alt="" />
              <img src={exampleImage2} alt="" />
            </div>
          </div>
        </div>

        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

        
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                

        


        <div className={styles.asdf}></div>








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

        <div>
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </div>


      </div>

    </div>
  );
};

export default BackgroundsPage;