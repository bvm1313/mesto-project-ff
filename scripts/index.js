const cardTemplate = document.querySelector("#card-template").content;

const placesList = document.querySelector(".places__list");

const createCard = (item, deleteCard) => {
  const elementCard = cardTemplate.querySelector(".card").cloneNode(true);
  elementCard.querySelector(".card__title").textContent = item.name; 
  elementCard.querySelector(".card__image").src = item.link;
  elementCard.querySelector(".card__image").alt = item.alt;  
  const deleteButton =  elementCard.querySelector(".card__delete-button");
  deleteButton.addEventListener('click', deleteCard);
  return elementCard;
};

function deleteCard(evt) {
    const listItem = evt.target.closest(".card");
    listItem.remove();
} ;
  
initialCards.forEach((item) => {
  const card = createCard(item, deleteCard);
  placesList.append(card);
});

