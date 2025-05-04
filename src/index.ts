import { Observer } from "./observe";
import { _Ruler } from "./ruler/ruler";
import { Freemove, FreemovePlugin } from "@sybenc/freemove-types";

export class Ruler {
  x: _Ruler;
  y: _Ruler;

  constructor(observer: Observer) {
    this.x = new _Ruler("x", observer);
    this.y = new _Ruler("y", observer);
    this.y.mount();
    this.x.mount();
    this.x.applyTransform({ scale: 1, translateX: 0, translateY: 0 });
    this.y.applyTransform({ scale: 1, translateX: 0, translateY: 0 });
  }
}

export const ruler: FreemovePlugin = {
  name: "ruler",
  install(this: Freemove) {
    this.onAfterMount(function (this: Freemove) {
      const observer = this.observer;
      this.ruler = new Ruler(observer);
      this.ruler.x.meshUnmount();
      this.ruler.y.meshUnmount();
    });

    this.onAfterTransform(function (this: Freemove) {
      this.ruler.x.applyTransform(this.transform);
      this.ruler.y.applyTransform(this.transform);
    });
  },
  uninstall(this: Freemove) {
    this.ruler.x.unmount();
    this.ruler.y.unmount();
  },
};
