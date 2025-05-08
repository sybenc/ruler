import {Rect} from "@sybenc/freemove-types";
import {_Ruler} from "./ruler";

export function ruler_slider_render(this: _Ruler, selected: Rect) {
  const x = this.scaleLinear.invert(selected.x)
  const y = this.scaleLinear.invert(selected.y)
  const w = this.scaleLinear.invert(selected.x + selected.w) - x
  const h = this.scaleLinear.invert(selected.y + selected.h) - y
  this.slider
      .attr('x', this.__isX ? x : 0)
      .attr('y', this.__isX ? 0 : y)
      .attr('width', this.__isX ? w : 20)
      .attr('height', this.__isX ? 20 : h)
      .attr('fill', 'rgba(59,50,37,0.6)')
  this.sliderShow()
}