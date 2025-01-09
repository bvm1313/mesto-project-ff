import '../styles/index.css';
import { createCard, likeCardClick } from './cards.js';
import { openModal, closeModal} from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getInfoUser, patchAvatarUpdate, getAllCards, patchEditProfile, postNewCard, deleteCardId} from './api.js';
 
const placesList = document.querySelector(".places__list");
const addButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const closeButtons = document.querySelectorAll('.popup__close');
const formElementProfile = document.forms.editProfile;  
const nameInput = formElementProfile.elements.name;
const jobInput = formElementProfile.elements.description;
const formProfileTitle = document.querySelector('.profile__title');
const formProfileDescription = document.querySelector('.profile__description');
const formProfileImage = document.querySelector('.profile__image');
const formCard = document.forms.newPlace;
const namePlaceCard = formCard.elements.placeName;
const linkPlaceCard = formCard.elements.link;
const popupTypeImage = document.querySelector('.popup_type_image'); 
const popupImage = document.querySelector('.popup__image'); 
const popupCaption = document.querySelector('.popup__caption');
const popupAvatar = document.querySelector('.popup_type_avatar');
const formAvatar = document.forms.editProfileAvatar;
const deletePopup = document.querySelector('.popup_type_delete');
const avatarInput = formAvatar.elements.avatar;
const formDeleteCard = document.forms.deleteCard; 
const popupFormConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
let userId = null;
let cardIdWillBeDelete = null;
let cardDelete = null;

const renderingCards = (cards, deleteCardPopup, likeCardClick, openImageCard, userId) => {
  cards.forEach((item) => {
    const card = createCard(item, deleteCardPopup, likeCardClick, openImageCard, userId);
    placesList.append(card);
  });
};

const renderLoading = (isLoading, button) => {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
};

const openImageCard = (imageSource, imageName) => {
  popupImage.src = imageSource;
  popupImage.alt = imageName;
  popupCaption.textContent = imageName;
  openModal(popupTypeImage);
};

addButton.addEventListener('click', function() {
  clearValidation(formCard, popupFormConfig);
  openModal(popupNewCard);
});

editButton.addEventListener('click', function() {
  nameInput.value = formProfileTitle.textContent;
  jobInput.value = formProfileDescription.textContent;
  clearValidation(formElementProfile, popupFormConfig);
  openModal(popupEdit);
});

formProfileImage.addEventListener('click', function () {
  clearValidation(formAvatar, popupFormConfig);
  openModal(popupAvatar);
});

closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closeModal(popup);
  });
 });

enableValidation(popupFormConfig);

// получаем от сервера информацию о пользователе и все карточки
Promise.all([getInfoUser(), getAllCards()])
.then(([infoUser, allCards]) => {
  userId = infoUser._id;
  formProfileTitle.textContent = infoUser.name;
  formProfileDescription.textContent = infoUser.about;
  formProfileImage.style.backgroundImage = `url(${infoUser.avatar})`;
  renderingCards(allCards, deleteCardPopup, likeCardClick, openImageCard, userId);
})
.catch((err) => {
  console.log(err);
})

// изменяем профиль
const editProfileFormSubmit = (evt) => {
  evt.preventDefault(); 
  const popupButton = formElementProfile.querySelector('.popup__button');
  renderLoading(true, popupButton);
  const newName = nameInput.value;
  const newJob = jobInput.value;
  patchEditProfile(newName, newJob)
   .then((newData) => {
    formProfileTitle.textContent = newData.name;
    formProfileDescription.textContent = newData.about;
    closeModal(popupEdit);
  })
   .catch((err) => {
    console.log(err);
   })
   .finally(()=> {
    renderLoading(false, popupButton);
   })
};

//изменяем аватар профиля
const editProfileAvatar = (evt) => {
  evt.preventDefault();
  const popupButton = formAvatar.querySelector('.popup__button');
  renderLoading(true, popupButton);
  const newAvatar = avatarInput.value;
  patchAvatarUpdate(newAvatar)
    .then((newUrl) => {
      formProfileImage.style.backgroundImage  = `url(${newUrl.avatar})`;
      closeModal(popupAvatar);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(()=> {
      renderLoading(false, popupButton);
     })
}

// добавление новой карточки на сервер
const addNewPlaceFormsSubmit = (evt) => {
  evt.preventDefault();
  const popupButton = formCard.querySelector('.popup__button');
  renderLoading(true, popupButton);
  const newNameCard = namePlaceCard.value;
  const newLinkCard = linkPlaceCard.value;
  postNewCard(newNameCard, newLinkCard)
    .then((newCard) => {
      const card = createCard(newCard, deleteCardPopup, likeCardClick, openImageCard, userId);
      placesList.prepend(card);
      closeModal(popupNewCard);
      formCard.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupButton);
    })
};

//попап удаления карточки
const deleteCardPopup = (cardElement, cardId) => {
  cardDelete = cardElement;
  cardIdWillBeDelete = cardId;
  openModal(deletePopup);
};

const deleteCard = () => {
  deleteCardId(cardIdWillBeDelete) 
    .then(() => { 
      closeModal(deletePopup);
      cardDelete.remove();
    }) 
    .catch((err) => { 
      console.log(err);
    })
};

//событие по изменению профиля
formElementProfile.addEventListener('submit', editProfileFormSubmit);

//событие по изменению аватара
formAvatar.addEventListener('submit', editProfileAvatar);

//событие по добавлению карточки
formCard.addEventListener('submit', addNewPlaceFormsSubmit);

//событие по удалению карточки
formDeleteCard.addEventListener('submit',  deleteCard);

