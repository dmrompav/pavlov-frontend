"use strict";

// Получение доступа ко всем элементам HTML
// Включить ли упрощенный режим? Значение изменяется в VerButClick
// Выбор темы
// Нумерация элементов по X и Y + прочие элементы
// Приветствие
// Ресайз и динамический адаптив
// EventListeners
// Задаем функции клика
// Задаем функции скролла
// Задаем функции клавиатуры
// Задаем функции свайпа
// Задаем вспомогательные функции
var d = document; // !Получение доступа ко всем элементам HTML

var hi = d.querySelector('.hi'),
    win = d.querySelectorAll('.win'),
    waves = d.querySelector('.waves'),
    ci = d.querySelector('.control-info'),
    wrapper = d.querySelector('.wrapper'),
    arrowL = d.querySelector('.arrow_left'),
    arrowR = d.querySelector('.arrow_right'),
    hor = d.querySelector('.horizontal'),
    allVer = d.querySelector('.allvertical'),
    ver = d.querySelectorAll('.vertical'),
    horBut = d.querySelectorAll('.horizontal__button'),
    group = d.querySelectorAll('.group'),
    tapfield = d.querySelectorAll('.tapfield'),
    main = d.querySelector('.main');
var verBut = [],
    info = [];

for (var i = 0; i < ver.length; i++) {
  verBut[i] = ver[i].querySelectorAll('.vertical__button');
}

for (var _i = 0; _i < group.length; _i++) {
  info[_i] = group[_i].querySelectorAll('.info');
} // !Включить ли упрощенный режим? Значение изменяется в VerButClick


var localQuality = localStorage.getItem('needQuality');

if (localQuality == 'false') {
  waves.remove();
  var ct = d.querySelector('.colortheme');
  document.body.style.background = "#111";
  ct.classList.remove('.typeflip');
  ct.classList.add('typenoclick');
  ct.querySelector('.vertical__text').innerHTML = 'Недоступно';
  var f = ct.querySelectorAll('.flip');
  f[0].style.backgroundColor = "#000";
  d.querySelector('.quality').querySelector('.vertical__text').innerHTML = 'Повысить качество';
  d.querySelector('.horizontal__button_7').style.animation = 'none';
} // !Выбор темы


var flip = 0,
    localColor = localStorage.getItem('colorTheme');

if (localColor == 'blue' && localQuality !== 'false') {
  flip = 1;
  document.body.style.background = "linear-gradient(#000 0%, #40407a 40%, #40407a 60%, #000 100%)";

  var _f = d.querySelector('.colortheme').querySelectorAll('.flip');

  _f[0].style.transform = "rotateY(180deg)";
  _f[1].style.transform = "rotateY(360deg)";
} // !Нумерация элементов по X и Y + прочие элементы


var hind = 0,
    //по горизонтали
vind = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //по вертикали
mouseDownPermission = true,
    clickPermission = true,
    scrollPermission = true,
    swipePermission = true,
    keyDownPermission = true,
    isPopUpOpen = false,
    wasEnterUp = true; // !Приветствие

var hiOn = setTimeout(function () {
  hi.style.opacity = 1;
  clearTimeout(hiOn);
}, 1000);
var hiOff = setTimeout(function () {
  hi.style.opacity = 0;
  clearTimeout(hiOff);
}, 3000);
var wrapperOn = setTimeout(function () {
  wrapper.style.opacity = 1; // разрешить управление

  function Permission() {
    // !EventListeners
    for (var _i2 = 0; _i2 < horBut.length; _i2++) {
      horBut[_i2].addEventListener('click', HorButClick, false); //a few LISTENERS

    }

    for (var _i3 = 0; _i3 < ver.length; _i3++) {
      for (var j = 0; j < verBut[_i3].length; j++) {
        verBut[_i3][j].addEventListener('click', VerButClick, false); //a lot of LISTENERS

      }
    }

    if (d.addEventListener) {
      if ('onwheel' in document) {
        d.addEventListener("wheel", onWheel); // IE9+, FF17+, Ch31+
      } else if ('onmousewheel' in document) {
        d.addEventListener("mousewheel", onWheel); // устаревший вариант события
      } else {
        d.addEventListener("MozMousePixelScroll", onWheel); // Firefox < 17
      }
    } else {
      d.attachEvent("onmousewheel", onWheel); // IE8-
    }

    d.addEventListener('touchstart', TouchStart, false);
    setTimeout(function () {
      d.addEventListener('touchmove', TouchMove, false); //? Правильно ли???
    }, 0);
    d.addEventListener('touchend', TouchEnd, false);
    d.addEventListener('mousedown', MouseDown, false);
    d.addEventListener('mousemove', MouseMove, false);
    d.addEventListener('mouseup', MouseUp, false);
    d.addEventListener('keydown', KeyDown, false);
    d.addEventListener('keyup', EnterClose, false);
    arrowL.addEventListener('click', ArrowLClick, false);
    arrowR.addEventListener('click', ArrowRClick, false);
  }

  Permission();
  clearTimeout(wrapperOn);
}, 3500);
var ciOff = setTimeout(function () {
  ci.remove();
}, 10000); // !Ресайз и динамический адаптив

