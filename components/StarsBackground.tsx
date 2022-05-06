import { FunctionComponent } from 'react'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import { BufferAttribute, BufferGeometry, DirectionalLight, PerspectiveCamera, Points, PointsMaterial, Scene, TextureLoader, WebGLRenderer } from 'three'
import { smoothOut } from '../utils/smooth_movement'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const StarsBackground: FunctionComponent = () => {
  const [ gyroscopeSupport, setGyroscopeSupport ] = useState(false)
  const backgroundRef = useRef<any>(null)

  useEffect(() => {    
    /** Mouse and gyroscope input handlers */
    let mouseX = 0;
    let mouseY = 0;

    const mouseHandler = (e:MouseEvent) => {
      if (gyroscopeSupport) return
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    const gyroscopeHandler = (e:DeviceOrientationEvent) => {
      setGyroscopeSupport(e.gamma !== null && e.beta !== null)
      mouseX = -((e.gamma || 1) + 90) * 30 // 0 - 5400 resting: 2700
      mouseY = -((e.beta || 1) + 90) * 30 // 0 - 5400 resting: 2700
    }

    window.addEventListener("mousemove", mouseHandler);
    window.addEventListener('deviceorientation', gyroscopeHandler)


    /** Position Randomizer Constant; higher number = higher spread */
    const k = 10 /** 5 == -5 to 5 */
    
    const getRandomParticelPos = (particleCount:number) => {
      const arr = new Float32Array(particleCount);
      return arr.map(() => Math.random() * k*2 - k)
    };


    /** Reziser */
    const resizeRendererToDisplaySize = (renderer:WebGLRenderer) => {
      const canvas = renderer.domElement;
      const width = window.innerWidth;
      const height = window.innerHeight;      
      const needResize = canvas.width !== width || canvas.height !== height;
      // console.log(needResize, width, canvas.width)
      // resize only when necessary
      if (needResize) {
        //3rd parameter `false` to change the internal canvas size
        backgroundRef.current.style.width = ''
        backgroundRef.current.style.height = ''
        renderer.setSize(width, height, false);
      }
      return needResize;
    };


    /** Main */
    const main = () => {
      if (backgroundRef.current === null) return
      const scene = new Scene();

      /** Renderer */
      const renderer = new WebGLRenderer({ canvas: backgroundRef.current });
      renderer.setSize(window.innerWidth+1, window.innerHeight+1)
      renderer.setClearColor(0x000000);
      renderer.setPixelRatio(window.devicePixelRatio)
    
      /** Light source */
      const light = new DirectionalLight(0xffffff, 1);
      light.position.set(-1, 2, 4);
      scene.add(light);
    
      /** Camera */
      const fov = 75, aspect = window.innerWidth / window.innerHeight, near = .5, far = 200;
      const camera = new PerspectiveCamera(fov, aspect, near, far);
      camera.position.z = 12;
      
      /** Geometry */
      const geometry = new BufferGeometry()    
      geometry.setAttribute(
        "position",
        new BufferAttribute(getRandomParticelPos(5000), 3)
      );
      
      /** Material */
      const loader = new TextureLoader();
      const material = new PointsMaterial({
        size: 0.1,
        map: loader.load("https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp2.png"),
        transparent: true
      })
    
      const stars = new Points(geometry, material);
      scene.add(stars);

      const render = () => {    
        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          // changing the camera aspect to remove the strechy problem
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }
    
        stars.position.x = smoothOut(stars.position.x, mouseX * 0.0001, 4)
        stars.position.y = smoothOut(stars.position.y, mouseY * -0.0001, 4)
    
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      };
      requestAnimationFrame(render);
    };
    main();
    
    
    return () => {
      window.removeEventListener('deviceorientation', gyroscopeHandler)
      window.removeEventListener('mousemove', mouseHandler)
    }
  }, [])



  return <canvas className={styles.background} ref={backgroundRef}></canvas>
}

export default StarsBackground