import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./Overlay.css";
import { motion, AnimatePresence } from "framer-motion";
import { atom, useAtom } from "jotai";
import { isMobileAtom } from "./UI";

// Mapping de objetos a imagenes y titulos
// const objectMappings = {
//   "2BR_G_A": {
//     image: "./FP/2BR_A.jpg",
//     title: "2 Bedrooms A Garden: 211.54 sqm",
//   },
//   "2BR_N1_A": {
//     image: "./FP/2BR_A.jpg",
//     title: "2 Bedrooms A L1: 211.54.00 sqm",
//   },
//   "2BR_N2_A": {
//     image: "./FP/2BR_A.jpg",
//     title: "2 Bedrooms A L2: 211.54.00 sqm",
//   },
//   "3BR_G_A": {
//     image: "./FP/3BR_A.jpg",
//     title: "3 Bedrooms A Garden: 215.71 sqm",
//   },
//   "3BR_N1_A": { image: "./FP/3BR_A.jpg", title: "3 Bedrooms A L1: 215.71 sqm" },
//   "3BR_N2_A": { image: "./FP/3BR_A.jpg", title: "3 Bedrooms A L2: 215.71 sqm" },
//   "4BR_A": { image: "./FP/4BR_A.jpg", title: "4 Bedrooms A: 428.86 sqm" },

//   "2BR_G_B": {
//     image: "./FP/2BR_B.jpg",
//     title: "2 Bedrooms B Garden: 211.54 sqm",
//   },
//   "2BR_N1_B": {
//     image: "./FP/2BR_B.jpg",
//     title: "2 Bedrooms B L1: 211.54.00 sqm",
//   },
//   "2BR_N2_B": {
//     image: "./FP/2BR_B.jpg",
//     title: "2 Bedrooms B L2: 211.54.00 sqm",
//   },
//   "3BR_G_B": {
//     image: "./FP/3BR_B.jpg",
//     title: "3 Bedrooms B Garden: 215.71 sqm",
//   },
//   "3BR_N1_B": { image: "./FP/3BR_B.jpg", title: "3 Bedrooms B L1: 215.71 sqm" },
//   "3BR_N2_B": { image: "./FP/3BR_B.jpg", title: "3 Bedrooms B L2: 215.71 sqm" },
//   "4BR_B": { image: "./FP/4BR_B.jpg", title: "4 Bedrooms B: 428.86 sqm" },

//   CA_01: { image: "./FP/C_A1.jpg", title: "The Casita A1: 380.95 sqm" },
// };

export const floatingPanelActive = atom(false);
export const modalPanelActive = atom(false);

