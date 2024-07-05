import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { showLoader, hideLoader } from './loader';

const form = document.getElementById('subscribtionForm');
(() => {
  if (!form) return;
  const formEmail = form.querySelector('input[name="email"]');
  const formBtn = document.getElementById('subscribtionFormBtn');

  const isValidEmail = (email) => {
    const emailRegex = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return emailRegex.test(email);
  };

  const validation = () => {
    const emailValue = formEmail.value.trim();
    const isValid = isValidEmail(emailValue);

    if (isValid) {
      formEmail.style.borderColor = '';
      formBtn.disabled = false;
    } else {
      if (emailValue === '') {
        formEmail.style.borderColor = '';
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

      showLoader();

      await axios.post(
        'https://your-energy.b.goit.study/api/subscription',
        JSON.stringify({ email: formEmail.value.trim() }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      form.reset();

      iziToast.success({
        title: 'OK',
        message: 'You have subscribed!',
        position: 'topRight',
      });
    } catch (err) {
      if (err.response) {
        if (err.response.status === 409) {
          form.reset();

          iziToast.warning({
            title: 'OK',
            message: 'Subscription already exists.',
            position: 'topRight',
          });
        } else {
          iziToast.error({
            title: 'Oops',
            message: err.response.statusText,
            position: 'topRight',
          });
        }
      } else {
        iziToast.error({
          title: 'Oops',
          message: err.message,
          position: 'topRight',
        });
      }
    } finally {
      hideLoader();
    }
  };

  form.addEventListener('submit', subscribe);
})();
