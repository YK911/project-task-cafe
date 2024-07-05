import axios from 'axios';
import moment from 'moment';
import { BLOCKQUOTE_KEY, DATE_FORMAT } from './config';

function getCurrentDate() {
  return moment().utc().format(DATE_FORMAT);
}

function isSameDate(firstDate, secondDate) {
  return moment(firstDate)
    .utc()
    .isSame(moment(secondDate, DATE_FORMAT).utc(), 'day');
}

async function getBlockQuoteData() {
  const currentDate = getCurrentDate();
  const storedValue = localStorage.getItem(BLOCKQUOTE_KEY);

  if (storedValue && isSameDate(currentDate, storedValue.date)) {
    return JSON.parse(storedValue).data;
  }

  const result = await axios.get('https://your-energy.b.goit.study/api/quote');
  const { data } = result;

  if (data) {
    localStorage.setItem(
      BLOCKQUOTE_KEY,
      JSON.stringify({
        data,
        date: currentDate,
      }),
    );
  }

  return data;
}

(async () => {
  const blockQuoteData = await getBlockQuoteData();

  if (!blockQuoteData || !blockQuoteData.author || !blockQuoteData.quote) {
    console.log(
      `Can't retrieve fresh quote of the day data from provider's API`,
    );
  }

  const quoteBlock = document.querySelector('.quote-block');
  const quoteDesc = quoteBlock.querySelector('.quote-desc');
  const quoteAuthor = quoteBlock.querySelector('.quote-author');

  quoteDesc.textContent = blockQuoteData.quote;
  quoteAuthor.textContent = blockQuoteData.author;
})();
