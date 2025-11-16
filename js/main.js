import { generatePhotos } from './photo.js';
import { renderPictures } from './render-pictures.js';
import './big-picture.js';

renderPictures(generatePhotos());
