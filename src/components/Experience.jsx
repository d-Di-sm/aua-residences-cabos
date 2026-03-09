import {
  CameraControls,
  ContactShadows,
  Environment,
  Float,
  Html,
  SoftShadows,
} from "@react-three/drei";
import { motion } from "framer-motion";

// import Arbol02 from "./Vegetation/Arbol02.jsx";
// import Arbol06 from "./Vegetation/Arbol06.jsx";
// import Arbustos01 from "./Vegetation/Arbustos01.jsx";
// import Cactus01 from "./Vegetation/Cactus01.jsx";
// import Palmera02 from "./Vegetation/Palmera02.jsx";
// import Palmera04 from "./Vegetation/Palmera04.jsx";
// import Palmera05 from "./Vegetation/Palmera05.jsx";
// import Palmera11 from "./Vegetation/Palmera11.jsx";

import { isMobileAtom, screenAtom, annotation3d } from "./UI";
import { atom, useAtom } from "jotai";
import { degToRad } from "three/src/math/MathUtils.js";

import { floatingPanelActive } from "./Overlay.jsx";
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
// import ResidencialAreasA from "./Building/Residencial_Areas_A_Final.jsx";
import { button, useControls } from "leva";
import Apartments from "./Building/Apartments.jsx";
// import Topo from "./Building/Topo.jsx";

import Arbol01 from "./Vegetation02/Arbol01.jsx";
import Arbol02 from "./Vegetation02/Arbol02.jsx";
import Arbustos01 from "./Vegetation02/Arbustos01.jsx";
import Cactus01 from "./Vegetation02/Cactus01.jsx";
import Ivy01 from "./Vegetation02/Ivy01.jsx";
import Ivy02 from "./Vegetation02/Ivy02.jsx";
import Ivy03 from "./Vegetation02/Ivy03.jsx";
import Ivy04 from "./Vegetation02/Ivy04.jsx";
import Ivy05 from "./Vegetation02/Ivy05.jsx";
import Palmera01 from "./Vegetation02/Palmera01.jsx";
import Palmera02 from "./Vegetation02/Palmera02.jsx";
import Palmera03 from "./Vegetation02/Palmera03.jsx";
import Palmera04 from "./Vegetation02/Palmera04.jsx";

import Acero from "./Building/Acero.jsx";
import Agua from "./Building/Agua.jsx";
import Concreto from "./Building/Concreto.jsx";
import Fur_Tex from "./Building/Fur_Tex.jsx";
import Fur_Wood from "./Building/Fur_Wood.jsx";
import Gravel from "./Building/Gravel.jsx";
import Losas from "./Building/Losas.jsx";
import Madera from "./Building/Madera.jsx";
import Muros from "./Building/Muros_Piedra.jsx";
import Pavement from "./Building/Pavement.jsx";
import Sand from "./Building/Sand.jsx";
import Topo02 from "./Building/Topo02.jsx";
import Residences from "./Building/Residencial_Areas.jsx";

export const section = atom(0);

export const sections = atom([
  "intro",
  "masterplan",
  "residences",
  "amenities",
  "entrance",
]);

const CAMERA_LIMITS_BY_ANNOTATION = {
  residences: {
    maxDistance: 120,
    minDistance: 50,
    maxPolarAngle: degToRad(80),
    minAzimuthAngle: degToRad(10),
    maxAzimuthAngle: degToRad(100),
  },
  amenities: {
    maxDistance: 90,
    minDistance: 60,
    maxPolarAngle: degToRad(68),
    minAzimuthAngle: degToRad(0),
    maxAzimuthAngle: degToRad(150),
  },
  entrance: {
    maxDistance: 110,
    minDistance: 70,
    maxPolarAngle: degToRad(75),
    minAzimuthAngle: degToRad(-160),
    maxAzimuthAngle: degToRad(-80),
  },
  masterplan: {
    maxDistance: 120,
    minDistance: 60,
    maxPolarAngle: degToRad(80),
    minAzimuthAngle: degToRad(-160),
    maxAzimuthAngle: degToRad(160),
  },
  base: {
    maxDistance: 140,
    minDistance: 80,
    maxPolarAngle: degToRad(74),
    minAzimuthAngle: degToRad(-180),
    maxAzimuthAngle: degToRad(180),
  },
};

