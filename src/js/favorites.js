import { getExerciseDetailsById, buildExerciseCard } from './exercise-service';
import { showLoader, hideLoader } from './loader';
import { deleteExerciseDetailsById } from './exercises-shared';
import { FAVORITES_KEY } from './config';

// Function to display exercise IDs from local storage
function displayExerciseIds() {
  const exerciseList = document.getElementById('exerciseList');
  const exerciseListEmpty = document.getElementById('exerciseListEmpty');

  if (exerciseList) {
    exerciseList.innerHTML = '';
  }

  const exercisesParsed = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  const exercises = Object.keys(exercisesParsed);
  const fragment = document.createDocumentFragment();
  if (exercises.length === 0 && exerciseListEmpty) {
    exerciseListEmpty.classList.remove('display-none');
  } else if (exerciseList) {
    showLoader();
    // Map each exercise ID to a promise that fetches its data
    const exercisePromises = exercises.map((exerciseId) => {
      return getExerciseDetailsById(exerciseId).then((data) => {
        const exercise = data;
        const card = buildExerciseCard(exercise);
        return card;
      });
    });

    // Wait for all promises to resolve before appending to the DOM
    Promise.all(exercisePromises)
      .then((cards) => {
        cards.forEach((card) => {
          fragment.appendChild(card);
        });
        hideLoader();
        exerciseList.appendChild(fragment);
      })
      .then(() => {
        const cardCategoryDivs = document.querySelectorAll('.card-category');

        cardCategoryDivs.forEach((cardCategoryDiv) => {
          const romoveButton = document.createElement('button');
          romoveButton.className = 'remove-button';
          romoveButton.innerHTML =
            '<div class="remove-btn-icon"><svg width="16" height="16" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg"><path d="M9.66667 4.00004V3.46671C9.66667 2.71997 9.66667 2.3466 9.52134 2.06139C9.39351 1.8105 9.18954 1.60653 8.93865 1.4787C8.65344 1.33337 8.28007 1.33337 7.53333 1.33337H6.46667C5.71993 1.33337 5.34656 1.33337 5.06135 1.4787C4.81046 1.60653 4.60649 1.8105 4.47866 2.06139C4.33333 2.3466 4.33333 2.71997 4.33333 3.46671V4.00004M5.66667 7.66671V11M8.33333 7.66671V11M1 4.00004H13M11.6667 4.00004V11.4667C11.6667 12.5868 11.6667 13.1469 11.4487 13.5747C11.2569 13.951 10.951 14.257 10.5746 14.4487C10.1468 14.6667 9.58677 14.6667 8.46667 14.6667H5.53333C4.41323 14.6667 3.85318 14.6667 3.42535 14.4487C3.04903 14.257 2.74307 13.951 2.55132 13.5747C2.33333 13.1469 2.33333 12.5868 2.33333 11.4667V4.00004" stroke="#242424" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></div>';

          // Get the data-id attribute value from the parent element
          const parentDiv = cardCategoryDiv.closest('.excercise-card-item');
          const dataId = parentDiv.getAttribute('data-id');

          // Set the data-id attribute on the new div
          romoveButton.setAttribute('data-id', dataId);

          // Insert the new div after each card-category div
          cardCategoryDiv.insertAdjacentElement('afterend', romoveButton);

          romoveButton.addEventListener('click', () => {
            const clickedDataId = romoveButton.getAttribute('data-id');
            deleteExerciseDetailsById(clickedDataId);
            displayExerciseIds();
          });
        });
      })
      .then(() => {
        // Pagination functionality
        const items = document.querySelectorAll('.card');
        let itemsPerPage = 10;
        let currentPage = 1;
        const totalPages = Math.ceil(items.length / itemsPerPage);

        if (window.innerWidth < 768) {
          itemsPerPage = 8;
        }

        function showPage(page) {
          // Calculate start and end index for items to show
          const start = (page - 1) * itemsPerPage;
          const end = start + itemsPerPage;

          // Hide all items
          items.forEach((item, index) => {
            item.classList.remove('visible');
            if (index >= start && index < end) {
              item.classList.add('visible');
            }
          });

          // Enable/disable pagination buttons
          document.getElementById('prev').disabled = page === 1;
          document.getElementById('next').disabled = page === totalPages;
        }

        // Event listeners for pagination buttons
        document.getElementById('prev').addEventListener('click', () => {
          if (currentPage > 1) {
            currentPage -= 1;
            showPage(currentPage);
          }
        });

        document.getElementById('next').addEventListener('click', () => {
          if (currentPage < totalPages) {
            currentPage += 1;
            showPage(currentPage);
          }
        });

        // Initialize the first page
        showPage(currentPage);
      });
  }
}

// Load and display exercise IDs when the page is loaded
window.onload = () => {
  displayExerciseIds();
};
