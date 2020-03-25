export interface IDraggable {
    dragStart(event: DragEvent): void;
    dragEnd(event: DragEvent): void;
}

export interface IDroppable {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}
