var config;
(function (config) {
    var Screen = (function () {
        function Screen() {
        }
        Screen.WIDTH = window.innerWidth;
        Screen.HEIGHT = window.innerHeight;
        Screen.RATIO = window.innerWidth / window.innerHeight;
        return Screen;
    }());
    config.Screen = Screen;
    // Scene Constants
    var Scene = (function () {
        function Scene() {
        }
        Scene.MENU = 0;
        Scene.TUTORIAL = 1;
        Scene.LEVEL1 = 2;
        Scene.LEVEL2 = 3;
        Scene.LEVEL3 = 4;
        Scene.PLAY = 5;
        Scene.OVER = 6;
        return Scene;
    }());
    config.Scene = Scene;
})(config || (config = {}));

//# sourceMappingURL=screen.js.map
