export interface UseDragResult {
  mousedownHanlder: (event: MouseEvent) => void
  dragFlag: Ref<boolean>
}
