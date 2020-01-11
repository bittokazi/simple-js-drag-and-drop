class DragAndDropContaner {
  constructor(id, dragAndDrop) {
    this.dragAndDrop = dragAndDrop;
    this.id = id;
    let _self = this;
    this.dragEndCallback = () => {
      this.dragEnd(id, _self, dragAndDrop);
    };
    this.attachMouseDown(id);
    this.attachMouseUp(id);
    this.attachMouseDrag(id);
  }
  reInit() {
    this.attachMouseDown(this.id);
    this.attachMouseUp(this.id);
    this.attachMouseDrag(this.id);
  }
  mouseDown() {}
  dragEnd(id, _self, dragAndDrop) {
    dragAndDrop.dragging = false;
    if (dragAndDrop.draggleableItem == null) return;
    dragAndDrop.draggleableItem.remove();
    if (dragAndDrop.dragStart || dragAndDrop.nextContainer == null) {
      dragAndDrop.itemToReplace.style.display = "block";
      return;
    }

    let empty = false;
    if (
      document.getElementById(dragAndDrop.nextContainer).children.length < 1
    ) {
      if (dragAndDrop.render)
        document
          .getElementById(dragAndDrop.nextContainer)
          .appendChild(dragAndDrop.itemToReplace);
      empty = true;
    } else {
      if (dragAndDrop.dropUpOrDown == 0) {
        if (dragAndDrop.render)
          document
            .getElementById(dragAndDrop.nextContainer)
            .insertBefore(
              dragAndDrop.itemToReplace,
              document.getElementById(dragAndDrop.nextContainer).children[
                dragAndDrop.nextContainerItemId
              ]
            );
      } else {
        if (dragAndDrop.render)
          document
            .getElementById(dragAndDrop.nextContainer)
            .insertBefore(
              dragAndDrop.itemToReplace,
              document.getElementById(dragAndDrop.nextContainer).children[
                dragAndDrop.nextContainerItemId
              ].nextSibling
            );
      }
    }

    if (dragAndDrop.callback != null && dragAndDrop.containerId != null) {
      let destinationId = null;
      if (dragAndDrop.containerId != dragAndDrop.nextContainer) {
        destinationId = empty ? 0 : dragAndDrop.nextContainerItemId;

        if (dragAndDrop.dropUpOrDown == 0 || empty) {
          destinationId = destinationId + 0;
        } else {
          destinationId = destinationId + 1;
        }
      } else {
        destinationId =
          dragAndDrop.nextContainerItemId +
          (dragAndDrop.itemId <= dragAndDrop.nextContainerItemId ? -1 : 0) +
          (dragAndDrop.dropUpOrDown == 0 ? 0 : 1);
      }

      dragAndDrop.callback({
        source: {
          container: dragAndDrop.containerId,
          id: dragAndDrop.itemId
        },
        destination: {
          container: dragAndDrop.nextContainer,
          id: destinationId == -1 ? 0 : destinationId
        }
      });
    }

    dragAndDrop.containerId = null;
    dragAndDrop.itemId = null;
    setTimeout(() => {
      dragAndDrop.itemToReplace.style.display = "block";
      if (dragAndDrop.render) {
        let old_element = document.getElementById(id);
        let new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);
        _self.attachMouseDown(id);
        _self.attachMouseDrag(id);
      }
    }, 10);
  }
  drag() {}
  attachMouseDown(id) {
    let _self = this;
    let dragAndDrop = this.dragAndDrop;
    document.body.addEventListener("mousedown", () => {});
    document.getElementById(id).addEventListener("mousedown", function() {});
    for (let i = 0; i < document.getElementById(id).children.length; i++) {
      document
        .getElementById(id)
        .children[i].addEventListener("mousedown", function(event) {
          this.setAttribute("draggable", true);
          let elem = document.createElement("div");
          elem.style.height = this.offsetHeight + "px";
          elem.style.width = this.offsetWidth + "px";
          elem.style.background = "gray";

          dragAndDrop.ddBlankHeight = this.offsetHeight;
          const expandBlank = height => {
            if (parseInt(elem.style.height.replace("px", "")) < height) {
              setTimeout(() => {
                elem.style.height =
                  parseInt(elem.style.height.replace("px", "")) + 1 + "px";
                expandBlank(height);
              }, 1);
            }
          };
          //expandBlank(this.offsetHeight);

          dragAndDrop.draggleableItem = elem;
          dragAndDrop.itemToReplace = this;

          dragAndDrop.dragStart = true;

          dragAndDrop.dragging = true;
          dragAndDrop.containerId = id;

          dragAndDrop.itemId = i;
        });
    }
  }
  attachMouseUp(id) {
    let dragAndDrop = this.dragAndDrop;

    document.body.addEventListener("dragend", this.dragEndCallback);

    for (let i = 0; i < document.getElementById(id).children.length; i++) {
      document
        .getElementById(id)
        .children[i].addEventListener("mouseup", function(event) {});
    }
  }
  attachMouseDrag(id) {
    let dragAndDrop = this.dragAndDrop;
    let dragoverId = null;
    let dragContainer = null;
    let _self = this;
    document.body.addEventListener("drag", () => {});
    document.getElementById(id).addEventListener("dragover", () => {
      if (document.getElementById(id).children.length < 1) {
        dragAndDrop.nextContainer = id;
        try {
          document.getElementById(id).appendChild(dragAndDrop.draggleableItem);
        } catch (e) {}
      }
    });
    for (let i = 0; i < document.getElementById(id).children.length; i++) {
      (function(index) {
        document
          .getElementById(id)
          .children[i].addEventListener("dragover", function(event) {
            if (dragAndDrop.dragging && !dragAndDrop.dragStart) {
              dragoverId = index;
              dragContainer = id;
              if (
                _self.getCoords(this).top + this.offsetHeight / 2 >
                event.pageY
              ) {
                dragAndDrop.nextContainer = id;
                dragAndDrop.nextContainerItemId = index;
                dragAndDrop.dropUpOrDown = 0;

                let elem = dragAndDrop.draggleableItem;
                //elem.style.height = "0px";
                const expandBlank = height => {
                  if (parseInt(elem.style.height.replace("px", "")) < height) {
                    setTimeout(() => {
                      elem.style.height =
                        parseInt(elem.style.height.replace("px", "")) +
                        1 +
                        "px";
                      expandBlank(height);
                    }, 1);
                  }
                };
                //expandBlank(dragAndDrop.ddBlankHeight);

                try {
                  document
                    .getElementById(id)
                    .insertBefore(dragAndDrop.draggleableItem, this);
                } catch (e) {
                  //console.log(e);
                }
              } else {
                dragAndDrop.nextContainer = id;
                dragAndDrop.nextContainerItemId = index;
                dragAndDrop.dropUpOrDown = 1;

                let elem = dragAndDrop.draggleableItem;
                //elem.style.height = "0px";
                const expandBlank = height => {
                  if (parseInt(elem.style.height.replace("px", "")) < height) {
                    setTimeout(() => {
                      elem.style.height =
                        parseInt(elem.style.height.replace("px", "")) +
                        1 +
                        "px";
                      expandBlank(height);
                    }, 1);
                  }
                };
                //expandBlank(dragAndDrop.ddBlankHeight);

                try {
                  document
                    .getElementById(id)
                    .insertBefore(
                      dragAndDrop.draggleableItem,
                      this.nextSibling
                    );
                } catch (e) {}
              }
            }
            if (dragAndDrop.dragging && dragAndDrop.dragStart) {
              setTimeout(() => {
                document.getElementById(dragAndDrop.containerId).children[
                  dragAndDrop.itemId
                ].style.display = "none";
                dragAndDrop.dragStart = false;
              }, 10);
            }
          });
      })(i);
    }
  }
  getCoords(elem) {
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
  }

  remove() {
    document.body.removeEventListener("mousedown", this.mouseDown());
    document.body.removeEventListener("drag", this.drag());
    document.body.removeEventListener("dragend", this.dragEndCallback);
  }
}

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
