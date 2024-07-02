import axios from 'axios';

const form = document.getElementById('subscribtionForm');
const formEmail = form.querySelector('input[name="email"]');
const formBtn = document.getElementById('subscribtionFormBtn');

const isValidEmail = (email) => {
  const emailRegex = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return emailRegex.test(email);
};

const validation = () => {
  const emailValue = formEmail.value.trim();
  const isValid = isValidEmail(emailValue);
  const whiteColor = getComputedStyle(
    document.documentElement,
  ).getPropertyValue('--color-white');

  if (isValid) {
    formEmail.style.borderColor = whiteColor;
    formBtn.disabled = false;
  } else {
    if (emailValue === '') {
      formEmail.style.borderColor = whiteColor;
    } else {
      formEmail.style.borderColor = 'red';
    }
    formBtn.disabled = true;
  }
};

document.addEventListener('DOMContentLoaded', validation);
formEmail.addEventListener('input', validation);

const subscribe = async (e) => {
  e.preventDefault();

  try {
    formBtn.disabled = true;

    const response = await axios.post(
      'https://your-energy.b.goit.study/api/subscription',
      JSON.stringify({ email: formEmail.value.trim() }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    form.reset();
    console.log('Successful operation:', response.status, response.statusText);
  } catch (err) {
    if (err.response) {
      if (err.response.status === 409) {
        form.reset();
        console.log(
          'Subscription already exists:',
          err.response.status,
          err.response.statusText,
        );
      } else {
        console.log(
          'Server Error:',
          err.response.status,
          err.response.statusText,
        );
      }
    } else {
      console.log('Error:', err.message);
    }
  }
};

form.addEventListener('submit', subscribe);
