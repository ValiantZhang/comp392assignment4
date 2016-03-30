/**
 * @ module scenes
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    /**
     * This class instantiates the game over scene object
     *
     * @class Over
     * @extemds scenes/Scene
     */
    var Over = (function (_super) {
        __extends(Over, _super);
        /**
         * Empty Constructor
         *
         * @constructor
         */
        function Over() {
            _super.call(this);
        }
        return Over;
    }(scenes.Scene));
    scenes.Over = Over;
})(scenes || (scenes = {}));

//# sourceMappingURL=over.js.map
