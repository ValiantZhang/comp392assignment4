/*
Author:             Josh Bender, Jacky Zhang, Ilmir Taychinov
Last Modified:      19/04/2016
Description:        Mouse Controls Class
Revision History:   Live build - Part 4 (final)
*/
var objects;
(function (objects) {
    // MouseControls Class +++++++++++++++
    var MouseControls = (function () {
        // CONSTRUCTOR +++++++++++++++++++++++
        function MouseControls() {
            this.enabled = false;
            this.sensitivity = 0.1;
            this.yaw = 0;
            this.pitch = 0;
            document.addEventListener('mousemove', this.OnMouseMove.bind(this), false);
        }
        // PUBLIC METHODS +++++++++++++++++++++
        MouseControls.prototype.OnMouseMove = function (event) {
            this.yaw = -event.movementX * this.sensitivity * 0.02;
            this.pitch = -event.movementY * this.sensitivity * 0.05;
        };
        return MouseControls;
    }());
    objects.MouseControls = MouseControls;
})(objects || (objects = {}));

//# sourceMappingURL=mousecontrols.js.map
