class DragAndDrop {
  constructor() {
    this.dragging = false;
    this.containerId = null;
    this.itemId = null;
    this.draggleableItem = null;
    this.nextContainer = null;
    this.nextContainerItemId = null;
    this.itemToReplace = null;
    this.dropUpOrDown = 0;
    this.dragStart = false;
    this.ddBlankHeight = 0;
    this.callback = null;
    this.render = true;
  }
  setOnMovedCallback(callback) {
    this.callback = callback;
  }
  setRender(render) {
    this.render = render;
  }
}

module.exports = DragAndDrop;
