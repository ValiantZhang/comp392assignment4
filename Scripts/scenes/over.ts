/**
 * @module scenes
 */
module scenes {
    /**
     * Menu Scene extends scenes.Scene superclass is used to
     * create a custom menu for the THREEJS Game
     * 
     * @class Over
     * @extends scene.Scene
     * @param blocker {HTMLElement}
     * @param _stage {createjs.Stage}
     * @param _gameLabel {createjs.Text}
     * @param _startButton {createjs.Bitmap}
     */
    export class Over extends scenes.Scene {
        private _blocker: HTMLElement;
        private _stage: createjs.Stage;
        private _logo: createjs.Bitmap;
        private _menuButton: createjs.Bitmap;
        private _playAgainButton: createjs.Bitmap;
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
            
            this._logo = new createjs.Bitmap(assets.getResult("Logo"));
            this._logo.scaleX = 0.7;
            this._logo.scaleY = 0.7;
            this._logo.regX = this._logo.getBounds().width * 0.5;
            this._logo.regY = this._logo.getBounds().height * 0.5;
            this._logo.x = config.Screen.WIDTH * 0.5;
            this._logo.y = (config.Screen.HEIGHT * 0.15) + 100;
            this._stage.addChild(this._logo);
            
            this._menuButton = new createjs.Bitmap(assets.getResult("menu"));
            this._menuButton.scaleX = 0.25;
            this._menuButton.scaleY = 0.25;
            this._menuButton.regX = this._menuButton.getBounds().width * 0.5;
            this._menuButton.regY = this._menuButton.getBounds().height * 0.5;
            this._menuButton.x = config.Screen.WIDTH * 0.5;
            this._menuButton.y = (config.Screen.HEIGHT * 0.45) + 100;
            this._stage.addChild(this._menuButton);
            
            this._menuButton.on("click", (event: createjs.MouseEvent) => {
                currentScene = config.Scene.MENU;
                changeScene();
            });
            
            this._playAgainButton = new createjs.Bitmap(assets.getResult("playAgain"));
            this._playAgainButton.scaleX = 0.25;
            this._playAgainButton.scaleY = 0.25;
            this._playAgainButton.regX = this._playAgainButton.getBounds().width * 0.5;
            this._playAgainButton.regY = this._playAgainButton.getBounds().height * 0.5;
            this._playAgainButton.x = config.Screen.WIDTH * 0.5;
            this._playAgainButton.y = (config.Screen.HEIGHT * 0.55) + 100;
            this._stage.addChild(this._playAgainButton);
            
            this._playAgainButton.on("click", (event: createjs.MouseEvent) => {
                currentScene = currentScene;
                changeScene();
            });
            
            // Add buttons to an array for hover events
            this._buttons = [];
            
            this._buttons[0] = this._menuButton;
            this._buttons[1] = this._playAgainButton;
            
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
                
                this._buttons[i].on("mousedown", (event: createjs.MouseEvent) => {
                    event.target.scaleX = 0.26;
                    event.target.scaleY = 0.26;
                });
                
                this._buttons[i].on("click", (event: createjs.MouseEvent) => {
                    event.target.scaleX = 0.28;
                    event.target.scaleY = 0.28;
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
            this.simulate();
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