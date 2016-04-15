/**
 * The Scenes module is a namespace to reference all scene objects
 * 
 * @module scenes
 */
module scenes {
    /**
     * The Play class is where the main action occurs for the game
     * 
     * @class Level1
     * @param havePointerLock {boolean}
     */
    export class Level1 extends scenes.Scene {
        private havePointerLock: boolean;
        private element: any;

        private blocker: HTMLElement;
        private instructions: HTMLElement;
        private directionLight: DirectionalLight;
        private ambientLight: AmbientLight;
        private groundGeometry: CubeGeometry;
        private groundPhysicsMaterial: Physijs.Material;
        private groundMaterial: PhongMaterial;
        private ground: Physijs.Mesh;
        private groundTexture: Texture;
        private groundTextureNormal: Texture;
        private reticleGeometry: PlaneGeometry;
        private reticleMaterial: PhongMaterial;
        private reticleTexture: Texture;
        private reticle: Mesh;
        private playerGeometry: CubeGeometry;
        private playerMaterial: Material;
        private player: Mesh;
        private keyboardControls: objects.KeyboardControls;
        private mouseControls: objects.MouseControls;
        private isGrounded: boolean;
        private deathPlaneGeometry: CubeGeometry;
        private deathPlaneMaterial: Physijs.Material;
        private deathPlane: Physijs.Mesh;
        
        private directionLineMaterial: LineBasicMaterial;
        private directionLineGeometry: Geometry;
        private directionLine: Line;

        private velocity: Vector3;
        private prevTime: number;
        private clock: Clock;

        private stage: createjs.Stage;
        public scoreValue: number;
        private creator :builder.Creator = new builder.Creator();
        
