'use client'

// Ported verbatim from the original TAJ hero (Taj Holding Website/components/LogoModel.js).
// The middle layer: the TAJ 3D logo. Size / thickness / lift are read from the
// controls ref EVERY FRAME so the config always drives it live.
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

export default function TajLogoModel({ material, cRef }) {
  const { scene } = useGLTF('/models/taj-logo.glb', '/draco/')
  const cloned = useMemo(() => scene.clone(true), [scene])
  const base = useRef(null)

  useEffect(() => {
    cloned.traverse((o) => {
      if (o.isMesh) {
        o.material = material
        o.castShadow = true
        o.receiveShadow = true
        // planar UVs projected on the face plane: pick the two LARGEST bbox axes
        // (the face), normalize by the smaller of them so v spans 0..1 — works
        // for any orientation/unit scale the GLB was authored at
        const g = o.geometry
        g.computeBoundingBox()
        const bb = g.boundingBox
        const min = [bb.min.x, bb.min.y, bb.min.z]
        const size = [
          bb.max.x - bb.min.x,
          bb.max.y - bb.min.y,
          bb.max.z - bb.min.z,
        ]
        const axes = [0, 1, 2].sort((a, b) => size[b] - size[a])
        const ua = axes[0]
        const va = axes[1]
        const scale = size[va] || 1
        const pos = g.attributes.position
        const read = (i, ax) =>
          ax === 0 ? pos.getX(i) : ax === 1 ? pos.getY(i) : pos.getZ(i)
        const uv = new Float32Array(pos.count * 2)
        for (let i = 0; i < pos.count; i++) {
          uv[i * 2] = (read(i, ua) - min[ua]) / scale
          uv[i * 2 + 1] = (read(i, va) - min[va]) / scale
        }
        g.setAttribute('uv', new THREE.BufferAttribute(uv, 2))
      }
    })
    const box = new THREE.Box3().setFromObject(cloned)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)
    base.current = { sizeX: size.x, center: center.clone() }
  }, [cloned, material])

  useFrame(() => {
    if (!base.current || !cRef?.current) return
    const c = cRef.current
    const s = c.logoWidth / base.current.sizeX
    // X/Y = the logo face; Z = thickness toward the camera (scaled by logoDepth)
    cloned.scale.set(s, s, s * c.logoDepth)
    cloned.position.set(
      -base.current.center.x * s,
      -base.current.center.y * s,
      -base.current.center.z * s * c.logoDepth + c.logoZ
    )
  })

  return <primitive object={cloned} />
}

useGLTF.preload('/models/taj-logo.glb', '/draco/')
