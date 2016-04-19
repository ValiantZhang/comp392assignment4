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
     * @class Tutorial
     * @param havePointerLock {boolean}
     */
    var Tutorial = (function (_super) {
        __extends(Tutorial, _super);
        /**
         * Empty Constructor - calls _initialize and start methods
         *
         * @constructor
         */
        function Tutorial() {
            _super.call(this);
            this._initialize();
            this.start();
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        Tutorial.prototype._setupCanvas = function () {
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
        Tutorial.prototype._initialize = function () {
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
        Tutorial.prototype.start = function () {
            this._tutorial = new createjs.Bitmap(assets.getResult("tutorial"));
            this._tutorial.scaleX = 0.7;
            this._tutorial.scaleY = 0.7;
            this._tutorial.regX = this._tutorial.getBounds().width * 0.5;
            this._tutorial.regY = this._tutorial.getBounds().height * 0.5;
            this._tutorial.x = config.Screen.WIDTH * 0.5;
            this._tutorial.y = (config.Screen.HEIGHT * 0.20) + 100;
            this._stage.addChild(this._tutorial);
            this._playButton = new createjs.Bitmap(assets.getResult("play"));
            this._playButton.scaleX = 0.25;
            this._playButton.scaleY = 0.25;
            this._playButton.regX = this._playButton.getBounds().width * 0.5;
            this._playButton.regY = this._playButton.getBounds().height * 0.5;
            this._playButton.x = config.Screen.WIDTH * 0.5;
            this._playButton.y = (config.Screen.HEIGHT * 0.65) + 100;
            this._stage.addChild(this._playButton);
            this._playButton.on("click", function (event) {
                currentScene = config.Scene.LEVEL1;
                changeScene();
            });
            this._menuButton = new createjs.Bitmap(assets.getResult("menu"));
            this._menuButton.scaleX = 0.25;
            this._menuButton.scaleY = 0.25;
            this._menuButton.regX = this._menuButton.getBounds().width * 0.5;
            this._menuButton.regY = this._menuButton.getBounds().height * 0.5;
            this._menuButton.x = config.Screen.WIDTH * 0.5;
            this._menuButton.y = (config.Screen.HEIGHT * 0.75) + 100;
            this._stage.addChild(this._menuButton);
            this._menuButton.on("click", function (event) {
                currentScene = config.Scene.MENU;
                changeScene();
            });
            // Add buttons to an array for hover events
            this._buttons = [];
            this._buttons[0] = this._playButton;
            this._buttons[1] = this._menuButton;
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
            }
        };
        /**
         * The update method updates the animation loop and other objects
         *
         * @method update
         * @return void
         */
        Tutorial.prototype.update = function () {
            this._stage.update();
        };
        /**
         * The resize method is a procedure that sets variables and objects on screen resize
         *
         * @method resize
         * @return void
         */
        Tutorial.prototype.resize = function () {
            this._setupCanvas();
        };
        return Tutorial;
    }(scenes.Scene));
    scenes.Tutorial = Tutorial;
})(scenes || (scenes = {}));

//# sourceMappingURL=tutorial.js.map
