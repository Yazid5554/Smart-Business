import { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './styles/SmartDashboard.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

type NodeProps = { position: [number, number, number], type: 'sensor' | 'server' | 'ai' };

const Node3D = ({ position, type }: NodeProps) => {
  const color = type === 'sensor' ? '#00ff88' : type === 'server' ? '#0088ff' : '#ff00ff';
  
  return (
    <RigidBody position={position} restitution={0.8} friction={0.5} colliders="cuboid">
      <mesh castShadow receiveShadow>
        <boxGeometry args={type === 'server' ? [1.5, 1.5, 1.5] : [1, 1, 1]} />
        <meshPhysicalMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.5} 
          clearcoat={1} 
          roughness={0.1} 
          metalness={0.8} 
        />
      </mesh>
    </RigidBody>
  );
};

const SmartDashboard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<NodeProps[]>([]);
  
  const addNode = (type: 'sensor' | 'server' | 'ai') => {
    setNodes(prev => [...prev, { position: [(Math.random() - 0.5) * 4, 10, (Math.random() - 0.5) * 4], type }]);
  };

  const calculateEfficiency = () => {
    const sensors = nodes.filter(n => n.type === 'sensor').length;
    const servers = nodes.filter(n => n.type === 'server').length;
    const ais = nodes.filter(n => n.type === 'ai').length;
    
    let eff = (sensors * 2) + (servers * 5) + (ais * 10);
    return Math.min(eff, 99.9);
  };

  const efficiency = calculateEfficiency();

  // Animasi Scroll dua arah (Scrub)
  useGSAP(() => {
    // Header parallax
    gsap.from(".dashboard-header", {
      y: -100,
      opacity: 0,
      scale: 0.8,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "top 30%",
        scrub: 1.5,
      }
    });
    
    // Wrapper scale, slide, and 3D rotation with scrub
    gsap.from(".physics-dashboard-wrapper", {
      scale: 0.4,
      y: 300,
      rotationX: 30,
      transformPerspective: 1500,
      opacity: 0,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "top 15%",
        scrub: 1.5,
      }
    });
  }, { scope: containerRef, dependencies: [] });

  return (
    <div className="smart-dashboard-section" id="solution" ref={containerRef}>
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2>Simulasi <span>Arsitektur Pintar</span> 3D</h2>
          <p>Uji coba fungsionalitas: Jatuhkan node teknologi ke dalam sistem untuk melihat peningkatan efisiensi secara live!</p>
        </div>

        <div className="physics-controls">
          <button className="btn-add sensor" onClick={() => addNode('sensor')}>+ Sensor IoT</button>
          <button className="btn-add server" onClick={() => addNode('server')}>+ Server Cloud</button>
          <button className="btn-add ai" onClick={() => addNode('ai')}>+ AI Engine</button>
          <button className="btn-reset" onClick={() => setNodes([])}>Reset Sistem</button>
        </div>

        <div className="physics-dashboard-wrapper">
          <div className="physics-stats">
            <div className="stat-card">
              <h3>Efisiensi Operasional</h3>
              <div className="stat-value highlight">{efficiency.toFixed(1)}%</div>
            </div>
            <div className="stat-card">
              <h3>Total Perangkat (Nodes)</h3>
              <div className="stat-value">{nodes.length} Unit</div>
            </div>
            <div className="stat-card">
              <h3>Penghematan Estimasi</h3>
              <div className="stat-value" style={{color: '#c481ff'}}>
                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(efficiency * 1500000)}
              </div>
            </div>
          </div>

          <div className="physics-canvas-container">
            <Canvas shadows camera={{ position: [0, 8, 15], fov: 40 }} gl={{ alpha: true }}>
              <ambientLight intensity={1} />
              <directionalLight castShadow position={[5, 10, 5]} intensity={2} />
              <Suspense fallback={null}>
                <Physics gravity={[0, -9.81, 0]}>
                  <RigidBody type="fixed" restitution={0.5} friction={1}>
                    <CuboidCollider args={[5, 0.5, 5]} position={[0, -0.5, 0]} />
                    <CuboidCollider args={[5, 5, 0.25]} position={[0, 5, -5.25]} />
                    <CuboidCollider args={[5, 5, 0.25]} position={[0, 5, 5.25]} />
                    <CuboidCollider args={[0.25, 5, 5]} position={[-5.25, 5, 0]} />
                    <CuboidCollider args={[0.25, 5, 5]} position={[5.25, 5, 0]} />
                  </RigidBody>

                  {nodes.map((node, i) => <Node3D key={i} {...node} />)}
                </Physics>
              </Suspense>

              {/* Grid helper on the floor */}
              <gridHelper args={[10, 10, '#363636', '#363636']} position={[0, 0, 0]} />

              <EffectComposer>
                <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.5} />
              </EffectComposer>
            </Canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartDashboard;