const Overlay = () => {
  const [showFloatingPanel, setShowFloatingPanel] = useState(false);
  const [showModalPanel, setShowModalPanel] = useState(false);
  const [panelImage, setPanelImage] = useState("/logotipo.png");
  const [panelTitle, setPanelTitle] = useState("Informacion del proyecto");
  const [panelDescription, setPanelDescription] = useState("");

  const [isFloatingPanelActive, setIsFloatingPanelActive] =
    useAtom(floatingPanelActive);
  const [isModalPanelActive, setIsModalPanelActive] = useAtom(modalPanelActive);
  const [isMobile] = useAtom(isMobileAtom);

  useEffect(() => {
    const openPanel = (image, annotation, description = "") => {
      setPanelImage(`/${image}`);
      setPanelTitle(annotation);
      setPanelDescription(description);
      setShowFloatingPanel(true);
      setIsFloatingPanelActive(true);
    };

    const openModalDirectly = (image, annotation) => {
      setPanelImage(`/${image}`);
      setPanelTitle(annotation);
      setPanelDescription("");
      setShowModalPanel(true);
      setIsModalPanelActive(true);
    };

    const handleAnnotationClick = (event) => {
      const { image, annotation, description } = event.detail;
      openPanel(image, annotation, description ?? "");
    };

    const handleMeshClick = (event) => {
      // const { image, annotation, description } = event.detail;
      // openPanel(image, annotation, description ?? "");

      const { image, annotation } = event.detail;
      openModalDirectly(image, annotation);
    };

    window.addEventListener("annotation-click", handleAnnotationClick);
    window.addEventListener("mesh-click", handleMeshClick);

    return () => {
      window.removeEventListener("annotation-click", handleAnnotationClick);
      window.removeEventListener("mesh-click", handleMeshClick);
    };
    // }, [setIsFloatingPanelActive]);
  }, [setIsFloatingPanelActive, setIsModalPanelActive]);

  const closeFloatingPanel = () => {
    setShowFloatingPanel(false);
    setPanelImage("/logotipo.png");
    setPanelTitle("Informacion del proyecto");
    setIsFloatingPanelActive(false);
  };

  const openModalPanel = (e) => {
    e.stopPropagation(); // Prevenir que se cierre el floating panel
    setShowModalPanel(true);

    setIsModalPanelActive(true);
  };

  const closeModalPanel = () => {
    setShowModalPanel(false);

    setIsModalPanelActive(false);
  };

  return (
    <>
      {createPortal(
        <AnimatePresence>
          {showFloatingPanel && (
            <>
              {/* Overlay de fondo - por encima de UI */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[99998]"
                onClick={closeFloatingPanel}
              />

              {/* Panel deslizable desde la derecha */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 200,
                }}
                className={`fixed top-0 right-0 h-full w-full ${
                  isMobile ? "" : "max-w-[672px]"
                } bg-[#2f4f5a] backdrop-blur-md shadow-2xl z-[100000] flex flex-col`}
                style={{ fontFamily: "Calibri Light", fontWeight: "bold" }}
              >
                {/* Botón de cerrar */}
                <button
                  onClick={closeFloatingPanel}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-2xl font-light text-[#FFFEF7] hover:bg-white/20 rounded-full transition-colors duration-200 z-10"
                >
                  ×
                </button>

                {/* Contenido del panel */}
                <div
                  className="flex flex-col items-center justify-start p-8 pt-16 h-full overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Imagen centrada */}
                  <motion.img
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    src={panelImage}
                    alt={panelTitle}
                    onClick={openModalPanel}
                    className="w-full max-w-[576px] h-auto rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300 mx-auto mt-[25px]"
                  />

                  {/* Título centrado horizontalmente con la imagen, 50px abajo */}
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="text-[#FFFEF7] text-xl font-bold text-center mt-[50px] px-4"
                  >
                    {panelTitle}
                  </motion.h3>

                  {/* Sección Description con lorem ipsum */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    className="mt-6 px-4 w-full"
                  >
                    <p className="text-[rgba(255,254,247,0.8)] text-base leading-relaxed text-center whitespace-pre-line">
                      {panelDescription || ""}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}

      {createPortal(
        <AnimatePresence>
          {showModalPanel && (
            <>
              {/* Overlay de fondo - por encima del floating panel */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100001]"
                onClick={closeModalPanel}
              />

              {/* Modal Panel centrado - por encima del floating panel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 200,
                }}
                style={{
                  position: "fixed",
                  top: isMobile ? "2.5%" : "5%",
                  left: isMobile ? "2.5%" : "5%",
                  width: isMobile ? "95vw" : "90vw",
                  height: isMobile ? "95vh" : "90vh",
                  zIndex: 100002,
                  fontFamily: "Calibri Light",
                  fontWeight: "bold",
                }}
                className="bg-[#2f4f5a] backdrop-blur-md shadow-2xl flex flex-col rounded-[20px] border-2 border-[rgba(255,254,247,0.8)]"
              >
                {/* Botón de cerrar */}
                <button
                  onClick={closeModalPanel}
                  className="absolute top-1 right-1 w-10 h-10 flex items-center justify-center text-2xl font-light text-[#FFFEF7] hover:bg-white/20 rounded-full transition-colors duration-200 z-10"
                >
                  ×
                </button>

                {/* Contenido del modal - solo imagen y título */}
                <div className="flex flex-col items-center justify-center flex-1 min-h-0 p-8 w-full">
                  {/* Imagen - todo el width, overflow hidden */}
                  <div className="w-full h-[72vh] max-h-[72vh] overflow-hidden rounded-lg shadow-lg">
                    <motion.img
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                      src={panelImage}
                      alt={panelTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Título centrado debajo de la imagen */}
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="text-[#FFFEF7] text-2xl font-medium text-center mt-6 px-4"
                  >
                    {panelTitle}
                  </motion.h3>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
};

export default Overlay;
