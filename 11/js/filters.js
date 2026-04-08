const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const sizeInput = document.querySelector('.scale__control--value');
const preview = document.querySelector('.img-upload__preview img');
const STEP_SCALE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

setScale(MAX_SCALE); // Значение по умолчанию.

/**
 * Обработчик для кнопки уменьшения.
 */
smallerButton.addEventListener('click', () => {
  const currentValue = parseInt(sizeInput.value, 10);
  const newValue = Math.max(currentValue - STEP_SCALE, MIN_SCALE);
  setScale(newValue);

});

/**
 * Обработчик для кнопки увеличения.
 */
biggerButton.addEventListener('click', () => {
  const currentValue = parseInt(sizeInput.value, 10);
  const newValue = Math.min(currentValue + STEP_SCALE, MAX_SCALE);
  setScale(newValue);
});

/**
 * Функция добавляет посчитанные результаты в поле-значение и добавляет свойство картинке (меняет размер).
 * @param {Number} newValue
 */
function setScale(newValue) {
  const fraction = (newValue) / 100;
  sizeInput.value = `${newValue}%`;
  preview.style.transform = `scale(${fraction})`;
}

// Делаем фильтры

const effectsList = document.querySelector('.effects__list');
const sliderElement = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const effectLevel = document.querySelector('.img-upload__effect-level');

const effects = {
  none: {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    style: 'none',
    unit: '',
  },
  chrome: { // «Хром» — filter: grayscale(0..1) с шагом 0.1.
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    style: 'grayscale',
    unit: '',
  },
  sepia: { // «Сепия» — filter: sepia(0..1) с шагом 0.1.
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    style: 'sepia',
    unit: '',
  },
  marvin: { // «Марвин» — filter: invert(0..100%) с шагом 1%.
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    style: 'invert',
    unit: '%',
  },
  phobos: { // «Фобос» — filter: blur(0..3px) с шагом 0.1px.
    range: { min: 0, max: 3 },
    start: 3,
    step: 0.1,
    style: 'blur',
    unit: 'px',
  },
  heat: { // «Зной» — filter: brightness(1..3) с шагом 0.1.
    range: { min: 1, max: 3 },
    start: 3,
    step: 0.1,
    style: 'brightness',
    unit: '',
  },
};

let currentEffect = 'none'; // По умолчанию.

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

effectLevel.classList.add('hidden');

/**
 * Применяем фильтр и записывает значение.
 * @returns Превью с примененным фильтром и выставленный слайдер.
 */
function applyEffect() {
  const sliderValue = sliderElement.noUiSlider.get();
  const effectSettings = effects[currentEffect];

  if (currentEffect === 'none') { // Фильтр убирается, слайдер скрывается.
    preview.style.filter = 'none';
    effectValue.value = '';
    return;
  }

  preview.style.filter = `${effectSettings.style}(${sliderValue}${effectSettings.unit})`;
  effectValue.value = sliderValue;
}

/**
 * Обновляем слайдер под выбранный эффект.
 */
function updateSlider() {
  const effectSettings = effects[currentEffect];

  sliderElement.noUiSlider.updateOptions({
    range: effectSettings.range,
    start: effectSettings.start,
    step: effectSettings.step,
  });

  if (currentEffect === 'none') {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }
}

effectsList.addEventListener('change', (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }

  currentEffect = evt.target.value;
  updateSlider();
  applyEffect();
});

sliderElement.noUiSlider.on('update', () => {
  applyEffect();
});
