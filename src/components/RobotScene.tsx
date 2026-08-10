import { Suspense, lazy, useState } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

const SCENE_URL = 'https://prod.spline.design/PuaVtlAsLupYWiXH/scene.splinecode'

export function RobotScene() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="robot-scene" aria-hidden="true">
      <div className={`robot-fallback ${loaded ? 'is-hidden' : ''}`}>
        <span className="robot-fallback-tag">3D — loading</span>
      </div>
      <Suspense fallback={null}>
        <div className={`robot-canvas ${loaded ? 'is-loaded' : ''}`}>
          <Spline scene={SCENE_URL} onLoad={() => setLoaded(true)} />
        </div>
      </Suspense>
      <div className="robot-watermark-mask" aria-hidden="true" />
    </div>
  )
}
