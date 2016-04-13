/// <reference path="_reference.ts"/>

// MAIN GAME FILE

// THREEJS Aliases
import Scene = Physijs.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import CylinderGeometry = THREE.CylinderGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import LineBasicMaterial = THREE.LineBasicMaterial;
import PhongMaterial = THREE.MeshPhongMaterial;
import Material = THREE.Material;
import Texture = THREE.Texture;
import Line = THREE.Line;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import DirectionalLight = THREE.DirectionalLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import CScreen = config.Screen;
import Clock = THREE.Clock;

// Setup a Web Worker for Physijs
Physijs.scripts.worker = "/Scripts/lib/Physijs/physijs_worker.js";
Physijs.scripts.ammo = "/Scripts/lib/Physijs/examples/js/ammo.js";
var myWorker = new Worker(Physijs.scripts.worker);

// Game Variables
var scoreValue: number;
var shotsValue: number;
var scoreLabel: createjs.Text;
var shotsLabel: createjs.Text;
var highScoreValue: number = 0;

var scene: scenes.Scene;
var currentScene: number;
var renderer: Renderer;
var camera: PerspectiveCamera;

var level1: scenes.Level1;
var level2: scenes.Level2;
var level3: scenes.Level3;
var menu: scenes.Menu;
var over: scenes.Over;



var stats: Stats;
var canvas: HTMLElement;
var assets: createjs.LoadQueue;
var manifest = [
    { id: "land", src: "../../Assets/audio/Land.wav" },
    { id: "hit", src: "../../Assets/audio/hit.wav" },
    { id: "coin", src: "../../Assets/audio/coin.mp3" },
    { id: "jump", src: "../../Assets/audio/Jump.wav" },
    { id: "StartButton", src: "../../Assets/images/StartButton.png"},
    { id: "TutorialButton", src: "../../Assets/images/tutorial.png"},
    { id: "Level1Button", src: "../../Assets/images/level1.png"},
    { id: "Level2Button", src: "../../Assets/images/level2.png"},
    { id: "Level3Button", src: "../../Assets/images/level3.png"},
    { id: "Logo", src: "../../Assets/images/logo.png"},
    { id: "menu", src: "../../Assets/images/menu.png"},
    { id: "playAgain", src: "../../Assets/images/playAgain.png"}
];

function preload(): void {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    assets.on("complete", init, this);
    assets.loadManifest(manifest);
}

function setupCanvas(): void {
    canvas = document.getElementById("canvas");
    canvas.setAttribute("width", config.Screen.WIDTH.toString());
    canvas.setAttribute("height", (config.Screen.HEIGHT * 0.1).toString());
    canvas.style.backgroundColor = "#000000";
}

function init(): void {
    // setup the canvas for the game
    setupCanvas();

    // setup the default renderer
    setupRenderer();

    // setup the camera
    setupCamera();

    // set initial scene
    currentScene = config.Scene.MENU;
    changeScene();

    // Add framerate stats
    addStatsObject();

    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	

    // setup the resize event listener
    window.addEventListener('resize', onWindowResize, false);
}

// Window Resize Event Handler
function onWindowResize(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    scene.resize();
}

// Add Frame Rate Stats to the Scene
function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}

// Setup main game loop
function gameLoop(): void {
    stats.update();

    scene.update();

    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);

    // render the scene
    renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer({ antialias: true });
    renderer.setClearColor(0x323776, 1.0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera(): void {
    camera = new PerspectiveCamera(35, config.Screen.RATIO, 0.1, 100);
    //camera.position.set(0, 40, 30);
    //camera.lookAt(new Vector3(0, 0, 0));
    console.log("Finished setting up Camera...");
}

function changeScene(): void {
    // Launch various scenes
    switch (currentScene) {
        case config.Scene.MENU:
            // show the MENU scene
            menu = new scenes.Menu();
            scene = menu;
            console.log("Starting MENU Scene"); 
            break;
        case config.Scene.LEVEL1:
            // show the level 1 scene
            level1 = new scenes.Level1();
            scene = level1;
            console.log("Starting level 1 Scene");
            break;
        case config.Scene.LEVEL2:
            // show the level 2 scene
            level2 = new scenes.Level2();
            scene = level2;
            console.log("Starting level 2 Scene");
            break;
        case config.Scene.LEVEL3:
            // show the level 3 scene
            level3 = new scenes.Level3();
            scene = level3;
            console.log("Starting level 3 Scene");
            break;
        case config.Scene.OVER:
            // show the game OVER scene
            over = new scenes.Over();
            scene = over;
            console.log("Starting OVER Scene");
            break;
    }
}


window.onload = preload;

