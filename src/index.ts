import { Observer } from "./observe";
import { _Ruler } from "./ruler/ruler";

export class Ruler {
  x: _Ruler;
  y: _Ruler;

  constructor(observer: Observer<HTMLElement | SVGElement>) {
    this.x = new _Ruler("x", observer);
    this.y = new _Ruler("y", observer);
    this.x.mount();
    this.y.mount();
    this.x.applyTransform(1, 0, 0);
    this.y.applyTransform(1, 0, 0);
  }
}