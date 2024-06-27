import React from 'react';
import { useFrame } from '@react-three/fiber';

const RotatingModel = ({ model }) => {
  useFrame(() => {
    if (model) {
      model.rotation.y += 0.01; // Rotate the model slowly on the y-axis
    }
  });

  return model ? <primitive object={model} scale={2} /> : null;
};

export default RotatingModel;
