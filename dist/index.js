import { _Ruler } from "./ruler/ruler";
export class Ruler {
    x;
    y;
    constructor(observer) {
        this.x = new _Ruler("x", observer);
        this.y = new _Ruler("y", observer);
        this.y.mount();
        this.x.mount();
        this.x.applyTransform({ scale: 1, translateX: 0, translateY: 0 });
        this.y.applyTransform({ scale: 1, translateX: 0, translateY: 0 });
    }
}
export const ruler = {
    name: "ruler",
    install() {
        this.onAfterMount(function () {
            const observer = this.observer;
            this.ruler = new Ruler(observer);
            this.ruler.x.meshUnmount();
            this.ruler.y.meshUnmount();
        });
        this.onAfterTransform(function () {
            this.ruler.x.applyTransform(this.transform);
            this.ruler.y.applyTransform(this.transform);
        });
    },
    uninstall() {
        this.ruler.x.unmount();
        this.ruler.y.unmount();
    },
};
