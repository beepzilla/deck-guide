import * as THREE from 'three';

export const adjustMaterials = (object) => {
  object.traverse((node) => {
    if (node.isMesh) {
      const material = node.material;

      if (material.map) {
        material.map.flipY = false;
        material.map.colorSpace = THREE.LinearSRGBColorSpace;
      }
      if (material.emissiveMap) {
        material.emissiveMap.flipY = false;
        material.emissiveMap.colorSpace = THREE.LinearSRGBColorSpace;
      }
      if (material.normalMap) {
        material.normalMap.flipY = false;
      }
      if (material.roughnessMap) {
        material.roughnessMap.flipY = false;
      }
      if (material.metalnessMap) {
        material.metalnessMap.flipY = false;
      }

      // Ensure material is not black
      if (material.color) {
        material.color.convertSRGBToLinear();
      }

      // Ensure material properties for reflectivity and shimmer
      if (material.metalness !== undefined) {
        material.metalness = 0.8;  // Adjust metalness as per your needs
      }
      if (material.roughness !== undefined) {
        material.roughness = 0.2;  // Adjust roughness as per your needs
      }

      // Update the material
      material.needsUpdate = true;
    }
  });
};