window.addEventListener('resize', Resize);
var vw = window.innerWidth,
    vh = window.innerHeight,
    //position
horLeftPos,
    allVerLeftPos,
    horTopPos,
    allVerTopPos,
    //transition
horLeftTrans,
    allVerLeftTrans,
    verTopTrans;

function Resize() {
  vw = window.innerWidth;
  vh = window.innerHeight;

  if (vw < 768) {
    horLeftPos = 0;
    allVerLeftPos = 0;
    horLeftTrans = vw;
    allVerLeftTrans = 150;
    horTopPos = 30;
    allVerTopPos = 100;
    verTopTrans = 100;
  } else {
    horLeftPos = 0.3 * vw;
    allVerLeftPos = 0.3 * vw;
    horLeftTrans = 150;
    allVerLeftTrans = 150;
    horTopPos = 0.3 * vh;
    allVerTopPos = 0.3 * vh;
    verTopTrans = 100;
  }

  HorTrans();
  VerTrans();
  ArrowsRules();
}

Resize(); // !Задаем функции клика

function HorButClick() {
  // Удалим для прошлой кнопки класс selected и добавим selectable
  // Удалим для прошлого ver класс selected и добавим selectable
  // Определим на какую кнопку кликнули
  // Определим новое положение left для hor и allVer
  // Удалим для прошлой кнопки класс selectable и добавим selected
  // Удалим для прошлого ver класс selectable и добавим selected
  if (clickPermission) {
    // Удалим для прошлой кнопки класс selected и добавим selectable
    HorMakeSelectable(); // Удалим для прошлого ver класс selected и добавим selectable

    AllVerMakeSelectable(); // Определим на какую кнопку кликнули

    for (var _i4 = 0; _i4 < horBut.length; _i4++) {
      if (this == horBut[_i4]) {
        hind = _i4;
      }
    } // Определим новое положение left для hor и allVer


    HorTrans(); // Удалим для прошлой кнопки класс selectable и добавим selected

    HorMakeSelected(); // Удалим для прошлого ver класс selectable и добавим selected

    AllVerMakeSelected();
  }
}

function VerButClick(event) {
  // Вызовем ли popup
  // Удалим для прошлой кнопки класс selected и добавим selectable
  // Определим на какую кнопку кликнули
  // передвинем Ver
  // Удалим для прошлой кнопки класс selectable и добавим selected
  if (clickPermission) {
    var timeout;

    if (this !== verBut[hind][vind[hind]]) {
      timeout = true;
    } // Удалим для прошлой кнопки класс selected и добавим selectable


    VerMakeSelectable(); // Определим на какую кнопку кликнули

    for (var _i5 = 0; _i5 < verBut[hind].length; _i5++) {
      if (this == verBut[hind][_i5]) {
        vind[hind] = _i5;
      }
    } // передвинем Ver


    VerTrans(); // Удалим для прошлой кнопки класс selectable и добавим selected

    VerMakeSelected(); // Вызовем ли popup

    if (!this.classList.contains('typenoclick') && !this.classList.contains('typelink')) {
      if (this.classList.contains('typeflip')) {
        FlipIcon();
      } else if (this.classList.contains('quality')) {
        Quality();
      } else {
        if (timeout) {
          var CallPopUpTime = setTimeout(function () {
            CallPopUp();
            clearTimeout(CallPopUpTime);
          }, 200);
        } else {
          CallPopUp();
        }
      }
    }
  }
}

function ArrowLClick() {
  if (hind > 0) {
    HorMakeSelectable();
    AllVerMakeSelectable();
    hind--;
    HorMakeSelected();
    AllVerMakeSelected();
    HorTrans();
  }
}

function ArrowRClick() {
  if (hind < horBut.length) {
    HorMakeSelectable();
    AllVerMakeSelectable();
    hind++;
    HorMakeSelected();
    AllVerMakeSelected();
    HorTrans();
  }
} // !Задаем функции скролла