const CAMERA_LIMITS_BY_ANNOTATION_MOBILE = {
  residences: {
    maxDistance: 120,
    minDistance: 70,
    maxPolarAngle: degToRad(76),
    minAzimuthAngle: degToRad(10),
    maxAzimuthAngle: degToRad(100),
  },
  amenities: {
    maxDistance: 90,
    minDistance: 60,
    maxPolarAngle: degToRad(68),
    minAzimuthAngle: degToRad(30),
    maxAzimuthAngle: degToRad(65),
  },
  entrance: {
    maxDistance: 180,
    minDistance: 90,
    maxPolarAngle: degToRad(73),
    minAzimuthAngle: degToRad(-160),
    maxAzimuthAngle: degToRad(-80),
  },
  masterplan: {
    maxDistance: 180,
    minDistance: 60,
    maxPolarAngle: degToRad(72),
    minAzimuthAngle: degToRad(-160),
    maxAzimuthAngle: degToRad(160),
  },
  base: {
    maxDistance: 160,
    minDistance: 80,
    maxPolarAngle: degToRad(60),
    minAzimuthAngle: degToRad(-180),
    maxAzimuthAngle: degToRad(180),
  },
};

const cameraPositions = {
  intro: [
    26.728661949534647, 37.44717940593555, 72.13223846096017, 4.751684485640253,
    3.9517875282297372, -5.393143447705704,
  ],
  masterplan: [
    -51.27927404113364, 70.20072814289544, 23.932142560193785,
    -3.935782930616011, 1.679457599658289, -6.416642842178518,
  ],
  residences: [
    14.32854670470013, 27.011179149258155, 46.27377968271664,
    -7.753666877124906, 8.565745807197322, -6.728220545728858,
  ],
  amenities: [
    58.470450441916256, 33.75045311677985, 11.999437632002584, 7.31086985499438,
    -9.187972763403408, 20.377756339120268,
  ],
  entrance: [
    -73.20327997228189, 39.28441429371938, -16.839018776462765,
    7.927967173859356, -7.248603089081251, -25.065233157829958,
  ],
};

const cameraPositionsSmallScreen = {
  intro: [
    59.34710156667267, 94.18252125962955, 103.19435064856597,
    0.3173292386109352, -3.586779164576836, 3.0150403079426638,
  ],
  masterplan: [
    -107.36806549173926, 129.75072918911755, -28.41515507766865,
    -11.372433188135462, 1.8382821240181189, -11.48853507237421,
  ],
  residences: [
    47.076682878044494, 31.07019149397927, 76.33809726736975,
    -2.7745865072280753, -5.933433164181803, -2.841699071071214,
  ],
  amenities: [
    51.71484969662763, 32.84972482702593, 59.00043141566768, 8.102418080479678,
    -16.710620613675083, 2.1830898030347052,
  ],
  entrance: [
    -120.29157235089457, 93.65032759730444, -57.52659459263233,
    -10.41007325658187, -8.368617158673102, -9.90874740070685,
  ],
};

