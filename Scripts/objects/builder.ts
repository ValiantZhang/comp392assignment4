/**
 * The Builder module is a namespace to reference simplified creation methods
 * 
 * @module builder
 */
module builder {
    /**
     * The creator
     * 
     * @class Play
     * @param havePointerLock {boolean}
     */
    export class Creator{
         // PUBLIC INSTANCE VARIABLES ++++++++++++
     
        // CONSTRUCTOR ++++++++++++++++++++++++++    
        constructor() {
         
        }

        // PUBLIC METHODS
         /**
         * Add the cube type 0 - standard, 1 - golden
         * 
         * @method createCube
         * @return void
         */
        public createCube(posX: number, posY:number, posZ:number, 
                          type:number, attachTo: THREE.Object3D, size:number = 1): void {
            var cubeGeometry  = new BoxGeometry(size, size, size);
            var cubeName: string = "";
            var basicCubeMaterial:LambertMaterial;
            //standard
            if(type==0){
                basicCubeMaterial = new LambertMaterial({color:0xFFFFFF});
                cubeName="standard";
            }
            //golden
            if(type==1) {
                basicCubeMaterial = new LambertMaterial({color:0xFFD81C});
                cubeName="golden";
            }  
            var cubePhysMaterial = Physijs.createMaterial(basicCubeMaterial, 0.8, 0.1);

            var myCube = new Physijs.BoxMesh(cubeGeometry, cubePhysMaterial, 50);
            myCube.position.set(posX, posY, posZ);
            myCube.name = cubeName;
            attachTo.add(myCube);
        }
        
        /**
         * Add a cubetangle object W/H/D in cubes
         * 
         * @method createCubetangle
         * @return void
         */
        public createCubetangle(widthX:number, heightY:number, depthZ:number, origin:Vector3, attachTo: THREE.Object3D){
            
            // Set up offsets to correctly place cubes
            var startX = (widthX / 2) * -1 + origin.x;
            var startY = 0.5 + origin.y;
            var startZ = (depthZ / 2) * -1 + origin.z;
             
            // Loop through and create cubetangle with specifed # of cubes
            for (var w = 0; w < widthX; w++){
                for (var h = 0; h < heightY; h++){
                    for (var d = 0; d < depthZ; d++){
                       this.createCube( (startX + w), (startY + h), (startZ + d), 0, attachTo);
                    }
                }
            }
        }
        
        /**
         * Add a cubeamid object H in cubes
         * 
         * @method createCubeamid
         * @return void
         */
        public createCubeamid(heightY:number, origin:Vector3, attachTo: THREE.Object3D){
            // Normalize the level of the first origin
            origin.add(new Vector3(0, -1, 0));
            // Loop through and create cubeamid with specifed # of cubes
            for (var h = 0; h < heightY; h++){
                this.createCubetangle((heightY - h), 1, (heightY - h), origin.add(new Vector3(0, 1, 0)), attachTo);
            }
        }
        
