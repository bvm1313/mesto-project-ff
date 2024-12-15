const cardTemplate = document.querySelector("#card-template").content;

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
      alt:  "гора Архыз",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
      alt: "Небольшое озеро в снежному лесу",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
      alt: "Многоэажки в городе",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
      alt: "гора в Камчатке",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
      alt: "Железная дорога в лесу",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
      alt: "озеро Байкал в зимой",
    }
];

export const createCard = (item, deleteCard, likeCardClick, openImageCard) => {
  const elementCard = cardTemplate.querySelector(".card").cloneNode(true);
  const elementCardTitle = elementCard.querySelector(".card__title");
  elementCardTitle.textContent = item.name; 
  const elementCardImage = elementCard.querySelector(".card__image");
  elementCardImage.src = item.link;
  elementCardImage.alt = item.alt;  
  const deleteButton =  elementCard.querySelector(".card__delete-button");
  deleteButton.addEventListener('click', deleteCard);
  const likeCardButton = elementCard.querySelector(".card__like-button"); 
  likeCardButton.addEventListener('click', likeCardClick);
  elementCardImage.addEventListener('click',() => openImageCard(elementCardImage.src, elementCardTitle.textContent));
  return elementCard;
};

export const likeCardClick = (evt) => {
  if (evt.target.classList.contains('card__like-button')) {
      evt.target.classList.toggle('card__like-button_is-active');
  }
};

export const deleteCard = (evt) => {
  const listItem = evt.target.closest(".card");
  listItem.remove();
};

