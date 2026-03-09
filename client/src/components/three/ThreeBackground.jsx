import React, { Suspense } from "react";

const Scene = React.lazy(() => import("./ThreeBackgroundScene.jsx"));

export default function ThreeBackground() {
  return (
    <div className="three-bg" aria-hidden="true">
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </div>
  );
}

