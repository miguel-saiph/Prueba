webpackJsonp([0],{

/***/ 1418:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainScene = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entities = __webpack_require__(250);

var _Frutas = __webpack_require__(1419);

var Frutas = _interopRequireWildcard(_Frutas);

var _Cajon = __webpack_require__(1420);

var _helper = __webpack_require__(1421);

var Help = _interopRequireWildcard(_helper);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainScene = exports.MainScene = function (_Phaser$Scene) {
  _inherits(MainScene, _Phaser$Scene);

  function MainScene() {
    _classCallCheck(this, MainScene);

    var _this = _possibleConstructorReturn(this, (MainScene.__proto__ || Object.getPrototypeOf(MainScene)).call(this, { key: "MainScene" }));

    _this.cuadro_info;
    _this.incognita;
    _this.orden;
    _this.fruta_static;
    _this.nombre_fruta;
    _this.datos_fruta;
    _this.frutas; // Para almacenar las frutas creadas
    _this.cajones;
    _this.max_frutas = 3;
    _this.max_cajones = 3;
    _this.rows = 2; // Filas de frutas
    _this.columns = 2; // Columnas de frutas
    _this.disponibles = Object.keys(Frutas); //Array con los nombres de las frutas disponibles
    _this.escala_cajones = 0.25;
    _this.escala_frutas = 0.15;
    _this.btnRevisar;
    _this.etapa;
    return _this;
  }

  _createClass(MainScene, [{
    key: 'preload',
    value: function preload() {

      // Elementos UI
      this.load.svg("cuadro_info", "assets/cuadro_info.svg", { scale: 1 });
      this.load.svg("incognita", "assets/incognita.svg", { scale: 1 });
      this.load.image("cajon", "assets/cajon.png");
      this.load.image("mayor", "assets/mayor_que.png");

      // Botones
      this.load.svg("btnRevisarActivo", "assets/botones/SVG/revisar_activo.svg", { scale: 1 });
      this.load.svg("btnRevisarInactivo", "assets/botones/SVG/revisar_inactivo.svg", { scale: 1 });
      this.load.svg("btnContinuar", "assets/botones/SVG/continuar_rojo.svg", { scale: 1 });
      this.load.svg("btnEnviarRojo", "assets/botones/SVG/enviar_rojo.svg", { scale: 1 });
      this.load.svg("btnEnviarVerde", "assets/botones/SVG/enviar_verde.svg", { scale: 1 });

      // Frutas
      this.load.svg("frutilla", "assets/frutas/SVG/Frutilla.svg", { scale: 1 });
      this.load.svg("damasco", "assets/frutas/SVG/Damasco.svg", { scale: 1 });
      this.load.svg("durazno", "assets/frutas/SVG/Durazno.svg", { scale: 1 });
      this.load.svg("frambuesa", "assets/frutas/SVG/Frambuesa.svg", { scale: 1 });
      this.load.svg("manzana", "assets/frutas/SVG/Manzana.svg", { scale: 1 });
      this.load.svg("naranja", "assets/frutas/SVG/naranja.svg", { scale: 1 });
      this.load.svg("pera", "assets/frutas/SVG/Pera.svg", { scale: 1 });
      this.load.svg("plátano", "assets/frutas/SVG/Platano.svg", { scale: 1 });
      this.load.svg("sandía", "assets/frutas/SVG/Sandia.svg", { scale: 1 });
      this.load.svg("uva", "assets/frutas/SVG/Uva.svg", { scale: 1 });
    }
  }, {
    key: 'create',
    value: function create() {

      console.log("Escena principal");

      var _sys$game$canvas = this.sys.game.canvas,
          width = _sys$game$canvas.width,
          height = _sys$game$canvas.height;

      // Decide el orden que se va a pedir

      this.orden = Help.getRandomInt(0, 2) === 1 ? 'asc' : 'desc';

      // Render cuadro de info
      this.cuadro_info = this.add.image(width * 0.75, height * 0.35, 'cuadro_info');
      this.incognita = this.add.image(this.cuadro_info.x, this.cuadro_info.y, 'incognita');

      this.frutas = this.add.group();
      this.cajones = this.add.group();

      // Creación de frutas
      var separacion = 150;
      var posX = width * 0.2;
      var posY = height * 0.25;

      for (var col = this.columns - 1; col >= 0; col--) {

        posX = width * 0.2;

        // Agrega separación sólo si no es la primera fruta
        if (col != this.columns - 1) posY = posY + separacion / 1.3;

        for (var row = this.rows - 1; row >= 0; row--) {

          // Si el número de frutas creadas alcanza el máximo, aborta misión
          if (this.frutas.getChildren().length >= this.max_frutas) {
            break;
          }

          if (row != this.rows - 1) posX = posX + separacion;

          // Regula la posición del último elemento si es impar
          if (this.frutas.getChildren().length === this.max_frutas - 1 && row % 2 !== 0) posX += separacion / 2;

          // Elige una fruta random entre las frutas disponibles
          var random = Help.getRandomInt(1, this.disponibles.length);
          var elegida = this.disponibles[random];
          // Borra esa fruta del array para que no se repita
          this.disponibles.splice(random, 1);

          // Instancia la fruta elegida
          var fruta = void 0;
          console.log(elegida);
          switch (elegida) {
            case 'Damasco':
              fruta = new Frutas.Damasco(this, posX, posY, this.escala_frutas);
              break;
            case 'Durazno':
              fruta = new Frutas.Durazno(this, posX, posY, this.escala_frutas);
              break;
            case 'Frambuesa':
              fruta = new Frutas.Frambuesa(this, posX, posY, this.escala_frutas);
              break;
            case 'Frutilla':
              fruta = new Frutas.Frutilla(this, posX, posY, this.escala_frutas);
              break;
            case 'Manzana':
              fruta = new Frutas.Manzana(this, posX, posY, this.escala_frutas);
              break;
            case 'Naranja':
              fruta = new Frutas.Naranja(this, posX, posY, this.escala_frutas);
              break;
            case 'Pera':
              fruta = new Frutas.Pera(this, posX, posY, this.escala_frutas);
              break;
            case 'Platano':
              fruta = new Frutas.Platano(this, posX, posY, this.escala_frutas);
              break;
            case 'Sandia':
              fruta = new Frutas.Sandia(this, posX, posY, this.escala_frutas);
              break;
            case 'Uva':
              fruta = new Frutas.Uva(this, posX, posY, this.escala_frutas);
              break;
          }
          this.frutas.add(fruta);
          this.input.setDraggable(fruta, true);
          //var uva = new Frutas.Uva(this, posX, posY, this.escala_frutas);	

        }
      }

      // Creación de los cajones
      var defaultX = width * 0.5;
      posX = defaultX;
      posY = height * 0.8;
      var contadorPar = 1;
      var contadorImpar = 1;
      for (var i = this.max_cajones - 1; i >= 0; i--) {

        // Coloca el primer cajón en el centro y los siguientes en los costados
        // tomando como referencia el primero
        var cajon = new _Cajon.Cajon(this, posX, posY, "cajon", this.escala_cajones);

        this.cajones.add(cajon);

        // Alterna entre izquierda/derecha
        if (i % 2 === 0) {

          var simbolo = this.add.image(cajon.x + 120, posY, 'mayor');
          if (this.orden === 'desc') simbolo.flipX = true;

          posX = defaultX + width * 0.3 * contadorPar;
          contadorPar++;
        } else {
          posX = defaultX - width * 0.3 * contadorImpar;
          contadorImpar++;
        }
      }

      this.btnRevisar = this.add.image(width * 0.87, height * 0.94, 'btnRevisarInactivo');
      this.btnRevisar.setInteractive();

      this.btnRevisar.on("pointerdown", function () {
        if (this.btnRevisar.texture.key === 'btnRevisarActivo') this.checkResultados();
      }, this);
    }
  }, {
    key: 'mostrarInfo',
    value: function mostrarInfo(precio, unidad, tipo) {

      this.incognita.visible = false;

      // Actualiza el nombre de la fruta si ya existe o lo crea si no
      if (this.nombre_fruta) {
        this.nombre_fruta.setText(tipo.charAt(0).toUpperCase() + tipo.slice(1));
      } else {
        this.nombre_fruta = this.add.text(this.cuadro_info.x, this.cuadro_info.y - 80, tipo.charAt(0).toUpperCase() + tipo.slice(1), { font: 'Open Sans', fill: '#333333' }).setOrigin(0.5);
        this.nombre_fruta.setFontSize(24);
      }

      var datos = '$' + Help.formatNumber(precio) + ' el ' + unidad;

      // Actualiza los datos de la fruta si existen o lo crea si no
      if (this.datos_fruta) {
        this.datos_fruta.setText(datos);
      } else {
        this.datos_fruta = this.add.text(this.cuadro_info.x, this.cuadro_info.y - 40, datos, { font: 'Open Sans', fill: '#333333' }).setOrigin(0.5);
        this.datos_fruta.setFontSize(24);
      }

      // Destruye la imagen de la fruta anterior
      if (this.fruta_static) this.fruta_static.destroy();

      // Crea imagen de la fruta seleccionada
      this.fruta_static = this.add.image(this.cuadro_info.x, this.cuadro_info.y + 50, tipo).setScale(this.escala_frutas);
    }
  }, {
    key: 'checkResultados',
    value: function checkResultados() {

      this.etapa = 'Resultados';

      // Guarda los cajones en un array para poder ordenarlos de izquierda a derecha
      var cajones = [];
      this.cajones.getChildren().forEach(function (element) {
        cajones.push(element);
      });
      cajones.sort(function (a, b) {
        return a.x - b.x;
      });

      // Guarda los valores para luego preguntar si están en orden
      var valores = [];
      cajones.forEach(function (element) {
        valores.push(element.getData("fruta").getData("precio"));
      });

      var resultado = Help.isSorted(valores, this.orden);
      //console.log("Sorted: " + resultado);

      // Crea la barra de feedback
      var graphics = this.add.graphics();
      var colorFondo = resultado ? '0xbff199' : '0xffd0cf';
      var color = resultado ? '#4d8b4b' : '#a0130f';
      graphics.fillStyle(colorFondo, 1);
      graphics.fillRect(0, this.sys.game.canvas.height - 68, this.sys.game.canvas.width, 68);
      graphics.setDepth(-1);

      var msg1 = resultado ? '¡MUY BIEN!' : '¡Oops!';
      var msg2 = resultado ? 'Así se hace' : 'Algo anda mal.';

      this.mensaje1 = this.add.text(this.sys.game.canvas.width * 0.1, this.sys.game.canvas.height * 0.9, msg1, {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontStyle: 'bold',
        color: color,
        align: 'center'
      });
      this.mensaje2 = this.add.text(this.sys.game.canvas.width * 0.1, this.sys.game.canvas.height * 0.93, msg2, {
        fontFamily: 'Open Sans',
        fontSize: 16,
        color: color,
        align: 'center'
      });

      resultado ? this.btnRevisar.setTexture('btnEnviarVerde') : this.btnRevisar.setTexture('btnContinuar');

      // Desactiva el drag de las frutas
      var frutas = [];
      this.frutas.getChildren().forEach(function (element) {
        frutas.push(element);
      });
      this.input.setDraggable(frutas, false);

      // Eventos click del botón revisar
      this.btnRevisar.on("pointerdown", function () {

        if (this.btnRevisar.texture.key === 'btnContinuar') {

          // Cambia el feedback
          this.mensaje1.setText('¡Pon atención!');
          this.mensaje2.setText('Esta es la respuesta correcta.');
          this.btnRevisar.setTexture('btnEnviarRojo');

          // Ordena las frutas en el orden correcto
          if (this.orden === 'asc') frutas.sort(function (a, b) {
            return a.getData("precio") - b.getData("precio");
          });else frutas.sort(function (a, b) {
            return b.getData("precio") - a.getData("precio");
          });

          // Coloca las frutas en el cajón correcto
          for (var i = 0; i <= cajones.length - 1; i++) {
            frutas[i].setPosition(cajones[i].x, cajones[i].y);
          }
        }
        // Reinicia la escena
        else if (this.btnRevisar.texture.key === 'btnEnviarVerde' || this.btnRevisar.texture.key === 'btnEnviarRojo') {
            location.reload();
            //this.scene.restart();
          }
      }, this);
    }
  }, {
    key: 'checkOverlap',
    value: function checkOverlap(fruta) {

      var intersecta = false;
      var totalLlenos = 0;

      // Recorre los cajones para ver si la fruta lo intersecta
      this.cajones.getChildren().forEach(function (element) {

        if (Phaser.Geom.Rectangle.Overlaps(fruta.getBounds(), element.getBounds())) {

          intersecta = true;

          // Si el cajón ya tenía una fruta, la devuelve a su posición original
          var frutaAnterior = element.getData("fruta");
          if (frutaAnterior) frutaAnterior.resetPosition();

          // Guarda la fruta en el cajón
          element.setData("fruta", fruta);
          fruta.x = element.x;
          fruta.y = element.y;
        }

        if (element.getData("fruta")) totalLlenos++;
      });

      if (!intersecta) {
        fruta.resetPosition();
        this.btnRevisar.setTexture("btnRevisarInactivo");
        totalLlenos = 0;
      }

      // Si todos los cajones están llenos, activa el botón de revisar
      if (totalLlenos >= this.max_cajones) {
        this.btnRevisar.setTexture("btnRevisarActivo");
      }
    }
  }, {
    key: 'vaciarCajon',
    value: function vaciarCajon(fruta) {
      if (this.etapa !== 'Resultados') {
        this.cajones.getChildren().forEach(function (element) {
          if (element.getData("fruta") === fruta) {
            element.setData("fruta", null);
          }
        });
      }
    }
  }]);

  return MainScene;
}(Phaser.Scene);

/***/ }),

