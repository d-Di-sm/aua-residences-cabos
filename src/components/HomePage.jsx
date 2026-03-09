import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Hero } from "./Hero";
import { useAtom } from "jotai";

import { transitionHome } from "../App";

export const HomePage = ({ onTourClick }) => {
  // VIDEOS CON CSS
  const videoRef = useRef(null);
  const serviceVideos = [
    "/videos/02_Int.mp4",
    "/videos/04_Ext.mp4",
    "/videos/05_Concept.mp4",
  ];

  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [currentService, setCurrentService] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const carouselSlides = [
    {
      title: "TA-LQ",
      subtitle: "Architecture",
      description:
        "An architecture studio primarily focused on the design of spaces, dedicated to creating thoughtful and personal architecture that understands the client, their environment, and the functionality of each project. Light, materials, and form are the tools we use to shape our work, seeking to respond to the specific needs of every project — from smaller scales such as furniture design to larger developments including corporate buildings, hotels, and commercial centers.",
      image: "/Images/17_Com.jpg",
    },
    {
      title: "Ecoantal",
      subtitle: "Developer",
      description:
        "Ecoantal provides comprehensive and high-precision real estate solutions, maximizing value for investors and clients through a vertically integrated investment platform that ensures meticulous planning and strong returns.",
      image: "/Images/18_Com.jpg",
    },
  ];

  // VIDEOS PLAY CON CSS
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.src = serviceVideos[currentService];

    v.load();

    const playPromise = v.play();
    if (playPromise?.catch) playPromise.catch(() => {});
  }, [currentService]);

  const [transitionHomepage, setTransitionHomepage] = useAtom(transitionHome);

  const transitionToHomepage = () => {
    setTransitionHomepage(true);
  };

  const logoVariants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.6,
        duration: 1.5,
      },
    },
    hidden: {
      opacity: 0,
      x: -50,
      transition: {
        duration: 1.5,
      },
    },
  };

  return (
    <main>
      <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
        {/* Logo en esquina superior izquierda */}
        <div className="header__logo">
          <motion.div
            className="header__logo__inner"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
          >
            <img
              src="/logos/AUA_Logo.png"
              alt="AUA Logo"
              className={
                isMobile
                  ? "w-[66px] h-auto scale-[0.85] origin-center"
                  : "w-[75px] h-auto scale-[0.85] origin-center"
              }
            />
          </motion.div>
        </div>

        <div className="header__menu">
          <a href="#hero" className="header__menu__item">
            Home
          </a>
          <a href="#services" className="header__menu__item">
            Project
          </a>
          <a href="#team" className="header__menu__item">
            Lifestyle
          </a>
          <a href="#portfolio" className="header__menu__item">
            Sensorial
          </a>
          <a href="#contact" className="header__menu__item">
            Interactive
          </a>
        </div>

        <div className="header__social">
          <a
            href="https://www.instagram.com/lqarquitectos/?hl=es"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <img
              src="/logos/Logo_Ins.png"
              alt="Instagram"
              className="header__social__icon"
            />
          </a>
          <a
            href="https://www.instagram.com/lqarquitectos/?hl=es"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <img
              src="/logos/Logo_Face.png"
              alt="Facebook"
              className="header__social__icon"
            />
          </a>
        </div>
      </header>

      <Hero />

      <section className="services" id="services">
        <h2 className="services__title">
          Where the Desert Meets the Sea
          <br />
          And Luxury Speaks in a Whisper
        </h2>
        <p className="services__subtitle">
          At the precise moment where golden sand dissolves into the deep blue
          of the Pacific, a private collection of residences emerges — conceived
          for those who understand that true luxury is never loud. It is lived.
        </p>
        <div className="services__nature">
          <img
            src="/Images/Nature01.png"
            alt="Nature 01"
            className="services__nature__img"
          />
          <img
            src="/Images/Nature02.png"
            alt="Nature 02"
            className="services__nature__img"
          />
          <img
            src="/Images/Nature03.png"
            alt="Nature 03"
            className="services__nature__img"
          />
        </div>
        <div className="services__slider">
          <div className="services__slider__display">
            <video
              ref={videoRef}
              className="services__video"
              src="/videos/01_Intro.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
          </div>
          <div className="services__slider__list">
            <div
              className={`services__slider__list__service ${
                currentService === 0
                  ? "services__slider__list__service--active"
                  : ""
              }`}
              onClick={() => setCurrentService(0)}
            >
              <h3 className="services__slider__list__service__title">
                Private Terraces
              </h3>
              <p className="services__slider__list__service__description">
                Expansive terraces with private pools open toward sweeping
                views, creating a seamless connection between indoor living and
                the surrounding landscape.
              </p>
            </div>

            <div
              className={`services__slider__list__service ${
                currentService === 1
                  ? "services__slider__list__service--active"
                  : ""
              }`}
              onClick={() => setCurrentService(1)}
            >
              <h3 className="services__slider__list__service__title">
                Timeless Materials
              </h3>
              <p className="services__slider__list__service__description">
                Natural stone, warm woods and handcrafted textures come together
                to create spaces that feel authentic, enduring, and deeply
                connected to the landscape of Los Cabos.
              </p>
            </div>

            <div
              className={`services__slider__list__service ${
                currentService === 2
                  ? "services__slider__list__service--active"
                  : ""
              }`}
              onClick={() => setCurrentService(2)}
            >
              <h3 className="services__slider__list__service__title">Site</h3>
              <p className="services__slider__list__service__description">
                A private oceanfront enclave along the prestigious Los Cabos
                corridor, offering exceptional privacy, sweeping Sea of Cortez
                views, and a refined coastal lifestyle.
              </p>
            </div>
          </div>
        </div>

        {/* Título de tipologías */}
        <h3 className="services__typologies__title">The Residences</h3>
        <p className="services__typologies__subtitle">
          A collection of refined homes shaped by light, landscape, and ocean
          horizons
        </p>
        {/* Segundo bloque de naturaleza con layouts de residencias */}
        <div className="services__nature services__nature--residences">
          <div className="services__nature__item">
            <img
              src="/Images/09_T_01.png"
              alt="Pent Garden"
              className="services__nature__img"
            />
            <h3 className="services__nature__title">Pent Garden</h3>
            <p className="services__nature__subtitle">
              AREAS
              <br />
              INTERIOR: 241.46 m2
              <br />
              TERRACE: 39.96 m2
              <br />
              GARDEN: 54.21 m2
              <br />
              <br />
              TOTAL: 335.63 m2
            </p>
          </div>

          <div className="services__nature__item">
            <img
              src="/Images/10_T_02.png"
              alt="Apartment"
              className="services__nature__img"
            />
            <h3 className="services__nature__title">Residences</h3>
            <p className="services__nature__subtitle">
              AREAS
              <br />
              INTERIOR: 241.46 m2
              <br />
              TERRACE: 39.63 m2
              <br />
              <br />
              <br />
              TOTAL: 281.09 m2
            </p>
          </div>

          <div className="services__nature__item">
            <img
              src="/Images/11_T_03.png"
              alt="Penthouse"
              className="services__nature__img"
            />
            <h3 className="services__nature__title">Penthouse</h3>
            <p className="services__nature__subtitle">
              AREAS
              <br />
              INTERIOR: 241.46 m2
              <br />
              TERRACE: 39.63 m2
              <br />
              ROOF: 130.99 m2
              <br />
              <br />
              TOTAL: 412.08 m2
            </p>
          </div>
        </div>
      </section>
      <section className="team" id="team">
        <h2 className="team__title">Nature & Lifestyle</h2>
        <p className="team__subtitle">
          In Los Cabos — where the landscape itself is art — these homes offer
          more than square footage. They offer a way of living that is discreet,
          refined, and deeply connected to nature
        </p>
        <div className="team__member">
          <div className="team__member__body">
            <p className="team__member__body__name">The Terrace by the Water</p>
            <p className="team__member__body__title">A private horizon</p>
            <p className="team__member__body__description">
              Where sky, water, and silence meet in effortless refinement.
            </p>
          </div>

          <div className="team__member__display team__member__display--blue">
            <img
              src="/Images/04_Ext.jpg"
              alt="Image01"
              className="team__member__image"
            />
          </div>
        </div>
        <div className="team__member team__member--reverse">
          <div className="team__member__body">
            <p className="team__member__body__name">The Pool</p>
            <p className="team__member__body__title">Stillness, reflected</p>
            <p className="team__member__body__description">
              A quiet expanse of water where light, horizon, and architecture
              exist in perfect balance.
            </p>
          </div>

          <div className="team__member__display team__member__display--pink">
            <img
              src="/Images/05_Ext.jpg"
              alt="Image02"
              className="team__member__image"
            />
          </div>
        </div>
        <div className="team__member">
          <div className="team__member__body">
            <p className="team__member__body__name">The Fitness Studio</p>
            <p className="team__member__body__title">Strength, in stillness</p>
            <p className="team__member__body__description">
              A private space for movement and balance — where well-being is
              shaped with quiet intention.
            </p>
          </div>

          <div className="team__member__display team__member__display--orange">
            <img
              src="/Images/15_Ext.jpg"
              alt="Image03"
              className="team__member__image"
            />
          </div>
        </div>

        <div className="team__member team__member--reverse">
          <div className="team__member__body">
            <p className="team__member__body__name">The Pool Bar</p>
            <p className="team__member__body__title">Ease, distilled</p>
            <p className="team__member__body__description">
              A shaded retreat by the water, where conversation lingers and
              leisure unfolds in quiet sophistication.
            </p>
          </div>

          <div className="team__member__display team__member__display--pink">
            <img
              src="/Images/07_Ext.jpg"
              alt="Image04"
              className="team__member__image"
            />
          </div>
        </div>

        <div className="team__member">
          <div className="team__member__body">
            <p className="team__member__body__name">Pétanque Court</p>
            <p className="team__member__body__title">Leisure in the open air</p>
            <p className="team__member__body__description">
              A relaxed outdoor setting for timeless moments of play and
              conversation.
            </p>
          </div>

          <div className="team__member__display team__member__display--orange">
            <img
              src="/Images/08_Ext.jpg"
              alt="Image03"
              className="team__member__image"
            />
          </div>
        </div>

        <h2 className="team__nature__title">Living the Landscape</h2>
        <div className="team__nature">
          <img
            src="/Images/Nature04.png"
            alt="Nature 04"
            className="team__nature__img"
          />
          <img
            src="/Images/Nature05.png"
            alt="Nature 05"
            className="team__nature__img"
          />
          <img
            src="/Images/Nature06.png"
            alt="Nature 06"
            className="team__nature__img"
          />
          <img
            src="/Images/Nature07.png"
            alt="Nature 07"
            className="team__nature__img"
          />
        </div>
      </section>
      <section className="portfolio" id="portfolio">
        <h2 className="portfolio__title">Sensorial Experience</h2>
        <p className="portfolio__subtitle">
          A residence designed not only to be seen, but to be felt. Morning
          light moves softly across natural stone. The ocean breeze drifts
          through open terraces. Textures of wood and linen warm the space
          underfoot and in hand. Silence is uninterrupted, broken only by the
          distant rhythm of the sea.
        </p>

        <div className="portfolio__display">
          <img
            src="/Images/03_Int.jpg"
            alt="Image05"
            className="portfolio__image"
          />
        </div>

        {/* Bloque de tipologías dentro de portfolio, reutilizando services__nature--residences */}
        <div className="services__nature services__nature--residences">
          <div className="services__nature__item">
            <img
              src="/Images/13_E_02.png"
              alt="Pent Garden"
              className="services__nature__img"
            />
            <h3 className="portfolio__nature__title">Wellness & Spa</h3>
            <p className="portfolio__nature__subtitle">
              Moments of calm and beauty as the sun sets over the Sea of Cortez.
            </p>
          </div>

          <div className="services__nature__item">
            <img
              src="/Images/12_E_01.png"
              alt="Apartment"
              className="services__nature__img"
            />
            <h3 className="portfolio__nature__title">Sunset Firepit</h3>
            <p className="portfolio__nature__subtitle">
              A sanctuary for balance, restoration, and mindful well-being.
            </p>
          </div>

          <div className="services__nature__item">
            <img
              src="/Images/14_E_03.png"
              alt="Penthouse"
              className="services__nature__img"
            />
            <h3 className="portfolio__nature__title">Outdoor Culinary</h3>
            <p className="portfolio__nature__subtitle">
              Refined dining experiences inspired by the flavors of Baja.
            </p>
          </div>
        </div>
      </section>
      <section className="contact" id="contact">
        <div className="interactive">
          <button
            className="interactive__button"
            onClick={() => transitionToHomepage()}
          >
            Interactive Experience
          </button>
        </div>

        <h2 className="carousel-section__title">Development Team</h2>
        <div className="carousel-section">
          <div className="carousel-section__inner">
            <div className="carousel">
              {carouselSlides.map((slide, i) => (
                <div
                  key={i}
                  className={`carousel__slide ${
                    i === carouselIndex ? "carousel__slide--active" : ""
                  }`}
                >
                  <div className="carousel__content">
                    <h3 className="carousel__title">{slide.title}</h3>
                    <p className="carousel__subtitle">{slide.subtitle}</p>
                    <p className="carousel__description">{slide.description}</p>
                  </div>
                  <div className="carousel__image-wrap">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="carousel__image"
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="carousel__arrow carousel__arrow--prev"
              onClick={() =>
                setCarouselIndex((prev) =>
                  prev === 0 ? carouselSlides.length - 1 : prev - 1,
                )
              }
              aria-label="Slide anterior"
            >
              ‹
            </button>
            <button
              type="button"
              className="carousel__arrow carousel__arrow--next"
              onClick={() =>
                setCarouselIndex((prev) =>
                  prev === carouselSlides.length - 1 ? 0 : prev + 1,
                )
              }
              aria-label="Slide siguiente"
            >
              ›
            </button>
            <div className="carousel__dots">
              {carouselSlides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`carousel__dot ${
                    i === carouselIndex ? "carousel__dot--active" : ""
                  }`}
                  onClick={() => setCarouselIndex(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <h2 className="contact__title">Contact Us</h2>
        <form className="contact__form">
          <div>
            <input
              className="contact__form__input"
              type="text"
              placeholder="Name"
            />
          </div>
          <div>
            <input
              className="contact__form__input"
              type="email"
              placeholder="Email"
            />
          </div>
          <div>
            <textarea
              className="contact__form__textarea"
              placeholder="Message"
            ></textarea>
          </div>
          <div>
            <button className="contact__form__button">Send</button>
          </div>
        </form>
      </section>

      <footer className="footer">
        <div className="footer__left">
          <p className="footer__address">
            Cabo Colorado Cerro Colorado SJC, 23405 San José del Cabo, B.C.S.
            <br />
            <a href="mailto:contacto@ta-lq.com.mx" className="footer__email">
              contacto@ta-lq.com.mx
            </a>
          </p>
        </div>
        <div className="footer__right">
          <a href="#" className="footer__privacy">
            Aviso de privacidad
          </a>
          <div className="footer__social">
            <a
              href="https://www.instagram.com/lqarquitectos/?hl=es"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <img
                src="/logos/Logo_Ins.png"
                alt="Instagram"
                className="footer__social__icon"
              />
            </a>
            <a
              href="https://www.instagram.com/lqarquitectos/?hl=es"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <img
                src="/logos/Logo_Face.png"
                alt="Facebook"
                className="footer__social__icon"
              />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
};