function onWheel(e) {
  if (scrollPermission) {
    var delta = e.deltaY || e.detail || e.wheelDelta;

    if (verBut[hind].length > 1) {
      if (vind[hind] < 1) {
        if (delta > 0) {
          VerMakeSelectable();
          vind[hind]++;
        }
      } else if (vind[hind] < verBut[hind].length - 1) {
        if (delta > 0) {
          VerMakeSelectable();
          vind[hind]++;
        } else {
          VerMakeSelectable();
          vind[hind]--;
        }
      } else {
        if (delta < 0) {
          VerMakeSelectable();
          vind[hind]--;
        }
      }

      VerMakeSelected();
      VerTrans();
    }
  }
} // !Задаем функции свайпа


var X,
    Y,
    hind0,
    vind0,
    x0,
    y0,
    x,
    y,
    horswi,
    verswi,
    swipeInterval1,
    swipeInterval2,
    swi = 100,
    clickPermission = true,
    swiTarget = 0;

function MouseMove(e) {
  X = e.pageX;
  Y = e.pageY;
}

function MouseDown(e) {
  clickPermission = true;
  hind0 = hind;
  vind0 = vind[hind];
  x0 = X;
  y0 = Y; // определяем является ли движение по экрану свайпом и стоит ли запретить клики

  swipeInterval1 = setInterval(function () {
    x = X;
    y = Y;
    horswi = x - x0;
    verswi = y - y0;

    if (horswi > swi / 2 || horswi < -(swi / 2) || verswi > swi / 2 || verswi < -(swi / 2)) {
      clickPermission = false;
      scrollPermission = false;
      keyDownPermission = false;

      if (Math.abs(horswi) > Math.abs(verswi)) {
        swiTarget = "hor";
      } else {
        swiTarget = "ver";
      }
    }
  }, 50);
  swipeInterval2 = setInterval(function () {
    if (swiTarget !== 0) {
      if (swiTarget == "hor" && !isPopUpOpen) {
        if (vw < 768) {
          HorMakeSelectable();
          AllVerMakeSelectable();

          if (horswi < 0 && hind0 < horBut.length - 1) {
            hind = hind0 + 1;
          } else if (horswi > 0 && hind0 > 0) {
            hind = hind0 - 1;
          }

          HorMakeSelected();
          AllVerMakeSelected();
          HorTrans();
        } else {
          var ind, indtrans;
          indtrans = (horswi - horswi % swi) / swi;
          ind = hind0 - indtrans;
          HorMakeSelectable();
          AllVerMakeSelectable();

          if (ind <= 0) {
            hind = 0;
          } else if (ind > horBut.length - 1) {
            hind = horBut.length - 1;
          } else {
            hind = ind;
          }

          HorMakeSelected();
          AllVerMakeSelected();
          HorTrans();
        }
      } else if (swiTarget == "ver" && !isPopUpOpen) {
        var _ind, _indtrans;

        _indtrans = (verswi - verswi % (swi * 0.5)) / (swi * 0.5);
        _ind = vind0 - _indtrans;
        VerMakeSelectable();

        if (_ind <= 0) {
          vind[hind] = 0;
        } else if (_ind > verBut[hind].length - 1) {
          vind[hind] = verBut[hind].length - 1;
        } else {
          vind[hind] = _ind;
        }

        VerMakeSelected();
        VerTrans();
      }
    }
  }, 50);
  document.addEventListener('mouseup', MouseUp, false);
}

function MouseUp() {
  clearInterval(swipeInterval1);
  clearInterval(swipeInterval2);
  swiTarget = 0;
  var permission = setTimeout(function () {
    clickPermission = true;
    scrollPermission = true;
    keyDownPermission = true;
    clearTimeout(permission);
  }, 50);
}

function TouchStart(event) {
  clickPermission = true;
  x0 = event.touches[0].pageX;
  y0 = event.touches[0].pageY;
  clickPermission = true;
  hind0 = hind;
  vind0 = vind[hind];
}

