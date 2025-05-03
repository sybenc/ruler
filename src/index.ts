import { Observer } from "./observe";
import { _Ruler } from "./ruler/ruler";

export default class Ruler {
  x: _Ruler;
  y: _Ruler;

  constructor(observer: Observer<HTMLElement | SVGElement>) {
    this.x = new _Ruler("x", observer);
    this.y = new _Ruler("y", observer);
    this.y.mount();
    this.x.mount();
    this.x.applyTransform({ scale: 1, translateX: 0, translateY: 0 });
    this.y.applyTransform({ scale: 1, translateX: 0, translateY: 0 });
  }
}
