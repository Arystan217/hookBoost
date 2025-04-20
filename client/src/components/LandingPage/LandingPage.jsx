import React, { useEffect } from "react";
import styles from "./LandingPage.module.css";
import logoImg from "../../assets/logo.png"
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
// import withoutHookboostImage from "../../assets/withoutHookboost.png"
// import lackOfAttentionImage from "../../assets/lackOfAttention.jpg"
// import socialLogosImage from "../../assets/socialLogos.jpg"
import viewersImage from "../../assets/viewers.jpg"
import slowIcon from "../../assets/slow.png"
import editingHassleIcon from "../../assets/editingHassle2.png"
import resolutionIcon from "../../assets/resolution.png"
import storageIcon from "../../assets/storage.png"
import exampleImage from "../../assets/example3.png"
import exampleImage2 from "../../assets/example4.png"
import colorTuningImage from "../../assets/colorTuning.png"
import vastLibraryImage from "../../assets/vastLibrary.png"
// import ScrollAnimation from 'react-animate-on-scroll';
import Footer from "../Footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

const LandingPage = () => {

  useEffect(() => {
    AOS.init({
      duration: 590,
      easing: "ease-in-out",
      once: false,
    });
  }, []);


  return (
    <div className={styles.wrapper}>

      {/* <ScrollAnimation animateIn='fadeIn' duration={0.85} offset={0}> */}
      <header data-aos="fade-down" data-aos-duration="900">
        <div className={styles.container}>
          <a className={styles.logo} href="/">
            <img src={logoImg} alt="" className={styles.logoImg} />
          </a>

          {/* <a href="mailto: arystan.working@gmail.com" className={styles.headerLink}>contact@hookboost.com</a> */}
          <div className={styles.headerLinks}>
            <Link to="/login" className={styles.headerLink}>Log in</Link>
            <Link to="/signup" className={styles.headerOfferButton}>Sign up</Link>
          </div>
        </div>
      </header>
      {/* </ScrollAnimation> */}


      <div className={styles.container}>

        <span className={`${styles.blurredBg} ${styles.blob1}`}></span>
        {/* <span className={`${styles.blurredBg} ${styles.blob2}`}></span> */}

        <div className={styles.offer}>

          <h1 className={styles.title} data-aos="fade-in" data-aos-duration="900">
            {/* <ScrollAnimation animateIn='fadeInDown' duration={0.75}> */}
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
            <div className={styles.br}></div>
            <span className={styles.underline}>unskippable</span>
            {/* Hook Your Viewers' Attention */}
            {/* </ScrollAnimation> */}
          </h1>

          <p className={styles.subtitle} data-aos="fade-right" data-aos-duration="900">
            {/* <ScrollAnimation animateIn='fadeInRight' duration={0.75}> */}
            Keep viewers from scrolling away by adding eye-catching visuals next to your main content. Access a vast library of easy-to-watch clips — perfect for storytelling videos, stream highlights, and viral moments.
            {/* Hook More Views with Eye-catching parallel videos. Choose from wide variety of visuals that boost retention and make your short videos unskippable. */}
            {/* </ScrollAnimation> */}
          </p>

          {/* <ScrollAnimation animateIn='fadeInLeft' duration={0.75}> */}
          <a to="/signup" className={styles.heroButton} data-aos="fade-left" data-aos-duration="900">
            Get started now!
          </a>
          {/* </ScrollAnimation> */}

          <p className={styles.belowHeroButtonText} data-aos="fade-up" data-aos-duration="900">
            No credit card required
            {/* Launching in Mid-Spring 2025 */}
          </p>
        </div>

        <div className={styles.problem}>
          <div className={styles.problemContent}>
            <div className={styles.problemContentLeft} data-aos="fade-in" data-aos-duration="550" data-aos-offset="170">
              {/* <ScrollAnimation animateIn='fadeInLeft'> */}
              <h3 className={styles.sectionTitle}>
                What is a background video and how it's helpful?
              </h3>
              <p className={styles.sectionText}>
                With endless content flooding TikTok, Reels, and Shorts, viewers <b>decide within 3-5 seconds</b> whether to keep watching or scroll past. If you miss that moment, your video gets scrolled.
              </p>
              <p className={styles.sectionText}>
                That's where background videos come in. These <b>dynamic, easy-to-watch visuals</b> play alongside your main content, instantly capturing attention and keeping viewers engaged.
              </p>
              <p className={styles.sectionText}>
                By holding attention longer and boosting engagement, background videos signal to the algorithm that your content is worth showing to more people. It’s not just a detail - it’s a <b>powerful tool for growth</b>.
              </p>
              {/* </ScrollAnimation> */}
            </div>

            <div className={styles.problemContentRight} data-aos="fade-up" data-aos-duration="550" data-aos-offset="150">
              {/* <ScrollAnimation animateIn='fadeInUp'> */}
              <img src={viewersImage} alt="" />
              {/* </ScrollAnimation> */}
            </div>
          </div>
        </div>


        <div className={styles.struggle}>
          <h3 className={styles.struggleTitle} data-aos="fade-in" data-aos-duration="550">
            {/* <ScrollAnimation animateIn='fadeIn' duration={0.75}> */}
            The Struggle of Finding the Perfect Background video
            {/* </ScrollAnimation> */}
          </h3>
          <h3 className={styles.struggleSubtitle} data-aos="fade-in" data-aos-duration="550" data-aos-delay="100">
            {/* <ScrollAnimation animateIn='fadeIn' duration={0.75} delay={100}> */}
            Getting a high-quality, engaging background video isn’t easy. Here’s why it’s a hassle <br /> without HookBoost:
            {/* </ScrollAnimation> */}
          </h3>
          <div className={styles.struggleContent}>
            <div className={styles.struggleItem} data-aos="fade-up" data-aos-duration="550" data-aos-delay="0">
              {/* <ScrollAnimation animateIn='fadeIn' duration={0.75} delay={100}> */}
              <img src={slowIcon} className={styles.struggleItemIcon} alt="" />

              <div className={styles.struggleItemInfo}>
                <p className={styles.struggleItemTitle}>Endless Searching</p>
                <p className={styles.struggleItemText}>Finding the right video takes ages. Many clips are low-quality, copyright protected, or just not engaging enough.</p>
              </div>
              {/* </ScrollAnimation> */}
            </div>


            <div className={styles.struggleItem} data-aos="fade-up" data-aos-duration="550" data-aos-delay="150">
              <img src={resolutionIcon} className={styles.struggleItemIcon} alt="" />

              <div className={styles.struggleItemInfo}>
                <p className={styles.struggleItemTitle}>Expensive Downloads</p>
                <p className={styles.struggleItemText}>Want 4K quality? Most platforms require paid subscriptions or premium services to access high-resolution downloads.</p>
              </div>
            </div>

            <div className={styles.struggleItem} data-aos="fade-up" data-aos-duration="550" data-aos-delay="50">
              <img src={storageIcon} className={styles.struggleItemIcon} alt="" />

              <div className={styles.struggleItemInfo}>
                <p className={styles.struggleItemTitle}>Time & Storage Waste</p>
                <p className={styles.struggleItemText}>You’re forced to download an entire large video just to use a tiny fragment, eating up time and device space.</p>
              </div>
            </div>

            <div className={styles.struggleItem} data-aos="fade-up" data-aos-duration="550" data-aos-delay="150">
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
            <div className={styles.problemContentLeft} data-aos="fade-down" data-aos-duration="550" data-aos-offset="100">
              <h3 className={styles.sectionTitle}>
                HookBoost’s Smart Approach to Background Videos
              </h3>
              <p className={styles.sectionText}>
                At HookBoost, we don’t just provide background videos - <b>we deliver retention-optimized clips</b> designed to keep viewers hooked. Every video in our library is carefully filtered and tested to ensure <b>it maximizes watch time and engagement.</b>
              </p>
              <p className={styles.sectionText}>
                No more guessing which clips work - we’ve done the hard work for you, saving you hours of trial and error.
              </p>
            </div>

            <div className={styles.solutionContentRight} data-aos="fade-left" data-aos-duration="550" data-aos-offset="200">
              <img src={exampleImage} alt="" />
              <img src={exampleImage2} alt="" />
            </div>
          </div>
        </div>

        <div className={styles.perfection}>
          <div className={styles.problemContent}>
            <div className={styles.sectionImageWrapper} data-aos="fade-down" data-aos-duration="550" data-aos-offset="200">
              <img src={colorTuningImage} alt="" />
            </div>

            {/* <ScrollAnimation animateIn='fadeIn' duration={1}> */}
            <div className={styles.problemContentLeft} data-aos="fade-left" data-aos-duration="550" data-aos-offset="200">
              <h3 className={styles.sectionTitle}>
                Perfection in Every Detail
              </h3>
              <p className={styles.sectionText}>
                Our team obsessively reviews every second of every clip, cutting out unengaging moments and fine-tuning color balance to make visuals charming. This attention to detail ensures <b>nothing disrupts the viewer’s attention</b>, keeping their eyes glued to your content.
              </p>
              <p className={styles.sectionText}>
                With HookBoost, you’re not just adding a background - <b>you’re creating an uninterrupted, captivating experience.</b>
              </p>
            </div>
            {/* </ScrollAnimation> */}
          </div>
        </div>

        {/* <div className={styles.solution}>
          <div className={styles.problemContent}>
            <div className={styles.problemContentLeft} data-aos="fade-right" data-aos-duration="550" data-aos-offset="200">
              <h3 className={styles.sectionTitle}>
                Stand out from the crowd
              </h3>
              <p className={styles.sectionText}>
                HookBoost offers a vast and diverse library of background videos with multiple types of genres <b>to keep your channel fresh and engaging.</b> No two TikToks will look the same, giving your audience something new to love every time.
              </p>
            </div>

            <div className={styles.sectionImageWrapper} data-aos="fade-down" data-aos-duration="550" data-aos-offset="200">
              <img src={vastLibraryImage} alt="" />
            </div>
          </div>
        </div>
 */}
        <div className={styles.cta}>
          <h3 className={styles.ctaTitle} data-aos="fade-right" data-aos-duration="550">Ready to Dominate TikTok, Reels, and Shorts?</h3>
          <p className={styles.ctaSubtitle} data-aos="fade-left" data-aos-duration="550">Start creating unskippable content today!</p>

          {/* <a className={styles.ctaButton}>!</a> */}
          {/* <Link to="/signup" className={styles.heroButton}>Boost engagement today!Join the waitlist today</Link> */}
          <Link to="/signup" className={styles.heroButton} data-aos="fade-in" data-aos-duration="550">Get started now!</Link>
          <p className={styles.belowHeroButtonText} data-aos="fade-up" data-aos-duration="550">No credit card required{/* Launching in Mid-Spring 2025 */}</p>
        </div>


      </div>

      <Footer />

    </div>
  );
};

export default LandingPage;