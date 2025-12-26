import '../nouislider/nouislider.js';

const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;
const DEFAULT_SCALE = 100;

const EFFECTS = {
  none: {
    min: 0,
    max: 100,
    step: 1,
    unit: '',
    filter: null,
    className: 'effects__preview--none'
  },
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
    filter: 'grayscale',
    className: 'effects__preview--chrome'
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
    filter: 'sepia',
    className: 'effects__preview--sepia'
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
    filter: 'invert',
    className: 'effects__preview--marvin'
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
    filter: 'blur',
    className: 'effects__preview--phobos'
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
    filter: 'brightness',
    className: 'effects__preview--heat'
  }
};

const form = document.querySelector('.img-upload__form');
const scaleControlValue = form.querySelector('.scale__control--value');
const scaleSmallerButton = form.querySelector('.scale__control--smaller');
const scaleBiggerButton = form.querySelector('.scale__control--bigger');
const previewImage = form.querySelector('.img-upload__preview img');
const effectsList = form.querySelector('.effects__list');
const effectLevelContainer = form.querySelector('.img-upload__effect-level');
const effectLevelSlider = form.querySelector('.effect-level__slider');
const effectLevelValue = form.querySelector('.effect-level__value');

let currentScale = DEFAULT_SCALE;
let currentEffect = 'none';
let slider = null;

const updateScale = (newScale) => {
  currentScale = newScale;
  scaleControlValue.value = `${currentScale}%`;

  const scaleValue = currentScale / 100;
  previewImage.style.transform = `scale(${scaleValue})`;
};

const onScaleSmallerClick = () => {
  const newScale = currentScale - SCALE_STEP;
  if (newScale >= MIN_SCALE) {
    updateScale(newScale);
  }
};

const onScaleBiggerClick = () => {
  const newScale = currentScale + SCALE_STEP;
  if (newScale <= MAX_SCALE) {
    updateScale(newScale);
  }
};

const initScale = () => {
  updateScale(DEFAULT_SCALE);
  scaleSmallerButton.addEventListener('click', onScaleSmallerClick);
  scaleBiggerButton.addEventListener('click', onScaleBiggerClick);
};

const resetScale = () => {
  updateScale(DEFAULT_SCALE);
  scaleSmallerButton.removeEventListener('click', onScaleSmallerClick);
  scaleBiggerButton.removeEventListener('click', onScaleBiggerClick);
};

const applyEffect = (value) => {
  const effect = EFFECTS[currentEffect];

  if (currentEffect === 'none') {
    previewImage.style.filter = 'none';
    previewImage.className = '';
    previewImage.classList.add('effects__preview--none');
    return;
  }

  const filterValue = `${effect.filter}(${value}${effect.unit})`;
  previewImage.style.filter = filterValue;
  previewImage.className = '';
  previewImage.classList.add(effect.className);
};

const createSlider = () => {
  if (slider) {
    slider.destroy();
    slider = null;
  }

  const effect = EFFECTS[currentEffect];

  if (currentEffect === 'none') {
    return;
  }

  slider = noUiSlider.create(effectLevelSlider, {
    range: {
      min: effect.min,
      max: effect.max
    },
    start: effect.max,
    step: effect.step,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  });

  slider.on('update', () => {
    const value = slider.get();
    effectLevelValue.value = value;
    applyEffect(value);
  });
};

const updateSliderVisibility = () => {
  if (currentEffect === 'none') {
    effectLevelContainer.classList.add('hidden');
    effectLevelValue.value = '';
  } else {
    effectLevelContainer.classList.remove('hidden');
  }
};

const onEffectChange = (evt) => {
  if (evt.target.type === 'radio') {
    currentEffect = evt.target.value;

    updateSliderVisibility();

    if (currentEffect !== 'none') {
      createSlider();
      const effect = EFFECTS[currentEffect];
      if (slider) {
        slider.set(effect.max);
      }
      applyEffect(effect.max);
    } else {
      if (slider) {
        slider.destroy();
        slider = null;
      }
      applyEffect(0);
    }
  }
};

const initEffects = () => {
  effectLevelContainer.classList.add('hidden');

  const defaultEffect = form.querySelector('#effect-none');
  defaultEffect.checked = true;
  currentEffect = 'none';

  effectsList.addEventListener('change', onEffectChange);

  applyEffect(0);

  if (slider) {
    slider.destroy();
    slider = null;
  }
};

const resetEffects = () => {
  const defaultEffect = form.querySelector('#effect-none');
  defaultEffect.checked = true;

  currentEffect = 'none';
  updateSliderVisibility();

  if (slider) {
    slider.destroy();
    slider = null;
  }

  previewImage.style.filter = 'none';
  previewImage.className = '';
  previewImage.classList.add('effects__preview--none');
  effectLevelValue.value = '';

  effectsList.removeEventListener('change', onEffectChange);
};

const initEffectsModule = () => {
  initScale();
  initEffects();
};

const resetEffectsModule = () => {
  resetScale();
  resetEffects();
};

export { initEffectsModule, resetEffectsModule };
