/*
Author:             Josh Bender, Jacky Zhang, Ilmir Taychinov
Last Modified:      19/04/2016
Description:        Menu Scene
Revision History:   Live build - Part 4 (final)
*/

/**
 * @module scenes
 */
module scenes {
    /**
     * Menu Scene extends scenes.Scene superclass is used to
     * create a custom menu for the THREEJS Game
     * 
     * @class Menu
     * @extends scene.Scene
     * @param blocker {HTMLElement}
     * @param _stage {createjs.Stage}
     * @param _gameLabel {createjs.Text}
     * @param _startButton {createjs.Bitmap}
     */
    export class Menu extends scenes.Scene {
        private _blocker: HTMLElement;
        private _stage: createjs.Stage;
        private _logo: createjs.Bitmap;
        private _startButton: createjs.Bitmap;
        private _tutorialButton: createjs.Bitmap;
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

            this._logo = new createjs.Bitmap(assets.getResult("Logo"));
            this._logo.scaleX = 0.7;
            this._logo.scaleY = 0.7;
            this._logo.regX = this._logo.getBounds().width * 0.5;
            this._logo.regY = this._logo.getBounds().height * 0.5;
            this._logo.x = config.Screen.WIDTH * 0.5;
            this._logo.y = (config.Screen.HEIGHT * 0.15) + 100;
            this._stage.addChild(this._logo);
            
            this._tutorialButton = new createjs.Bitmap(assets.getResult("TutorialButton"));
            this._tutorialButton.scaleX = 0.25;
            this._tutorialButton.scaleY = 0.25;
            this._tutorialButton.regX = this._tutorialButton.getBounds().width * 0.5;
            this._tutorialButton.regY = this._tutorialButton.getBounds().height * 0.5;
            this._tutorialButton.x = config.Screen.WIDTH * 0.5;
            this._tutorialButton.y = (config.Screen.HEIGHT * 0.55) + 100;
            this._stage.addChild(this._tutorialButton);
            
            this._tutorialButton.on("click", (event: createjs.MouseEvent) => {
                currentScene = config.Scene.TUT;
                changeScene();
            });
            
            this._playButton = new createjs.Bitmap(assets.getResult("play"));
            this._playButton.scaleX = 0.25;
            this._playButton.scaleY = 0.25;
            this._playButton.regX = this._playButton.getBounds().width * 0.5;
            this._playButton.regY = this._playButton.getBounds().height * 0.5;
            this._playButton.x = config.Screen.WIDTH * 0.5;
            this._playButton.y = (config.Screen.HEIGHT * 0.65) + 100;
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
            this._quitButton.y = (config.Screen.HEIGHT * 0.75) + 100;
            this._stage.addChild(this._quitButton);
            
            this._quitButton.on("click", (event: createjs.MouseEvent) => {
                window.close();
            });
            
            // Add buttons to an array for hover events
            this._buttons = [];
            
            this._buttons[0] = this._tutorialButton;
            this._buttons[1] = this._playButton;
            this._buttons[2] = this._quitButton;
            //this._buttons[3] = this._level3Button;
            
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