export const Experience = () => {
  const [screen] = useAtom(screenAtom);
  const [annotation] = useAtom(annotation3d);

  const [isMobile] = useAtom(isMobileAtom);

  const handleAnnotationClick = (
    imageName,
    annotationName,
    event,
    description = "",
  ) => {
    event?.stopPropagation?.();

    //Dispatch custom event with image and annotation information
    window.dispatchEvent(
      new CustomEvent("annotation-click", {
        detail: {
          image: imageName,
          annotation: annotationName,
          description: description,
        },
      }),
    );
  };

  const [sectionCam, setSectionCam] = useAtom(section);

  const controls = useRef();

  const [introFinished, setIntroFinished] = useState(false);

  const intro = async () => {
    controls.current.setLookAt(
      94.88715402309754,
      111.6694578807425,
      202.37511175736282,
      8.92953022022402,
      -22.224727676128047,
      10.07417867489219,
      false,
    );

    setIntroFinished(true);
    playTransition();
  };

  const [sectionsArr] = useAtom(sections);

  const playTransition = () => {
    if (!controls.current) return;
    const key = sectionsArr[sectionCam]; // "intro" | "titanium" | ...
    const pose = isMobile
      ? cameraPositionsSmallScreen[key]
      : cameraPositions[key];
    if (!pose) return;
    controls.current.setLookAt(...pose, true);
  };

  useControls("Helper", {
    getLookAt: button(() => {
      const position = controls.current.getPosition();
      const target = controls.current.getTarget();
      console.log([...position, ...target]);
    }),
  });

  useEffect(() => {
    // intro();
    const raf = requestAnimationFrame(() => controls.current && intro());
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const limitsMap = isMobile
      ? CAMERA_LIMITS_BY_ANNOTATION_MOBILE
      : CAMERA_LIMITS_BY_ANNOTATION;
    const limits = limitsMap[annotation] ?? limitsMap.base;
    const raf = requestAnimationFrame(() => {
      if (controls.current) {
        // const ACTION = controls.current.constructor?.ACTION;

        controls.current.maxDistance = limits.maxDistance;
        controls.current.minDistance = limits.minDistance;
        controls.current.maxPolarAngle = limits.maxPolarAngle;
        controls.current.minAzimuthAngle = limits.minAzimuthAngle;
        controls.current.maxAzimuthAngle = limits.maxAzimuthAngle;

        // Disable pan: right-drag and touch truck
        // if (ACTION) {
        //   controls.current.mouseButtons.right = ACTION.NONE;
        //   controls.current.touches.two = ACTION.TOUCH_DOLLY_ROTATE;
        //   controls.current.touches.three = ACTION.TOUCH_DOLLY_ROTATE;
        // }
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [annotation, isMobile]);

  useEffect(() => {
    if (!introFinished) {
      return;
    }
    playTransition();
  }, [sectionCam]);

  return (
    <>
      <group position-y={isMobile ? -0.66 : -1}>
        {/* HOME */}
        <group visible={screen === "home" || screen === "pers"}>
          <CameraControls ref={controls} />
          <SoftShadows />

          {/* Vegetation */}
          {/* <Arbol02 position={[-115, -21.5, 75]} />
          <Arbol06 position={[-115, -21.5, 75]} />
          <Arbustos01 position={[-115, -21.5, 75]} />
          <Cactus01 position={[-115, -21.5, 75]} />
          <Palmera02 position={[-115, -21.5, 75]} />
          <Palmera04 position={[-115, -21.5, 75]} />
          <Palmera05 position={[-115, -21.5, 75]} />
          <Palmera11 position={[-115, -21.5, 75]} />

          <Apartments position={[-115, -21.5, 75]} />

          <Topo position={[-115, -21.5, 75]} /> */}

          {/* Vegetation02 */}
          <Arbol01 position={[-115, -21.5, 75]} />
          <Arbol02 position={[-115, -21.5, 75]} />
          <Arbustos01 position={[-115, -21.5, 75]} />
          <Cactus01 position={[-115, -21.5, 75]} />
          <Ivy01 position={[-115, -21.5, 75]} />
          <Ivy02 position={[-115, -21.5, 75]} />
          <Ivy03 position={[-115, -21.5, 75]} />
          <Ivy04 position={[-115, -21.5, 75]} />
          <Ivy05 position={[-115, -21.5, 75]} />
          <Palmera01 position={[-115, -21.5, 75]} />
          <Palmera02 position={[-115, -21.5, 75]} />
          <Palmera03 position={[-115, -21.5, 75]} />
          <Palmera04 position={[-115, -21.5, 75]} />

          {/* Project */}
          <Acero position={[-115, -21.5, 75]} />
          <Agua position={[-115, -21.5, 75]} />
          <Concreto position={[-115, -21.5, 75]} />
          <Fur_Tex position={[-115, -21.5, 75]} />
          <Fur_Wood position={[-115, -21.5, 75]} />
          <Gravel position={[-115, -21.5, 75]} />
          <Losas position={[-115, -21.5, 75]} />
          <Madera position={[-115, -21.5, 75]} />
          <Muros position={[-115, -21.5, 75]} />
          <Pavement position={[-115, -21.5, 75]} />
          <Sand position={[-115, -21.5, 75]} />
          <Topo02 position={[-115, -21.5, 75]} />

          <Residences position={[-115, -21.5, 75]} />

          <Environment preset="dawn" background blur={4} />
        </group>

        {/* MENU */}
        {/* <group position-y={isMobile ? 0.42 : 0.75} visible={screen === "menu"}>
          <Float scale={isMobile ? 0.75 : 1}>
            <Casona02 />
          </Float>
        </group> */}
        <ContactShadows opacity={0.42} scale={25} />

        {/* <mesh rotation-x={degToRad(-90)} position-y={-0.001}>
          <planeGeometry args={[40, 40]} />
          <meshBasicMaterial color={"white"} toneMapped={false} />
        </mesh> */}
      </group>

      {annotation === "amenities" && (
        <>
          <Annotation_3d
            nombre="POOL"
            rotation={[0, -Math.PI * 0.4, 0]}
            // position={[144.3, 26.7, 48.9]}
            position={[29.3, 4.2, 26.1]}
            scale={ANNOTATION_SCALE.amenities}
            onAnnotationClick={() =>
              handleAnnotationClick(
                "./Images/04_Ext.jpg",
                "POOL",
                undefined,
                "Whether starting the day with a refreshing swim,\n" +
                  "relaxing poolside under the Baja sun, or gathering\n" +
                  "with friends as the afternoon fades into golden hour,\n" +
                  "the pool becomes the heart of everyday moments.",
              )
            }
          />

          <Annotation_3d
            nombre="PETANCA"
            rotation={[0, -Math.PI * 0.4, 0]}
            // position={[122.8, 29.7, 66.7]}
            position={[7.8, 7.2, 8.3]}
            scale={ANNOTATION_SCALE.amenities}
            onAnnotationClick={() =>
              handleAnnotationClick(
                "./Images/08_Ext.jpg",
                "PETANCA",
                undefined,
                "Whether starting the day with a refreshing swim,\n" +
                  "relaxing poolside under the Baja sun, or gathering\n" +
                  "with friends as the afternoon fades into golden hour,\n" +
                  "the pool becomes the heart of everyday moments.",
              )
            }
          />

          <Annotation_3d
            nombre="BAR"
            rotation={[0, -Math.PI * 0.4, 0]}
            // position={[134.5, 27.6, 57.2]}
            position={[19.5, 5.1, 17.8]}
            scale={ANNOTATION_SCALE.amenities}
            onAnnotationClick={() =>
              handleAnnotationClick(
                "./Images/07_Ext.jpg",
                "BAR",
                undefined,
                "Framed by the natural beauty of Los Cabos,\n" +
                  "the bar area is designed as a place to unwind,\n" +
                  "connect, and enjoy life at a slower pace.",
              )
            }
          />

          <Annotation_3d
            nombre="TERRACE"
            rotation={[0, -Math.PI * 0.4, 0]}
            // position={[140.6, 27.15, 52.2]}
            position={[25.6, 4.65, 22.8]}
            scale={ANNOTATION_SCALE.amenities}
            onAnnotationClick={() =>
              handleAnnotationClick(
                "./Images/06_Ext.jpg",
                "TERRACE",
                undefined,
                "Surrounded by generous lounge spaces and native\n" +
                  "landscaping, it offers a seamless transition between\n" +
                  "water, sun, and open-air living.",
              )
            }
          />

          <Annotation_3d
            nombre="FIREPIT"
            rotation={[0, -Math.PI * 0.4, 0]}
            // position={[148, 26.2, 45.8]}
            position={[33, 3.7, 29.2]}
            scale={ANNOTATION_SCALE.amenities}
            onAnnotationClick={() =>
              handleAnnotationClick(
                "./Images/12_E_01.png",
                "FIREPIT",
                undefined,
                "A warm gathering space where fire and water meet,\n" +
                  "designed for relaxed evenings and social moments\n" +
                  "under the Los Cabos sky.",
              )
            }
          />
        </>
      )}

      {annotation === "entrance" && (
        <>
          <Annotation_3d
            nombre="DROP-OFF"
            rotation={[0, -Math.PI * 0.4, 0]}
            // position={[84, 32.2, 107]}
            position={[-31, 9.7, -32]}
            scale={ANNOTATION_SCALE.casita}
            onAnnotationClick={(event) =>
              handleAnnotationClick(
                "./Images/02_AV.jpg",
                "DROP-OFF",
                // "CA_01",
                event,
                "The lobby and entrance set the tone from the very first moment.\n" +
                  "Designed as a calm and welcoming threshold, the space\n" +
                  "blends architecture, natural materials, and soft light.",
              )
            }
          />

          <Annotation_3d
            nombre="LOBBY"
            rotation={[0, -Math.PI * 0.4, 0]}
            // position={[79.6, 30.8, 95]}
            position={[-35.4, 8.3, -20]}
            scale={ANNOTATION_SCALE.casita}
            onAnnotationClick={(event) =>
              handleAnnotationClick(
                "./Images/09_T_01.png",
                "LOBBY",
                // "CA_01",
                event,
                "The lobby and entrance set the tone from the very first moment.\n" +
                  "Designed as a calm and welcoming threshold, the space\n" +
                  "blends architecture, natural materials, and soft light.",
              )
            }
          />

          <Annotation_3d
            nombre="ACCESS"
            rotation={[0, -Math.PI * 0.4, 0]}
            // position={[75.6, 32, 113.4]}
            position={[-39.4, 9.5, -38.4]}
            scale={ANNOTATION_SCALE.casita}
            onAnnotationClick={(event) =>
              handleAnnotationClick(
                "./Images/02_AV.jpg",
                "ACCESS",
                // "CA_01",
                event,
                "The lobby and entrance set the tone from the very first moment.\n" +
                  "Designed as a calm and welcoming threshold, the space\n" +
                  "blends architecture, natural materials, and soft light.",
              )
            }
          />

          <Annotation_3d
            nombre="HEALTH"
            rotation={[0, -Math.PI * 0.4, 0]}
            // position={[92.4, 33.8, 100.6]}
            position={[-22.6, 12.3, -25.6]}
            scale={ANNOTATION_SCALE.casita}
            onAnnotationClick={(event) =>
              handleAnnotationClick(
                "./Images/16_Ext.jpg",
                "HEALTH",
                // "CA_01",
                event,
                "Designed as a refined retreat for body and mind,\n" +
                  "the health and wellness amenities offer an intimate,\n" +
                  "thoughtfully curated environment for movement\n" +
                  "and restoration.",
              )
            }
          />
        </>
      )}

      {annotation === "masterplan" && (
        <>
          <Annotation_3d
            nombre="AMENITIES"
            rotation={[0, -Math.PI * 0.4, 0]}
            // position={[140.6, 27.15, 52.2]}
            position={[25.6, 4.65, 22.8]}
            scale={ANNOTATION_SCALE.masterplan}
            onAnnotationClick={() =>
              handleAnnotationClick(
                "./Images/06_Ext.jpg",
                "AMENITIES",
                undefined,
                "A curated collection of shared spaces designed to\n" +
                  "support comfort, connection, and everyday\n" +
                  "enjoyment.",
              )
            }
          />

          <Annotation_3d
            nombre="APARTMENTS"
            rotation={[0, -Math.PI * 0.4, 0]}
            // position={[104, 45.5, 81.8]}
            position={[-11, 26, -6.8]}
            scale={ANNOTATION_SCALE.masterplan}
            onAnnotationClick={() =>
              handleAnnotationClick(
                "./Images/01_AV.jpg",
                "APARTMENTS",
                undefined,
                "Thoughtful layouts, refined materials, and generous proportions\n" +
                  "invite everyday living to feel effortless—whether enjoyed quietly\n" +
                  "or shared with others. A place to settle in, slow down,\n" +
                  "and experience the relaxed rhythm of life in Los Cabos.",
              )
            }
          />

          <Annotation_3d
            nombre="LOBBY"
            rotation={[0, -Math.PI * 0.4, 0]}
            // position={[83.6, 32, 106.3]}
            position={[-31.4, 9.5, -31.3]}
            scale={ANNOTATION_SCALE.masterplan}
            onAnnotationClick={(event) =>
              handleAnnotationClick(
                "./Images/02_AV.jpg",
                "LOBBY",
                // "CA_01",
                event,
                "Set within the natural landscape of Los Cabos,\n" +
                  "the project is conceived as a refined residential retreat\n" +
                  "where architecture, privacy, and lifestyle come\n" +
                  "together effortlessly.",
              )
            }
          />
        </>
      )}
    </>
  );
};

const ANNOTATION_SCALE = {
  masterplan: 1.5,
  amenities: 0.6,
  casita: 0.6,
};

const Annotation_3d = ({
  children,
  nombre,
  position,
  onAnnotationClick,
  scale = 1,
  ...props
}) => {
  const [hovered, setHovered] = useState(false);
  const [isFloatingPanelActive] = useAtom(floatingPanelActive);

  const ref = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (ref.current) {
      ref.current.lookAt(camera.position);
    }
  });

  const handleClick = (event) => {
    // Evita que el raycasting continúe hacia los meshes residenciales subyacentes
    event?.stopPropagation?.();

    if (onAnnotationClick) {
      onAnnotationClick();
    }
  };

  // Don't render if floating panel is active
  useEffect(() => {
    if (isFloatingPanelActive) {
      setHovered(false);
    }
  }, [isFloatingPanelActive]);

  if (isFloatingPanelActive) {
    return null;
  }

  return (
    <>
      <group ref={ref} position={position} scale={scale} {...props}>
        <Html transform position={[0, 0, 0]}>
          <div className="annotation-button-wrapper">
            <motion.button
              className={"circle-button-views"}
              onClick={handleClick}
              onPointerEnter={(event) => {
                event?.stopPropagation?.();
                setHovered(true);
              }}
              onPointerLeave={(event) => {
                event?.stopPropagation?.();
                setHovered(false);
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.6, 1],
              }}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0,
              }}
            />
          </div>
        </Html>
      </group>

      {hovered && (
        <Html
          transform={false}
          position={[position[0] + 0.05, position[1] + 0.1, position[2]]}
        >
          <motion.div
            className="tooltip-3d"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
          >
            {nombre}
          </motion.div>
        </Html>
      )}
    </>
  );
};
