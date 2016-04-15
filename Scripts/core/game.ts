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

var levelGoal: createjs.Text;

var scene: scenes.Scene;
var currentScene: number;
var lastPlayedScene:number;//for the replay button

var renderer: Renderer;
var camera: PerspectiveCamera;

//Charge Bar
var chargeBar: Mesh[];
var chargeBarGeometry: PlaneGeometry;
var chargeBarMaterials: PhongMaterial[];
var chargeBarTextures: Texture[];
var chargePower: number;

var level1: scenes.Level1;
var level2: scenes.Level2;
var level3: scenes.Level3;
var menu: scenes.Menu;
var over: scenes.Over;
var tut: scenes.Tutorial;


var stats: Stats;
var canvas: HTMLElement;
var assets: createjs.LoadQueue;
var manifest = [
    // Sounds
    { id: "bgSound", src: "../../Assets/audio/soundTrack.mp3" },
    { id: "projectileFlight", src: "../../Assets/audio/projectileInFlyM.mp3" },
    { id: "standardHit", src: "../../Assets/audio/StandardHit.wav" },
    { id: "goldenHit", src: "../../Assets/audio/GoldenHit.wav" },
    { id: "lvlChng", src: "../../Assets/audio/LevelChangeAlert.wav" },
    { id: "charge", src: "../../Assets/audio/ChargeUp.mp3" },
    // Images
    { id: "StartButton", src: "../../Assets/images/StartButton.png"},
    { id: "TutorialButton", src: "../../Assets/images/tutorialButton.png"},
    { id: "Level1Button", src: "../../Assets/images/level1.png"},
    { id: "Level2Button", src: "../../Assets/images/level2.png"},
    { id: "Level3Button", src: "../../Assets/images/level3.png"},
    { id: "Logo", src: "../../Assets/images/logo.png"},
    { id: "tutorial", src: "../../Assets/images/tutorial.png"},
    { id: "menu", src: "../../Assets/images/menu.png"},
    { id: "playAgain", src: "../../Assets/images/playAgain.png"},
    { id: "play", src: "../../Assets/images/play.png"},
    { id: "exit", src: "../../Assets/images/exit.png"}
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
    
    // add charge bar
    addChargeBar();

    // set initial scene
    currentScene = config.Scene.MENU;
    changeScene();

    // Add framerate stats
    addStatsObject();

    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	


    createjs.Sound.play("bgSound",{loop: 99});
 
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

/**
 * Adds the chargeBar to the camera
 * 
 * @method addChargeBar
 * @return void
 */
function addChargeBar(): void {
    //ChargeBar Object
    chargePower = 1.0;
    chargeBarGeometry = new PlaneGeometry(0.03, 0.015);
    chargeBar = [];
    chargeBarMaterials = [];
    chargeBarTextures = [];
    
    for (var i = 0; i < 13; i++){
        chargeBarTextures[i] = new THREE.TextureLoader().load('../../Assets/images/charge-bar/charge-bar-' + i + '.png');
        chargeBarTextures[i].wrapS = THREE.RepeatWrapping;
        chargeBarTextures[i].wrapT = THREE.RepeatWrapping;
        chargeBarTextures[i].repeat.set(1, 1);

        chargeBarMaterials[i] = new PhongMaterial({emissive: 0xFFFFFF});
        chargeBarMaterials[i].map = chargeBarTextures[i];
        chargeBarMaterials[i].transparent = true;
        chargeBarMaterials[i].opacity = 0;
        chargeBar[i] = new Mesh(this.chargeBarGeometry, chargeBarMaterials[i]);
        chargeBar[i].name = "ChargeBar-" + i;
        camera.add(chargeBar[i]);
        chargeBar[i].position.set(0, -0.042, -0.2);
    }
    
    chargeBarMaterials[0].opacity = 1;
    chargeBarMaterials[1].opacity = 1;
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
        case config.Scene.TUT:
            // show the tutorial scene
            tut = new scenes.Tutorial();
            scene = tut;
            console.log("Starting Tutorial Scene");
            break;
    }
    createjs.Sound.play("lvlChng");
}


window.onload = preload;

