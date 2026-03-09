import { motion, AnimatePresence } from "framer-motion";
import { atom, useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { transitionHome } from "../App";
import { section } from "./Experience";

export const screenAtom = atom("home");
export const transitionAtom = atom(true);
export const isMobileAtom = atom(false);

export const annotation3d = atom("base");

export const residenceTogglesAtom = atom({
  "Apt A Garden": false,
  "Apt B Garden": false,
  "Apt A": false,
  "Apt B": false,
  "Apt A Penthouse": false,
  "Apt B Penthouse": false,
});

export const TRANSITION_DELAY = 0.8;
export const TRANSITION_DURATION = 3.2;
export const CAKE_TRANSITION_DURATION = 2.5;

export const UI = () => {
  const [screen, setScreen] = useAtom(screenAtom);
  const [annotation, setAnnotation] = useAtom(annotation3d);
  const [transition, setTransition] = useAtom(transitionAtom);
  const [transitionHomepage, setTransitionHomepage] = useAtom(transitionHome);
  const [sectionCam, setSectionCam] = useAtom(section);
  const timeout = useRef();

  const [isMobile, setIsMobile] = useAtom(isMobileAtom);

  const [showResidencesPanel, setShowResidencesPanel] = useState(false);
  const [residenceToggles, setResidenceToggles] = useAtom(residenceTogglesAtom);

  const [activeButton, setActiveButton] = useState(null); // 'residences', 'amenities', 'entrance', or null
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const transitionToScreen = (newScreen) => {
    if (newScreen === "isom") {
      setTransition(true);
    }

    clearTimeout(timeout.current);
    timeout.current = setTimeout(
      () => {
        setScreen(newScreen);
        if (newScreen === "isom") {
          setTransition(false);
        }
      },
      TRANSITION_DURATION * 0.01 * 1000,
    );
  };

  const transitionToHomepage = () => {
    setTransition(true);
    clearTimeout(timeout.current);
    timeout.current = setTimeout(
      () => {
        setTransitionHomepage(false);
        setTransition(false);
      },
      TRANSITION_DURATION * 1000 + TRANSITION_DELAY * 1000,
    );
  };

  const transitionToAnnotation = (newAnnotation) => {
    setAnnotation(newAnnotation);
  };

  useEffect(() => {
    setShowResidencesPanel(false);
    setActiveButton(null);
    if (screen !== "pers") setAnnotation("base");
  }, [screen]);

  const handleResidenceToggle = (key) => {
    setResidenceToggles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleButtonClick = (buttonName) => {
    if (activeButton === buttonName) {
      // Si el botón ya está activo, desactivarlo y volver a "base"
      setActiveButton(null);
      setAnnotation("base");
      if (buttonName === "residences") {
        setShowResidencesPanel(false);
        setAnnotation("base");
      }
    } else {
      // Activar el nuevo botón
      setActiveButton(buttonName);
      if (buttonName === "residences") {
        setShowResidencesPanel(true);
        setAnnotation("residences");
        // Activar todos los toggles cuando se hace clic en el botón Residences
        setResidenceToggles((prev) => {
          const allActive = {};
          Object.keys(prev).forEach((key) => {
            allActive[key] = true;
          });
          return allActive;
        });
      } else {
        setAnnotation(buttonName);
        setShowResidencesPanel(false);
      }
    }
  };

  return (
    <main className="select-none text-[#FFFEF7] text-xl pointer-events-none">
      {/* Logo en esquina superior izquierda */}
      <motion.div
        className={`fixed z-20 ${isMobile ? "top-4 left-4" : "top-[50px] left-[50px]"}`}
        variants={{
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              delay: TRANSITION_DURATION + 0.6,
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
        }}
        initial={{
          opacity: 0,
          x: -50,
        }}
        animate={!transition ? "visible" : "hidden"}
      >
        <img
          src="/logos/AUA_Logo.png"
          alt="AUA Logo"
          className={
            isMobile
              ? "w-[66px] h-auto scale-150 origin-center"
              : "w-[75px] h-auto scale-150 origin-center"
          }
        />
      </motion.div>

      {/* Navegación superior derecha */}
      {isMobile ? (
        <>
          {/* Botón hamburguesa para móvil */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`fixed z-30 top-[26px] right-4 w-10 h-10 flex flex-col justify-center items-center gap-1.5 pointer-events-auto ${
              isMobileMenuOpen ? "" : ""
            }`}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: TRANSITION_DURATION + 0.6,
                  duration: 1.5,
                },
              },
              hidden: {
                opacity: 0,
                y: -50,
                transition: {
                  duration: 1.5,
                },
              },
            }}
            initial={{
              opacity: 0,
              y: -50,
            }}
            animate={!transition ? "visible" : "hidden"}
          >
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </motion.button>

          {/* Menú desplegable para móvil */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="fixed z-20 top-20 right-4 bg-[#c6c1ae] border-2 border-[#FFFEF7] rounded-lg p-6 flex flex-col justify-evenly items-center min-w-[165px] h-[200px] pointer-events-auto"
              >
                <button
                  onClick={() => {
                    transitionToHomepage();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-sm bg-transparent hover:opacity-70 font-semibold text-[#fffef7] transition-opacity duration-500 text-center"
                >
                  HOME
                </button>
                <a
                  href="https://www.sohohouse.com/es/houses/soho-house-mexico-city"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm bg-transparent hover:opacity-70 font-semibold text-[#fffef7] transition-opacity duration-500 text-center"
                >
                  Ecoantal
                </a>
                <a
                  href="https://soma.group/es/company/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm bg-transparent hover:opacity-70 font-semibold text-[#fffef7] transition-opacity duration-500 text-center"
                >
                  lq
                </a>
                <a
                  href="https://sordomadaleno.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm bg-transparent hover:opacity-70 font-semibold text-[#fffef7] transition-opacity duration-500 text-center"
                >
                  Veloria
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <motion.div
          className="fixed z-20 flex flex-row items-center gap-4 top-[70px] right-[50px]"
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: TRANSITION_DURATION + 0.6,
                duration: 1.5,
              },
            },
            hidden: {
              opacity: 0,
              y: -50,
              transition: {
                duration: 1.5,
              },
            },
          }}
          initial={{
            opacity: 0,
            y: -50,
          }}
          animate={!transition ? "visible" : "hidden"}
        >
          <button
            onClick={() => transitionToHomepage()}
            className="text-[21px] bg-transparent hover:opacity-70 font-semibold text-[#FFFEF7] transition-opacity duration-500 pointer-events-auto"
          >
            HOME
          </button>
          <a
            href="https://www.sohohouse.com/es/houses/soho-house-mexico-city"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[21px] bg-transparent hover:opacity-70 font-semibold text-[#FFFEF7] transition-opacity duration-500 pointer-events-auto"
          >
            Ecoantal
          </a>
          <a
            href="https://soma.group/es/company/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[21px] bg-transparent hover:opacity-70 font-semibold text-[#FFFEF7] transition-opacity duration-500 pointer-events-auto"
          >
            lq
          </a>
          <a
            href="https://sordomadaleno.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[21px] bg-transparent hover:opacity-70 font-semibold text-[#FFFEF7] transition-opacity duration-500 pointer-events-auto"
          >
            Veloria
          </a>
        </motion.div>
      )}

      <motion.h1
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20
      text-[#FFFEF7] text-center font-semibold text-7xl md:text-8xl"
        variants={{
          visible: {
            opacity: 1,
            transition: {
              duration: TRANSITION_DURATION / 2,
              delay: TRANSITION_DURATION - 0.3,
            },
          },
          hidden: {
            opacity: 0,
            transition: {
              duration: TRANSITION_DURATION / 2,
            },
          },
        }}
        initial={{
          opacity: 1,
        }}
        animate={transition ? "visible" : "hidden"}
      >
        {/* SOHO <span className="text-indigo-800">Cabos</span> */}
        <img
          src="/logos/AUA_Logo_Resi.png"
          alt="AUA Logo Transition"
          className="h-16 md:h-24 mx-auto scale-150 origin-center"
        />
      </motion.h1>
      {/* HOME */}
      <motion.section
        animate={!transition && screen === "home" ? "visible" : "hidden"}
        className={`z-10 fixed
          bottom-0 left-0 right-0 w-full
          md:bottom-20 md:right-20 md:left-auto md:top-auto md:w-auto
          md:translate-x-0 md:translate-y-0

        ${isMobile ? "text-center px-4 pb-8" : "text-left p-4"}
        ${screen === "home" ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <motion.h2
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: TRANSITION_DURATION,
                duration: 1.5,
              },
            },
            hidden: {
              opacity: 0,
              y: 50,
              transition: {
                delay: 0.6,
                duration: 1.5,
              },
            },
          }}
          initial={{
            opacity: 0,
            y: 50,
          }}
          // className={`${isMobile ? "text-4xl" : "text-6xl"} font-display text-[#FFFEF7]`}
          className={`
            font-display
            text-[#FFFEF7]
            leading-tight

            ${isMobile ? "text-4xl" : "text-6xl"}
          `}
        >
          {/* SOHO RESIDENCES */}
          {/* <img
            src="/logos/AUA_Logo.png"
            alt="AUA Logo Residences Text"
            className={isMobile ? "w-[400px] h-auto" : "w-[750px] h-auto"}
          /> */}

          {/* Línea protagonista */}
          <span
            className={`
              font-semibold
              ${isMobile ? "text-4xl flex flex-col" : "text-6xl"}
              tracking-[0.04em]
            `}
          >
            Cabo Colorado
          </span>

          {/* Línea secundaria */}
          <span
            className={`
              ml-6
              font-light
              ${isMobile ? "text-lg" : "text-2xl"}
              tracking-[0.25em]
              uppercase
              opacity-90
            `}
          >
            Residences
          </span>
        </motion.h2>
        <motion.p
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: TRANSITION_DURATION + 0.3,
                duration: 1.5,
              },
            },
            hidden: {
              opacity: 0,
              y: 50,
              transition: {
                delay: 0.3,
                duration: 1.5,
              },
            },
          }}
          initial={{
            opacity: 0,
            y: 50,
          }}
          className={`text-[#FFFEF7] whitespace-pre-line ${isMobile ? "text-sm" : "text-base"}`}
        >
          {isMobile
            ? `A refined residential project shaped by design, privacy, and the natural rhythm of Los Cabos.`
            : `A thoughtfully designed residential project where architecture, landscape, and lifestyle come together
            to create a refined way of living in Los Cabos.`}
        </motion.p>
        <div className="flex flex-col gap-[25%] md:flex-row md:gap-6 mt-4 items-center justify-center md:items-start md:justify-start w-full">
          <motion.button
            onClick={() => transitionToHomepage()}
            className={`text-sm bg-transparent hover:bg-[#C6C1AE] font-semibold
           text-[#FFFEF7] hover:text-[#2E3641] border-2
            border-[#FFFEF7]  transition-colors duration-500 px-4 py-1 mt-2 rounded-lg uppercase w-2/3 md:w-auto ${
              isMobile ? "origin-top scale-y-[0.75]" : ""
            }`}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: TRANSITION_DURATION + 0.6,
                  duration: 1.5,
                },
              },
              hidden: {
                opacity: 0,
                y: 50,
                transition: {
                  duration: 1.5,
                },
              },
            }}
            initial={{
              opacity: 0,
              y: 50,
            }}
          >
            Home
          </motion.button>

          <motion.button
            onClick={() => {
              transitionToScreen("pers");
              handleButtonClick("masterplan");
              setSectionCam(1);
            }}
            className={`text-sm bg-transparent hover:bg-[#C6C1AE] font-semibold
           text-[#FFFEF7] hover:text-[#2E3641] border-2
            border-[#FFFEF7]  transition-colors duration-500 px-4 py-1 mt-2 rounded-lg uppercase w-2/3 md:w-auto ${
              activeButton === "masterplan"
            } ${isMobile ? "origin-top scale-y-[0.75]" : ""}`}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: TRANSITION_DURATION + 0.6,
                  duration: 1.5,
                },
              },
              hidden: {
                opacity: 0,
                y: 50,
                transition: {
                  duration: 1.5,
                },
              },
            }}
            initial={{
              opacity: 0,
              y: 50,
            }}
          >
            Experience
          </motion.button>
        </div>
      </motion.section>

      {/* ------------------- */}

      {/* VISTAS */}
      <motion.section
        animate={!transition && screen === "pers" ? "visible" : "hidden"}
        className={`${
          screen === "pers" ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className="z-10 fixed bottom-4 left-0 w-full md:w-auto md:left-1/2 md:-translate-x-1/2
            text-center p-4 flex flex-col gap-[25%] md:flex-row md:gap-6 items-center justify-center md:items-start md:justify-start"
        >
          <motion.button
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: TRANSITION_DURATION * 0.3,
                  duration: 1.5,
                },
              },
              hidden: {
                opacity: 0,
                y: 50,
                transition: {
                  duration: 1.5,
                },
              },
            }}
            initial={{
              opacity: 0,
              y: 50,
            }}
            className={`text-sm font-medium border-2 transition-colors duration-500 px-4 py-1 mt-2 rounded-lg w-1/2 md:w-auto ${
              activeButton === "residences"
                ? "bg-[#C6C1AE] text-[#2E3641] border-[#FFFEF7] hover:text-[#2E3641]"
                : "bg-transparent hover:bg-[#C6C1AE] text-[#FFFEF7] hover:text-[#2E3641] border-[#FFFEF7]"
            } ${isMobile ? "origin-top scale-y-[0.75]" : ""}`}
            onClick={() => {
              handleButtonClick("residences");
              setSectionCam(2);
            }}
          >
            Residences
          </motion.button>

          <motion.button
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: TRANSITION_DURATION * 0.3,
                  duration: 1.5,
                },
              },
              hidden: {
                opacity: 0,
                y: 50,
                transition: {
                  duration: 1.5,
                },
              },
            }}
            initial={{
              opacity: 0,
              y: 50,
            }}
            className={`text-sm font-medium border-2 transition-colors duration-500 px-4 py-1 mt-2 rounded-lg w-1/2 md:w-auto ${
              activeButton === "amenities"
                ? "bg-[#C6C1AE] text-[#2E3641] border-[#FFFEF7] hover:text-[#2E3641]"
                : "bg-transparent hover:bg-[#C6C1AE] text-[#FFFEF7] hover:text-[#2E3641] border-[#FFFEF7]"
            } ${isMobile ? "origin-top scale-y-[0.75]" : ""}`}
            onClick={() => {
              handleButtonClick("amenities");
              setSectionCam(3);
            }}
          >
            Amenities
          </motion.button>

          <motion.button
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: TRANSITION_DURATION * 0.3,
                  duration: 1.5,
                },
              },
              hidden: {
                opacity: 0,
                y: 50,
                transition: {
                  duration: 1.5,
                },
              },
            }}
            initial={{
              opacity: 0,
              y: 50,
            }}
            className={`text-sm font-medium border-2 transition-colors duration-500 px-4 py-1 mt-2 rounded-lg w-1/2 md:w-auto ${
              activeButton === "entrance"
                ? "bg-[#C6C1AE] text-[#2E3641] border-[#FFFEF7] hover:text-[#2E3641]"
                : "bg-transparent hover:bg-[#C6C1AE] text-[#FFFEF7] hover:text-[#2E3641] border-[#FFFEF7]"
            } ${isMobile ? "origin-top scale-y-[0.75]" : ""}`}
            onClick={() => {
              handleButtonClick("entrance");
              setSectionCam(4);
            }}
          >
            Entrance
          </motion.button>

          <motion.button
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: TRANSITION_DURATION * 0.3,
                  duration: 1.5,
                },
              },
              hidden: {
                opacity: 0,
                y: 50,
                transition: {
                  duration: 1.5,
                },
              },
            }}
            initial={{
              opacity: 0,
              y: 50,
            }}
            onClick={() => {
              transitionToScreen("home");
              setSectionCam(0);
            }}
            className={`bg-transparent hover:bg-[#C6C1AE] text-sm font-medium text-[#FFFEF7] hover:text-[#2E3641] border-2 border-[#FFFEF7]  transition-colors duration-500 px-4 py-1 mt-2 rounded-lg w-1/2 md:w-auto ${
              isMobile ? "origin-top scale-y-[0.25]" : ""
            }`}
          >
            Return
          </motion.button>
        </div>

        <motion.div
          initial={{ x: -220, opacity: 0, y: "-50%" }}
          animate={
            !transition && screen === "pers" && showResidencesPanel
              ? { x: 0, opacity: 1, y: "-50%" }
              : { x: -220, opacity: 0, y: "-50%" }
          }
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="fixed left-4 top-1/2 z-20 w-60 origin-center bg-transparent border-2 border-[#FFFEF7] rounded-xl p-2 py-1 flex flex-col gap-2 pointer-events-auto"
        >
          <div className="flex py-1 items-center justify-between">
            <p className="text-lg font-semibold">Residences</p>
            <button
              className="text-sm text-[#FFFEF7]/70 hover:text-[#2E3641] transition-colors"
              onClick={() => {
                setShowResidencesPanel(false);
                setActiveButton(null);
                setAnnotation("base");
              }}
            >
              X
            </button>
          </div>
          {Object.entries(residenceToggles).map(([label, active]) => (
            <button
              key={label}
              aria-pressed={active}
              onClick={() => handleResidenceToggle(label)}
              className={`flex items-center justify-between rounded-lg px-3 py-0 text-sm font-semibold border transition-colors ${
                active
                  ? "bg-[#C6C1AE] text-[#2E3641] border-[#FFFEF7] hover:bg-[#C6C1AE] hover:text-[#2E3641]"
                  : "bg-white/10 text-[#FFFEF7] border-[#FFFEF7]/50 hover:bg-[#C6C1AE] hover:text-[#2E3641]"
              }`}
            >
              <span>{label}</span>
              <span
                className={`relative h-4 w-6 rounded-full transition-colors ${
                  active ? "bg-black" : "bg-white/30"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-3 w-3 rounded-full transition-colors ${
                    active ? "bg-white" : "bg-white"
                  }
                  
                    transition-transform ${active ? "translate-x-2" : ""}`}
                />
              </span>
            </button>
          ))}
        </motion.div>
      </motion.section>
    </main>
  );
};
