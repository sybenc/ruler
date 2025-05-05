import { _Ruler } from "./ruler/ruler";
import * as Freemove from "@sybenc/freemove-types";
export declare class Ruler {
    x: _Ruler;
    y: _Ruler;
    constructor(observer: Freemove.Observer);
}
export declare const ruler: Freemove.PluginOptions;