function TouchMove(event) {
  event.preventDefault();
  X = event.changedTouches[0].pageX;
  Y = event.changedTouches[0].pageY;
  horswi = X - x0;
  verswi = Y - y0;

  if (horswi > swi / 2 || horswi < -(swi / 2) || verswi > swi / 2 || verswi < -(swi / 2)) {
    clickPermission = false;
    scrollPermission = false;
    keyDownPermission = false;

    if (Math.abs(horswi) > Math.abs(verswi)) {
      swiTarget = "hor";
    } else {
      swiTarget = "ver";
    }
  }

  if (swiTarget !== 0) {
    if (swiTarget == "hor" && !isPopUpOpen) {
      if (vw < 768) {
        HorMakeSelectable();
        AllVerMakeSelectable();

        if (horswi < 0 && hind0 < horBut.length - 1) {
          hind = hind0 + 1;
        } else if (horswi > 0 && hind0 > 0) {
          hind = hind0 - 1;
        }

        HorMakeSelected();
        AllVerMakeSelected();
        HorTrans();
      } else {
        var ind, indtrans;
        indtrans = (horswi - horswi % swi) / swi;
        ind = hind0 - indtrans;
        HorMakeSelectable();
        AllVerMakeSelectable();

        if (ind <= 0) {
          hind = 0;
        } else if (ind > horBut.length - 1) {
          hind = horBut.length - 1;
        } else {
          hind = ind;
        }

        HorMakeSelected();
        AllVerMakeSelected();
        HorTrans();
      }
    } else if (swiTarget == "ver" && !isPopUpOpen) {
      var _ind2, _indtrans2;

      _indtrans2 = (verswi - verswi % (swi * 0.5)) / (swi * 0.5);
      _ind2 = vind0 - _indtrans2;
      VerMakeSelectable();

      if (_ind2 <= 0) {
        vind[hind] = 0;
      } else if (_ind2 > verBut[hind].length - 1) {
        vind[hind] = verBut[hind].length - 1;
      } else {
        vind[hind] = _ind2;
      }

      VerMakeSelected();
      VerTrans();
    }
  }
}

function TouchEnd(event) {
  swiTarget = 0;
  clickPermission = true;
  scrollPermission = true;
  keyDownPermission = true;
} // !Задаем функции клавиатуры


function KeyDown(e) {
  var key = e.key;

  if (key == "ArrowLeft") {
    if (keyDownPermission && !isPopUpOpen) {
      if (hind < 1) {//nothing
      } else if (hind < horBut.length - 1) {
        HorMakeSelectable();
        AllVerMakeSelectable();
        hind--;
        HorMakeSelected();
        AllVerMakeSelected();
        HorTrans();
      } else {
        HorMakeSelectable();
        AllVerMakeSelectable();
        hind--;
        HorMakeSelected();
        AllVerMakeSelected();
        HorTrans();
      }
    }
  } else if (key == "ArrowUp") {
    if (keyDownPermission && !isPopUpOpen) {
      if (verBut[hind].length > 1) {
        if (vind[hind] < 1) {//nothing
        } else if (vind[hind] < verBut[hind].length - 1) {
          VerMakeSelectable();
          vind[hind]--;
          VerTrans();
          VerMakeSelected();
        } else {
          VerMakeSelectable();
          vind[hind]--;
          VerTrans();
          VerMakeSelected();
        }
      }
    }
  } else if (key == "ArrowRight") {
    if (keyDownPermission && !isPopUpOpen) {
      if (hind < 1) {
        HorMakeSelectable();
        AllVerMakeSelectable();
        hind++;
        HorMakeSelected();
        AllVerMakeSelected();
        HorTrans();
      } else if (hind < horBut.length - 1) {
        HorMakeSelectable();
        AllVerMakeSelectable();
        hind++;
        HorMakeSelected();
        AllVerMakeSelected();
        HorTrans();
      } else {//nothing
      }
    }
  } else if (key == "ArrowDown") {
    if (keyDownPermission && !isPopUpOpen) {
      if (verBut[hind].length > 1) {
        if (vind[hind] < 1) {
          VerMakeSelectable();
          vind[hind]++;
          VerTrans();
          VerMakeSelected();
        } else if (vind[hind] < verBut[hind].length - 1) {
          VerMakeSelectable();
          vind[hind]++;
          VerTrans();
          VerMakeSelected();
        } else {//nothing
        }
      }
    }
  } else if (e.keyCode == 13) {
    if (!isPopUpOpen && wasEnterUp) {
      wasEnterUp = false;
      verBut[hind][vind[hind]].click();
    } else if (isPopUpOpen && wasEnterUp) {
      wasEnterUp = false;
      ClosePopUp();
    }
  }
}

function EnterClose(e) {
  if (e.keyCode == 13) {
    wasEnterUp = true;
  }
} // ?Задаем вспомогательные функции


function AllVerMakeSelectable() {
  ver[hind].classList.remove('allvertical__selected');
  ver[hind].classList.add('allvertical__selectable');
}

function AllVerMakeSelected() {
  ver[hind].classList.remove('allvertical__selectable');
  ver[hind].classList.add('allvertical__selected');
}

function HorMakeSelectable() {
  horBut[hind].classList.remove('horizontal__selected');
  horBut[hind].classList.add('horizontal__selectable');
}

function HorMakeSelected() {
  horBut[hind].classList.remove('horizontal__selectable');
  horBut[hind].classList.add('horizontal__selected');
}

