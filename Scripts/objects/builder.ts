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
         * Add the cube type 0 - standart, 1 - golden
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
                basicCubeMaterial = new LambertMaterial({color:0xFFffFF});
                cubeName="standard";
            }
            //golden
            if(type==1) {
                basicCubeMaterial = new LambertMaterial({color:0xFACEee});
                cubeName="golden"
            }  
            var cubePhysMaterial = Physijs.createMaterial(basicCubeMaterial, 0.1, 0.1);

            var myCube = new Physijs.BoxMesh(cubeGeometry, cubePhysMaterial, 1);
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
        
        
    }
}