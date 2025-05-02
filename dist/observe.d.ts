export interface Observer<T extends Element> {
    root: Element;
    board: Element;
    rootDOMRect: DOMRect;
    boardDOMRect: DOMRect;
    get boardCoord(): {
        x: number;
        y: number;
    };
}