/***/ 1419:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Uva = exports.Sandia = exports.Platano = exports.Pera = exports.Naranja = exports.Manzana = exports.Frutilla = exports.Frambuesa = exports.Durazno = exports.Damasco = exports.Fruta = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entities = __webpack_require__(250);

__webpack_require__(155);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fruta = exports.Fruta = function (_Entity) {
  _inherits(Fruta, _Entity);

  function Fruta(scene, x, y, key, scale) {
    _classCallCheck(this, Fruta);

    var _this = _possibleConstructorReturn(this, (Fruta.__proto__ || Object.getPrototypeOf(Fruta)).call(this, scene, x, y, key, "Fruta"));

    if (_this.constructor === Fruta) {
      throw new TypeError('Clase abstracta "Fruta" no se puede instanciar directamente');
    }

    _this.setScale(scale);

    _this.defaultX = x;
    _this.defaultY = y;

    // Variables de clase
    _this.setData("type", null);
    _this.setData("precio", null);
    _this.setData("unidad", null);

    // Para que reaccione a los eventos
    _this.setInteractive();

    //scene.input.setDraggable(this, true);

    // Evento click
    _this.on('pointerdown', function (pointer) {
      this.scene.mostrarInfo(this.getData("precio"), this.getData("unidad"), this.getData("type"));
    });

    // Cambio de estilo cursor
    _this.on('pointerover', function (pointer) {
      this.scene.game.canvas.style.cursor = "hand";
    });
    _this.on('pointerout', function (pointer) {
      this.scene.game.canvas.style.cursor = "default";
    });

    // Eventos drag
    _this.on('drag', function (pointer, dragX, dragY) {
      this.x = dragX;
      this.y = dragY;
    });

    _this.on('dragend', function (pointer, gameObject, target) {

      this.scene.checkOverlap(this);
    });

    _this.on('drop', function (pointer, gameObject, target) {

      //var intersecta = Phaser.Geom.Intersects.RectangleToRectangle(this.getBounds(), gameObject.getBounds());
      //this.scene.checkOverlap(this);

    });

    //displayWidth
    return _this;
  }

  _createClass(Fruta, [{
    key: 'resetPosition',
    value: function resetPosition() {
      // Vuelve a la posición original
      this.setPosition(this.defaultX, this.defaultY);

      // Borra la referencia a este objeto en el cajón en el que estaba
      this.scene.vaciarCajon(this);
    }
  }, {
    key: 'disableDrag',
    value: function disableDrag() {
      this.scene.input.setDraggable(this, false);
    }
  }]);

  return Fruta;
}(_Entities.Entity);

var Damasco = exports.Damasco = function (_Fruta) {
  _inherits(Damasco, _Fruta);

  function Damasco(scene, x, y, scale) {
    _classCallCheck(this, Damasco);

    var _this2 = _possibleConstructorReturn(this, (Damasco.__proto__ || Object.getPrototypeOf(Damasco)).call(this, scene, x, y, "damasco", scale));

    _this2.setData("type", "damasco");
    _this2.setData("precio", 800);
    _this2.setData("unidad", "kilo");
    return _this2;
  }

  return Damasco;
}(Fruta);

var Durazno = exports.Durazno = function (_Fruta2) {
  _inherits(Durazno, _Fruta2);

  function Durazno(scene, x, y, scale) {
    _classCallCheck(this, Durazno);

    var _this3 = _possibleConstructorReturn(this, (Durazno.__proto__ || Object.getPrototypeOf(Durazno)).call(this, scene, x, y, "durazno", scale));

    _this3.setData("type", "durazno");
    _this3.setData("precio", 650);
    _this3.setData("unidad", "kilo");
    return _this3;
  }

  return Durazno;
}(Fruta);

var Frambuesa = exports.Frambuesa = function (_Fruta3) {
  _inherits(Frambuesa, _Fruta3);

  function Frambuesa(scene, x, y, scale) {
    _classCallCheck(this, Frambuesa);

    var _this4 = _possibleConstructorReturn(this, (Frambuesa.__proto__ || Object.getPrototypeOf(Frambuesa)).call(this, scene, x, y, "frambuesa", scale));

    _this4.setData("type", "frambuesa");
    _this4.setData("precio", 2500);
    _this4.setData("unidad", "kilo");
    return _this4;
  }

  return Frambuesa;
}(Fruta);

var Frutilla = exports.Frutilla = function (_Fruta4) {
  _inherits(Frutilla, _Fruta4);

  function Frutilla(scene, x, y, scale) {
    _classCallCheck(this, Frutilla);

    var _this5 = _possibleConstructorReturn(this, (Frutilla.__proto__ || Object.getPrototypeOf(Frutilla)).call(this, scene, x, y, "frutilla", scale));

    _this5.setData("type", "frutilla");
    _this5.setData("precio", 1500);
    _this5.setData("unidad", "kilo");
    return _this5;
  }

  return Frutilla;
}(Fruta);

var Manzana = exports.Manzana = function (_Fruta5) {
  _inherits(Manzana, _Fruta5);

  function Manzana(scene, x, y, scale) {
    _classCallCheck(this, Manzana);

    var _this6 = _possibleConstructorReturn(this, (Manzana.__proto__ || Object.getPrototypeOf(Manzana)).call(this, scene, x, y, "manzana", scale));

    _this6.setData("type", "manzana");
    _this6.setData("precio", 450);
    _this6.setData("unidad", "kilo");
    return _this6;
  }

  return Manzana;
}(Fruta);

var Naranja = exports.Naranja = function (_Fruta6) {
  _inherits(Naranja, _Fruta6);

  function Naranja(scene, x, y, scale) {
    _classCallCheck(this, Naranja);

    var _this7 = _possibleConstructorReturn(this, (Naranja.__proto__ || Object.getPrototypeOf(Naranja)).call(this, scene, x, y, "naranja", scale));

    _this7.setData("type", "naranja");
    _this7.setData("precio", 530);
    _this7.setData("unidad", "kilo");
    return _this7;
  }

  return Naranja;
}(Fruta);

var Pera = exports.Pera = function (_Fruta7) {
  _inherits(Pera, _Fruta7);

  function Pera(scene, x, y, scale) {
    _classCallCheck(this, Pera);

    var _this8 = _possibleConstructorReturn(this, (Pera.__proto__ || Object.getPrototypeOf(Pera)).call(this, scene, x, y, "pera", scale));

    _this8.setData("type", "pera");
    _this8.setData("precio", 430);
    _this8.setData("unidad", "kilo");
    return _this8;
  }

  return Pera;
}(Fruta);

var Platano = exports.Platano = function (_Fruta8) {
  _inherits(Platano, _Fruta8);

  function Platano(scene, x, y, scale) {
    _classCallCheck(this, Platano);

    var _this9 = _possibleConstructorReturn(this, (Platano.__proto__ || Object.getPrototypeOf(Platano)).call(this, scene, x, y, "plátano", scale));

    _this9.setData("type", "plátano");
    _this9.setData("precio", 650);
    _this9.setData("unidad", "kilo");
    return _this9;
  }

  return Platano;
}(Fruta);

var Sandia = exports.Sandia = function (_Fruta9) {
  _inherits(Sandia, _Fruta9);

  function Sandia(scene, x, y, scale) {
    _classCallCheck(this, Sandia);

    var _this10 = _possibleConstructorReturn(this, (Sandia.__proto__ || Object.getPrototypeOf(Sandia)).call(this, scene, x, y, "sandía", scale));

    _this10.setData("type", "sandía");
    _this10.setData("precio", 1000);
    _this10.setData("unidad", "unidad");
    return _this10;
  }

  return Sandia;
}(Fruta);

var Uva = exports.Uva = function (_Fruta10) {
  _inherits(Uva, _Fruta10);

  function Uva(scene, x, y, scale) {
    _classCallCheck(this, Uva);

    var _this11 = _possibleConstructorReturn(this, (Uva.__proto__ || Object.getPrototypeOf(Uva)).call(this, scene, x, y, "uva", scale));

    _this11.setData("type", "uva");
    _this11.setData("precio", 1800);
    _this11.setData("unidad", "kilo");
    return _this11;
  }

  return Uva;
}(Fruta);

/***/ }),

/***/ 1420:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cajon = undefined;

var _Entities = __webpack_require__(250);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cajon = exports.Cajon = function (_Entity) {
  _inherits(Cajon, _Entity);

  function Cajon(scene, x, y, key, scale) {
    _classCallCheck(this, Cajon);

    var _this = _possibleConstructorReturn(this, (Cajon.__proto__ || Object.getPrototypeOf(Cajon)).call(this, scene, x, y, key));

    _this.setScale(scale);

    _this.setData("fruta", null);

    //this.scene.add.zone((this.bounds)).setRectangleDropZone(this.width*scale, this.height*scale);

    return _this;
  }

  return Cajon;
}(_Entities.Entity);

