# simple-drag-and-drop (Compatiable with React, Angular, VueJS)

## Install

```bash
npm install simple-drag-and-drop --save
```

## Usage

#### Use in Plain Javascript

```html
<body>
  <div class="dd-container" id="dd1">
    <div>
      <h2>Title 1</h2>
    </div>
    <div>
      <h1>Title 2</h1>
    </div>
    <div>
      Title 5
    </div>
  </div>
  <div class="dd-container" id="dd2">
    <div>
      Title 3
    </div>
    <div>
      Title 4
    </div>
  </div>
  <div class="dd-container" id="dd3">
    <div>
      Title 7
    </div>
    <div>
      Title 8
    </div>
  </div>
</body>
<script>
  window.onload = () => {
    let dd = new DragAndDrop();
    let ddc1 = new DragAndDropContaner("dd1", dd);
    let ddc2 = new DragAndDropContaner("dd2", dd);
    let ddc3 = new DragAndDropContaner("dd3", dd);
  };
</script>
<style>
  .dd-container {
    float: left;
    padding: 10px;
    border: 2px green dotted;
    margin: 10px 10px;
  }
  .dd-container > div {
    padding: 5px;
    border: 2px blue dotted;
    margin: 5px 5px;
  }
</style>
```

<br>

#### Use in React

```html
Documentation Coming Soon
```

<br>

#### Use in Angular

```html
Documentation Coming Soon
```

<br>

#### Use in VueJS

```html
Documentation Coming Soon
```

<br>

## Options

### Function

| Name     | Type | Description                                                                                  |
| -------- | :--- | -------------------------------------------------------------------------------------------- |
| reInit() | n/a  | Re Initilizes Drag and Drop Container Items(Usage: Call it after setting the state in React) |
| remove() | n/a  | Removes all Event listeners. (Usage: Call it when component is unmounted)                    |
