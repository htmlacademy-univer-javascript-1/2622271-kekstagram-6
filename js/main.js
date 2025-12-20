import { renderPictures } from './render-pictures.js';
import { initUploadForm } from './form.js';
import { loadData } from './api.js';
import { showError } from './messages.js';
import { initFilters } from './filters.js';
import './big-picture.js';
import './valid.js';

const loadAndRenderPhotos = async () => {
  try {
    const photos = await loadData();
    renderPictures(photos);

    initFilters(photos, renderPictures);
  } catch (error) {
    showError(error.message);
  }
};

loadAndRenderPhotos();
initUploadForm();
