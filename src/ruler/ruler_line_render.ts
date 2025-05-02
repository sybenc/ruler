import d3 from "../d3";
import { _Ruler } from "./ruler";

export function ruler_line_render(this: _Ruler) {
  const drag = d3
    .drag()
    .on("start", (event) => {
      this.__draggingLine = d3.select(event.sourceEvent.target);
      document.body.style.cursor = "col-resize";
    })
    .on("drag", (event) => {
      if (!this.__draggingLine) return;
      const [mouseX, mouseY] = d3.pointer(event, this.svg);
      const intPosition = Math.round(this.scaleLinear.invert(this.__isX ? mouseX : mouseY));
      this.lines.delete(this.__draggingLine.datum());
      console.log(this.__draggingLine.node());
      this.__draggingLine
        .style(this.__isX ? "left" : "top", `${this.scaleLinear(intPosition)! - 0.4}px`)
        .datum(intPosition);
      this.lines.add(this.__draggingLine.datum());
      this.tooltip
        .show()
        .fixed(mouseX + 8, mouseY + 8)
        .html(
          `${(
            ((this.scaleLinear(this.__draggingLine.datum() as number)! - this.scaleLinear(0)!) * 100) /
            this.observer.boardDOMRect.width
          ).toFixed(2)}%`
        );
    })
    .on("end", () => {
      this.__draggingLine = null;
      document.body.style.cursor = "default";
      this.tooltip.hidden();
    });

  const root = d3.select(this.observer.root);
  root.selectAll(`.ruler-line-${this.type}`).remove();
  root
    .selectAll(`div[class=ruler-line-${this.type}]`)
    .data(Array.from(this.lines))
    .join("div")
    .classed(`ruler-line-${this.type}`, true)
    .style("position", "absolute")
    .style("width", this.__isX ? "7px" : "auto")
    .style("height", this.__isX ? "auto" : "7px")
    .style("display", "flex")
    .style("justify-content", "center")
    .style("flex-direction", this.__isX ? "row" : "column")
    .style("left", (d) => (this.__isX ? `${this.scaleLinear(d)! - 0.4}px` : "20px"))
    .style("top", (d) => (this.__isX ? "20px" : `${this.scaleLinear(d)! - 0.4}px`))
    .style("transform", this.__isX ? "translate(-50%, 0)" : "translate(0, -50%)")
    .style("cursor", this.__isX ? "col-resize" : "row-resize")
    .call(drag as any)
    .append("div")
    .style("width", this.__isX ? "1px" : `${this.observer.rootDOMRect.width}px`)
    .style("height", this.__isX ? `${this.observer.rootDOMRect.height}px` : "1px")
    .style("background", "red")
    .style("pointer-events", "none");
}
