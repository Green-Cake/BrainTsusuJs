if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'BrainTsusuJs'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'BrainTsusuJs'.");
}var BrainTsusuJs = function (_, Kotlin) {
  'use strict';
  var Enum = Kotlin.kotlin.Enum;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var throwISE = Kotlin.throwISE;
  var throwCCE = Kotlin.throwCCE;
  var RegexOption = Kotlin.kotlin.text.RegexOption;
  var UByte = Kotlin.kotlin.UByte;
  var toBoxedChar = Kotlin.toBoxedChar;
  var equals = Kotlin.equals;
  var toChar = Kotlin.toChar;
  var UInt = Kotlin.kotlin.UInt;
  var Regex_init = Kotlin.kotlin.text.Regex_init_sb3q2$;
  var Regex_init_0 = Kotlin.kotlin.text.Regex_init_61zpoe$;
  var Array_0 = Array;
  var toByte = Kotlin.toByte;
  Mode.prototype = Object.create(Enum.prototype);
  Mode.prototype.constructor = Mode;
  function Mode(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function Mode_initFields() {
    Mode_initFields = function () {
    };
    Mode$NORMAL_instance = new Mode('NORMAL', 0);
    Mode$JUMP_F_instance = new Mode('JUMP_F', 1);
    Mode$JUMP_B_instance = new Mode('JUMP_B', 2);
  }
  var Mode$NORMAL_instance;
  function Mode$NORMAL_getInstance() {
    Mode_initFields();
    return Mode$NORMAL_instance;
  }
  var Mode$JUMP_F_instance;
  function Mode$JUMP_F_getInstance() {
    Mode_initFields();
    return Mode$JUMP_F_instance;
  }
  var Mode$JUMP_B_instance;
  function Mode$JUMP_B_getInstance() {
    Mode_initFields();
    return Mode$JUMP_B_instance;
  }
  Mode.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Mode',
    interfaces: [Enum]
  };
  function Mode$values() {
    return [Mode$NORMAL_getInstance(), Mode$JUMP_F_getInstance(), Mode$JUMP_B_getInstance()];
  }
  Mode.values = Mode$values;
  function Mode$valueOf(name) {
    switch (name) {
      case 'NORMAL':
        return Mode$NORMAL_getInstance();
      case 'JUMP_F':
        return Mode$JUMP_F_getInstance();
      case 'JUMP_B':
        return Mode$JUMP_B_getInstance();
      default:throwISE('No enum constant Mode.' + name);
    }
  }
  Mode.valueOf_61zpoe$ = Mode$valueOf;
  function getTextArea(id) {
    var tmp$;
    return Kotlin.isType(tmp$ = document.getElementById(id), HTMLTextAreaElement) ? tmp$ : throwCCE();
  }
  function run$getToken(closure$src) {
    return function (i) {
      return String.fromCharCode(closure$src.charCodeAt(i * 2 | 0)) + String.fromCharCode(toBoxedChar(closure$src.charCodeAt((i * 2 | 0) + 1 | 0)));
    };
  }
  function run() {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    var tmp$_3 = getTextArea('input').value;
    var tmp$_4 = Regex_init('(//.*$)', RegexOption.MULTILINE).replace_x2uqeu$(tmp$_3, '');
    var src = Regex_init_0('\n|\r|\\s|\u3000|\t').replace_x2uqeu$(tmp$_4, '');
    getTextArea('output').value = '';
    var cur = 0;
    var array = Array_0(512);
    var tmp$_5;
    tmp$_5 = array.length - 1 | 0;
    for (var i = 0; i <= tmp$_5; i++) {
      array[i] = new UByte(0);
    }
    var heap = array;
    var ptr = 0;
    var mode = Mode$NORMAL_getInstance();
    var getToken = run$getToken(src);
    a: while (((cur * 2 | 0) + 1 | 0) < src.length) {
      switch (mode.name) {
        case 'JUMP_F':
          var d = 0;
          while (true) {
            if (equals(getToken(cur), '\u3046\u3064')) {
              d = d + 1 | 0;
            } else if (equals(getToken(cur), '\u3046\u3059'))
              tmp$ = d, d = tmp$ - 1 | 0;
            if (equals(getToken(cur), '\u3046\u3059') && d === 0)
              break;
            cur = cur + 1 | 0;
          }

          cur = cur + 1 | 0;
          mode = Mode$NORMAL_getInstance();
          continue a;
        case 'JUMP_B':
          var d_0 = 0;
          while (true) {
            if (equals(getToken(cur), '\u3046\u3059')) {
              d_0 = d_0 + 1 | 0;
            } else if (equals(getToken(cur), '\u3046\u3064'))
              tmp$_0 = d_0, d_0 = tmp$_0 - 1 | 0;
            if (equals(getToken(cur), '\u3046\u3064') && d_0 === 0)
              break;
            cur = cur - 1 | 0;
          }

          cur = cur + 1 | 0;
          mode = Mode$NORMAL_getInstance();
          continue a;
        default:switch (getToken(cur)) {
            case '\u3064\u3064':
              ptr = ptr + 1 | 0;
              break;
            case '\u3064\u3059':
              ptr = ptr - 1 | 0;
              break;
            case '\u3064\u3046':
              heap[ptr] = new UByte(toByte(heap[ptr].data + 1));
              break;
            case '\u3059\u3064':
              heap[ptr] = new UByte(toByte(heap[ptr].data - 1));
              break;
            case '\u3059\u3059':
              getTextArea('output').value = getTextArea('output').value + String.fromCharCode(toChar(heap[ptr].data & 255));
              break;
            case '\u3046\u3064':
              if ((tmp$_1 = heap[ptr]) != null ? tmp$_1.equals(new UByte(toByte((new UInt(0)).data))) : null) {
                mode = Mode$JUMP_F_getInstance();
                continue a;
              }
              break;
            case '\u3046\u3059':
              if (!((tmp$_2 = heap[ptr]) != null ? tmp$_2.equals(new UByte(toByte((new UInt(0)).data))) : null)) {
                mode = Mode$JUMP_B_getInstance();
                continue a;
              }
              break;
            case '\u3046\u3046':
              getTextArea('output').value = getTextArea('output').value + heap[ptr].toString();
              break;
            case '\u307E\u3066':
              break;
          }

          break;
      }
      cur = cur + 1 | 0;
    }
  }
  Object.defineProperty(Mode, 'NORMAL', {
    get: Mode$NORMAL_getInstance
  });
  Object.defineProperty(Mode, 'JUMP_F', {
    get: Mode$JUMP_F_getInstance
  });
  Object.defineProperty(Mode, 'JUMP_B', {
    get: Mode$JUMP_B_getInstance
  });
  _.Mode = Mode;
  _.getTextArea_61zpoe$ = getTextArea;
  _.run = run;
  Kotlin.defineModule('BrainTsusuJs', _);
  return _;
}(typeof BrainTsusuJs === 'undefined' ? {} : BrainTsusuJs, kotlin);