/***/ }),

/***/ 1421:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSorted = isSorted;
exports.getRandomInt = getRandomInt;
exports.formatNumber = formatNumber;
function isSorted(arr) {
  var order = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'asc';

  for (var i = 0; i < arr.length - 1; i++) {
    if (order === 'asc') {
      if (arr[i + 1] < arr[i]) {
        return false;
      };
    } else {
      if (arr[i + 1] > arr[i]) {
        return false;
      };
    }
  }
  return true;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function formatNumber(num) {
  return new Intl.NumberFormat("es-ES").format(num);
}

/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
		value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entity = exports.Entity = function (_Phaser$GameObjects$S) {
		_inherits(Entity, _Phaser$GameObjects$S);

		function Entity(scene, x, y, key, type) {
				_classCallCheck(this, Entity);

				var _this = _possibleConstructorReturn(this, (Entity.__proto__ || Object.getPrototypeOf(Entity)).call(this, scene, x, y, key));

				_this.scene = scene;
				_this.scene.add.existing(_this);
				//this.scene.physics.world.enableBody(this, 0);
				_this.setData("type", type);
				_this.setData("isDead", false);

				return _this;
		}

		return Entity;
}(Phaser.GameObjects.Sprite);

/***/ }),

/***/ 528:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(155);

var _mainScene = __webpack_require__(1418);

//import { showMessage } from './messager';
//showMessage('Somebody else did this work!');

var gameConfig = {
  width: 800,
  height: 600,
  transparent: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 }
    }
  },
  scene: _mainScene.MainScene
};

new Phaser.Game(gameConfig);

