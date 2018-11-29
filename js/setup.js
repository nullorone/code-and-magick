'use strict';

var WIZARD_NAME = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WIZARD_SURNAME = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var WIZARD_COAT_COLOR = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var WIZARDS_NUMBER = 4;

var ENTER_KEYCODE = 13;

var ESC_KEYCODE = 27;

var playerMenu = document.querySelector('.setup-open-icon');
var setupContainer = document.querySelector('.setup');

// Находим случайное число в указанных диапазонах
var getRandomInt = function (min, max) {
  var randomInteger = Math.floor(Math.random() * (max - min) + min);
  return randomInteger;
};

var showPlayerMenu = function () {
  setupContainer.classList.remove('hidden');
  document.removeEventListener('keydown', showPlayerMenuKeydown);
};

var hidePlayerMenu = function () {
  setupContainer.classList.add('hidden');
  document.removeEventListener('keydown', hidePlayerMenuKeydown);
};

var getWizards = function () {
  var wizards = [];
  for (var i = 0; i < WIZARDS_NUMBER; i++) {
    var wizardTemplate = {
      'name': WIZARD_NAME[getRandomInt(0, WIZARD_NAME.length)] +
        ' ' +
        WIZARD_SURNAME[getRandomInt(0, WIZARD_SURNAME.length)],
      'coatColor': WIZARD_COAT_COLOR[getRandomInt(0, WIZARD_COAT_COLOR.length)],
      'eyesColor': WIZARD_EYES_COLOR[getRandomInt(0, WIZARD_EYES_COLOR.length)]
    };
    wizards.push(wizardTemplate);
  }
  return wizards;
};

var getSimilarWizards = function (wizards) {
  var fragment = document.createDocumentFragment();
  var wizardsList = document.querySelector('.setup-similar-list');
  var wizardTemplate = document
    .querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');
  for (var i = 0; i < wizards.length; i++) {
    var wizardElement = wizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent =
      wizards[i].name;
    wizardElement.querySelector('.wizard-coat').style.fill =
      wizards[i].coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill =
      wizards[i].eyesColor;
    fragment.appendChild(wizardElement);
  }
  return wizardsList.appendChild(fragment);
};

getSimilarWizards(getWizards());

var setupSimilar = document.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');

// Иконка закрытия меню игрока
var buttonClosePlayerMenu = setupContainer.querySelector('.setup-close');

// Показываем меню игрока при клике на иконку игрока
var onUserIconClick = playerMenu.addEventListener('click', showPlayerMenu);

// Скрываем меню игрока при клике на кнопку закрытия меню игрока
var onButtonCloseClick = buttonClosePlayerMenu.addEventListener('click', hidePlayerMenu);

// Открывает меню игрока при фокусе на иконку игрока и нажатии Enter
var showPlayerMenuKeydown = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    showPlayerMenu();
  }
};

// Добавляет класс hidden если был нажат Esc
var hidePlayerMenuKeydown = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    hidePlayerMenu();
  }
};

// Показываем меню игрока при фокусе на иконке игрока и нажатии Enter
var onUserIconKeydown = playerMenu.addEventListener('keydown', showPlayerMenuKeydown);

var onPopupPlayerMenuKeydown = playerMenu.addEventListener('keydown', hidePlayerMenuKeydown);

