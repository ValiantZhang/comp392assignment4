/*
Author:             Josh Bender, Jacky Zhang, Ilmir Taychinov
Last Modified:      19/04/2016
Description:        Screen Class
Revision History:   Live build - Part 4 (final)
*/

module config{
    export class Screen {
        static WIDTH:number = window.innerWidth;
        static HEIGHT:number = window.innerHeight;
        static RATIO:number = window.innerWidth / window.innerHeight;
    }
    
    // Scene Constants
    export class Scene {
        public static MENU: number = 0;
        public static LEVEL1: number = 1;
        public static LEVEL2: number = 2;
        public static LEVEL3: number = 3;
        public static OVER: number = 5;
        public static TUT: number = 6;
    }
    
}