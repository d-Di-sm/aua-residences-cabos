import "./index.css";
import { Suspense, useEffect, useState, useRef } from "react";
import { HomePage } from "./components/HomePage";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Leva, useControls } from "leva";
import { Experience } from "./components/Experience";
import { useProgress } from "@react-three/drei";

import "@mantine/core/styles.css";

import { ScreenTransition } from "./components/ScreenTransition.jsx";
import { atom, useAtom } from "jotai";
import { transitionAtom, UI } from "./components/UI.jsx";
import Overlay from "./components/Overlay.jsx";

export const transitionHome = atom(false);

function LoadingGate() {
  const [, setTransition] = useAtom(transitionAtom);
  const { active, progress } = useProgress();
  const last = useRef(null);

  useEffect(() => {
    const shouldBeOn = active || progress < 100;

    // ✅ evita setTransition repetido (y warnings raros en StrictMode)
    if (last.current === shouldBeOn) return;
    last.current = shouldBeOn;

    if (shouldBeOn) {
      setTransition(true);
      return;
    }

    const t = setTimeout(() => setTransition(false), 200);
    return () => clearTimeout(t);
  }, [active, progress, setTransition]);

  return null;
}

function App() {
  const [transitionHomepage, setTransitionHomepage] = useAtom(transitionHome);
  const [returnToMesh, setReturnToMesh] = useState(null);

  const [transition, setTransition] = useAtom(transitionAtom);
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100) {
      setTransition(false);
    }
  }, [progress]);

  const { backgroundColor } = useControls({
    backgroundColor: "#6FAEB0",
  });

  const handleTourClick = () => {
    // setReturnToMesh(meshName);
    setShowRecorrido360(true);
  };

  const handleReturnClick = () => {
    setShowRecorrido360(false);
  };

  return (
    <>
      <Leva hidden />
      {!transitionHomepage ? (
        <>
          <HomePage />
        </>
      ) : (
        <>
          <UI />
          <div className="fixed inset-0 w-screen h-screen overflow-hidden">
            <Canvas
              dpr={[1, 2]}
              gl={{
                antialias: true,
                toneMapping: THREE.ACESFilmicToneMapping,
                outputColorSpace: THREE.SRGBColorSpace,
              }}
              camera={{
                fov: 45,
                near: 1,
                far: 1200,
                position: [
                  94.88715402309754, 111.6694578807425, 202.37511175736282,
                ],
                target: [
                  2.9744458895296013, -21.885757328439343, 12.500057387505853,
                ],
              }}
              shadows={{
                enabled: true,
                type: "VSMShadowMap",
              }}
            >
              {/* <color attach="background" args={[backgroundColor]} /> */}
              {/* <fog attach="fog" args={[backgroundColor, 5, 12]} /> */}

              <color attach="background" args={["#6FAEB0"]} />
              {/* <LoadingGate /> */}

              <ScreenTransition transition={transition} color="#6FAEB0" />

              <Suspense fallback={null}>
                <Experience />
              </Suspense>
            </Canvas>
          </div>
          <Overlay />
        </>
      )}
    </>
  );
}

export default App;
