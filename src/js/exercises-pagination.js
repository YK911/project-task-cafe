import state from './exercises-state';

export default function updatePagination(clickHandler) {
  const container = document.querySelector(
    '.exercises-categories,.exercises-list-container',
  );

  const currentNode = container.querySelector('.pagination');

  if (state.totalPages < 2) {
    if (currentNode) {
      currentNode.remove();
    }
    return;
  }

  const paginationNode = document.createElement('ul');

  paginationNode.classList.add('pagination');

  for (let i = 1; i <= state.totalPages; i += 1) {
    const paginationItem = document.createElement('li');
    paginationItem.classList.add('pagination-item');
    paginationItem.textContent = i;

    if (i === state.currentPage) {
      paginationItem.classList.add('pagination-item-current');
    } else {
      paginationItem.addEventListener('click', () => {
        clickHandler(i);
      });
    }

    paginationNode.appendChild(paginationItem);

    if (currentNode) {
      container.replaceChild(paginationNode, currentNode);
    } else {
      container.appendChild(paginationNode);
    }
  }
}
