// src/components/ThreeScene.jsx
import React, { useEffect, useRef, useState } from "react";

export default function ThreeScene({ height = 400 }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    let mounted = true;
    let animationId;
    let renderer, scene, camera, cube;
    let onResize;

    (async () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container || !mounted) return;

      // Try getting a WebGL context first
      const ctxOptions = { antialias: true, alpha: true };
      const gl =
        canvas.getContext("webgl2", ctxOptions) ||
        canvas.getContext("webgl", ctxOptions) ||
        canvas.getContext("experimental-webgl", ctxOptions);

      if (!gl) {
        setErrorMsg("WebGL is not supported in this browser.");
        return;
      }

      try {
        const THREE = await import("three");

        renderer = new THREE.WebGLRenderer({ canvas, context: gl, antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

        scene = new THREE.Scene();
        const rect = container.getBoundingClientRect();
        const w = Math.max(1, Math.floor(rect.width));
        const h = Math.max(1, Math.floor(rect.height));

        camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
        camera.position.z = 2;

        const geometry = new THREE.BoxGeometry();
        
        const texture = new THREE.TextureLoader().load('/face.jpeg');
        // const material = new THREE.MeshNormalMaterial();
        // Create an array of the same material for each cube face
        const material = Array(6).fill(new THREE.MeshBasicMaterial({ map: texture }));

        cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        renderer.setSize(w, h, false);

        onResize = () => {
          const r = container.getBoundingClientRect();
          const ww = Math.max(1, Math.floor(r.width));
          const hh = Math.max(1, Math.floor(r.height));
          renderer.setSize(ww, hh, false);
          camera.aspect = ww / hh;
          camera.updateProjectionMatrix();
        };
        window.addEventListener("resize", onResize, { passive: true });

        const loop = () => {
          if (!mounted) return;
          animationId = requestAnimationFrame(loop);
          cube.rotation.x += 0.01;
          cube.rotation.y += 0.013;
          renderer.render(scene, camera);
        };
        loop();
      } catch (err) {
        console.error("Three.js init error:", err);
        setErrorMsg("Error initializing Three.js: " + err.message);
      }
    })();

    return () => {
      mounted = false;
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
      if (renderer) {
        renderer.dispose();
        if (renderer.forceContextLoss) renderer.forceContextLoss();
      }
      if (cube) {
        cube.geometry?.dispose();
        cube.material?.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: `${height}px`, position: "relative" }}
    >
      {errorMsg ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#222",
            color: "white",
            fontSize: 14,
          }}
        >
          {errorMsg}
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      )}
    </div>
  );
}
