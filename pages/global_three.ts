import { AmbientLight, GridHelper, PerspectiveCamera, Scene, WebGLRenderer } from "three"

interface ThreeInterface {
	scene: Scene
	renderer: WebGLRenderer
	camera: PerspectiveCamera
	renderLoop: (cb: ()=>void) => void
	star: StarInterface[]
}

interface StarInterface {
	position: {
		x: number
		y: number
	}
	create: ()=>void
	draw: ()=>void
	undraw: ()=>void
}

const Star = function(position)

const GlobalThree = function(this: ThreeInterface) {
	this.scene = new Scene()
	this.renderer = new WebGLRenderer({ antialias: true })
	this.renderer.setSize(window.innerWidth+1, window.innerHeight+1)
	this.renderer.setClearColor(0x61FFFF)

	/** Camera positioning */
	this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5000)
	this.camera.position.set(0,50,100)
	this.camera.lookAt(0,0,0)

	/** Lighting */
	const ambientLight = new AmbientLight(0x404040)
	this.scene.add(ambientLight)

	/** Grid helper */
	this.scene.add(new GridHelper(1000,10))

	this.renderLoop = (cb) => {
		requestAnimationFrame(cb)
		this.renderer.render(this.scene, this.camera)
	}

	

}

export default GlobalThree