'use client'

// The original TAJ neumorphic hero, ported verbatim from
// Taj Holding Website/components/Scene.js — same layers, same values:
// BACKGROUND plate -> LOGO -> mouse LAMP (+ black shadow catcher).
// Leva panel removed; DEF is the locked production config.
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture, PerspectiveCamera, Environment, Lightformer } from '@react-three/drei'
import { Suspense, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import TajLogoModel from './TajLogoModel'

const DEF = {
  // lighting
  ambient: 0.16, envIntensity: 0.26, bulbIntensity: 12, bulbHeight: 2.2,
  bulbColor: '#fff4e6', followSpeed: 8, dirIntensity: 0.08, dirColor: '#f3ede2',
  // shadow — dense, hard-edged. normalBias kills acne on the deep extrusion
  castShadow: true, gap: 0.01, shadowDarkness: 0.8, shadowRadius: 8,
  shadowBias: -0.0005, shadowNormalBias: 0.035, shadowMap: 2048,
  // background — arrival cream, seamless with the gate flash
  bgSize: 19, bgColor: '#fff2c9', bgMetalness: 0.5, bgRoughness: 0.5,
  bgNormalScale: 0.5, patternRepeat: 24,
  // logo — sized to hold the center of the frame, deep extrusion,
  // lifted so the back face clears the plate (no z-fighting)
  logoWidth: 3.1, logoDepth: 0.6, logoZ: 0.15, logoColor: '#d3cec4',
  logoMetalness: 0, logoRoughness: 0.15, logoNormalScale: 0.01, logoTexRepeat: 1,
  // camera / quality
  fov: 30, camZ: 6.2, renderScale: 1.25,
}

function SceneContent({ cRef, pointer }) {
  const ambient = useRef()
  const fill = useRef()
  const bulb = useRef()
  const shadowSpot = useRef()
  const spotTarget = useMemo(() => new THREE.Object3D(), [])
  const bgMesh = useRef()
  const catcher = useRef()
  const catcherMat = useRef()
  const bulbPos = useRef({ x: 0, y: 0 })
  const lastDpr = useRef(null)

  const patternNormal = useTexture('/textures/pattern_normal.png')
  const grainNormal = useTexture('/textures/logo_grain_normal.png')
  const roughMap = useTexture('/textures/logo_rough.png')

  // one-time texture setup
  useEffect(() => {
    for (const tex of [patternNormal, grainNormal, roughMap]) {
      tex.colorSpace = THREE.NoColorSpace
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping
      tex.anisotropy = 8
      tex.needsUpdate = true
    }
  }, [patternNormal, grainNormal, roughMap])

  const backdropMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        normalMap: patternNormal,
      }),
    [patternNormal]
  )
  const logoMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        normalMap: grainNormal,
        roughnessMap: roughMap,
        side: THREE.DoubleSide,
      }),
    [grainNormal, roughMap]
  )

  useFrame((state, dt) => {
    const c = cRef.current

    // ---- camera ----
    const cam = state.camera
    if (cam.fov !== c.fov || cam.position.z !== c.camZ) {
      cam.fov = c.fov
      cam.position.z = c.camZ
      cam.updateProjectionMatrix()
    }

    // ---- render scale (supersampling AA) — only when the control changes ----
    if (lastDpr.current !== c.renderScale) {
      lastDpr.current = c.renderScale
      state.setDpr(Math.min(c.renderScale, window.devicePixelRatio * 2))
    }

    // ---- environment ----
    state.scene.environmentIntensity = c.envIntensity

    // ---- lights ----
    if (ambient.current) ambient.current.intensity = c.ambient
    if (fill.current) {
      fill.current.intensity = c.dirIntensity
      fill.current.color.set(c.dirColor)
    }
    if (bulb.current) {
      const b = bulb.current
      b.intensity = c.bulbIntensity
      b.color.set(c.bulbColor)
      // lamp follows the cursor 1:1 over the plate
      const { viewport } = state
      const mx = pointer.current.x * (viewport.width / 2)
      const my = pointer.current.y * (viewport.height / 2)
      const s = Math.min(1, dt * c.followSpeed)
      bulbPos.current.x += (mx - bulbPos.current.x) * s
      bulbPos.current.y += (my - bulbPos.current.y) * s
      b.position.set(bulbPos.current.x, bulbPos.current.y, c.bulbHeight)
    }

    // shadow-only spotlight: rides with the lamp but renders ONE shadow pass
    // (a point light's shadow re-renders the scene 6x per frame)
    if (shadowSpot.current) {
      const sp = shadowSpot.current
      sp.visible = c.castShadow
      sp.castShadow = c.castShadow
      sp.position.set(bulbPos.current.x, bulbPos.current.y, c.bulbHeight)
      spotTarget.position.set(0, 0, -c.gap)
      spotTarget.updateMatrixWorld()
      sp.shadow.bias = c.shadowBias
      sp.shadow.normalBias = c.shadowNormalBias
      sp.shadow.radius = c.shadowRadius
      if (sp.shadow.mapSize.width !== c.shadowMap) {
        sp.shadow.mapSize.set(c.shadowMap, c.shadowMap)
        if (sp.shadow.map) {
          sp.shadow.map.dispose()
          sp.shadow.map = null
        }
      }
    }

    // ---- background plate ----
    if (bgMesh.current) {
      bgMesh.current.position.z = -c.gap
      const sc = c.bgSize / 46 // base plane is 46x46
      bgMesh.current.scale.set(sc, sc, 1)
    }
    backdropMat.color.set(c.bgColor)
    backdropMat.metalness = c.bgMetalness
    backdropMat.roughness = c.bgRoughness
    backdropMat.normalScale.set(c.bgNormalScale, c.bgNormalScale)
    const rep = c.patternRepeat
    if (patternNormal.repeat.x !== rep) {
      patternNormal.repeat.set(rep, rep * (1024 / 1173))
    }

    // ---- shadow catcher ----
    if (catcher.current) {
      catcher.current.visible = c.castShadow
      catcher.current.position.z = -c.gap + 0.004
      const sc = c.bgSize / 46
      catcher.current.scale.set(sc, sc, 1)
    }
    if (catcherMat.current) catcherMat.current.opacity = c.shadowDarkness

    // ---- logo material ----
    logoMat.color.set(c.logoColor)
    logoMat.metalness = c.logoMetalness
    logoMat.roughness = c.logoRoughness
    logoMat.normalScale.set(c.logoNormalScale, c.logoNormalScale)
    if (grainNormal.repeat.x !== c.logoTexRepeat) {
      grainNormal.repeat.set(c.logoTexRepeat, c.logoTexRepeat)
      roughMap.repeat.set(c.logoTexRepeat, c.logoTexRepeat)
    }
  })

  const c0 = cRef.current
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, c0.camZ]} fov={c0.fov} />

      {/* soft studio reflections — the neumorphic sheen */}
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2.4} position={[0, 2.5, 4]} scale={[14, 9, 1]} color="#ffffff" />
        <Lightformer intensity={1.1} position={[-5, 0, 3]} scale={[6, 12, 1]} color="#f2ede3" />
        <Lightformer intensity={0.9} position={[5, -1.5, 2.5]} scale={[6, 12, 1]} color="#e7e1d5" />
      </Environment>

      <ambientLight ref={ambient} intensity={c0.ambient} />
      <directionalLight ref={fill} position={[0.5, 4, 3]} intensity={c0.dirIntensity} color={c0.dirColor} />
      {/* main lamp — pure light, no shadow work */}
      <pointLight
        ref={bulb}
        position={[0, 0, c0.bulbHeight]}
        intensity={c0.bulbIntensity}
        distance={0}
        decay={2}
        color={c0.bulbColor}
      />
      {/* shadow rig — cheap single-pass shadow that follows the lamp */}
      <spotLight
        ref={shadowSpot}
        position={[0, 0, c0.bulbHeight]}
        target={spotTarget}
        angle={1.15}
        penumbra={1}
        decay={2}
        distance={0}
        intensity={1.5}
        color={'#ffffff'}
        castShadow={c0.castShadow}
        shadow-mapSize-width={c0.shadowMap}
        shadow-mapSize-height={c0.shadowMap}
        shadow-bias={c0.shadowBias}
        shadow-normalBias={c0.shadowNormalBias}
        shadow-radius={c0.shadowRadius}
        shadow-camera-near={0.2}
        shadow-camera-far={25}
      />
      <primitive object={spotTarget} />

      {/* BACKGROUND — lit metal plate (shadow drawn by the catcher, not here) */}
      <mesh ref={bgMesh} material={backdropMat} position={[0, 0, -c0.gap]}>
        <planeGeometry args={[46, 46, 1, 1]} />
      </mesh>

      {/* SHADOW CATCHER — paints the logo shadow as pure black, ambient-proof */}
      <mesh ref={catcher} position={[0, 0, -c0.gap + 0.004]} receiveShadow>
        <planeGeometry args={[46, 46, 1, 1]} />
        <shadowMaterial ref={catcherMat} transparent opacity={c0.shadowDarkness} color="#000000" />
      </mesh>

      {/* LOGO */}
      <TajLogoModel material={logoMat} cRef={cRef} />
    </>
  )
}

export default function LogoReveal() {
  const pointer = useRef({ x: 0, y: 0 })
  const cRef = useRef(DEF)

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <Canvas
      shadows
      dpr={DEF.renderScale}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMappingExposure: 1.1,
      }}
    >
      <Suspense fallback={null}>
        <SceneContent cRef={cRef} pointer={pointer} />
      </Suspense>
    </Canvas>
  )
}
