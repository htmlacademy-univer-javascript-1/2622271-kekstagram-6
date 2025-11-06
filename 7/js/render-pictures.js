const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPicture = (picture)=>{
  const {url, description, comments, likes} = picture;
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('picture_img').src = url;
  pictureElement.querySelector('picture_img').alt = description;
  pictureElement.querySelector('picture_comments').textContent = comments.length;
  pictureElement.querySelector('picture_likes').textContent = likes;

  return pictureElement;
};

const renderPictures = (objects)=>{
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < objects.length; i++){
    fragment.appendChild(renderPicture(objects[i]));
  }
  pictures.appendChild(fragment);
};

export {renderPictures};