function VerMakeSelectable() {
  verBut[hind][vind[hind]].classList.remove('vertical__selected');
  verBut[hind][vind[hind]].classList.add('vertical__selectable');
}

function VerMakeSelected() {
  verBut[hind][vind[hind]].classList.remove('vertical__selectable');
  verBut[hind][vind[hind]].classList.add('vertical__selected');
}

function HorTrans() {
  var horX = horLeftPos - horLeftTrans * hind,
      allVerX = allVerLeftPos - allVerLeftTrans * hind;
  hor.style.left = horX + "px";
  allVer.style.left = allVerX + "px";
  WinChange();
  ArrowsRules();
}

function VerTrans() {
  var verY = 0 - vind[hind] * verTopTrans;
  ver[hind].style.top = verY + "px";
}

function ArrowsRules() {
  if (vw < 768) {
    if (hind == 0) {
      arrowL.style.width = 0;
      arrowR.style.width = "20px";
    } else if (hind == horBut.length - 1) {
      arrowR.style.width = 0;
      arrowL.style.width = "20px";
    } else {
      arrowL.style.width = "20px";
      arrowR.style.width = "20px";
    }
  }
}

function WinChange() {
  for (var _i6 = 0; _i6 < win.length; _i6++) {
    win[_i6].classList.remove('win_selected');
  }

  win[hind].classList.add('win_selected');
}

function CallPopUp() {
  // Запретить управление
  // Скрыть hor и ver
  // Открыть info
  // Добавить крестик
  // Возможность выйти
  isPopUpOpen = true; // Запретить управление

  clickPermission = false;
  scrollPermission = false;
  swipePermission = false;
  mouseDownPermission = false;
  keyDownPermission = false; // Скрыть hor, ver и arrows

  hor.style.opacity = 0;
  allVer.style.opacity = 0;
  arrowL.style.width = "0px";
  arrowR.style.width = "0px"; // Открыть info

  group[hind].style.transform = "scale(1)";
  info[hind][vind[hind]].style.transform = "scale(1)";
  main.style.zIndex = "30";
  tapfield[hind].style.height = "100vh"; // Добавить крестик

  var close = document.createElement('div'); //Вставить крестик в контент

  close.className = "close";
  close.innerHTML = "X";
  info[hind][vind[hind]].prepend(close); // Возможность выйти

  tapfield[hind].addEventListener('click', ClosePopUp, false);
  document.querySelector('.close').addEventListener('click', ClosePopUp, false);
}

function ClosePopUp() {
  // удалить listeners для выхода
  // удалить крестик
  // свернуть info
  // вернуть hor, ver и arrows
  // разрешить управление
  // удалить listeners для выхода
  tapfield[hind].removeEventListener('click', ClosePopUp, false);
  document.querySelector('.close').removeEventListener('click', ClosePopUp, false); // удалить крестик

  document.querySelector('.close').remove(); // свернуть info

  group[hind].style.transform = "scale(0)";
  info[hind][vind[hind]].style.transform = "scale(0)";
  main.style.zIndex = "0";
  tapfield[hind].style.height = "0"; // вернуть hor, ver и arrows

  allVer.style.opacity = 1;
  hor.style.opacity = 1;
  ArrowsRules(); // разрешить управление

  clickPermission = true;
  scrollPermission = true;
  swipePermission = true;
  mouseDownPermission = true;
  keyDownPermission = true;
  isPopUpOpen = false;
}

function FlipIcon() {
  var f = verBut[hind][vind[hind]].querySelectorAll('.flip');

  if (flip == 0) {
    flip = 1;
    f[0].style.transform = "rotateY(180deg)";
    f[1].style.transform = "rotateY(360deg)";
  } else {
    flip = 0;
    f[0].style.transform = "rotateY(0deg)";
    f[1].style.transform = "rotateY(180deg)";
  }

  if (verBut[hind][vind[hind]].classList.contains('colortheme')) {
    if (localColor == 'blue') {
      localStorage.setItem('colorTheme', 'red');
      document.body.style.background = "linear-gradient(#000 0%, #b33939 40%, #b33939 60%, #000 100%)";
    } else {
      localStorage.setItem('colorTheme', 'blue');
      document.body.style.background = "linear-gradient(#000 0%, #40407a 40%, #40407a 60%, #000 100%)";
    }

    localColor = localStorage.getItem('colorTheme');
  }
}

function Quality() {
  if (localQuality == "false") {
    localStorage.setItem('needQuality', 'true');
    location.reload();
  } else {
    localStorage.setItem('needQuality', 'false');
    location.reload();
  }
}