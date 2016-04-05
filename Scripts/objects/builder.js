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
        * Add the cube type 0 - standard, 1 - golden
        *
        * @method createCube
        * @return void
        */
        Creator.prototype.createCube = function (posX, posY, posZ, type, attachTo, size) {
            if (size === void 0) { size = 1; }
            var cubeGeometry = new BoxGeometry(size, size, size);
            var cubeName = "";
            var basicCubeMaterial;
            //standard
            if (type == 0) {
                basicCubeMaterial = new LambertMaterial({ color: 0xFFFFFF });
                cubeName = "standard";
            }
            //golden
            if (type == 1) {
                basicCubeMaterial = new LambertMaterial({ color: 0xFFD81C });
                cubeName = "golden";
            }
            var cubePhysMaterial = Physijs.createMaterial(basicCubeMaterial, 0.1, 0.1);
            var myCube = new Physijs.BoxMesh(cubeGeometry, cubePhysMaterial, 1);
            myCube.position.set(posX, posY, posZ);
            myCube.name = cubeName;
            attachTo.add(myCube);
        };
        /**
         * Add a cubetangle object W/H/D in cubes
         *
         * @method createCubetangle
         * @return void
         */
        Creator.prototype.createCubetangle = function (widthX, heightY, depthZ, origin, attachTo) {
            // Set up offsets to correctly place cubes
            var startX = (widthX / 2) * -1 + origin.x;
            var startY = 0.5 + origin.y;
            var startZ = (depthZ / 2) * -1 + origin.z;
            // Loop through and create cubetangle with specifed # of cubes
            for (var w = 0; w < widthX; w++) {
                for (var h = 0; h < heightY; h++) {
                    for (var d = 0; d < depthZ; d++) {
                        this.createCube((startX + w), (startY + h), (startZ + d), 0, attachTo);
                    }
                }
            }
        };
        /**
         * Add a cubeamid object H in cubes
         *
         * @method createCubeamid
         * @return void
         */
        Creator.prototype.createCubeamid = function (heightY, origin, attachTo) {
            // Normalize the level of the first origin
            origin.add(new Vector3(0, -1, 0));
            // Loop through and create cubeamid with specifed # of cubes
            for (var h = 0; h < heightY; h++) {
                this.createCubetangle((heightY - h), 1, (heightY - h), origin.add(new Vector3(0, 1, 0)), attachTo);
            }
        };
        /**
         * Create a sphere to use as a projectile
         *
         * @method createProjectile
         * @return void
         */
        Creator.prototype.createProjectile = function (posX, posY, posZ, radius, width, height, attachTo, launchPower, launchAngle, launchYaw) {
            if (radius === void 0) { radius = 1; }
            if (width === void 0) { width = 8; }
            if (height === void 0) { height = 8; }
            if (launchPower === void 0) { launchPower = 1; }
            if (launchAngle === void 0) { launchAngle = 1; }
            if (launchYaw === void 0) { launchYaw = 1; }
            var projectileGeometry = new SphereGeometry(radius, width, height);
            var projectileName = "Shot";
            var basicProjectileMaterial = new LambertMaterial({ color: 0x000000 });
            var projectilePhysMaterial = Physijs.createMaterial(basicProjectileMaterial, 0.1, 0.1);
            var rogueSphere = new Physijs.BoxMesh(projectileGeometry, projectilePhysMaterial, 1);
            rogueSphere.position.set(posX, posY, posZ);
            rogueSphere.name = projectileName;
            attachTo.add(rogueSphere);
            rogueSphere.applyCentralForce(new Vector3(launchYaw, launchAngle, -launchPower));
            rogueSphere.addEventListener('collision', function (object) {
                if (object.name === "standard") {
                    scoreValue += 100;
                }
                if (object.name === "golden") {
                    scoreValue += 2500;
                }
            });
        };
        return Creator;
    }());
    builder.Creator = Creator;
})(builder || (builder = {}));

//# sourceMappingURL=builder.js.map
