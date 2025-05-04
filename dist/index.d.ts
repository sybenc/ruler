import { Observer } from "./observe";
import { _Ruler } from "./ruler/ruler";
import { FreemovePlugin } from "@sybenc/freemove-types";
export declare class Ruler {
    x: _Ruler;
    y: _Ruler;
    constructor(observer: Observer);
}
export declare const ruler: FreemovePlugin;
