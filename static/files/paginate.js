const paginate = (array, current) => {
  // display 5 items per page
  let itemsPerPage = 5;
  // get the current total number of pages, make sure to round up
  let numPages = Math.ceil(array.length / itemsPerPage);
  // target our DOM elements for manipulation
  const paginateItems = document.getElementById('paginate-items');

  // error: if the array is empty, empty the pagination display
  if (array.length < 1) {
    // clear the pagination elements
    paginateItems.innerHTML = '';
    // exit the function so that nothing else is done
    return;
  }

  // error: if current page number is out of range, do nothing
  if (current < 1 || current > numPages) {
    // exit the function so that nothing else is done
    return;
  }

  // apply functionality to the previous and next buttons
  // target the previous DOM elements
  let next = document.getElementById('next');
  let previous = document.getElementById('previous');
  // remove previous event handlers (so event handlers don't pile up)
  next.onclick = null;
  previous.onclick = null;
  // update the previous and next buttons to do the following:
  // 1. re-render the pagination elements with new current page
  // 2. send the array and new current page to render correct content
  previous.onclick = function () {
    paginate(array, current - 1);
    renderContent(array, current - 1, itemsPerPage, numPages);
  };
  next.onclick = function () {
    paginate(array, current + 1);
    renderContent(array, current + 1, itemsPerPage, numPages);
  };

  // clear previous pagination numbers so that we can redraw them
  paginateItems.innerHTML = '';

  // add the pagination number items
  // if the total page number is low, just render all the page numbers
  if (numPages < 8) {
    for (let i = 1; i <= numPages; i++) {
      addPaginateNum(array, i, current, itemsPerPage, numPages);
    }

    // if the total number of pages is greater than 7
  } else if (numPages > 7) {
    // if the current page number is in the early ranges (here less than 4)
    if (current < 4) {
      // render all the early numbers
      for (let i = 1; i < 5; i++) {
        addPaginateNum(array, i, current, itemsPerPage, numPages);
      }
      // render a paginate skip
      addPaginateSkip();
      // render the last two page numbers
      for (let i = numPages - 1; i <= numPages; i++) {
        addPaginateNum(array, i, current, itemsPerPage, numPages);
      }

      // if the current page number is in the middle (3 < current < max - 2)
    } else if (current > 3 && current < numPages - 2) {
      // render the first number
      addPaginateNum(array, 1, current, itemsPerPage, numPages);
      // render a paginate skip
      addPaginateSkip();
      // render the current number and it's adjacent numbers as well
      for (let i = current - 1; i <= current + 1; i++) {
        addPaginateNum(array, i, current, itemsPerPage, numPages);
      }
      // render a paginate skip
      addPaginateSkip();
      // render the last number
      addPaginateNum(array, numPages, current, itemsPerPage, numPages);

      // if current page number is at the end ranges (greater than max - 3)
    } else if (current >= numPages - 2) {
      // render the first two numbers
      addPaginateNum(array, 1, current, itemsPerPage, numPages);
      addPaginateNum(array, 2, current, itemsPerPage, numPages);
      // render a paginate skip
      addPaginateSkip();
      // render the end numbers
      for (let i = numPages - 3; i <= numPages; i++) {
        addPaginateNum(array, i, current, itemsPerPage, numPages);
      }
    }
  }
};

// add a single pagination number to the DOM
const addPaginateNum = (array, i, current, itemsPerPage, numPages) => {
  // target our DOM elements for manipulation
  const paginateItems = document.getElementById('paginate-items');
  // create the pagination number element
  const paginateNum = document.createElement('div');
  paginateNum.classList = 'paginate-num';
  paginateNum.textContent = i;
  // apply styling if number matches current number
  if (current === i) {
    paginateNum.classList.add('active');
  }
  // apply click event for pagination element
  paginateNum.onclick = function () {
    // re-render the pagination elements with pagination item number
    paginate(array, i);
    // render content based on pagination item number
    renderContent(array, i, itemsPerPage, numPages);
  };
  // add number into pagination container
  paginateItems.append(paginateNum);
};

// add a "..." pagination item for long pagination lists
const addPaginateSkip = () => {
  // target our DOM elements for manipulation
  const paginateItems = document.getElementById('paginate-items');
  // create the pagination skip
  const paginateSkip = document.createElement('div');
  paginateSkip.classList = 'paginate-skip';
  paginateSkip.textContent = '. . .';
  //add the pagination skip
  paginateItems.append(paginateSkip);
};

// render the content
const renderContent = (array, current, itemsPerPage, numPages) => {
  // if current page number is out of range, do nothing
  if (current < 1 || current > numPages) {
    // exit the function so that nothing else is done
    return;
  }
  // using the page number, determine what slice of the list to render
  current -= 1;
  let increment = current * itemsPerPage;
  // as the page number increases, the bottom and top of the slice should
  // increase accordingly (e.g. (0, 5) to (5, 10) etc. )
  let start = 0 + increment;
  let end = itemsPerPage + increment;
  let activeData = array.slice(start, end);

  // target the content container to add items to
  let content = document.getElementById('content');
  // empty out the current contents
  content.innerHTML = '';
  // fill with the new content
  activeData.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    content.append(listItem);
  });
};
