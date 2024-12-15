import '../styles/index.css';
import { initialCards, createCard, likeCardClick, deleteCard, openImageCard} from './cards';
import { openModal, closeModal} from './modal';

const placesList = document.querySelector(".places__list");
const addButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const closeButtons = document.querySelectorAll('.popup__close');
const formElement = document.forms.editProfile;  
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;
const formProfileTitle = document.querySelector('.profile__title');
const formProfileDescription = document.querySelector('.profile__description');
const valueFormProfileTitle = formProfileTitle.textContent;
const valueFormProfileDescription = formProfileDescription.textContent;
nameInput.value = valueFormProfileTitle;
jobInput.value = valueFormProfileDescription;
const formCard = document.forms.newPlace;
const namePlaceCard = formCard.elements.placeName;
const linkPlaceCard = formCard.elements.link;

function handleFormSubmit(evt) {
  evt.preventDefault(); 
  formProfileTitle.textContent = nameInput.value;
  formProfileDescription.textContent = jobInput.value;
  closeModal(popupEdit);
}

function addFormsSubmit(evt) {
  evt.preventDefault();
  const nameCard = namePlaceCard.value;
  const linkCard = linkPlaceCard.value;
  const item = {
    name: nameCard,
    link: linkCard,
    alt: nameCard
  };
  const card = createCard(item, deleteCard, likeCardClick, openImageCard);
  placesList.prepend(card);
  closeModal(popupNewCard);
  formCard.reset();
};

initialCards.forEach((item) => {
  const card = createCard(item, deleteCard, likeCardClick, openImageCard);
  placesList.append(card);
});

addButton.addEventListener('click', function() {
  openModal(popupNewCard);
});

editButton.addEventListener('click', function() {
  openModal(popupEdit);
});

closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closeModal(popup);
  });
 });

formElement.addEventListener('submit', handleFormSubmit);

formCard.addEventListener('submit', addFormsSubmit);


