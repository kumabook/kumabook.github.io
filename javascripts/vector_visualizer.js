window.onload = function() {
  var WIDTH      = 30;
  var HEIGHT     = 20;
  var NUM_COL    = 32;
  var NUM_ROW    = 5;
  var stage      = new PIXI.Stage(0x66FF99);
  var renderer   = PIXI.autoDetectRenderer(WIDTH * NUM_COL, HEIGHT * NUM_ROW);
  var container  = document.getElementById('visualizer-container');
  var info       = document.getElementById('info');
  var pushButton = document.getElementById('push-button');
  var popButton  = document.getElementById('pop-button');
  var counter = 0;
  var texts   = [];
  container.appendChild(renderer.view);
  pushButton.addEventListener('click', function() {
    _vector_push(vector, counter++);
    updateInfo();
    drawVector();
  });
  popButton.addEventListener('click', function() {
    if (!_vector_is_empty(vector)) {
      _vector_pop(vector);
    }
    updateInfo();
    drawVector();
  });

  var vector     = _vector_construct();

  var graphics = new PIXI.Graphics();
  stage.addChild(graphics);

  requestAnimFrame(animate);
  updateInfo();
  drawVector();
  function animate() {
    requestAnimFrame(animate);
    // render the stage
    renderer.render(stage);
  }

  function updateInfo() {
    info.innerHTML = 'size: ' + _vector_size(vector) +
                ' capacity: ' + _vector_capacity(vector);
  };

  function drawVector() {
    var size     = _vector_size(vector);
    var capacity = _vector_capacity(vector);
    var N        = NUM_COL;

    graphics.clear();
    clearTexts();

    graphics.beginFill(0x99CC99);
    graphics.lineStyle(1, 0xffffff0, 1);
    for (var i = 0; i < capacity; i++) {
      graphics.drawRect((i % N) * WIDTH, ~~(i / N) * HEIGHT, WIDTH, HEIGHT);
    }
    graphics.endFill();

    graphics.beginFill(0xFF3399);
    graphics.lineStyle(1, 0xffffff0, 1);
    for (i = 0; i < size; i++) {
      graphics.drawRect((i % N) * WIDTH, ~~(i / N) * HEIGHT, WIDTH, HEIGHT);
      drawText(_vector_get(vector, i), i % N, ~~(i / N));
    }
    graphics.endFill();
  };
  function drawText(val, x, y) {
    var text = new PIXI.Text(val,
                             {
                               font: '14px Arial',
                               fill: "#000000",
                               align: "center",
                               strokeThickness: 0.1});
    text.position.x = (x + 0.5) * WIDTH;
    text.position.y = (y + 0.25) * HEIGHT;
    text.anchor.x = 0.5;
    texts.push(text);
    stage.addChild(text);
  };
  function clearTexts() {
    texts.forEach(function(t) {
      stage.removeChild(t);
    });
  }
};