/***/ })

},[528]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NlbmVzL21haW5TY2VuZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50aXRpZXMvRnJ1dGFzLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9DYWpvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9FbnRpdGllcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiRnJ1dGFzIiwiSGVscCIsIk1haW5TY2VuZSIsImtleSIsImN1YWRyb19pbmZvIiwiaW5jb2duaXRhIiwib3JkZW4iLCJmcnV0YV9zdGF0aWMiLCJub21icmVfZnJ1dGEiLCJkYXRvc19mcnV0YSIsImZydXRhcyIsImNham9uZXMiLCJtYXhfZnJ1dGFzIiwibWF4X2Nham9uZXMiLCJyb3dzIiwiY29sdW1ucyIsImRpc3BvbmlibGVzIiwiT2JqZWN0Iiwia2V5cyIsImVzY2FsYV9jYWpvbmVzIiwiZXNjYWxhX2ZydXRhcyIsImJ0blJldmlzYXIiLCJldGFwYSIsImxvYWQiLCJzdmciLCJzY2FsZSIsImltYWdlIiwiY29uc29sZSIsImxvZyIsInN5cyIsImdhbWUiLCJjYW52YXMiLCJ3aWR0aCIsImhlaWdodCIsImdldFJhbmRvbUludCIsImFkZCIsIngiLCJ5IiwiZ3JvdXAiLCJzZXBhcmFjaW9uIiwicG9zWCIsInBvc1kiLCJjb2wiLCJyb3ciLCJnZXRDaGlsZHJlbiIsImxlbmd0aCIsInJhbmRvbSIsImVsZWdpZGEiLCJzcGxpY2UiLCJmcnV0YSIsIkRhbWFzY28iLCJEdXJhem5vIiwiRnJhbWJ1ZXNhIiwiRnJ1dGlsbGEiLCJNYW56YW5hIiwiTmFyYW5qYSIsIlBlcmEiLCJQbGF0YW5vIiwiU2FuZGlhIiwiVXZhIiwiaW5wdXQiLCJzZXREcmFnZ2FibGUiLCJkZWZhdWx0WCIsImNvbnRhZG9yUGFyIiwiY29udGFkb3JJbXBhciIsImkiLCJjYWpvbiIsIkNham9uIiwic2ltYm9sbyIsImZsaXBYIiwic2V0SW50ZXJhY3RpdmUiLCJvbiIsInRleHR1cmUiLCJjaGVja1Jlc3VsdGFkb3MiLCJwcmVjaW8iLCJ1bmlkYWQiLCJ0aXBvIiwidmlzaWJsZSIsInNldFRleHQiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwidGV4dCIsImZvbnQiLCJmaWxsIiwic2V0T3JpZ2luIiwic2V0Rm9udFNpemUiLCJkYXRvcyIsImZvcm1hdE51bWJlciIsImRlc3Ryb3kiLCJzZXRTY2FsZSIsImZvckVhY2giLCJlbGVtZW50IiwicHVzaCIsInNvcnQiLCJhIiwiYiIsInZhbG9yZXMiLCJnZXREYXRhIiwicmVzdWx0YWRvIiwiaXNTb3J0ZWQiLCJncmFwaGljcyIsImNvbG9yRm9uZG8iLCJjb2xvciIsImZpbGxTdHlsZSIsImZpbGxSZWN0Iiwic2V0RGVwdGgiLCJtc2cxIiwibXNnMiIsIm1lbnNhamUxIiwiZm9udEZhbWlseSIsImZvbnRTaXplIiwiZm9udFN0eWxlIiwiYWxpZ24iLCJtZW5zYWplMiIsInNldFRleHR1cmUiLCJzZXRQb3NpdGlvbiIsImxvY2F0aW9uIiwicmVsb2FkIiwiaW50ZXJzZWN0YSIsInRvdGFsTGxlbm9zIiwiUGhhc2VyIiwiR2VvbSIsIlJlY3RhbmdsZSIsIk92ZXJsYXBzIiwiZ2V0Qm91bmRzIiwiZnJ1dGFBbnRlcmlvciIsInJlc2V0UG9zaXRpb24iLCJzZXREYXRhIiwiU2NlbmUiLCJGcnV0YSIsInNjZW5lIiwiY29uc3RydWN0b3IiLCJUeXBlRXJyb3IiLCJkZWZhdWx0WSIsInBvaW50ZXIiLCJtb3N0cmFySW5mbyIsInN0eWxlIiwiY3Vyc29yIiwiZHJhZ1giLCJkcmFnWSIsImdhbWVPYmplY3QiLCJ0YXJnZXQiLCJjaGVja092ZXJsYXAiLCJ2YWNpYXJDYWpvbiIsIkVudGl0eSIsImFyciIsIm9yZGVyIiwibWluIiwibWF4IiwiTWF0aCIsImNlaWwiLCJmbG9vciIsIm51bSIsIkludGwiLCJOdW1iZXJGb3JtYXQiLCJmb3JtYXQiLCJ0eXBlIiwiZXhpc3RpbmciLCJHYW1lT2JqZWN0cyIsIlNwcml0ZSIsImdhbWVDb25maWciLCJ0cmFuc3BhcmVudCIsInBoeXNpY3MiLCJkZWZhdWx0IiwiYXJjYWRlIiwiZ3Jhdml0eSIsIkdhbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBOztBQUNBOztJQUFZQSxNOztBQUNaOztBQUNBOztJQUFZQyxJOzs7Ozs7Ozs7O0lBRUNDLFMsV0FBQUEsUzs7O0FBRVgsdUJBQWM7QUFBQTs7QUFBQSxzSEFDTixFQUFFQyxLQUFLLFdBQVAsRUFETTs7QUFHWixVQUFLQyxXQUFMO0FBQ0EsVUFBS0MsU0FBTDtBQUNBLFVBQUtDLEtBQUw7QUFDQSxVQUFLQyxZQUFMO0FBQ0EsVUFBS0MsWUFBTDtBQUNBLFVBQUtDLFdBQUw7QUFDQSxVQUFLQyxNQUFMLENBVFksQ0FTQztBQUNiLFVBQUtDLE9BQUw7QUFDQSxVQUFLQyxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsVUFBS0MsV0FBTCxHQUFtQixDQUFuQjtBQUNBLFVBQUtDLElBQUwsR0FBWSxDQUFaLENBYlksQ0FhRztBQUNmLFVBQUtDLE9BQUwsR0FBZSxDQUFmLENBZFksQ0FjTTtBQUNsQixVQUFLQyxXQUFMLEdBQW1CQyxPQUFPQyxJQUFQLENBQVlsQixNQUFaLENBQW5CLENBZlksQ0FlNEI7QUFDeEMsVUFBS21CLGNBQUwsR0FBc0IsSUFBdEI7QUFDQSxVQUFLQyxhQUFMLEdBQXFCLElBQXJCO0FBQ0EsVUFBS0MsVUFBTDtBQUNBLFVBQUtDLEtBQUw7QUFuQlk7QUFvQmI7Ozs7OEJBRVM7O0FBRVQ7QUFDQSxXQUFLQyxJQUFMLENBQVVDLEdBQVYsQ0FBYyxhQUFkLEVBQTZCLHdCQUE3QixFQUF1RCxFQUFDQyxPQUFPLENBQVIsRUFBdkQ7QUFDQSxXQUFLRixJQUFMLENBQVVDLEdBQVYsQ0FBYyxXQUFkLEVBQTJCLHNCQUEzQixFQUFtRCxFQUFDQyxPQUFPLENBQVIsRUFBbkQ7QUFDQSxXQUFLRixJQUFMLENBQVVHLEtBQVYsQ0FBZ0IsT0FBaEIs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QkMsV0FBUztBQUNQQyxhQUFTLFFBREY7QUFFUEMsWUFBUTtBQUNOQyxlQUFTLEVBQUVsSSxHQUFHLENBQUwsRUFBUUMsR0FBRyxDQUFYO0FBREg7QUFGRCxHQUpRO0FBVWpCOEYsU0FBT2pJO0FBVlUsQ0FBbkI7O0FBYUEsSUFBSXVILE9BQU84QyxJQUFYLENBQWdCTixVQUFoQixFIiwiZmlsZSI6ImFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnLi4vZW50aXRpZXMvRW50aXRpZXMnO1xyXG5pbXBvcnQgKiBhcyBGcnV0YXMgZnJvbSAnLi4vZW50aXRpZXMvRnJ1dGFzJztcclxuaW1wb3J0IHsgQ2Fqb24gfSBmcm9tICcuLi9lbnRpdGllcy9DYWpvbic7XHJcbmltcG9ydCAqIGFzIEhlbHAgZnJvbSAnLi4vaGVscGVyLmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBNYWluU2NlbmUgZXh0ZW5kcyBQaGFzZXIuU2NlbmUge1xyXG4gIFxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoeyBrZXk6IFwiTWFpblNjZW5lXCIgfSk7XHJcblxyXG4gICAgdGhpcy5jdWFkcm9faW5mbztcclxuICAgIHRoaXMuaW5jb2duaXRhO1xyXG4gICAgdGhpcy5vcmRlbjtcclxuICAgIHRoaXMuZnJ1dGFfc3RhdGljO1xyXG4gICAgdGhpcy5ub21icmVfZnJ1dGE7XHJcbiAgICB0aGlzLmRhdG9zX2ZydXRhO1xyXG4gICAgdGhpcy5mcnV0YXM7IC8vIFBhcmEgYWxtYWNlbmFyIGxhcyBmcnV0YXMgY3JlYWRhc1xyXG4gICAgdGhpcy5jYWpvbmVzO1xyXG4gICAgdGhpcy5tYXhfZnJ1dGFzID0gMztcclxuICAgIHRoaXMubWF4X2Nham9uZXMgPSAzO1xyXG4gICAgdGhpcy5yb3dzID0gMjsgLy8gRmlsYXMgZGUgZnJ1dGFzXHJcbiAgICB0aGlzLmNvbHVtbnMgPSAyOyAvLyBDb2x1bW5hcyBkZSBmcnV0YXNcclxuICAgIHRoaXMuZGlzcG9uaWJsZXMgPSBPYmplY3Qua2V5cyhGcnV0YXMpOyAvL0FycmF5IGNvbiBsb3Mgbm9tYnJlcyBkZSBsYXMgZnJ1dGFzIGRpc3BvbmlibGVzXHJcbiAgICB0aGlzLmVzY2FsYV9jYWpvbmVzID0gMC4yNTtcclxuICAgIHRoaXMuZXNjYWxhX2ZydXRhcyA9IDAuMTU7XHJcbiAgICB0aGlzLmJ0blJldmlzYXI7XHJcbiAgICB0aGlzLmV0YXBhO1xyXG4gIH1cclxuXHJcbiAgcHJlbG9hZCgpIHtcclxuXHJcbiAgXHQvLyBFbGVtZW50b3MgVUlcclxuICBcdHRoaXMubG9hZC5zdmcoXCJjdWFkcm9faW5mb1wiLCBcImFzc2V0cy9jdWFkcm9faW5mby5zdmdcIiwge3NjYWxlOiAxIH0pO1xyXG4gIFx0dGhpcy5sb2FkLnN2ZyhcImluY29nbml0YVwiLCBcImFzc2V0cy9pbmNvZ25pdGEuc3ZnXCIsIHtzY2FsZTogMSB9KTtcclxuICBcdHRoaXMubG9hZC5pbWFnZShcImNham9uXCIsIFwiYXNzZXRzL2Nham9uLnBuZ1wiKTtcclxuICBcdHRoaXMubG9hZC5pbWFnZShcIm1heW9yXCIsIFwiYXNzZXRzL21heW9yX3F1ZS5wbmdcIik7XHJcblxyXG4gIFx0Ly8gQm90b25lc1xyXG4gIFx0dGhpcy5sb2FkLnN2ZyhcImJ0blJldmlzYXJBY3Rpdm9cIiwgXCJhc3NldHMvYm90b25lcy9TVkcvcmV2aXNhcl9hY3Rpdm8uc3ZnXCIsIHtzY2FsZTogMSB9KTtcclxuICBcdHRoaXMubG9hZC5zdmcoXCJidG5SZXZpc2FySW5hY3Rpdm9cIiwgXCJhc3NldHMvYm90b25lcy9TVkcvcmV2aXNhcl9pbmFjdGl2by5zdmdcIiwge3NjYWxlOiAxIH0pO1xyXG4gIFx0dGhpcy5sb2FkLnN2ZyhcImJ0bkNvbnRpbnVhclwiLCBcImFzc2V0cy9ib3RvbmVzL1NWRy9jb250aW51YXJfcm9qby5zdmdcIiwge3NjYWxlOiAxIH0pO1xyXG4gIFx0dGhpcy5sb2FkLnN2ZyhcImJ0bkVudmlhclJvam9cIiwgXCJhc3NldHMvYm90b25lcy9TVkcvZW52aWFyX3Jvam8uc3ZnXCIsIHtzY2FsZTogMSB9KTtcclxuICBcdHRoaXMubG9hZC5zdmcoXCJidG5FbnZpYXJWZXJkZVwiLCBcImFzc2V0cy9ib3RvbmVzL1NWRy9lbnZpYXJfdmVyZGUuc3ZnXCIsIHtzY2FsZTogMSB9KTtcclxuICBcdFxyXG4gIFx0Ly8gRnJ1dGFzXHJcbiAgXHR0aGlzLmxvYWQuc3ZnKFwiZnJ1dGlsbGFcIiwgXCJhc3NldHMvZnJ1dGFzL1NWRy9GcnV0aWxsYS5zdmdcIiwge3NjYWxlOiAxfSk7XHJcbiAgXHR0aGlzLmxvYWQuc3ZnKFwiZGFtYXNjb1wiLCBcImFzc2V0cy9mcnV0YXMvU1ZHL0RhbWFzY28uc3ZnXCIsIHtzY2FsZTogMX0pO1xyXG4gIFx0dGhpcy5sb2FkLnN2ZyhcImR1cmF6bm9cIiwgXCJhc3NldHMvZnJ1dGFzL1NWRy9EdXJhem5vLnN2Z1wiLCB7c2NhbGU6IDF9KTtcclxuICBcdHRoaXMubG9hZC5zdmcoXCJmcmFtYnVlc2FcIiwgXCJhc3NldHMvZnJ1dGFzL1NWRy9GcmFtYnVlc2Euc3ZnXCIsIHtzY2FsZTogMX0pO1xyXG4gIFx0dGhpcy5sb2FkLnN2ZyhcIm1hbnphbmFcIiwgXCJhc3NldHMvZnJ1dGFzL1NWRy9NYW56YW5hLnN2Z1wiLCB7c2NhbGU6IDF9KTtcclxuICBcdHRoaXMubG9hZC5zdmcoXCJuYXJhbmphXCIsIFwiYXNzZXRzL2ZydXRhcy9TVkcvbmFyYW5qYS5zdmdcIiwge3NjYWxlOiAxfSk7XHJcbiAgXHR0aGlzLmxvYWQuc3ZnKFwicGVyYVwiLCBcImFzc2V0cy9mcnV0YXMvU1ZHL1BlcmEuc3ZnXCIsIHtzY2FsZTogMX0pO1xyXG4gIFx0dGhpcy5sb2FkLnN2ZyhcInBsw6F0YW5vXCIsIFwiYXNzZXRzL2ZydXRhcy9TVkcvUGxhdGFuby5zdmdcIiwge3NjYWxlOiAxfSk7XHJcbiAgXHR0aGlzLmxvYWQuc3ZnKFwic2FuZMOtYVwiLCBcImFzc2V0cy9mcnV0YXMvU1ZHL1NhbmRpYS5zdmdcIiwge3NjYWxlOiAxfSk7XHJcbiAgXHR0aGlzLmxvYWQuc3ZnKFwidXZhXCIsIFwiYXNzZXRzL2ZydXRhcy9TVkcvVXZhLnN2Z1wiLCB7c2NhbGU6IDF9KTtcclxuXHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcblxyXG4gIFx0Y29uc29sZS5sb2coXCJFc2NlbmEgcHJpbmNpcGFsXCIpO1xyXG5cclxuICBcdGxldCB7IHdpZHRoLCBoZWlnaHQgfSA9IHRoaXMuc3lzLmdhbWUuY2FudmFzO1xyXG5cclxuICBcdC8vIERlY2lkZSBlbCBvcmRlbiBxdWUgc2UgdmEgYSBwZWRpclxyXG4gIFx0dGhpcy5vcmRlbiA9IEhlbHAuZ2V0UmFuZG9tSW50KDAsIDIpID09PSAxID8gJ2FzYycgOiAnZGVzYyc7XHJcblxyXG4gIFx0Ly8gUmVuZGVyIGN1YWRybyBkZSBpbmZvXHJcbiAgXHR0aGlzLmN1YWRyb19pbmZvID0gdGhpcy5hZGQuaW1hZ2Uod2lkdGgqMC43NSwgaGVpZ2h0KjAuMzUsICdjdWFkcm9faW5mbycpO1xyXG4gIFx0dGhpcy5pbmNvZ25pdGEgPSB0aGlzLmFkZC5pbWFnZSh0aGlzLmN1YWRyb19pbmZvLngsIHRoaXMuY3VhZHJvX2luZm8ueSwgJ2luY29nbml0YScpO1xyXG5cclxuICBcdHRoaXMuZnJ1dGFzID0gdGhpcy5hZGQuZ3JvdXAoKTtcclxuICBcdHRoaXMuY2Fqb25lcyA9IHRoaXMuYWRkLmdyb3VwKCk7XHJcblxyXG4gIFx0Ly8gQ3JlYWNpw7NuIGRlIGZydXRhc1xyXG4gIFx0Y29uc3Qgc2VwYXJhY2lvbiA9IDE1MDtcclxuICBcdGxldCBwb3NYID0gd2lkdGgqMC4yO1xyXG4gIFx0bGV0IHBvc1kgPSBoZWlnaHQqMC4yNTtcclxuXHJcbiAgXHRmb3IgKHZhciBjb2wgPSB0aGlzLmNvbHVtbnMgLSAxOyBjb2wgPj0gMDsgY29sLS0pIHtcclxuXHJcbiAgXHRcdHBvc1ggPSB3aWR0aCowLjI7XHJcbiAgXHRcdFxyXG4gIFx0XHQvLyBBZ3JlZ2Egc2VwYXJhY2nDs24gc8OzbG8gc2kgbm8gZXMgbGEgcHJpbWVyYSBmcnV0YVxyXG4gIFx0XHRpZiggY29sICE9IHRoaXMuY29sdW1ucy0xKVxyXG4gIFx0XHRcdHBvc1kgPSBwb3NZICsgc2VwYXJhY2lvbi8xLjM7XHJcblxyXG4gIFx0XHRmb3IgKHZhciByb3cgPSB0aGlzLnJvd3MgLSAxOyByb3cgPj0gMDsgcm93LS0pIHtcclxuXHJcbiAgXHRcdFx0Ly8gU2kgZWwgbsO6bWVybyBkZSBmcnV0YXMgY3JlYWRhcyBhbGNhbnphIGVsIG3DoXhpbW8sIGFib3J0YSBtaXNpw7NuXHJcbiAgXHRcdFx0aWYgKHRoaXMuZnJ1dGFzLmdldENoaWxkcmVuKCkubGVuZ3RoID49IHRoaXMubWF4X2ZydXRhcykge1xyXG4gIFx0XHRcdFx0YnJlYWs7XHJcbiAgXHRcdFx0fVxyXG5cclxuICBcdFx0XHRpZiAocm93ICE9IHRoaXMucm93cyAtIDEpXHJcbiAgXHRcdFx0XHRwb3NYID0gcG9zWCArIHNlcGFyYWNpb247XHJcblxyXG4gIFx0XHRcdC8vIFJlZ3VsYSBsYSBwb3NpY2nDs24gZGVsIMO6bHRpbW8gZWxlbWVudG8gc2kgZXMgaW1wYXJcclxuICBcdFx0XHRpZiAodGhpcy5mcnV0YXMuZ2V0Q2hpbGRyZW4oKS5sZW5ndGggPT09IHRoaXMubWF4X2ZydXRhcy0xICYmIHJvdyAlIDIgIT09IDApXHJcbiAgXHRcdFx0XHRwb3NYICs9IHNlcGFyYWNpb24gLyAyO1xyXG5cclxuICBcdFx0XHQvLyBFbGlnZSB1bmEgZnJ1dGEgcmFuZG9tIGVudHJlIGxhcyBmcnV0YXMgZGlzcG9uaWJsZXNcclxuICBcdFx0XHRjb25zdCByYW5kb20gPSBIZWxwLmdldFJhbmRvbUludCgxLCB0aGlzLmRpc3BvbmlibGVzLmxlbmd0aCk7XHJcblx0XHRcdFx0Y29uc3QgZWxlZ2lkYSA9IHRoaXMuZGlzcG9uaWJsZXNbcmFuZG9tXTtcclxuXHRcdFx0XHQvLyBCb3JyYSBlc2EgZnJ1dGEgZGVsIGFycmF5IHBhcmEgcXVlIG5vIHNlIHJlcGl0YVxyXG5cdFx0XHRcdHRoaXMuZGlzcG9uaWJsZXMuc3BsaWNlKHJhbmRvbSwgMSk7XHJcblxyXG5cdFx0XHRcdC8vIEluc3RhbmNpYSBsYSBmcnV0YSBlbGVnaWRhXHJcbiAgXHRcdFx0bGV0IGZydXRhO1xyXG4gIFx0XHRcdGNvbnNvbGUubG9nKGVsZWdpZGEpO1xyXG4gIFx0XHRcdHN3aXRjaChlbGVnaWRhKSB7XHJcbiAgXHRcdFx0XHRjYXNlICdEYW1hc2NvJzpcclxuICBcdFx0XHRcdFx0ZnJ1dGEgPSBuZXcgRnJ1dGFzLkRhbWFzY28odGhpcywgcG9zWCwgcG9zWSwgdGhpcy5lc2NhbGFfZnJ1dGFzKTtcdFxyXG4gIFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdGNhc2UgJ0R1cmF6bm8nOlxyXG4gIFx0XHRcdFx0XHRmcnV0YSA9IG5ldyBGcnV0YXMuRHVyYXpubyh0aGlzLCBwb3NYLCBwb3NZLCB0aGlzLmVzY2FsYV9mcnV0YXMpO1x0XHJcbiAgXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0Y2FzZSAnRnJhbWJ1ZXNhJzpcclxuXHRcdFx0XHRcdFx0ZnJ1dGEgPSBuZXcgRnJ1dGFzLkZyYW1idWVzYSh0aGlzLCBwb3NYLCBwb3NZLCB0aGlzLmVzY2FsYV9mcnV0YXMpO1x0XHJcbiAgXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0Y2FzZSAnRnJ1dGlsbGEnOlxyXG5cdFx0XHRcdFx0XHRmcnV0YSA9IG5ldyBGcnV0YXMuRnJ1dGlsbGEodGhpcywgcG9zWCwgcG9zWSwgdGhpcy5lc2NhbGFfZnJ1dGFzKTtcdFxyXG4gIFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdGNhc2UgJ01hbnphbmEnOlxyXG5cdFx0XHRcdFx0XHRmcnV0YSA9IG5ldyBGcnV0YXMuTWFuemFuYSh0aGlzLCBwb3NYLCBwb3NZLCB0aGlzLmVzY2FsYV9mcnV0YXMpO1x0XHJcbiAgXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0Y2FzZSAnTmFyYW5qYSc6XHJcblx0XHRcdFx0XHRcdGZydXRhID0gbmV3IEZydXRhcy5OYXJhbmphKHRoaXMsIHBvc1gsIHBvc1ksIHRoaXMuZXNjYWxhX2ZydXRhcyk7XHRcclxuICBcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRjYXNlICdQZXJhJzpcclxuXHRcdFx0XHRcdFx0ZnJ1dGEgPSBuZXcgRnJ1dGFzLlBlcmEodGhpcywgcG9zWCwgcG9zWSwgdGhpcy5lc2NhbGFfZnJ1dGFzKTtcdFxyXG4gIFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdGNhc2UgJ1BsYXRhbm8nOlxyXG5cdFx0XHRcdFx0XHRmcnV0YSA9IG5ldyBGcnV0YXMuUGxhdGFubyh0aGlzLCBwb3NYLCBwb3NZLCB0aGlzLmVzY2FsYV9mcnV0YXMpO1x0XHJcbiAgXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0Y2FzZSAnU2FuZGlhJzpcclxuXHRcdFx0XHRcdFx0ZnJ1dGEgPSBuZXcgRnJ1dGFzLlNhbmRpYSh0aGlzLCBwb3NYLCBwb3NZLCB0aGlzLmVzY2FsYV9mcnV0YXMpO1x0XHJcbiAgXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0Y2FzZSAnVXZhJzpcclxuXHRcdFx0XHRcdFx0ZnJ1dGEgPSBuZXcgRnJ1dGFzLlV2YSh0aGlzLCBwb3NYLCBwb3NZLCB0aGlzLmVzY2FsYV9mcnV0YXMpO1x0XHJcbiAgXHRcdFx0XHRcdGJyZWFrO1xyXG4gIFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLmZydXRhcy5hZGQoZnJ1dGEpO1xyXG5cdFx0XHRcdHRoaXMuaW5wdXQuc2V0RHJhZ2dhYmxlKGZydXRhLCB0cnVlKTtcclxuXHRcdFx0XHQvL3ZhciB1dmEgPSBuZXcgRnJ1dGFzLlV2YSh0aGlzLCBwb3NYLCBwb3NZLCB0aGlzLmVzY2FsYV9mcnV0YXMpO1x0XHJcblx0XHRcdFx0XHJcbiAgXHRcdFx0XHRcclxuICBcdFx0fVxyXG4gIFx0XHQgXHJcblx0XHR9XHJcblxyXG4gIFx0Ly8gQ3JlYWNpw7NuIGRlIGxvcyBjYWpvbmVzXHJcbiAgXHR2YXIgZGVmYXVsdFggPSB3aWR0aCowLjU7XHJcbiAgXHRwb3NYID0gZGVmYXVsdFg7XHJcbiAgXHRwb3NZID0gaGVpZ2h0KjAuODtcclxuICBcdHZhciBjb250YWRvclBhciA9IDE7XHJcbiAgXHR2YXIgY29udGFkb3JJbXBhciA9IDE7XHJcbiAgXHRmb3IgKHZhciBpID0gdGhpcy5tYXhfY2Fqb25lcyAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgXHRcdFxyXG4gIFx0XHQvLyBDb2xvY2EgZWwgcHJpbWVyIGNhasOzbiBlbiBlbCBjZW50cm8geSBsb3Mgc2lndWllbnRlcyBlbiBsb3MgY29zdGFkb3NcclxuICBcdFx0Ly8gdG9tYW5kbyBjb21vIHJlZmVyZW5jaWEgZWwgcHJpbWVyb1xyXG4gIFx0XHR2YXIgY2Fqb24gPSBuZXcgQ2Fqb24odGhpcywgcG9zWCwgcG9zWSwgXCJjYWpvblwiLCB0aGlzLmVzY2FsYV9jYWpvbmVzKTtcclxuICBcdFx0XHJcbiAgXHRcdHRoaXMuY2Fqb25lcy5hZGQoY2Fqb24pO1xyXG5cclxuICBcdFx0Ly8gQWx0ZXJuYSBlbnRyZSBpenF1aWVyZGEvZGVyZWNoYVxyXG4gIFx0XHRpZiAoaSAlIDIgPT09IDApIHtcclxuICBcdFx0XHRcclxuICBcdFx0XHR2YXIgc2ltYm9sbyA9IHRoaXMuYWRkLmltYWdlKGNham9uLngrMTIwLCBwb3NZLCAnbWF5b3InKTtcclxuICBcdFx0XHRpZiAodGhpcy5vcmRlbiA9PT0gJ2Rlc2MnKVxyXG4gIFx0XHRcdFx0c2ltYm9sby5mbGlwWCA9IHRydWU7XHJcbiAgXHRcdFx0XHJcbiAgXHRcdFx0cG9zWCA9IChkZWZhdWx0WCArIHdpZHRoKjAuMypjb250YWRvclBhcik7XHJcbiAgXHRcdFx0Y29udGFkb3JQYXIrKztcclxuICBcdFx0fVxyXG4gIFx0XHRcclxuICBcdFx0ZWxzZSB7XHJcbiAgXHRcdFx0cG9zWCA9IChkZWZhdWx0WCAtIHdpZHRoKjAuMypjb250YWRvckltcGFyKTtcclxuICBcdFx0XHRjb250YWRvckltcGFyKys7XHJcbiAgXHRcdH1cclxuICBcdH1cclxuXHJcbiAgXHR0aGlzLmJ0blJldmlzYXIgPSB0aGlzLmFkZC5pbWFnZSh3aWR0aCowLjg3LCBoZWlnaHQqMC45NCwgJ2J0blJldmlzYXJJbmFjdGl2bycpO1xyXG4gIFx0dGhpcy5idG5SZXZpc2FyLnNldEludGVyYWN0aXZlKCk7XHJcblxyXG4gIFx0dGhpcy5idG5SZXZpc2FyLm9uKFwicG9pbnRlcmRvd25cIiwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmKHRoaXMuYnRuUmV2aXNhci50ZXh0dXJlLmtleSA9PT0gJ2J0blJldmlzYXJBY3Rpdm8nKVxyXG5cdFx0XHRcdHRoaXMuY2hlY2tSZXN1bHRhZG9zKCk7XHJcblx0XHR9LCB0aGlzKTtcclxuXHRcdFxyXG4gIH1cclxuXHJcbiAgbW9zdHJhckluZm8ocHJlY2lvLCB1bmlkYWQsIHRpcG8pIHtcclxuXHJcbiAgXHR0aGlzLmluY29nbml0YS52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gIFx0Ly8gQWN0dWFsaXphIGVsIG5vbWJyZSBkZSBsYSBmcnV0YSBzaSB5YSBleGlzdGUgbyBsbyBjcmVhIHNpIG5vXHJcbiAgXHRpZiAodGhpcy5ub21icmVfZnJ1dGEpIHtcclxuICBcdFx0dGhpcy5ub21icmVfZnJ1dGEuc2V0VGV4dCh0aXBvLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdGlwby5zbGljZSgxKSk7XHJcbiAgXHR9XHJcbiAgXHRlbHNlIHtcclxuICBcdFx0dGhpcy5ub21icmVfZnJ1dGEgPSB0aGlzLmFkZC50ZXh0KFxyXG4gIFx0XHRcdHRoaXMuY3VhZHJvX2luZm8ueCwgdGhpcy5jdWFkcm9faW5mby55LTgwLCBcclxuICBcdFx0XHR0aXBvLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdGlwby5zbGljZSgxKSxcclxuICBcdFx0XHR7IGZvbnQ6ICdPcGVuIFNhbnMnLCBmaWxsOiAnIzMzMzMzMycgfSkuc2V0T3JpZ2luKDAuNSk7XHJcbiAgXHRcdHRoaXMubm9tYnJlX2ZydXRhLnNldEZvbnRTaXplKDI0KTtcclxuICBcdH1cclxuXHJcbiAgXHRjb25zdCBkYXRvcyA9ICckJyArIEhlbHAuZm9ybWF0TnVtYmVyKHByZWNpbykgKyAnIGVsICcgKyB1bmlkYWQ7XHJcblxyXG4gIFx0Ly8gQWN0dWFsaXphIGxvcyBkYXRvcyBkZSBsYSBmcnV0YSBzaSBleGlzdGVuIG8gbG8gY3JlYSBzaSBub1xyXG4gIFx0aWYgKHRoaXMuZGF0b3NfZnJ1dGEpIHtcclxuICBcdFx0dGhpcy5kYXRvc19mcnV0YS5zZXRUZXh0KGRhdG9zKTtcclxuICBcdH1cclxuICBcdGVsc2Uge1xyXG4gIFx0XHR0aGlzLmRhdG9zX2ZydXRhID0gdGhpcy5hZGQudGV4dChcclxuICBcdFx0XHR0aGlzLmN1YWRyb19pbmZvLngsIHRoaXMuY3VhZHJvX2luZm8ueS00MCwgXHJcbiAgXHRcdFx0ZGF0b3MsXHJcbiAgXHRcdFx0eyBmb250OiAnT3BlbiBTYW5zJywgZmlsbDogJyMzMzMzMzMnIH0pLnNldE9yaWdpbigwLjUpO1xyXG4gIFx0XHR0aGlzLmRhdG9zX2ZydXRhLnNldEZvbnRTaXplKDI0KTtcclxuICBcdH1cclxuXHJcbiAgXHQvLyBEZXN0cnV5ZSBsYSBpbWFnZW4gZGUgbGEgZnJ1dGEgYW50ZXJpb3JcclxuICBcdGlmICh0aGlzLmZydXRhX3N0YXRpYylcclxuICBcdFx0dGhpcy5mcnV0YV9zdGF0aWMuZGVzdHJveSgpO1xyXG5cclxuICBcdC8vIENyZWEgaW1hZ2VuIGRlIGxhIGZydXRhIHNlbGVjY2lvbmFkYVxyXG4gIFx0dGhpcy5mcnV0YV9zdGF0aWMgPSB0aGlzLmFkZC5pbWFnZSh0aGlzLmN1YWRyb19pbmZvLngsIHRoaXMuY3VhZHJvX2luZm8ueSArIDUwLCB0aXBvKS5zZXRTY2FsZSh0aGlzLmVzY2FsYV9mcnV0YXMpO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tSZXN1bHRhZG9zKCkge1xyXG5cclxuICBcdHRoaXMuZXRhcGEgPSAnUmVzdWx0YWRvcyc7XHJcbiAgXHRcclxuICBcdC8vIEd1YXJkYSBsb3MgY2Fqb25lcyBlbiB1biBhcnJheSBwYXJhIHBvZGVyIG9yZGVuYXJsb3MgZGUgaXpxdWllcmRhIGEgZGVyZWNoYVxyXG4gIFx0dmFyIGNham9uZXMgPSBbXTtcclxuICBcdHRoaXMuY2Fqb25lcy5nZXRDaGlsZHJlbigpLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gIFx0XHRjYWpvbmVzLnB1c2goZWxlbWVudCk7XHJcbiAgXHR9KTtcclxuICBcdGNham9uZXMuc29ydChmdW5jdGlvbihhLCBiKXtyZXR1cm4gYS54IC0gYi54fSk7XHJcblxyXG4gIFx0Ly8gR3VhcmRhIGxvcyB2YWxvcmVzIHBhcmEgbHVlZ28gcHJlZ3VudGFyIHNpIGVzdMOhbiBlbiBvcmRlblxyXG4gIFx0dmFyIHZhbG9yZXMgPSBbXTtcclxuICBcdGNham9uZXMuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgXHRcdHZhbG9yZXMucHVzaChlbGVtZW50LmdldERhdGEoXCJmcnV0YVwiKS5nZXREYXRhKFwicHJlY2lvXCIpKTtcclxuICBcdH0pO1xyXG5cclxuICBcdHZhciByZXN1bHRhZG8gPSBIZWxwLmlzU29ydGVkKHZhbG9yZXMsIHRoaXMub3JkZW4pO1xyXG4gIFx0Ly9jb25zb2xlLmxvZyhcIlNvcnRlZDogXCIgKyByZXN1bHRhZG8pO1xyXG5cclxuICBcdC8vIENyZWEgbGEgYmFycmEgZGUgZmVlZGJhY2tcclxuICBcdHZhciBncmFwaGljcyA9IHRoaXMuYWRkLmdyYXBoaWNzKCk7XHJcbiAgXHR2YXIgY29sb3JGb25kbyA9IHJlc3VsdGFkbyA/ICcweGJmZjE5OScgOiAnMHhmZmQwY2YnO1xyXG4gIFx0dmFyIGNvbG9yID0gcmVzdWx0YWRvID8gJyM0ZDhiNGInIDogJyNhMDEzMGYnO1xyXG4gIFx0Z3JhcGhpY3MuZmlsbFN0eWxlKGNvbG9yRm9uZG8sIDEpO1xyXG4gICAgZ3JhcGhpY3MuZmlsbFJlY3QoMCwgdGhpcy5zeXMuZ2FtZS5jYW52YXMuaGVpZ2h0LTY4LCB0aGlzLnN5cy5nYW1lLmNhbnZhcy53aWR0aCwgNjgpO1xyXG4gICAgZ3JhcGhpY3Muc2V0RGVwdGgoLTEpO1xyXG5cclxuICAgIHZhciBtc2cxID0gcmVzdWx0YWRvID8gJ8KhTVVZIEJJRU4hJzogJ8KhT29wcyEnO1xyXG4gICAgdmFyIG1zZzIgPSByZXN1bHRhZG8gPyAnQXPDrSBzZSBoYWNlJyA6ICdBbGdvIGFuZGEgbWFsLic7XHJcblxyXG4gICAgdGhpcy5tZW5zYWplMSA9IHRoaXMuYWRkLnRleHQodGhpcy5zeXMuZ2FtZS5jYW52YXMud2lkdGgqMC4xLCB0aGlzLnN5cy5nYW1lLmNhbnZhcy5oZWlnaHQqMC45LCBtc2cxLCB7XHJcblx0XHQgIGZvbnRGYW1pbHk6ICdPcGVuIFNhbnMnLFxyXG5cdFx0ICBmb250U2l6ZTogMTYsXHJcblx0XHQgIGZvbnRTdHlsZTogJ2JvbGQnLFxyXG5cdFx0ICBjb2xvcjogY29sb3IsXHJcblx0XHQgIGFsaWduOiAnY2VudGVyJ1xyXG5cdFx0fSk7XHJcblx0XHR0aGlzLm1lbnNhamUyID0gdGhpcy5hZGQudGV4dCh0aGlzLnN5cy5nYW1lLmNhbnZhcy53aWR0aCowLjEsIHRoaXMuc3lzLmdhbWUuY2FudmFzLmhlaWdodCowLjkzLCBtc2cyLCB7XHJcblx0XHQgIGZvbnRGYW1pbHk6ICdPcGVuIFNhbnMnLFxyXG5cdFx0ICBmb250U2l6ZTogMTYsXHJcblx0XHQgIGNvbG9yOiBjb2xvcixcclxuXHRcdCAgYWxpZ246ICdjZW50ZXInXHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXN1bHRhZG8gPyB0aGlzLmJ0blJldmlzYXIuc2V0VGV4dHVyZSgnYnRuRW52aWFyVmVyZGUnKSA6IHRoaXMuYnRuUmV2aXNhci5zZXRUZXh0dXJlKCdidG5Db250aW51YXInKTtcclxuXHJcblx0XHQvLyBEZXNhY3RpdmEgZWwgZHJhZyBkZSBsYXMgZnJ1dGFzXHJcblx0XHR2YXIgZnJ1dGFzID0gW107XHJcblx0XHR0aGlzLmZydXRhcy5nZXRDaGlsZHJlbigpLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCkge1xyXG5cdFx0XHRmcnV0YXMucHVzaChlbGVtZW50KTtcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5pbnB1dC5zZXREcmFnZ2FibGUoZnJ1dGFzLCBmYWxzZSk7XHJcblxyXG5cdFx0Ly8gRXZlbnRvcyBjbGljayBkZWwgYm90w7NuIHJldmlzYXJcclxuXHRcdHRoaXMuYnRuUmV2aXNhci5vbihcInBvaW50ZXJkb3duXCIsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0aWYodGhpcy5idG5SZXZpc2FyLnRleHR1cmUua2V5ID09PSAnYnRuQ29udGludWFyJykge1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdC8vIENhbWJpYSBlbCBmZWVkYmFja1xyXG5cdFx0XHRcdHRoaXMubWVuc2FqZTEuc2V0VGV4dCgnwqFQb24gYXRlbmNpw7NuIScpO1xyXG5cdFx0XHRcdHRoaXMubWVuc2FqZTIuc2V0VGV4dCgnRXN0YSBlcyBsYSByZXNwdWVzdGEgY29ycmVjdGEuJyk7XHJcblx0XHRcdFx0dGhpcy5idG5SZXZpc2FyLnNldFRleHR1cmUoJ2J0bkVudmlhclJvam8nKTtcclxuXHJcblx0XHRcdFx0Ly8gT3JkZW5hIGxhcyBmcnV0YXMgZW4gZWwgb3JkZW4gY29ycmVjdG9cclxuXHRcdFx0XHRpZiAodGhpcy5vcmRlbiA9PT0gJ2FzYycpXHJcblx0XHRcdFx0XHRmcnV0YXMuc29ydChmdW5jdGlvbihhLCBiKXtyZXR1cm4gYS5nZXREYXRhKFwicHJlY2lvXCIpIC0gYi5nZXREYXRhKFwicHJlY2lvXCIpfSk7XHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0ZnJ1dGFzLnNvcnQoZnVuY3Rpb24oYSwgYil7cmV0dXJuIGIuZ2V0RGF0YShcInByZWNpb1wiKSAtIGEuZ2V0RGF0YShcInByZWNpb1wiKX0pO1xyXG5cclxuXHRcdFx0XHQvLyBDb2xvY2EgbGFzIGZydXRhcyBlbiBlbCBjYWrDs24gY29ycmVjdG9cclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8PSBjYWpvbmVzLmxlbmd0aCAtIDE7IGkrKykge1xyXG5cdFx0XHRcdFx0ZnJ1dGFzW2ldLnNldFBvc2l0aW9uKGNham9uZXNbaV0ueCwgY2Fqb25lc1tpXS55KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9IFxyXG5cdFx0XHQvLyBSZWluaWNpYSBsYSBlc2NlbmFcclxuXHRcdFx0ZWxzZSBpZih0aGlzLmJ0blJldmlzYXIudGV4dHVyZS5rZXkgPT09ICdidG5FbnZpYXJWZXJkZScgfHxcclxuXHRcdFx0XHRcdFx0XHRcdHRoaXMuYnRuUmV2aXNhci50ZXh0dXJlLmtleSA9PT0gJ2J0bkVudmlhclJvam8nKSB7XHJcblx0XHRcdFx0bG9jYXRpb24ucmVsb2FkKCk7XHJcblx0XHRcdFx0Ly90aGlzLnNjZW5lLnJlc3RhcnQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSwgdGhpcyk7XHJcblxyXG4gIH1cclxuXHJcbiAgY2hlY2tPdmVybGFwKGZydXRhKSB7XHJcblxyXG4gIFx0bGV0IGludGVyc2VjdGEgPSBmYWxzZTtcclxuICBcdGxldCB0b3RhbExsZW5vcyA9IDA7XHJcblxyXG4gIFx0Ly8gUmVjb3JyZSBsb3MgY2Fqb25lcyBwYXJhIHZlciBzaSBsYSBmcnV0YSBsbyBpbnRlcnNlY3RhXHJcbiAgXHR0aGlzLmNham9uZXMuZ2V0Q2hpbGRyZW4oKS5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuXHJcbiAgXHRcdGlmKFBoYXNlci5HZW9tLlJlY3RhbmdsZS5PdmVybGFwcyhmcnV0YS5nZXRCb3VuZHMoKSwgZWxlbWVudC5nZXRCb3VuZHMoKSkpIHtcclxuXHJcbiAgXHRcdFx0aW50ZXJzZWN0YSA9IHRydWU7XHJcblxyXG4gIFx0XHRcdC8vIFNpIGVsIGNhasOzbiB5YSB0ZW7DrWEgdW5hIGZydXRhLCBsYSBkZXZ1ZWx2ZSBhIHN1IHBvc2ljacOzbiBvcmlnaW5hbFxyXG4gIFx0XHRcdHZhciBmcnV0YUFudGVyaW9yID0gZWxlbWVudC5nZXREYXRhKFwiZnJ1dGFcIik7XHJcbiAgXHRcdFx0aWYgKGZydXRhQW50ZXJpb3IpXHJcbiAgXHRcdFx0XHRmcnV0YUFudGVyaW9yLnJlc2V0UG9zaXRpb24oKTtcclxuICBcdFx0XHRcdFxyXG4gIFx0XHRcdC8vIEd1YXJkYSBsYSBmcnV0YSBlbiBlbCBjYWrDs25cclxuICBcdFx0XHRlbGVtZW50LnNldERhdGEoXCJmcnV0YVwiLCBmcnV0YSk7XHJcbiAgXHRcdFx0ZnJ1dGEueCA9IGVsZW1lbnQueDtcclxuICBcdFx0XHRmcnV0YS55ID0gZWxlbWVudC55O1xyXG4gIFx0XHR9XHJcblxyXG4gIFx0XHRpZiAoZWxlbWVudC5nZXREYXRhKFwiZnJ1dGFcIikpXHJcbiAgXHRcdFx0dG90YWxMbGVub3MrKztcclxuXHJcbiAgXHR9KTtcclxuXHJcbiAgXHRpZiAoIWludGVyc2VjdGEpIHtcclxuICBcdFx0ZnJ1dGEucmVzZXRQb3NpdGlvbigpO1xyXG4gIFx0XHR0aGlzLmJ0blJldmlzYXIuc2V0VGV4dHVyZShcImJ0blJldmlzYXJJbmFjdGl2b1wiKTtcclxuICBcdFx0dG90YWxMbGVub3MgPSAwO1xyXG4gIFx0fVxyXG5cclxuICBcdC8vIFNpIHRvZG9zIGxvcyBjYWpvbmVzIGVzdMOhbiBsbGVub3MsIGFjdGl2YSBlbCBib3TDs24gZGUgcmV2aXNhclxyXG4gIFx0aWYodG90YWxMbGVub3MgPj0gdGhpcy5tYXhfY2Fqb25lcykge1xyXG4gIFx0XHR0aGlzLmJ0blJldmlzYXIuc2V0VGV4dHVyZShcImJ0blJldmlzYXJBY3Rpdm9cIik7XHJcbiAgXHR9XHJcbiAgXHRcclxuICB9XHJcblxyXG4gIHZhY2lhckNham9uKGZydXRhKSB7XHJcbiAgXHRpZih0aGlzLmV0YXBhICE9PSAnUmVzdWx0YWRvcycpIHtcclxuICBcdFx0dGhpcy5jYWpvbmVzLmdldENoaWxkcmVuKCkuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XHJcblx0ICBcdFx0aWYgKGVsZW1lbnQuZ2V0RGF0YShcImZydXRhXCIpID09PSBmcnV0YSkge1xyXG5cdCAgXHRcdFx0ZWxlbWVudC5zZXREYXRhKFwiZnJ1dGFcIiwgbnVsbCk7XHJcblx0ICBcdFx0fVxyXG4gIFx0XHR9KTtcdFxyXG4gIFx0fVxyXG4gIH1cclxuXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NlbmVzL21haW5TY2VuZS5qcyIsImltcG9ydCB7IEVudGl0eSB9IGZyb20gJy4vRW50aXRpZXMnO1xyXG5pbXBvcnQgJ3BoYXNlcic7XHJcblxyXG5leHBvcnQgY2xhc3MgRnJ1dGEgZXh0ZW5kcyBFbnRpdHkge1xyXG4gIFxyXG4gIGNvbnN0cnVjdG9yKHNjZW5lLCB4LCB5LCBrZXksIHNjYWxlKSB7XHJcblxyXG4gIFx0c3VwZXIoc2NlbmUsIHgsIHksIGtleSwgXCJGcnV0YVwiKTtcclxuXHJcbiAgXHRpZiAodGhpcy5jb25zdHJ1Y3RvciA9PT0gRnJ1dGEpIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2xhc2UgYWJzdHJhY3RhIFwiRnJ1dGFcIiBubyBzZSBwdWVkZSBpbnN0YW5jaWFyIGRpcmVjdGFtZW50ZScpOyBcclxuICAgIH1cclxuXHJcbiAgXHR0aGlzLnNldFNjYWxlKHNjYWxlKTtcclxuXHJcbiAgICB0aGlzLmRlZmF1bHRYID0geDtcclxuICBcdHRoaXMuZGVmYXVsdFkgPSB5O1xyXG5cclxuICBcdC8vIFZhcmlhYmxlcyBkZSBjbGFzZVxyXG4gIFx0dGhpcy5zZXREYXRhKFwidHlwZVwiLCBudWxsKTtcclxuICBcdHRoaXMuc2V0RGF0YShcInByZWNpb1wiLCBudWxsKTtcclxuICBcdHRoaXMuc2V0RGF0YShcInVuaWRhZFwiLCBudWxsKTtcclxuICBcdFxyXG4gIFx0Ly8gUGFyYSBxdWUgcmVhY2Npb25lIGEgbG9zIGV2ZW50b3NcclxuICBcdHRoaXMuc2V0SW50ZXJhY3RpdmUoKTtcclxuXHJcblx0XHQvL3NjZW5lLmlucHV0LnNldERyYWdnYWJsZSh0aGlzLCB0cnVlKTtcclxuXHJcbiAgXHQvLyBFdmVudG8gY2xpY2tcclxuICBcdHRoaXMub24oJ3BvaW50ZXJkb3duJywgZnVuY3Rpb24gKHBvaW50ZXIpIHtcclxuICAgICAgdGhpcy5zY2VuZS5tb3N0cmFySW5mbyh0aGlzLmdldERhdGEoXCJwcmVjaW9cIiksIHRoaXMuZ2V0RGF0YShcInVuaWRhZFwiKSwgdGhpcy5nZXREYXRhKFwidHlwZVwiKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgXHQvLyBDYW1iaW8gZGUgZXN0aWxvIGN1cnNvclxyXG4gICAgdGhpcy5vbigncG9pbnRlcm92ZXInLCBmdW5jdGlvbiAocG9pbnRlcikge1xyXG4gICAgICB0aGlzLnNjZW5lLmdhbWUuY2FudmFzLnN0eWxlLmN1cnNvciA9IFwiaGFuZFwiO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLm9uKCdwb2ludGVyb3V0JywgZnVuY3Rpb24gKHBvaW50ZXIpIHtcclxuICAgICAgdGhpcy5zY2VuZS5nYW1lLmNhbnZhcy5zdHlsZS5jdXJzb3IgPSBcImRlZmF1bHRcIjtcclxuICAgIH0pO1xyXG5cclxuICBcdC8vIEV2ZW50b3MgZHJhZ1xyXG4gICAgdGhpcy5vbignZHJhZycsIGZ1bmN0aW9uKHBvaW50ZXIsIGRyYWdYLCBkcmFnWSl7XHJcbiAgICAgXHR0aGlzLnggPSBkcmFnWDtcclxuICAgICBcdHRoaXMueSA9IGRyYWdZO1xyXG4gICBcdH0pO1xyXG5cclxuICAgXHR0aGlzLm9uKCdkcmFnZW5kJywgZnVuY3Rpb24gKHBvaW50ZXIsIGdhbWVPYmplY3QsIHRhcmdldCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2NlbmUuY2hlY2tPdmVybGFwKHRoaXMpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5vbignZHJvcCcsIGZ1bmN0aW9uIChwb2ludGVyLCBnYW1lT2JqZWN0LCB0YXJnZXQpIHtcclxuXHJcbiAgICBcdC8vdmFyIGludGVyc2VjdGEgPSBQaGFzZXIuR2VvbS5JbnRlcnNlY3RzLlJlY3RhbmdsZVRvUmVjdGFuZ2xlKHRoaXMuZ2V0Qm91bmRzKCksIGdhbWVPYmplY3QuZ2V0Qm91bmRzKCkpO1xyXG4gICAgXHQvL3RoaXMuc2NlbmUuY2hlY2tPdmVybGFwKHRoaXMpO1xyXG4gICAgXHRcdFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9kaXNwbGF5V2lkdGhcclxuICB9XHJcblxyXG4gIHJlc2V0UG9zaXRpb24oKSB7XHJcbiAgXHQvLyBWdWVsdmUgYSBsYSBwb3NpY2nDs24gb3JpZ2luYWxcclxuICBcdHRoaXMuc2V0UG9zaXRpb24odGhpcy5kZWZhdWx0WCwgdGhpcy5kZWZhdWx0WSk7XHJcblxyXG4gIFx0Ly8gQm9ycmEgbGEgcmVmZXJlbmNpYSBhIGVzdGUgb2JqZXRvIGVuIGVsIGNhasOzbiBlbiBlbCBxdWUgZXN0YWJhXHJcbiAgXHR0aGlzLnNjZW5lLnZhY2lhckNham9uKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgZGlzYWJsZURyYWcoKSB7XHJcbiAgXHR0aGlzLnNjZW5lLmlucHV0LnNldERyYWdnYWJsZSh0aGlzLCBmYWxzZSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGFtYXNjbyBleHRlbmRzIEZydXRhIHtcclxuICBcclxuICBjb25zdHJ1Y3RvcihzY2VuZSwgeCwgeSwgc2NhbGUpIHtcclxuXHJcbiAgXHRzdXBlcihzY2VuZSwgeCwgeSwgXCJkYW1hc2NvXCIsIHNjYWxlKTtcclxuXHJcblx0XHR0aGlzLnNldERhdGEoXCJ0eXBlXCIsIFwiZGFtYXNjb1wiKTtcclxuICBcdHRoaXMuc2V0RGF0YShcInByZWNpb1wiLCA4MDApO1xyXG4gIFx0dGhpcy5zZXREYXRhKFwidW5pZGFkXCIsIFwia2lsb1wiKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEdXJhem5vIGV4dGVuZHMgRnJ1dGEge1xyXG4gIFxyXG4gIGNvbnN0cnVjdG9yKHNjZW5lLCB4LCB5LCBzY2FsZSkge1xyXG5cclxuICBcdHN1cGVyKHNjZW5lLCB4LCB5LCBcImR1cmF6bm9cIiwgc2NhbGUpO1xyXG5cclxuICBcdHRoaXMuc2V0RGF0YShcInR5cGVcIiwgXCJkdXJhem5vXCIpO1xyXG4gIFx0dGhpcy5zZXREYXRhKFwicHJlY2lvXCIsIDY1MCk7XHJcbiAgXHR0aGlzLnNldERhdGEoXCJ1bmlkYWRcIiwgXCJraWxvXCIpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEZyYW1idWVzYSBleHRlbmRzIEZydXRhIHtcclxuICBcclxuICBjb25zdHJ1Y3RvcihzY2VuZSwgeCwgeSwgc2NhbGUpIHtcclxuXHJcbiAgXHRzdXBlcihzY2VuZSwgeCwgeSwgXCJmcmFtYnVlc2FcIiwgc2NhbGUpO1xyXG5cclxuICBcdHRoaXMuc2V0RGF0YShcInR5cGVcIiwgXCJmcmFtYnVlc2FcIik7XHJcbiAgXHR0aGlzLnNldERhdGEoXCJwcmVjaW9cIiwgMjUwMCk7XHJcbiAgXHR0aGlzLnNldERhdGEoXCJ1bmlkYWRcIiwgXCJraWxvXCIpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEZydXRpbGxhIGV4dGVuZHMgRnJ1dGEge1xyXG4gIFxyXG4gIGNvbnN0cnVjdG9yKHNjZW5lLCB4LCB5LCBzY2FsZSkge1xyXG5cclxuICBcdHN1cGVyKHNjZW5lLCB4LCB5LCBcImZydXRpbGxhXCIsIHNjYWxlKTtcclxuXHJcbiAgXHR0aGlzLnNldERhdGEoXCJ0eXBlXCIsIFwiZnJ1dGlsbGFcIik7XHJcbiAgXHR0aGlzLnNldERhdGEoXCJwcmVjaW9cIiwgMTUwMCk7XHJcbiAgXHR0aGlzLnNldERhdGEoXCJ1bmlkYWRcIiwgXCJraWxvXCIpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1hbnphbmEgZXh0ZW5kcyBGcnV0YSB7XHJcbiAgXHJcbiAgY29uc3RydWN0b3Ioc2NlbmUsIHgsIHksIHNjYWxlKSB7XHJcblxyXG4gIFx0c3VwZXIoc2NlbmUsIHgsIHksIFwibWFuemFuYVwiLCBzY2FsZSk7XHJcblxyXG4gIFx0dGhpcy5zZXREYXRhKFwidHlwZVwiLCBcIm1hbnphbmFcIik7XHJcbiAgXHR0aGlzLnNldERhdGEoXCJwcmVjaW9cIiwgNDUwKTtcclxuICBcdHRoaXMuc2V0RGF0YShcInVuaWRhZFwiLCBcImtpbG9cIik7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTmFyYW5qYSBleHRlbmRzIEZydXRhIHtcclxuICBcclxuICBjb25zdHJ1Y3RvcihzY2VuZSwgeCwgeSwgc2NhbGUpIHtcclxuXHJcbiAgXHRzdXBlcihzY2VuZSwgeCwgeSwgXCJuYXJhbmphXCIsIHNjYWxlKTtcclxuXHJcbiAgXHR0aGlzLnNldERhdGEoXCJ0eXBlXCIsIFwibmFyYW5qYVwiKTtcclxuICBcdHRoaXMuc2V0RGF0YShcInByZWNpb1wiLCA1MzApO1xyXG4gIFx0dGhpcy5zZXREYXRhKFwidW5pZGFkXCIsIFwia2lsb1wiKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQZXJhIGV4dGVuZHMgRnJ1dGEge1xyXG4gIFxyXG4gIGNvbnN0cnVjdG9yKHNjZW5lLCB4LCB5LCBzY2FsZSkge1xyXG5cclxuICBcdHN1cGVyKHNjZW5lLCB4LCB5LCBcInBlcmFcIiwgc2NhbGUpO1xyXG5cclxuICBcdHRoaXMuc2V0RGF0YShcInR5cGVcIiwgXCJwZXJhXCIpO1xyXG4gIFx0dGhpcy5zZXREYXRhKFwicHJlY2lvXCIsIDQzMCk7XHJcbiAgXHR0aGlzLnNldERhdGEoXCJ1bmlkYWRcIiwgXCJraWxvXCIpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBsYXRhbm8gZXh0ZW5kcyBGcnV0YSB7XHJcbiAgXHJcbiAgY29uc3RydWN0b3Ioc2NlbmUsIHgsIHksIHNjYWxlKSB7XHJcblxyXG4gIFx0c3VwZXIoc2NlbmUsIHgsIHksIFwicGzDoXRhbm9cIiwgc2NhbGUpO1xyXG5cclxuICBcdHRoaXMuc2V0RGF0YShcInR5cGVcIiwgXCJwbMOhdGFub1wiKTtcclxuICBcdHRoaXMuc2V0RGF0YShcInByZWNpb1wiLCA2NTApO1xyXG4gIFx0dGhpcy5zZXREYXRhKFwidW5pZGFkXCIsIFwia2lsb1wiKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTYW5kaWEgZXh0ZW5kcyBGcnV0YSB7XHJcbiAgXHJcbiAgY29uc3RydWN0b3Ioc2NlbmUsIHgsIHksIHNjYWxlKSB7XHJcblxyXG4gIFx0c3VwZXIoc2NlbmUsIHgsIHksIFwic2FuZMOtYVwiLCBzY2FsZSk7XHJcblxyXG4gIFx0dGhpcy5zZXREYXRhKFwidHlwZVwiLCBcInNhbmTDrWFcIik7XHJcbiAgXHR0aGlzLnNldERhdGEoXCJwcmVjaW9cIiwgMTAwMCk7XHJcbiAgXHR0aGlzLnNldERhdGEoXCJ1bmlkYWRcIiwgXCJ1bmlkYWRcIik7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVXZhIGV4dGVuZHMgRnJ1dGEge1xyXG4gIFxyXG4gIGNvbnN0cnVjdG9yKHNjZW5lLCB4LCB5LCBzY2FsZSkge1xyXG5cclxuICBcdHN1cGVyKHNjZW5lLCB4LCB5LCBcInV2YVwiLCBzY2FsZSk7XHJcblxyXG4gIFx0dGhpcy5zZXREYXRhKFwidHlwZVwiLCBcInV2YVwiKTtcclxuICBcdHRoaXMuc2V0RGF0YShcInByZWNpb1wiLCAxODAwKTtcclxuICBcdHRoaXMuc2V0RGF0YShcInVuaWRhZFwiLCBcImtpbG9cIik7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2VudGl0aWVzL0ZydXRhcy5qcyIsImltcG9ydCB7IEVudGl0eSB9IGZyb20gJy4vRW50aXRpZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENham9uIGV4dGVuZHMgRW50aXR5IHtcclxuICBcclxuICBjb25zdHJ1Y3RvcihzY2VuZSwgeCwgeSwga2V5LCBzY2FsZSkge1xyXG5cclxuICBcdHN1cGVyKHNjZW5lLCB4LCB5LCBrZXkpO1xyXG5cclxuICBcdHRoaXMuc2V0U2NhbGUoc2NhbGUpO1xyXG5cclxuICAgIHRoaXMuc2V0RGF0YShcImZydXRhXCIsIG51bGwpO1xyXG4gIFx0XHJcbiAgICAvL3RoaXMuc2NlbmUuYWRkLnpvbmUoKHRoaXMuYm91bmRzKSkuc2V0UmVjdGFuZ2xlRHJvcFpvbmUodGhpcy53aWR0aCpzY2FsZSwgdGhpcy5oZWlnaHQqc2NhbGUpO1xyXG4gICAgXHJcbiAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2VudGl0aWVzL0Nham9uLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIGlzU29ydGVkKGFyciwgb3JkZXIgPSAnYXNjJykge1xyXG5mb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGggLSAxOyBpKyspIHtcclxuICBpZiAob3JkZXIgPT09ICdhc2MnKSB7XHJcbiAgXHRpZiAoYXJyW2kgKyAxXSA8IGFycltpXSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgXHR9O1x0XHJcbiAgfSBlbHNlIHtcclxuICBcdGlmIChhcnJbaSArIDFdID4gYXJyW2ldKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICBcdH07XHJcbiAgfVxyXG59XHJcbnJldHVybiB0cnVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmFuZG9tSW50KG1pbiwgbWF4KSB7XHJcbiAgbWluID0gTWF0aC5jZWlsKG1pbik7XHJcbiAgbWF4ID0gTWF0aC5mbG9vcihtYXgpO1xyXG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW47IC8vVGhlIG1heGltdW0gaXMgZXhjbHVzaXZlIGFuZCB0aGUgbWluaW11bSBpcyBpbmNsdXNpdmVcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdE51bWJlcihudW0pIHtcclxuXHRyZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KFwiZXMtRVNcIikuZm9ybWF0KG51bSk7XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaGVscGVyLmpzIiwiZXhwb3J0IGNsYXNzIEVudGl0eSBleHRlbmRzIFBoYXNlci5HYW1lT2JqZWN0cy5TcHJpdGUge1xyXG5cclxuICBjb25zdHJ1Y3RvcihzY2VuZSwgeCwgeSwga2V5LCB0eXBlKSB7XHJcblxyXG4gIFx0c3VwZXIoc2NlbmUsIHgsIHksIGtleSk7XHJcblxyXG4gIFx0dGhpcy5zY2VuZSA9IHNjZW5lO1xyXG5cdFx0dGhpcy5zY2VuZS5hZGQuZXhpc3RpbmcodGhpcyk7XHJcblx0XHQvL3RoaXMuc2NlbmUucGh5c2ljcy53b3JsZC5lbmFibGVCb2R5KHRoaXMsIDApO1xyXG5cdFx0dGhpcy5zZXREYXRhKFwidHlwZVwiLCB0eXBlKTtcclxuXHRcdHRoaXMuc2V0RGF0YShcImlzRGVhZFwiLCBmYWxzZSk7XHJcblxyXG5cdH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lbnRpdGllcy9FbnRpdGllcy5qcyIsIi8vaW1wb3J0IHsgc2hvd01lc3NhZ2UgfSBmcm9tICcuL21lc3NhZ2VyJztcclxuLy9zaG93TWVzc2FnZSgnU29tZWJvZHkgZWxzZSBkaWQgdGhpcyB3b3JrIScpO1xyXG5cclxuaW1wb3J0ICdwaGFzZXInO1xyXG5cclxuaW1wb3J0IHsgTWFpblNjZW5lIH0gZnJvbSAnLi9zY2VuZXMvbWFpblNjZW5lJztcclxuXHJcbmNvbnN0IGdhbWVDb25maWcgPSB7XHJcbiAgd2lkdGg6IDgwMCxcclxuICBoZWlnaHQ6IDYwMCxcclxuICB0cmFuc3BhcmVudDogdHJ1ZSxcclxuICBwaHlzaWNzOiB7XHJcbiAgICBkZWZhdWx0OiBcImFyY2FkZVwiLFxyXG4gICAgYXJjYWRlOiB7XHJcbiAgICAgIGdyYXZpdHk6IHsgeDogMCwgeTogMCB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBzY2VuZTogTWFpblNjZW5lXHJcbn07XHJcblxyXG5uZXcgUGhhc2VyLkdhbWUoZ2FtZUNvbmZpZyk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==