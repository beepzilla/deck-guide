import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { adjustMaterials } from './AdjustMaterials';
import * as THREE from 'three';

function ScaledModel({ model }) {
  const ref = useRef();

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 4 / maxDim; // Adjust to fit the model in the view
    model.scale.set(scale, scale, scale);
  }, [model]);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01; // Rotate the model slowly on the y-axis
    }
  });

  return <primitive ref={ref} object={model} />;
}

function ModelViewer({ card, setLoading }) {
  const [model, setModel] = useState(null);
  const [platform, setPlatform] = useState(null);

  const url = card ? card.modelUrl.replace('ipfs://', 'https://ipfs.io/ipfs/') : '';
  const platformUrl = 'https://ipfs.io/ipfs/QmbmuJZxLttoKseTqUbqbmKzBXBV6CxaoLgB3UScuErQCS/scifi_platform_stage_scene_baked.glb'; // Replace with your platform model URL

  useEffect(() => {
    if (card) {
      setLoading(true);
      const loader = new GLTFLoader();
      loader.load(url, (gltf) => {
        const scene = gltf.scene;
        adjustMaterials(scene);
        setModel(scene);
        setLoading(false);
      }, undefined, (error) => {
        console.error('An error happened while loading the model:', error);
        setLoading(false);
      });

      loader.load(platformUrl, (gltf) => {
        const scene = gltf.scene;
        adjustMaterials(scene);
        setPlatform(scene);
      }, undefined, (error) => {
        console.error('An error happened while loading the platform:', error);
      });
    }
  }, [card, url, platformUrl]);

  return (
    <Canvas camera={{ position: [0, 3, 6], fov: 50 }} style={{ width: '100%', height: '100%' }}>
      <Suspense fallback={null}>
        <OrbitControls target={[0, 1, 0]} />
        <ambientLight intensity={2} />
        <spotLight position={[0, 10, 10]} angle={0.3} intensity={3} />
        {platform && <primitive object={platform} position={[0, -2, 0]} />} {/* Adjust position as needed */}
        {model && <ScaledModel model={model} />}
      </Suspense>
    </Canvas>
  );
}

export default ModelViewer;
