var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @module scenes
 */
var scenes;
(function (scenes) {
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
    var Menu = (function (_super) {
        __extends(Menu, _super);
        /**
         * Empty Constructor - calls _initialize and start methods
         *
         * @constructor
         */
        function Menu() {
            _super.call(this);
            this._initialize();
            this.start();
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        Menu.prototype._setupCanvas = function () {
            canvas.style.width = "100%";
            canvas.setAttribute("height", config.Screen.HEIGHT.toString());
            canvas.style.backgroundColor = "#323776";
        };
        /**
         * This method sets up default values for class member variables
         * and objects
         *
         * @method _initialize
         * @return void
         */
        Menu.prototype._initialize = function () {
            // Create to HTMLElements
            this._blocker = document.getElementById("blocker");
            this._blocker.style.display = "none";
            // setup canvas for menu scene
            this._setupCanvas();
            // setup a stage on the canvas
            this._stage = new createjs.Stage(canvas);
            this._stage.enableMouseOver(20);
        };
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * The start method is the main method for the scene class
         *
         * @method start
         * @return void
         */
        Menu.prototype.start = function () {
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
            this._tutorialButton.y = (config.Screen.HEIGHT * 0.45) + 100;
            this._stage.addChild(this._tutorialButton);
            this._tutorialButton.on("click", function (event) {
                currentScene = config.Scene.LEVEL1;
                changeScene();
            });
            this._playButton = new createjs.Bitmap(assets.getResult("play"));
            this._playButton.scaleX = 0.25;
            this._playButton.scaleY = 0.25;
            this._playButton.regX = this._playButton.getBounds().width * 0.5;
            this._playButton.regY = this._playButton.getBounds().height * 0.5;
            this._playButton.x = config.Screen.WIDTH * 0.5;
            this._playButton.y = (config.Screen.HEIGHT * 0.55) + 100;
            this._stage.addChild(this._playButton);
            this._playButton.on("click", function (event) {
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
            this._quitButton.on("click", function (event) {
                window.close();
            });
            this._level3Button = new createjs.Bitmap(assets.getResult("Level3Button"));
            this._level3Button.scaleX = 0.25;
            this._level3Button.scaleY = 0.25;
            this._level3Button.regX = this._level3Button.getBounds().width * 0.5;
            this._level3Button.regY = this._level3Button.getBounds().height * 0.5;
            this._level3Button.x = config.Screen.WIDTH * 0.5;
            this._level3Button.y = (config.Screen.HEIGHT * 0.75) + 100;
            this._stage.addChild(this._level3Button);
            this._level3Button.on("click", function (event) {
                currentScene = config.Scene.LEVEL3;
                changeScene();
            });
            // Add buttons to an array for hover events
            this._buttons = [];
            this._buttons[0] = this._tutorialButton;
            this._buttons[1] = this._playButton;
            this._buttons[2] = this._quitButton;
            //this._buttons[3] = this._level3Button;
            // Loop through buttons
            for (var i = 0; i < this._buttons.length; i++) {
                this._buttons[i].on("mouseover", function (event) {
                    event.target.scaleX = 0.28;
                    event.target.scaleY = 0.28;
                    event.target.cursor = "pointer";
                });
                this._buttons[i].on("mouseout", function (event) {
                    event.target.scaleX = 0.25;
                    event.target.scaleY = 0.25;
                });
                this._buttons[i].on("mousedown", function (event) {
                    event.target.scaleX = 0.26;
                    event.target.scaleY = 0.26;
                });
                this._buttons[i].on("click", function (event) {
                    event.target.scaleX = 0.28;
                    event.target.scaleY = 0.28;
                });
            }
        };
        /**
         * The update method updates the animation loop and other objects
         *
         * @method update
         * @return void
         */
        Menu.prototype.update = function () {
            this._stage.update();
        };
        /**
         * The resize method is a procedure that sets variables and objects on screen resize
         *
         * @method resize
         * @return void
         */
        Menu.prototype.resize = function () {
            this._setupCanvas();
        };
        return Menu;
    }(scenes.Scene));
    scenes.Menu = Menu;
})(scenes || (scenes = {}));
