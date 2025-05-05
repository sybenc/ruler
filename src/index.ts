import { _Ruler } from "./ruler/ruler";
import * as Freemove from "@sybenc/freemove-types";

export class Ruler {
  x: _Ruler;
  y: _Ruler;

  constructor(observer: Freemove.Observer) {
    this.x = new _Ruler("x", observer);
    this.y = new _Ruler("y", observer);
    this.y.mount();
    this.x.mount();
    this.x.applyTransform({ scale: 1, translateX: 0, translateY: 0 });
    this.y.applyTransform({ scale: 1, translateX: 0, translateY: 0 });
  }
}

export const ruler: Freemove.PluginOptions = {
  name: "ruler",
  install(this: Freemove.Store) {
    this.onMountEnd(function (this: Freemove.Store) {
      const observer = this.observer;
      this.ruler = new Ruler(observer);
    });

    this.onTransform(function (this: Freemove.Store) {
      this.ruler.x.applyTransform(this.transform);
      this.ruler.y.applyTransform(this.transform);
      this.ruler.x.meshUnmount();
      this.ruler.y.meshUnmount();
    });
  },
  uninstall(this: Freemove.Store) {
    this.ruler.x.unmount();
    this.ruler.y.unmount();
    this.ruler.x.meshUnmount();
    this.ruler.y.meshUnmount();
  },
};
