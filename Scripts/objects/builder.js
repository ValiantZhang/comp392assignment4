/**
 * The Builder module is a namespace to reference simplified creation methods
 *
 * @module builder
 */
var builder;
(function (builder) {
    /**
     * The creator
     *
     * @class Play
     * @param havePointerLock {boolean}
     */
    var Creator = (function () {
        // PUBLIC INSTANCE VARIABLES ++++++++++++
        // CONSTRUCTOR ++++++++++++++++++++++++++    
        function Creator() {
        }
        // PUBLIC METHODS
        /**
        * Add the cube type 0 - standart, 1 - golden
        *
        * @method createCube
        * @return void
        */
        Creator.prototype.createCube = function (size, posX, posY, posZ, type, attachTo) {
            var cubeGeometry = new BoxGeometry(size, size, size);
            var cubeName = "";
            var basicCubeMaterial;
            //standart
            if (type == 0) {
                basicCubeMaterial = new LambertMaterial({ color: 0xFFffFF });
                cubeName = "standart";
            }
            //golden
            if (type == 1) {
                basicCubeMaterial = new LambertMaterial({ color: 0xFACEee });
                cubeName = "golden";
            }
            var cubePhysMaterial = Physijs.createMaterial(basicCubeMaterial, 0.1, 0.1);
            var myCube = new Physijs.BoxMesh(cubeGeometry, cubePhysMaterial, 1);
            myCube.position.set(posX, posY, posZ);
            myCube.name = cubeName;
            attachTo.add(myCube);
        };
        return Creator;
    }());
    builder.Creator = Creator;
})(builder || (builder = {}));

//# sourceMappingURL=builder.js.map
