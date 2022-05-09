import { FunctionComponent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { BufferAttribute, BufferGeometry, DirectionalLight, PerspectiveCamera, Points, PointsMaterial, Scene, TextureLoader, WebGLRenderer } from 'three'
import { smoothOut } from '../utils/smooth_movement'
import styles from '../styles/Home.module.css'

const StarsBackground: FunctionComponent = () => {
  const [ gyroscopeSupport, setGyroscopeSupport ] = useState(false)
  const backgroundRef = useRef<any>(null)
  
  useEffect(() => {
    let frameId:number
    /** Mouse and gyroscope input handlers */
    const inputPosition:{x:number,y:number} = JSON.parse(sessionStorage.getItem('inputPosition') || '{"x":0,"y":0}')
    
    const mouseHandler = (e:MouseEvent) => {
      if (gyroscopeSupport) return
      inputPosition.x = e.clientX
      inputPosition.y = e.clientY
      // sessionStorage.setItem('inputPosition', JSON.stringify(inputPosition))
    }

    const gyroscopeHandler = (e:DeviceOrientationEvent) => {
      const hasGyroscope = (e.gamma !== null && e.beta !== null)
      setGyroscopeSupport(hasGyroscope)
      if (!hasGyroscope) return
      inputPosition.x = -((e.gamma || 1) + 90) * 30 // 0 - 5400 resting: 2700
      inputPosition.y = -((e.beta || 1) + 90) * 30 // 0 - 5400 resting: 2700
      // sessionStorage.setItem('inputPosition', JSON.stringify(inputPosition))
    }

    window.addEventListener("mousemove", mouseHandler);
    window.addEventListener('deviceorientation', gyroscopeHandler)


    /** Position Randomizer Constant; higher number = higher spread */
    const k = 10 /** 5 == -5 to 5 */
    
    const getRandomParticelPos = (particleCount:number):Float32Array => {
      const starsPosition = sessionStorage.getItem('starsPosition')
      
      if (starsPosition) {
        const parsed = JSON.parse(starsPosition)
        const values:number[] = Object.values(parsed)
        return new Float32Array(values)
      }

      const arr = (new Float32Array(particleCount)).map(() => Math.random() * k*2 - k)
      sessionStorage.setItem('starsPosition', JSON.stringify(arr))
      return arr
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
        if (backgroundRef.current) {
          backgroundRef.current.style.width = ''
          backgroundRef.current.style.height = ''
        }
        renderer.setSize(width, height, false);
      }
      return needResize;
    };

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
      stars.position.x = inputPosition.x * 0.0001
      stars.position.y = inputPosition.y * -0.0001

      const render = () => {    
        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          // changing the camera aspect to remove the strechy problem
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }

        stars.position.x = smoothOut(stars.position.x, inputPosition.x * 0.0001, 4)
        stars.position.y = smoothOut(stars.position.y, inputPosition.y * -0.0001, 4)
    
        renderer.render(scene, camera);
        frameId = window.requestAnimationFrame(render);
      };
      frameId = requestAnimationFrame(render);
    };
    main();
    
    
    return () => {
      window.removeEventListener('deviceorientation', gyroscopeHandler)
      window.removeEventListener('mousemove', mouseHandler)
      sessionStorage.setItem('inputPosition', JSON.stringify(inputPosition))
      // cancelAnimationFrame(frameId)
      // backgroundRef.current?.remove()
    }
  }, [])



  return <canvas className={styles.background} ref={backgroundRef}></canvas>
}

export default StarsBackground