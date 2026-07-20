import { useRef } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"

type Props = {
  recoil?: number
  nozzleVibrate?: number
  isSpraying?: boolean
}

export function SprayGunModel({ recoil = 0, nozzleVibrate = 0, isSpraying = false }: Props) {
  const groupRef = useRef<THREE.Group>(null)
  const nozzleRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (nozzleRef.current) {
      nozzleRef.current.position.x = 0.44 + nozzleVibrate * 0.002 * Math.sin(Date.now() * 0.06)
      nozzleRef.current.position.y = nozzleVibrate * 0.0015 * Math.cos(Date.now() * 0.08)
    }
    if (groupRef.current) groupRef.current.position.x = recoil * -0.025
  })

  return (
    <group ref={groupRef}>
      {/* ── Main body ── */}
      <mesh position={[0.15, 0, 0]}>
        <cylinderGeometry args={[0.09, 0.095, 0.55, 32]} />
        <meshStandardMaterial color="#3a3632" metalness={0.88} roughness={0.18} />
      </mesh>

      {/* Body top ridge */}
      <mesh position={[0.15, 0.094, 0]}>
        <boxGeometry args={[0.42, 0.022, 0.06]} />
        <meshStandardMaterial color="#4a4640" metalness={0.9} roughness={0.14} />
      </mesh>

      {/* Body bottom rail */}
      <mesh position={[0.15, -0.094, 0]}>
        <boxGeometry args={[0.4, 0.016, 0.05]} />
        <meshStandardMaterial color="#3e3a35" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* ── Rear cap ── */}
      <mesh position={[-0.13, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.095, 0.1, 0.04, 32]} />
        <meshStandardMaterial color="#484440" metalness={0.72} roughness={0.26} />
      </mesh>

      {/* ── Barrel ── */}
      <mesh position={[0.45, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.07, 0.22, 32]} />
        <meshStandardMaterial color="#2e2a27" metalness={0.92} roughness={0.14} />
      </mesh>

      {/* Barrel ring connector */}
      <mesh position={[0.34, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.07, 0.016, 16, 32]} />
        <meshStandardMaterial color="#504c46" metalness={0.78} roughness={0.2} />
      </mesh>

      {/* ── Nozzle base cone ── */}
      <mesh position={[0.57, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.04, 0.07, 20]} />
        <meshStandardMaterial color="#35312d" metalness={0.86} roughness={0.16} />
      </mesh>

      {/* ── Nozzle tip ── */}
      <mesh ref={nozzleRef} position={[0.62, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.012, 0.018, 0.04, 16]} />
        <meshStandardMaterial color="#0d0b0a" metalness={0.94} roughness={0.08} />
      </mesh>

      {/* Nozzle nut */}
      <mesh position={[0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.028, 0.028, 0.016, 6]} />
        <meshStandardMaterial color="#55514c" metalness={0.8} roughness={0.22} />
      </mesh>

      {/* ── Handle connector block ── */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[0.1, 0.14, 0.1]} />
        <meshStandardMaterial color="#3e3a35" metalness={0.82} roughness={0.22} />
      </mesh>

      {/* ── Handle grip ── */}
      <mesh position={[0, -0.28, 0]} rotation={[0, 0, -0.22]}>
        <cylinderGeometry args={[0.07, 0.08, 0.4, 24]} />
        <meshStandardMaterial color="#2c2824" metalness={0.55} roughness={0.45} />
      </mesh>

      {/* Handle bottom cap */}
      <mesh position={[-0.03, -0.48, 0]}>
        <boxGeometry args={[0.08, 0.025, 0.08]} />
        <meshStandardMaterial color="#484440" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* ── Hose connector ── */}
      <mesh position={[-0.03, -0.55, 0]} rotation={[0.15, 0, 0]}>
        <cylinderGeometry args={[0.045, 0.05, 0.14, 20]} />
        <meshStandardMaterial color="#33302c" metalness={0.82} roughness={0.24} />
      </mesh>
      <mesh position={[-0.03, -0.63, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.05, 0.011, 12, 20]} />
        <meshStandardMaterial color="#5c5852" metalness={0.68} roughness={0.35} />
      </mesh>

      {/* ── Trigger guard ── */}
      <mesh position={[0.06, -0.18, 0]} rotation={[Math.PI, 0, 0]}>
        <torusGeometry args={[0.09, 0.015, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#3a3632" metalness={0.86} roughness={0.18} />
      </mesh>

      {/* ── Trigger ── */}
      <mesh position={[0.08, -0.21, 0]} rotation={[0, 0, 0.15]}>
        <boxGeometry args={[0.02, 0.06, 0.025]} />
        <meshStandardMaterial color="#4a4640" metalness={0.72} roughness={0.32} />
      </mesh>

      {/* ── Safety ── */}
      <mesh position={[0.16, -0.08, 0.05]}>
        <boxGeometry args={[0.04, 0.018, 0.03]} />
        <meshStandardMaterial color="#55514c" metalness={0.65} roughness={0.4} />
      </mesh>

      {/* ── Pressure gauge housing ── */}
      <mesh position={[0.1, 0.13, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.04, 24]} />
        <meshStandardMaterial color="#403c38" metalness={0.84} roughness={0.2} />
      </mesh>
      <mesh position={[0.1, 0.155, 0]}>
        <cylinderGeometry args={[0.042, 0.042, 0.005, 24]} />
        <meshStandardMaterial color="#1a1816" metalness={0.4} roughness={0.55} />
      </mesh>
      <mesh position={[0.1, 0.158, 0]}>
        <circleGeometry args={[0.036, 32]} />
        <meshStandardMaterial color="#ddd8d0" metalness={0.05} roughness={0.06} opacity={0.55} transparent />
      </mesh>

      {/* ── A/B component inlets ── */}
      <mesh position={[-0.05, 0.12, 0.04]} rotation={[0.3, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.028, 0.06, 16]} />
        <meshStandardMaterial color="#3e3a35" metalness={0.84} roughness={0.2} />
      </mesh>
      <mesh position={[-0.05, 0.12, -0.04]} rotation={[-0.3, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.028, 0.06, 16]} />
        <meshStandardMaterial color="#3e3a35" metalness={0.84} roughness={0.2} />
      </mesh>
      <mesh position={[-0.03, 0.145, 0.04]}>
        <sphereGeometry args={[0.03, 16, 12]} />
        <meshStandardMaterial color="#4a4640" metalness={0.78} roughness={0.25} />
      </mesh>
      <mesh position={[-0.03, 0.145, -0.04]}>
        <sphereGeometry args={[0.03, 16, 12]} />
        <meshStandardMaterial color="#4a4640" metalness={0.78} roughness={0.25} />
      </mesh>

      {/* ── Detail seams / bolts ── */}
      <mesh position={[0.28, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.08, 0.01, 12, 32]} />
        <meshStandardMaterial color="#504c46" metalness={0.7} roughness={0.32} />
      </mesh>
      <mesh position={[-0.02, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.095, 0.012, 12, 32]} />
        <meshStandardMaterial color="#484440" metalness={0.75} roughness={0.28} />
      </mesh>

      {/* ── Spray glow light ── */}
      {isSpraying && <pointLight position={[0.64, 0, 0]} intensity={2.0} distance={0.6} color="#eeffee" />}
    </group>
  )
}
