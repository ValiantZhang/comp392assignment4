var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * The Scenes module is a namespace to reference all scene objects
 *
 * @module scenes
 */
var scenes;
(function (scenes) {
    /**
     * The Play class is where the main action occurs for the game
     *
     * @class Level2
     * @param havePointerLock {boolean}
     */
    var Level2 = (function (_super) {
        __extends(Level2, _super);
        /**
         * @constructor
         */
        function Level2() {
            _super.call(this);
            this.creator = new builder.Creator();
            this.scoreRequired = 2500; //Score required to pass the level
            this.levelTransitionInProgress = false;
            this._initialize();
            this.start();
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++
        /**
         * Sets up the initial canvas for the play scene
         *
         * @method setupCanvas
         * @return void
         */
        Level2.prototype._setupCanvas = function () {
            canvas.setAttribute("width", config.Screen.WIDTH.toString());
            canvas.setAttribute("height", (config.Screen.HEIGHT * 0.1).toString());
            canvas.style.backgroundColor = "#000000";
        };
        /**
         * The initialize method sets up key objects to be used in the scene
         *
         * @method _initialize
         * @returns void
         */
        Level2.prototype._initialize = function () {
            // Create to HTMLElements
            this.blocker = document.getElementById("blocker");
            this.instructions = document.getElementById("instructions");
            this.blocker.style.display = "none";
            // setup canvas for menu scene
            this._setupCanvas();
            this.prevTime = 0;
            this.stage = new createjs.Stage(canvas);
            this.velocity = new Vector3(0, 0, 0);
            // setup a THREE.JS Clock objectg
            this.clock = new Clock();
            // Instantiate Game Controls
            this.keyboardControls = new objects.KeyboardControls();
            this.mouseControls = new objects.MouseControls();
            this.keyboardControls.enabled = true;
            this.mouseControls.enabled = true;
        };
        /**
         * This method sets up the scoreboard for the scene
         *
         * @method setupScoreboard
         * @returns void
         */
        Level2.prototype.setupScoreboard = function () {
            // initialize  score and shots values
            scoreValue = 0;
            shotsValue = 5;
            // Add shots Label
            shotsLabel = new createjs.Text("Shots: " + shotsValue, "40px Consolas", "#ffffff");
            shotsLabel.x = config.Screen.WIDTH * 0.1;
            shotsLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.addChild(shotsLabel);
            console.log("Added shots Label to stage");
            // Add Score Label
            scoreLabel = new createjs.Text("Score: " + scoreValue, "40px Consolas", "#ffffff");
            scoreLabel.x = config.Screen.WIDTH * 0.8;
            scoreLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.addChild(scoreLabel);
            console.log("Added Score Label to stage");
            levelGoal = new createjs.Text("Level goal: " + this.scoreRequired, "40px Consolas", "#ffffff");
            levelGoal.x = config.Screen.WIDTH * 0.35;
            levelGoal.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.addChild(levelGoal);
            console.log("Added level goal to stage");
        };
        /**
         * Add a directional light to the scene
         *
         * @method addDirectionalLight
         * @return void
         */
        Level2.prototype.addDirectionalLight = function () {
            // Directional Light
            this.directionLight = new DirectionalLight(0xffffff, 1.2);
            this.directionLight.position.set(5, 40, 20);
            this.directionLight.castShadow = true;
            this.directionLight.lookAt(new Vector3(0, 0, 0));
            this.directionLight.shadowCameraNear = 2;
            this.directionLight.shadowCameraFar = 200;
            this.directionLight.shadowCameraLeft = -5;
            this.directionLight.shadowCameraRight = 5;
            this.directionLight.shadowCameraTop = 5;
            this.directionLight.shadowCameraBottom = -5;
            this.directionLight.shadowMapWidth = 2048;
            this.directionLight.shadowMapHeight = 2048;
            this.directionLight.shadowDarkness = 0.5;
            this.directionLight.name = "Directional Light";
            this.add(this.directionLight);
            console.log("Added directional light to scene");
        };
        /**
         * Add an ambient light to the scene
         *
         * @method addAmbientLight
         * @return void
         */
        Level2.prototype.addAmbientLight = function () {
            // Ambient Light
            this.ambientLight = new AmbientLight(0x303030);
            this.add(this.ambientLight);
            console.log("Added an Ambient Light to Scene");
        };
        /**
         * Add a ground plane to the scene
         *
         * @method addGround
         * @return void
         */
        Level2.prototype.addGround = function () {
            /*this.groundTexture = new THREE.TextureLoader().load('../../Assets/images/GravelCobble.jpg');
            this.groundTexture.wrapS = THREE.RepeatWrapping;
            this.groundTexture.wrapT = THREE.RepeatWrapping;
            this.groundTexture.repeat.set(8, 8);

            this.groundTextureNormal = new THREE.TextureLoader().load('../../Assets/images/GravelCobbleNormal.png');
            this.groundTextureNormal.wrapS = THREE.RepeatWrapping;
            this.groundTextureNormal.wrapT = THREE.RepeatWrapping;
            this.groundTextureNormal.repeat.set(8, 8);*/
            this.groundMaterial = new PhongMaterial({ color: 0x00FF00 });
            /*this.groundMaterial.map = this.groundTexture;
            this.groundMaterial.bumpMap = this.groundText
            this.groundMaterial.bumpScale = 0.2;*/
            this.groundGeometry = new BoxGeometry(128, 1, 128);
            this.groundPhysicsMaterial = Physijs.createMaterial(this.groundMaterial, 0.8, 0);
            this.ground = new Physijs.ConvexMesh(this.groundGeometry, this.groundPhysicsMaterial, 0);
            this.ground.receiveShadow = true;
            this.ground.name = "Ground";
            this.ground.position.set(0, -0.5, 0);
            this.add(this.ground);
            console.log("Added Burnt Ground to scene");
        };
        /**
         * Adds the player controller to the scene
         *
         * @method addPlayer
         * @return void
         */
        Level2.prototype.addPlayer = function () {
            // Player Object
            this.playerGeometry = new BoxGeometry(2, 4, 2);
            this.playerMaterial = new LambertMaterial({ color: 0x00ff00 });
            this.player = new THREE.Mesh(this.playerGeometry, this.playerMaterial);
            this.player.position.set(0, 2, 10);
            this.player.receiveShadow = true;
            this.player.castShadow = true;
            this.player.name = "Player";
            this.add(this.player);
            this.directionLineMaterial = new LineBasicMaterial({ color: 0xBadBad });
            this.directionLineGeometry = new Geometry();
            this.directionLineGeometry.vertices.push(new Vector3(0, 0, 0)); // line origin
            this.directionLineGeometry.vertices.push(new Vector3(0, 0, -50)); // end of the line
            this.directionLine = new Line(this.directionLineGeometry, this.directionLineMaterial);
            this.player.add(this.directionLine);
            console.log("Added DirectionLine to the Player");
            //console.log("Added Player to Scene");
        };
        /**
         * Adds the reticle to the camera
         *
         * @method addReticle
         * @return void
         */
        Level2.prototype.addReticle = function () {
            //Reticle Object
            this.reticleTexture = new THREE.TextureLoader().load('../../Assets/images/reticleTexture.png');
            this.reticleTexture.wrapS = THREE.RepeatWrapping;
            this.reticleTexture.wrapT = THREE.RepeatWrapping;
            this.reticleTexture.repeat.set(1, 1);
            this.reticleGeometry = new PlaneGeometry(0.02, 0.02);
            this.reticleMaterial = new PhongMaterial({ emissive: 0xFFFFFF });
            this.reticleMaterial.map = this.reticleTexture;
            this.reticleMaterial.transparent = true;
            this.reticleMaterial.opacity = 1;
            this.reticle = new Mesh(this.reticleGeometry, this.reticleMaterial);
            this.reticle.name = "Reticle";
            camera.add(this.reticle);
            this.reticle.position.set(0, 0.01, -0.2);
        };
        Level2.prototype.generateLevel = function () {
            //Add platform for cubes to be set ontop of
            this.creator.createPlatform(0, 1.5, -30, 7, 5, 3, 5, this);
            //Create Golden Cubes
            this.creator.createCube(-3, 6, -30, 1, this);
            this.creator.createCube(-0, 6, -30, 1, this);
            this.creator.createCube(2, 6, -30, 1, this);
            // Set Positions
            var cubetangle1Pos = new Vector3(-3, 3, -30);
            var cubetangle2Pos = new Vector3(0, 3, -30);
            var cubetangle3Pos = new Vector3(3, 3, -30);
            var cubetangle4Pos = new Vector3(0, 3, -28);
            var cubetangle5Pos = new Vector3(0, 3, -32);
            // Instantiate Cubetangles
            this.creator.createCubetangle(2, 2, 2, cubetangle1Pos, this);
            this.creator.createCubetangle(2, 2, 2, cubetangle2Pos, this);
            this.creator.createCubetangle(2, 2, 2, cubetangle3Pos, this);
            this.creator.createCubetangle(4, 3, 2, cubetangle4Pos, this);
            this.creator.createCubetangle(4, 3, 2, cubetangle5Pos, this);
        };
        /**
         * Event Handler method for any pointerLockChange events
         *
         * @method pointerLockChange
         * @return void
         */
        Level2.prototype.pointerLockChange = function (event) {
            //OMIT MOZ AND WEBKIT TO REMOVE SEMANTIC ERROR
            if (document.pointerLockElement === this.element ||
                document.mozPointerLockElement === this.element ||
                document.webkitPointerLockElement === this.element) {
                // enable our mouse and keyboard controls
                this.keyboardControls.enabled = true;
                this.mouseControls.enabled = true;
                this.blocker.style.display = 'none';
            }
            else {
                // disable our mouse and keyboard controls
                if (currentScene == 5) {
                    this.blocker.style.display = 'none';
                    document.removeEventListener('pointerlockchange', this.pointerLockChange.bind(this), false);
                    document.removeEventListener('mozpointerlockchange', this.pointerLockChange.bind(this), false);
                    document.removeEventListener('webkitpointerlockchange', this.pointerLockChange.bind(this), false);
                    document.removeEventListener('pointerlockerror', this.pointerLockError.bind(this), false);
                    document.removeEventListener('mozpointerlockerror', this.pointerLockError.bind(this), false);
                    document.removeEventListener('webkitpointerlockerror', this.pointerLockError.bind(this), false);
                }
                else {
                    this.blocker.style.display = '-webkit-box';
                    this.blocker.style.display = '-moz-box';
                    this.blocker.style.display = 'box';
                    this.instructions.style.display = '';
                }
                this.keyboardControls.enabled = false;
                this.mouseControls.enabled = false;
                console.log("PointerLock disabled");
            }
        };
        /**
         * Event handler for PointerLockError
         *
         * @method pointerLockError
         * @return void
         */
        Level2.prototype.pointerLockError = function (event) {
            this.instructions.style.display = '';
            console.log("PointerLock Error Detected!!");
        };
        /**
         * This method checks the charge level and shows the appropriate textures
         *
         * @method checkCharge
         * @return void
         */
        Level2.prototype.checkCharge = function () {
            if (chargePower > 12) {
                chargePower = 12;
            }
            ;
            for (var i = 2; i < chargeBar.length; i++) {
                if (chargePower >= i) {
                    chargeBarMaterials[i].opacity = 1;
                }
                else {
                    chargeBarMaterials[i].opacity = 0;
                }
            }
        };
        /**
        * This method creates and launches a sphere projectile
        *
        * Projectile is create at player position
        *
        * @method launchSphere
        * @return void
        */
        Level2.prototype.launchSphere = function (launchPower, launchAngle, launchYaw) {
            if (shotsValue > 0) {
                this.creator.createProjectile(this.player.position.x, this.player.position.y + 2, this.player.position.z - 2, this, launchPower, launchAngle, launchYaw);
            }
        };
        /**
         * This method updates the player's position based on user input
         *
         * @method checkControls
         * @return void
         */
        Level2.prototype.checkControls = function () {
            if (this.keyboardControls.enabled) {
                //this.velocity = new Vector3();
                var time = performance.now();
                var delta = (time - this.prevTime) / 1000;
                //ChargeBar
                if (this.keyboardControls.charge) {
                    chargePower += 5 * delta;
                }
                else if (chargePower > 1 && !this.keyboardControls.charge && shotsValue > 0) {
                    this.launchSphere(chargePower * 5000, camera.rotation.x, camera.rotation.y);
                    shotsValue--;
                    shotsLabel.text = "Shots: " + shotsValue;
                    chargePower = 0;
                }
                this.checkCharge();
                this.cameraLook();
                //reset Pitch and Yaw
                this.mouseControls.pitch = 0;
                this.mouseControls.yaw = 0;
                this.prevTime = time;
            }
        };
        Level2.prototype.checkLevelChange = function () {
            var _this = this;
            if (shotsValue == 0 && !this.levelTransitionInProgress) {
                this.levelTransitionInProgress = true;
                setTimeout(function () {
                    if (scoreValue < _this.scoreRequired) {
                        // Exit Pointer Lock
                        document.exitPointerLock();
                        _this.children = []; // an attempt to clean up
                        _this.player.remove(camera);
                        // Play the Game Over Scene
                        currentScene = config.Scene.OVER;
                        changeScene();
                    }
                    else {
                        document.exitPointerLock();
                        _this.children = []; // an attempt to clean up
                        _this.player.remove(camera);
                        //go to next level
                        currentScene = currentScene + 1;
                        changeScene();
                    }
                }, 5000);
            }
        };
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++
        /**
         * The start method is the main method for the scene class
         *
         * @method start
         * @return void
         */
        Level2.prototype.start = function () {
            var _this = this;
            var self = this;
            shotsValue = 5;
            shotsLabel.text = "Shots:" + shotsValue;
            // Set Up Scoreboard
            this.setupScoreboard();
            //check to see if pointerlock is supported
            this.havePointerLock = 'pointerLockElement' in document ||
                'mozPointerLockElement' in document ||
                'webkitPointerLockElement' in document;
            // Check to see if we have pointerLock
            if (this.havePointerLock) {
                this.element = document.body;
                this.instructions.addEventListener('click', function () {
                    // Ask the user for pointer lock
                    console.log("Requesting PointerLock");
                    _this.element.requestPointerLock = _this.element.requestPointerLock ||
                        _this.element.mozRequestPointerLock ||
                        _this.element.webkitRequestPointerLock;
                    _this.element.requestPointerLock();
                });
                document.addEventListener('pointerlockchange', this.pointerLockChange.bind(this), false);
                document.addEventListener('mozpointerlockchange', this.pointerLockChange.bind(this), false);
                document.addEventListener('webkitpointerlockchange', this.pointerLockChange.bind(this), false);
                document.addEventListener('pointerlockerror', this.pointerLockError.bind(this), false);
                document.addEventListener('mozpointerlockerror', this.pointerLockError.bind(this), false);
                document.addEventListener('webkitpointerlockerror', this.pointerLockError.bind(this), false);
            }
            // Scene changes for Physijs
            this.name = "Main";
            this.fog = new THREE.Fog(0xffffff, 0, 750);
            this.setGravity(new THREE.Vector3(0, -20, 0));
            // Add Ambient Light to the scene
            this.addAmbientLight();
            // Add Directional Light to the scene
            this.addDirectionalLight();
            // Ground Object
            this.addGround();
            // Add player controller
            this.addPlayer();
            // Collision Check
            // create parent-child relationship with camera and player
            this.player.add(camera);
            //camera.position.set(0,10,35);//CONSTANT
            // Add UI Elements
            this.addReticle();
            this.generateLevel();
            this.simulate();
        };
        /**
         * Camera Look function
         *
         * @method cameraLook
         * @return void
         */
        Level2.prototype.cameraLook = function () {
            var zenith = THREE.Math.degToRad(25);
            var nadir = THREE.Math.degToRad(-25);
            var zenith2 = THREE.Math.degToRad(25);
            var nadir2 = THREE.Math.degToRad(0);
            var cameraPitch = camera.rotation.x + this.mouseControls.pitch;
            var cameraYaw = camera.rotation.y + this.mouseControls.yaw;
            // Constrain the Camera Pitch & Yaw
            camera.rotation.x = THREE.Math.clamp(cameraPitch, nadir2, zenith2);
            camera.rotation.y = THREE.Math.clamp(cameraYaw, nadir, zenith);
        };
        /**
         * @method update
         * @returns void
         */
        Level2.prototype.update = function () {
            this.checkControls();
            this.stage.update();
            this.checkLevelChange();
            this.simulate();
        };
        /**
         * Responds to screen resizes
         *
         * @method resize
         * @return void
         */
        Level2.prototype.resize = function () {
            canvas.style.width = "100%";
            shotsLabel.x = config.Screen.WIDTH * 0.1;
            shotsLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            scoreLabel.x = config.Screen.WIDTH * 0.8;
            scoreLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.update();
        };
        return Level2;
    }(scenes.Scene));
    scenes.Level2 = Level2;
})(scenes || (scenes = {}));

//# sourceMappingURL=level2.js.map
