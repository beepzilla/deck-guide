import { useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ModelLoader = ({ url, onLoad, onError }) => {
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(url, onLoad, undefined, onError);
  }, [url, onLoad, onError]);

  return null;
};

export default ModelLoader;
