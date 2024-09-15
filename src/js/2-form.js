const FEEDBACK_FORM_LS = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

window.addEventListener('DOMContentLoaded', checkLocalStorage);
form.addEventListener('input', handleFormValues);
form.addEventListener('submit', handleFormSubmit);

let formData = {
  email: '',
  message: '',
};

function handleFormValues() {
  const emailValue = form.elements.email.value.trim();
  const textAreaValue = form.elements.message.value.trim();

  formData.email = emailValue;
  formData.message = textAreaValue;

  localStorage.setItem(FEEDBACK_FORM_LS, JSON.stringify(formData));
}

function checkLocalStorage() {
  const valueLS = localStorage.getItem(FEEDBACK_FORM_LS);

  if (valueLS) {
    const saveData = JSON.parse(valueLS);
    formData = { ...formData, ...saveData };

    form.elements.email.value = formData.email || '';
    form.elements.message.value = formData.message || '';
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return;
  } else {
    console.log(formData);
  }
  localStorage.removeItem(FEEDBACK_FORM_LS);
  form.reset();
  formData = { email: '', message: '' };
}
