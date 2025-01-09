export const openModal = (modal) => {
  modal.classList.add('popup_is-opened');
  modal.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', closeEscButton);
};

export const closeModal = (modal) => {
  modal.classList.remove('popup_is-opened');
  modal.removeEventListener('click', closeOverlay);
  document.removeEventListener('keydown', closeEscButton);
};

const closeEscButton = (event) => {
  if (event.key === "Escape") {
    const openModal = document.querySelector('.popup_is-opened');
    closeModal(openModal);
  };
 };

 const closeOverlay = (evt) => {
  if (evt.target === evt.currentTarget ) {
    closeModal(evt.currentTarget);
  };
 };