        private scoreRequired:number =7500; //Score required to pass the level
        private levelTransitionInProgress:boolean=false;

        
        /**
         * @constructor
         */
        constructor() {
            super();
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
        private _setupCanvas(): void {
            canvas.setAttribute("width", config.Screen.WIDTH.toString());
            canvas.setAttribute("height", (config.Screen.HEIGHT * 0.1).toString());
            canvas.style.backgroundColor = "#000000";
        }

        /**
         * The initialize method sets up key objects to be used in the scene
         * 
         * @method _initialize
         * @returns void
         */
        private _initialize(): void {
            // Create to HTMLElements
            this.blocker = document.getElementById("blocker");
            this.instructions = document.getElementById("instructions");
            this.blocker.style.display = "block";

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
        }
        /**
         * This method sets up the scoreboard for the scene
         * 
         * @method setupScoreboard
         * @returns void
         */
        private setupScoreboard(): void {
            // initialize  score and shots values
            scoreValue = 0;
            shotsValue = 5;

            // Add shots Label
            shotsLabel = new createjs.Text(
                "Shots: " + shotsValue,
                "40px Consolas",
                "#ffffff"
            );
            shotsLabel.x = config.Screen.WIDTH * 0.1;
            shotsLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.addChild(shotsLabel);
            console.log("Added shots Label to stage");

            // Add Score Label
            scoreLabel = new createjs.Text(
                "Score: " + scoreValue,
                "40px Consolas",
                "#ffffff"
            );
            scoreLabel.x = config.Screen.WIDTH * 0.8;
            scoreLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.addChild(scoreLabel);
            console.log("Added Score Label to stage");
            
            levelGoal = new createjs.Text(
                "Level goal: " + this.scoreRequired,
                "40px Consolas",
                "#ffffff"
            );
            levelGoal.x = config.Screen.WIDTH * 0.35;
            levelGoal.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.addChild(levelGoal);
            console.log("Added level goal to stage");
        }

        /**
         * Add a directional light to the scene
         * 
         * @method addDirectionalLight
         * @return void
         */
        private addDirectionalLight(): void {
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
        }
        
        /**
         * Add an ambient light to the scene
         * 
         * @method addAmbientLight
         * @return void
         */
        private addAmbientLight(): void{
            // Ambient Light
            this.ambientLight = new AmbientLight(0x303030);
            this.add(this.ambientLight);
            console.log("Added an Ambient Light to Scene");
        }

        /**
         * Add a ground plane to the scene
         * 
         * @method addGround
         * @return void
         */
        private addGround(): void {
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
            this.groundMaterial.bumpMap = this.groundTextureNormal;
            this.groundMaterial.bumpScale = 0.2;*/

            this.groundGeometry = new BoxGeometry(128, 1, 128);
            this.groundPhysicsMaterial = Physijs.createMaterial(this.groundMaterial, 0.4, 0.1);
            this.ground = new Physijs.ConvexMesh(this.groundGeometry, this.groundPhysicsMaterial, 0);
            this.ground.receiveShadow = true;
            this.ground.name = "Ground";
            this.ground.position.set(0, -0.5, 0);
            this.add(this.ground);
            console.log("Added Burnt Ground to scene");
        }

        /**
         * Adds the player controller to the scene
         * 
         * @method addPlayer
         * @return void
         */
        private addPlayer(): void {
            
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
        }

        /**
         * Adds the reticle to the camera
         * 
         * @method addReticle
         * @return void
         */
        private addReticle(): void {
            //Reticle Object
            this.reticleTexture = new THREE.TextureLoader().load('../../Assets/images/reticleTexture.png');
            this.reticleTexture.wrapS = THREE.RepeatWrapping;
            this.reticleTexture.wrapT = THREE.RepeatWrapping;
            this.reticleTexture.repeat.set(1, 1);
            
            this.reticleGeometry = new PlaneGeometry(0.02, 0.02);
            this.reticleMaterial = new PhongMaterial({emissive: 0xFFFFFF});
            this.reticleMaterial.map = this.reticleTexture;
            this.reticleMaterial.transparent = true;
            this.reticleMaterial.opacity = 1;
            this.reticle = new Mesh(this.reticleGeometry, this.reticleMaterial);
            this.reticle.name = "Reticle";
            camera.add(this.reticle);
            this.reticle.position.set(0, 0.01, -0.2);
        }
       
        private generateLevel():void{
            //Create Golden Cubes
            this.creator.createCube(-5.5, 6.5, -15.5, 1, this);
            this.creator.createCube(-0.5, 6.5, -15.5, 1, this);
            this.creator.createCube(4.5, 6.5, -15.5, 1, this);
            
            // Set Positions
            var cubetangle1Pos = new Vector3(-5, 0, -15);
            var cubetangle2Pos = new Vector3(0, 0, -15);
            var cubetangle3Pos = new Vector3(5, 0, -15);
            var cubeamid1Pos = new Vector3(-5, 3, -15);
            var cubeamid2Pos = new Vector3(0, 3, -15);
            var cubeamid3Pos = new Vector3(5, 3, -15);
            
            // Instantiate Cubetangles
            this.creator.createCubetangle(3, 3, 3, cubetangle1Pos, this);
            this.creator.createCubetangle(3, 3, 3, cubetangle2Pos, this);
            this.creator.createCubetangle(3, 3, 3, cubetangle3Pos, this);
            
            // Instantiate Cubeamids
            this.creator.createCubeamid(3, cubeamid1Pos, this);
            this.creator.createCubeamid(3, cubeamid2Pos, this);
            this.creator.createCubeamid(3, cubeamid3Pos, this);
        }
    
        /**
         * Event Handler method for any pointerLockChange events
         * 
         * @method pointerLockChange
         * @return void
         */
        pointerLockChange(event): void {
            //OMIT TO REMOVE MOZ/WEBKIT SEMANTIC ERROR
            if (document.pointerLockElement === this.element ||
                document.mozPointerLockElement === this.element ||
                document.webkitPointerLockElement === this.element){
                // enable our mouse and keyboard controls
                this.keyboardControls.enabled = true;
                this.mouseControls.enabled = true;
                this.blocker.style.display = 'none';
                console.log("PointerLock enabled");
            } else {
                // disable our mouse and keyboard controls
                if (currentScene == 5) {
                    this.blocker.style.display = 'none';
                    document.removeEventListener('pointerlockchange', this.pointerLockChange.bind(this), false);
                    document.removeEventListener('mozpointerlockchange', this.pointerLockChange.bind(this), false);
                    document.removeEventListener('webkitpointerlockchange', this.pointerLockChange.bind(this), false);
                    document.removeEventListener('pointerlockerror', this.pointerLockError.bind(this), false);
                    document.removeEventListener('mozpointerlockerror', this.pointerLockError.bind(this), false);
                    document.removeEventListener('webkitpointerlockerror', this.pointerLockError.bind(this), false);
                } else {
                this.blocker.style.display = '-webkit-box';
                this.blocker.style.display = '-moz-box';
                this.blocker.style.display = 'box';
                this.instructions.style.display = '';
                }
                this.keyboardControls.enabled = false;
                this.mouseControls.enabled = false;
                console.log("PointerLock disabled");
            }
        }

        /**
         * Event handler for PointerLockError
         * 
         * @method pointerLockError
         * @return void
         */
        private pointerLockError(event): void {
            this.instructions.style.display = '';
            console.log("PointerLock Error Detected!!");
        }

        /**
         * This method checks the charge level and shows the appropriate textures
         * 
         * @method checkCharge
         * @return void
         */
         private checkCharge(): void{
             if (chargePower > 12) { chargePower = 12 };
             
             for (var i = 2; i < chargeBar.length; i++){
                 if (chargePower >= i) {
                     chargeBarMaterials[i].opacity = 1;
                 }
                 else {
                     chargeBarMaterials[i].opacity = 0;
                 }
             }
         }
         
       
           
        
         
         /**
         * This method creates and launches a sphere projectile
         * 
         * Projectile is create at player position
         * 
         * @method launchSphere
         * @return void
         */
         private launchSphere(launchPower: number, launchAngle: number, launchYaw: number): void{
             //console.log( this.projectileQueue );
             if (shotsValue > 0){
                this.creator.createProjectile(this.player.position.x, this.player.position.y + 2, this.player.position.z - 2, 
                this, launchPower, launchAngle, launchYaw);
             }
         }

        // Check Controls Function
        /**
         * This method updates the player's position based on user input
         * 
         * @method checkControls
         * @return void
         */
        private checkControls(): void {
            if (this.keyboardControls.enabled) {
                
                //this.velocity = new Vector3();
                var time: number = performance.now();
                var delta: number = (time - this.prevTime) / 1000;
                
                //ChargeBar
                if (this.keyboardControls.charge){
                    chargePower += 5 * delta;
                }
                else if(chargePower > 1 && !this.keyboardControls.charge && shotsValue > 0){
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
        }
        private checkLevelChange():void{
            if (shotsValue == 0 && !this.levelTransitionInProgress){
                this.levelTransitionInProgress=true;
                setTimeout(() => {
                    if (scoreValue < this.scoreRequired){
                        // Exit Pointer Lock
                        document.exitPointerLock();
                        this.children = []; // an attempt to clean up
                        this.player.remove(camera);
            
                        // Play the Game Over Scene
                        currentScene = config.Scene.OVER;
                        changeScene();
                    }
                    else{
                        document.exitPointerLock();
                        this.children = []; // an attempt to clean up
                        this.player.remove(camera);
            
                        //go to next level
                        currentScene = currentScene + 1;
                        changeScene();
                    }
                }, 5000);
            }
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++
        /**
         * The start method is the main method for the scene class
         * @method start
         * @return void
         */
        public start(): void {
            var self = this;

            // Set Up Scoreboard
            this.setupScoreboard();

            //check to see if pointerlock is supported
            this.havePointerLock = 'pointerLockElement' in document ||
                'mozPointerLockElement' in document ||
                'webkitPointerLockElement' in document;

            // Check to see if we have pointerLock
            if (this.havePointerLock) {
                this.element = document.body;
                this.instructions.addEventListener('click', () => {
                    // Ask the user for pointer lock
                    console.log("Requesting PointerLock");
                    this.element.requestPointerLock = this.element.requestPointerLock ||
                        this.element.mozRequestPointerLock ||
                        this.element.webkitRequestPointerLock;
                    this.element.requestPointerLock();
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
            /*this.player.addEventListener('collision', function(eventObject) {
                if (eventObject.name === "Ground") {
                    this.isGrounded = true;
                    createjs.Sound.play("land");
                }
            }.bind(this));
            */

            // create parent-child relationship with camera and player
            this.player.add(camera);
            //camera.position.set(0,10,35);//CONSTANT
            
            // Add UI Elements
            this.addReticle();
            this.generateLevel();
            this.simulate();
        }

        /**
         * Camera Look function
         * 
         * @method cameraLook
         * @return void
         */
        private cameraLook(): void {
            var zenith: number = THREE.Math.degToRad(25);
            var nadir: number = THREE.Math.degToRad(-25);
            var zenith2: number = THREE.Math.degToRad(25);
            var nadir2: number = THREE.Math.degToRad(0);

            var cameraPitch: number = camera.rotation.x + this.mouseControls.pitch;
            var cameraYaw: number = camera.rotation.y + this.mouseControls.yaw;

            // Constrain the Camera Pitch & Yaw
            camera.rotation.x = THREE.Math.clamp(cameraPitch, nadir2, zenith2);
            camera.rotation.y = THREE.Math.clamp(cameraYaw, nadir, zenith);
        }

        /**
         * @method update
         * @returns void
         */
        public update(): void {
            //player.setAngularFactor(new Vector3(0,0,0));
            this.checkControls();
            this.stage.update();
            this.checkLevelChange();
            this.simulate();
        }

        /**
         * Responds to screen resizes
         * 
         * @method resize
         * @return void
         */
        public resize(): void {
            canvas.style.width = "100%";
            shotsLabel.x = config.Screen.WIDTH * 0.1;
            shotsLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            scoreLabel.x = config.Screen.WIDTH * 0.8;
            scoreLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.update();
        }
    }
}