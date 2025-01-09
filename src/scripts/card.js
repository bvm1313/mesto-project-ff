import { pushLike, deletLike } from './api.js';

const cardTemplate = document.querySelector("#card-template").content;
 
export const createCard = (item, deleteCardPopup, likeCardClick, openImageCard, userId) => {
  const elementCard = cardTemplate.querySelector(".card").cloneNode(true);
  const elementCardTitle = elementCard.querySelector(".card__title");
  const elementCardImage = elementCard.querySelector(".card__image");
  const deleteButton =  elementCard.querySelector(".card__delete-button");
  const likeCardButton = elementCard.querySelector(".card__like-button"); 
  const totalLikes = elementCard.querySelector(".card__like-total"); 
  
  elementCardTitle.textContent = item.name; 
  elementCardImage.src = item.link;
  elementCardImage.alt = item.alt;  
  totalLikes.textContent = item.likes.length;

  // проверяем ставили ли уже лайк карточке
  const isLiked = item.likes.some((like) => {
    return like._id === userId
    })
  if (isLiked) {
    likeCardButton.classList.add('card__like-button_is-active');
  }
  // проверяем наша ли эта карточка и покажем иконку корзины
  if (item.owner._id === userId) {
    deleteButton.classList.add('card__delete-button-visible');
    deleteButton.addEventListener('click', () => {
      deleteCardPopup(elementCard, item._id);
      })
  }
  
  likeCardButton.addEventListener('click', () =>
     likeCardClick(likeCardButton, item._id, totalLikes));
  elementCardImage.addEventListener('click',() => openImageCard(elementCardImage.src, elementCardTitle.textContent));
  return elementCard;
};

export const likeCardClick = (likeIcon, cardId, allLikes) => {
  const likeMethod = likeIcon.classList.contains('card__like-button_is-active') ? deletLike : pushLike;
likeMethod(cardId) 
  .then((likeCard) => { 
    likeIcon.classList.toggle('card__like-button_is-active'); 
    allLikes.textContent = likeCard.likes.length;
  })
.catch(err => console.log(err));
};
