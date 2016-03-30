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
        public createCube(size:number, posX: number, posY:number, posZ:number,type:number, attachTo: THREE.Object3D): void {
            var cubeGeometry  = new BoxGeometry(size, size, size);
            var cubeName: string = "";
            var basicCubeMaterial:LambertMaterial;
            //standart
            if(type==0){
                basicCubeMaterial = new LambertMaterial({color:0xFFffFF});
                cubeName="standart";
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
        
        
    }
}