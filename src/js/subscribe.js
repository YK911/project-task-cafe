import axios from 'axios';

const form = document.getElementById('subscribtionForm');
const formEmail = form.querySelector('input[name="email"]');
const formBtn = document.getElementById('subscribtionFormBtn');

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
    if (response.status === 201) {
      form.reset();
      console.log('Success:', response.status, response.statusText);
    } else {
      console.log('Server Error:', response.status, response.statusText);
    }
  } catch (err) {
    console.log('Error:', err.message);
  } finally {
    formBtn.disabled = false;
  }
};

form.addEventListener('submit', subscribe);