        /**
         * Create a sphere to use as a projectile
         *
         * @method createProjectile
         * @return void
         */
        public createProjectile(posX: number, posY:number, posZ:number, 
                          attachTo: THREE.Object3D, launchPower: number = 1, 
                          launchAngle: number =1, launchYaw: number =1): void {
            var projectileGeometry  = new SphereGeometry(1, 15, 15);
            var projectileName: string = "Shot";
            var basicProjectileMaterial:LambertMaterial = new LambertMaterial({color:0x464646});
            
            var projectilePhysMaterial = Physijs.createMaterial(basicProjectileMaterial, 0.9, 0.2);

            var rogueSphere = new Physijs.SphereMesh(projectileGeometry, projectilePhysMaterial, 1000);
            rogueSphere.position.set(posX, posY, posZ);
            
            createjs.Sound.play("projectileFlight");
            rogueSphere.name = projectileName;
            rogueSphere.setCcdMotionThreshold(0.1);
            rogueSphere.setCcdSweptSphereRadius(0.2);
            attachTo.add(rogueSphere);
            rogueSphere.addEventListener('collision', (object) => {
                console.log("I hit"+object.name);
                if (object.name === "standard") {
                    scoreValue += 100;
                    scoreLabel.text = "SCORE: " + scoreValue;
                    object.material.color= 0x464646;
                    object.name="standard_hitted";
                }
                if (object.name === "golden") {
                    scoreValue += 2500;
                    scoreLabel.text = "SCORE: " + scoreValue;
                    object.material.color = 0xFF0000;
                    object.name="golden_hitted";
                }
            });
            rogueSphere.applyCentralImpulse(new Vector3( -launchYaw * launchPower*1.1, launchAngle * launchPower, -launchPower));
        };
        
        
        public createProjectileInQueue(posX: number, posY:number, posZ:number, 
                          attachTo: THREE.Object3D, name: string): Physijs.Mesh {
            var projectileGeometry  = new SphereGeometry(1, 15, 15);
            var basicProjectileMaterial:LambertMaterial = new LambertMaterial({color:0x464646});
            var projectilePhysMaterial = Physijs.createMaterial(basicProjectileMaterial, 0.9, 0.01);
            var rogueSphere = new Physijs.SphereMesh(projectileGeometry, projectilePhysMaterial, 1000);
            rogueSphere.position.set(posX, posY, posZ);
            rogueSphere.name = name; 
            rogueSphere.setCcdMotionThreshold(0.1);
            rogueSphere.setCcdSweptSphereRadius(0.2);
            
            rogueSphere.addEventListener('collision', (object) => {
                console.log("I hit"+object.name);
                if (object.name === "standard") {
                    createjs.Sound.play("standardHit");
                    scoreValue += 100;
                    scoreLabel.text = "SCORE: " + scoreValue;
                    object.material.color= 0x464646;
                    object.name="standard_hitted";
                }
                if (object.name === "golden") {
                    createjs.Sound.play("goldenHit");
                    scoreValue += 2500;
                    scoreLabel.text = "SCORE: " + scoreValue;
                    object.material.color = 0xFF0000;
                    object.name="golden_hitted";
                }
            });
            attachTo.add(rogueSphere);
            return rogueSphere;
        };
        
        public shootProjectile(posX: number, posY:number, posZ:number,
                                launchPower:number,launchAngle:number, launchYaw:number,
                                rogueSphere: Physijs.Mesh): void {
            
            rogueSphere.position.set(posX, posY, posZ);
            rogueSphere.__dirtyPosition = true;
            rogueSphere.applyCentralImpulse(new Vector3
                ( -launchYaw * launchPower, launchAngle * launchPower, -launchPower)
            );
              
        };
        
        //LEVEL 2 ASSETS
        
         /**
         *  
         * Add a platform for level 2 objects to stand on
         * 
         * @method createPlatform
         * @return void
         */
        public createPlatform(posX: number, posY:number, posZ:number, 
                          radiusTop:number = 5, radiusBottom:number = 5, height:number = 5, edges: number = 3, attachTo: THREE.Object3D): void {
            var platformGeometry  = new CylinderGeometry(radiusTop, radiusBottom, height, edges);
            var platformName: string = "Platform";
            var basicCylinderMaterial:LambertMaterial;
            
            basicCylinderMaterial = new LambertMaterial({color:0x0000FF});

            var platformPhysMaterial = Physijs.createMaterial(basicCylinderMaterial, 0.8, 0.1);

            var platform = new Physijs.CylinderMesh(platformGeometry, platformPhysMaterial, 0);
            platform.position.set(posX, posY, posZ);
            platform.name = platformName;
            attachTo.add(platform);
            
            platform.setAngularFactor(new Vector3(0, 0, 0));
            platform.setAngularVelocity(new Vector3(0, 0.2, 0));
            platform.setLinearVelocity(new Vector3(0, 0, 0));
        }
        
    }
}