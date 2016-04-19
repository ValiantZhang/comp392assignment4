/*
Author:             Josh Bender, Jacky Zhang, Ilmir Taychinov
Last Modified:      19/04/2016
Description:        Screen Class
Revision History:   Live build - Part 4 (final)
*/
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
        Scene.LEVEL1 = 1;
        Scene.LEVEL2 = 2;
        Scene.LEVEL3 = 3;
        Scene.OVER = 5;
        Scene.TUT = 6;
        return Scene;
    }());
    config.Scene = Scene;
})(config || (config = {}));

//# sourceMappingURL=screen.js.map
