/**
 * The Scenes module is a namespace to reference all scene objects
 * 
 * @module scenes
 */
module scenes {
    /**
     * The Play class is where the main action occurs for the game
     * 
     * @class Tutorial
     * @param havePointerLock {boolean}
     */
    export class Tutorial extends scenes.Scene {
        private _blocker: HTMLElement;
        private _stage: createjs.Stage;
        private _tutorial: createjs.Bitmap;
        private _playButton: createjs.Bitmap;
        private _quitButton: createjs.Bitmap;
        private _buttons: createjs.Bitmap[];
        

        /**
         * Empty Constructor - calls _initialize and start methods
         * 
         * @constructor
         */
        constructor() {
            super();

            this._initialize();
            this.start();
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++

        private _setupCanvas(): void {
            canvas.style.width = "100%";
            canvas.setAttribute("height", config.Screen.HEIGHT.toString());
            canvas.style.backgroundColor = "#323776";
        }


        /**
         * This method sets up default values for class member variables
         * and objects
         * 
         * @method _initialize
         * @return void
         */
        private _initialize(): void {
            // Create to HTMLElements
            this._blocker = document.getElementById("blocker");
            this._blocker.style.display = "none";

            // setup canvas for menu scene
            this._setupCanvas();
            // setup a stage on the canvas
            this._stage = new createjs.Stage(canvas);
            this._stage.enableMouseOver(20);
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++

        /**
         * The start method is the main method for the scene class
         * 
         * @method start
         * @return void
         */
        public start(): void {

            this._tutorial = new createjs.Bitmap(assets.getResult("tutorial"));
            this._tutorial.scaleX = 0.7;
            this._tutorial.scaleY = 0.7;
            this._tutorial.regX = this._tutorial.getBounds().width * 0.5;
            this._tutorial.regY = this._tutorial.getBounds().height * 0.5;
            this._tutorial.x = config.Screen.WIDTH * 0.5;
            this._tutorial.y = (config.Screen.HEIGHT * 0.15) + 100;
            this._stage.addChild(this._tutorial);
            
            this._playButton = new createjs.Bitmap(assets.getResult("play"));
            this._playButton.scaleX = 0.25;
            this._playButton.scaleY = 0.25;
            this._playButton.regX = this._playButton.getBounds().width * 0.5;
            this._playButton.regY = this._playButton.getBounds().height * 0.5;
            this._playButton.x = config.Screen.WIDTH * 0.5;
            this._playButton.y = (config.Screen.HEIGHT * 0.55) + 100;
            this._stage.addChild(this._playButton);
            
            this._playButton.on("click", (event: createjs.MouseEvent) => {
                currentScene = config.Scene.LEVEL1;
                changeScene();
            });
            
            this._quitButton = new createjs.Bitmap(assets.getResult("exit"));
            this._quitButton.scaleX = 0.25;
            this._quitButton.scaleY = 0.25;
            this._quitButton.regX = this._quitButton.getBounds().width * 0.5;
            this._quitButton.regY = this._quitButton.getBounds().height * 0.5;
            this._quitButton.x = config.Screen.WIDTH * 0.5;
            this._quitButton.y = (config.Screen.HEIGHT * 0.65) + 100;
            this._stage.addChild(this._quitButton);
            
            this._quitButton.on("click", (event: createjs.MouseEvent) => {
                window.close();
            });
            
            // Add buttons to an array for hover events
            this._buttons = [];
            
            this._buttons[0] = this._playButton;
            this._buttons[1] = this._quitButton;
            
            // Loop through buttons
            for (var i = 0; i < this._buttons.length; i++){
                this._buttons[i].on("mouseover", (event: createjs.MouseEvent) => {
                    event.target.scaleX = 0.28;
                    event.target.scaleY = 0.28;
                    event.target.cursor = "pointer";
                });
    
                this._buttons[i].on("mouseout", (event: createjs.MouseEvent) => {
                    event.target.scaleX = 0.25;
                    event.target.scaleY = 0.25;
                });
            }
        }

        /**
         * The update method updates the animation loop and other objects
         * 
         * @method update
         * @return void
         */
        public update(): void {
            this._stage.update();
        }

        /**
         * The resize method is a procedure that sets variables and objects on screen resize
         * 
         * @method resize
         * @return void
         */
        public resize(): void {
            this._setupCanvas();
        }
    }
}