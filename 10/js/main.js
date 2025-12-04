import { generatePhotos } from './photo.js';
import { renderPictures } from './render-pictures.js';
import { initUploadForm } from './form.js';
import './big-picture.js';
import './valid.js';

renderPictures(generatePhotos());
initUploadForm();

