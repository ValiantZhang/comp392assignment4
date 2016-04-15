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
            var cubePhysMaterial = Physijs.createMaterial(basicCubeMaterial, 0.8, 0.1);
            var myCube = new Physijs.BoxMesh(cubeGeometry, cubePhysMaterial, 50);
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
        Creator.prototype.createProjectile = function (posX, posY, posZ, attachTo, launchPower, launchAngle, launchYaw) {
            if (launchPower === void 0) { launchPower = 1; }
            if (launchAngle === void 0) { launchAngle = 1; }
            if (launchYaw === void 0) { launchYaw = 1; }
            var projectileGeometry = new SphereGeometry(1, 15, 15);
            var projectileName = "Shot";
            var basicProjectileMaterial = new LambertMaterial({ color: 0x464646 });
            var projectilePhysMaterial = Physijs.createMaterial(basicProjectileMaterial, 0.9, 0.2);
            var rogueSphere = new Physijs.SphereMesh(projectileGeometry, projectilePhysMaterial, 1000);
            rogueSphere.position.set(posX, posY, posZ);
            createjs.Sound.play("projectileFlight");
            rogueSphere.name = projectileName;
            rogueSphere.setCcdMotionThreshold(0.1);
            rogueSphere.setCcdSweptSphereRadius(0.2);
            attachTo.add(rogueSphere);
            rogueSphere.addEventListener('collision', function (object) {
                console.log("I hit" + object.name);
                if (object.name === "standard") {
                    createjs.Sound.play("standardHit");
                    scoreValue += 100;
                    scoreLabel.text = "SCORE: " + scoreValue;
                    object.material.color = 0x464646;
                    object.name = "standard_hitted";
                }
                if (object.name === "golden") {
                    createjs.Sound.play("goldenHit");
                    scoreValue += 2500;
                    scoreLabel.text = "SCORE: " + scoreValue;
                    object.material.color = 0xFF0000;
                    object.name = "golden_hitted";
                }
            });
            rogueSphere.applyCentralImpulse(new Vector3(-launchYaw * launchPower * 1.1, launchAngle * launchPower, -launchPower));
        };
        ;
        Creator.prototype.createProjectileInQueue = function (posX, posY, posZ, attachTo, name) {
            var projectileGeometry = new SphereGeometry(1, 15, 15);
            var basicProjectileMaterial = new LambertMaterial({ color: 0x464646 });
            var projectilePhysMaterial = Physijs.createMaterial(basicProjectileMaterial, 0.9, 0.01);
            var rogueSphere = new Physijs.SphereMesh(projectileGeometry, projectilePhysMaterial, 1000);
            rogueSphere.position.set(posX, posY, posZ);
            rogueSphere.name = name;
            rogueSphere.setCcdMotionThreshold(0.1);
            rogueSphere.setCcdSweptSphereRadius(0.2);
            rogueSphere.addEventListener('collision', function (object) {
                console.log("I hit" + object.name);
                if (object.name === "standard") {
                    createjs.Sound.play("standardHit");
                    scoreValue += 100;
                    scoreLabel.text = "SCORE: " + scoreValue;
                    object.material.color = 0x464646;
                    object.name = "standard_hitted";
                }
                if (object.name === "golden") {
                    createjs.Sound.play("goldenHit");
                    scoreValue += 2500;
                    scoreLabel.text = "SCORE: " + scoreValue;
                    object.material.color = 0xFF0000;
                    object.name = "golden_hitted";
                }
            });
            attachTo.add(rogueSphere);
            return rogueSphere;
        };
        ;
        Creator.prototype.shootProjectile = function (posX, posY, posZ, launchPower, launchAngle, launchYaw, rogueSphere) {
            rogueSphere.position.set(posX, posY, posZ);
            rogueSphere.__dirtyPosition = true;
            rogueSphere.applyCentralImpulse(new Vector3(-launchYaw * launchPower, launchAngle * launchPower, -launchPower));
        };
        ;
        //LEVEL 2 ASSETS
        /**
        *
        * Add a platform for level 2 objects to stand on
        *
        * @method createPlatform
        * @return void
        */
        Creator.prototype.createPlatform = function (posX, posY, posZ, radiusTop, radiusBottom, height, edges, attachTo) {
            if (radiusTop === void 0) { radiusTop = 5; }
            if (radiusBottom === void 0) { radiusBottom = 5; }
            if (height === void 0) { height = 5; }
            if (edges === void 0) { edges = 3; }
            var platformGeometry = new CylinderGeometry(radiusTop, radiusBottom, height, edges);
            var platformName = "Platform";
            var basicCylinderMaterial;
            basicCylinderMaterial = new LambertMaterial({ color: 0x0000FF });
            var platformPhysMaterial = Physijs.createMaterial(basicCylinderMaterial, 0.8, 0.1);
            var platform = new Physijs.CylinderMesh(platformGeometry, platformPhysMaterial, 0);
            platform.position.set(posX, posY, posZ);
            platform.name = platformName;
            attachTo.add(platform);
            platform.setAngularFactor(new Vector3(0, 0, 0));
            platform.setAngularVelocity(new Vector3(0, 0.2, 0));
            platform.setLinearVelocity(new Vector3(0, 0, 0));
        };
        return Creator;
    }());
    builder.Creator = Creator;
})(builder || (builder = {}));

//# sourceMappingURL=builder.js.map
