import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapDonutTexture = textureLoader.load('/textures/matcaps/1.png')
const matcapTextTexture = textureLoader.load('/textures/matcaps/8.png');
const matcapTextTexture1 = textureLoader.load('/textures/matcaps/1.png');
const matcapTextTexture2 = textureLoader.load('/textures/matcaps/2.png');
const matcapTextTexture3 = textureLoader.load('/textures/matcaps/3.png');
const matcapTextTexture4 = textureLoader.load('/textures/matcaps/4.png');
const matcapTextTexture5 = textureLoader.load('/textures/matcaps/5.png');
const matcapTextTexture6 = textureLoader.load('/textures/matcaps/6.png');
const matcapTextTexture7 = textureLoader.load('/textures/matcaps/7.png');
const matcapTextTexture8 = textureLoader.load('/textures/matcaps/8.png');

const matcapsArray = [
    matcapTextTexture1,
    matcapTextTexture2,
    matcapTextTexture3,
    matcapTextTexture4,
    matcapTextTexture5,
    matcapTextTexture6,
    matcapTextTexture7,
    matcapTextTexture8
]

/*Fonts
* */

const fontsLoader = new THREE.FontLoader();

fontsLoader.load(
    '/fonts/Open Sans_Regular.json',
    (font) => {
        const textGeometry = new THREE.TextGeometry(
            'Серёга, с др!',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 6,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )
        // textGeometry.computeBoundingBox();
        // textGeometry.translate(
        //     -(textGeometry.boundingBox.max.x - 0.02) / 2,
        //     -(textGeometry.boundingBox.max.y - 0.02) / 2,
        //     -(textGeometry.boundingBox.max.z - 0.03) / 2
        // )
        textGeometry.center();
        const textMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTextTexture});
        const text = new THREE.Mesh(textGeometry, textMaterial);
        scene.add(text);
        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);


        for (let i = 0; i < 300; i++) {
            console.log(i % 8)
            const donutMaterial = new THREE.MeshMatcapMaterial({matcap: matcapsArray[i % 8]});


            const donut = new THREE.Mesh(donutGeometry, donutMaterial);

            donut.position.set(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
            )
            donut.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            )

            const donutScale = Math.random();
            donut.scale.set(donutScale, donutScale, donutScale);
            scene.add(donut);
        }
    }
)

const cubeTextureLoader = new THREE.CubeTextureLoader();
const cubeTexture = cubeTextureLoader.setPath('/textures/environmentMaps/1/').load(
    [
        'px.jpg',
        'nx.jpg',
        'py.jpg',
        'ny.jpg',
        'pz.jpg',
        'nz.jpg',
    ]
)
scene.background = cubeTexture;

/**
 * Object
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )
//
// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()