---
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowReadingTime: true
TocOpen: true
canonicalURL: cambuchi.github.io/blog/pagination-break-down
comments: false
date: 2022-01-11T05:50:00.000Z
description: >-
  Breaking down the process to create a nice looking pagination for your site in
  Javascript.
disableHLJS: false
disableShare: false
hideSummary: false
hidemeta: false
searchHidden: false
showToc: true
tags:
  - JavaScript
  - Tutorial
  - Code
  - Web Development
  - HTML
title: Pagination Break Down
summary: >-
  Pagination is a way to display only a set number of items on your page while
  allowing easy access to the other items if needed. This is a guide to walk you
  through the thought process, white-boarding, and implementation of pagination
  in vanilla JavaScript.
cover:
  alt: Example of pagination.
  caption: 'Consistent, dynamic pagination that does not shift in size is the goal.'
  hidden: false
  image: 'https://cambuchi.github.io/blog/uploads/pagination-cover.gif'
  relative: false
editPost:
  Text: Suggest changes
  URL: 'https://github.com/Cambuchi/blog-src/blob/main/content'
  appendFilePath: true
---
# Introduction

What is pagination? Let's say you have a list of items you want to display on your site, displaying the entire list at once can be problematic if it's extremely large or if each list item is resource intensive such as requiring an API call. Pagination is a way to display only a set number of items on your page while allowing easy access to the other items if needed. This is a guide to walk you through the thought process, white-boarding, and implementation of pagination in vanilla JavaScript.

# TL:DR

For those of you that just want the code and don't need the breakdown:

* [CodePen examples](https://cambuchi.github.io/blog/posts/pagination-break-down/#live-examples)
* [Just the finished code](https://cambuchi.github.io/blog/posts/pagination-break-down/#finished-code)

# White-boarding & Design Process

Our pagination module will consist of a single function with a couple callbacks, let's go over what that function will need in order to be successful:

1. Parameters required for pagination
2. Design choices / features we will want
3. What the functionality of the pagination will look like
4. Error handling

Here's the entire whiteboard we will use for our function. Please click the image for a full size version. Don't worry we will go over each process one by one:

[![Whiteboard for pagination process](https://cambuchi.github.io/blog/uploads/paginate-whiteboard.png "paginate whiteboard")](https://cambuchi.github.io/blog/uploads/paginate-whiteboard.png)

Let's break it down:

### Parameters

![Whiteboard for the parameters](https://cambuchi.github.io/blog/uploads/paginate-parameters.png "paginate parameters")

Our paginate function will require two parameters:

1. The array of objects we want to paginate

   > The array will be used to determine the number of pages that need displaying.
2. The current page number

   > The page number will be used to determine how the pagination is displayed as well as let our content generating function know what chunk of content to render.

### Design

![Whiteboard for the design process](https://cambuchi.github.io/blog/uploads/paginate-design.png "whiteboard design")

Pagination requires asking the following questions:

1. How many pages are you going to have?
   * For this project we will display 5 items per page. This determines our page numbers.
2. How many pagination items will you display?
   * I prefer 5, 9, or 11 as the number of pagination items to display, dependent on screen size. This is up to the developer. For this project we will be going with 9.
3. Any extra features?
   * Most pagination UIs have a `next` and `previous` button. We will include those features as well.

### Functionality

![Whiteboard for pagination functionality](https://cambuchi.github.io/blog/uploads/paginate-functionality.png "whiteboard functionality")

Our pagination will need the following functionality:

1. Render the pagination elements:
   * When there are a few pages, we can just render all of the pages like so:

     > `[prev] [1, 2, 3, 4, 5, 6, 7] [next]`
   * When there are many pages, how we render will depend on the current page number.
     * When the page number is in the early ranges:

       > `[prev] [1, 2, 3, 4, ..., 99, 100] [next]`
     * When the page number is in the middle range:

       > `[prev] [1, ..., 45, 46, 47 ..., 100] [next]`
     * When the page number is in the end ranges:

       > `[prev] [1, 2, ..., 97, 98, 99, 100] [next]`

     > Notice how each of the display styles have the same number of pagination items displayed. This is the consistent behavior we want.
2. Create pagination items that have the following functionality when clicked:
   * Re-draw the pagination element and update the page numbers of buttons.
   * Update the `previous` and `next` button page number pointers. Because if you were on page 3 those pointed to page 2 and 4 respectively, but if you suddenly jump to page 55 then those buttons need to point to different numbers.
   * Set styling so that the current page number stands out from the others.
   * Send the information to the content rendering function so that the correct slice of the array is rendered into the content area.

### Errors and possible issues

![whiteboard for errors](https://cambuchi.github.io/blog/uploads/paginate-errors.png "whiteboard errors")

Lets' handle any possible errors that might occur.

1. What happens when the current page number sent to the pagination function is out of range of the page numbers? For example let's say we are at page 1 and we click the `previous` button, or oppositely, we are at the last page and click the `next` button; how would out of range pages be handled?

   > Solution: detect invalid page numbers being passed in, and return out of any linked rendering function.
2. What happens when the array passed in is empty? Let's say our content has a search function, when the search input returns an empty list, how should our paginate function render?

   > Solution: empty arrays should result in an empty pagination since no content is rendered.

# Implementation

Alright, let's build our pagination module!

Our HTML model in this example covers just the essentials:

```html
<body>
  <div id="content"></div>
  <div id="paginate-item-container">
    <div id="previous">
   		&lt;
    </div>
    <div id="paginate-items"></div>
    <div id="next">
    	&gt;
    </div>
  </div>
</body>
```

> Note: our previous and next buttons are using html code to represent the `<` and `>` characters.

First let's enter in our parameters, set our design variables, and do initial prep:

> Note: comments with `+++` in them indicates that the code below is new

```js
// +++ create the pagination for the current array and page number
const paginate = (array, current) => {
  // +++ display 5 items per page
  let itemsPerPage = 5;
  // +++ get the current total number of pages, make sure to round up
  let numPages = Math.ceil(array.length / itemsPerPage);
  // +++ target our DOM elements for manipulation
  const paginateItems = document.getElementById('paginate-items');
};
```

Next let's handle our errors:

```js
const paginate = (array, current) => {
  // display 5 items per page
  let itemsPerPage = 5;
  // get the current total number of pages, make sure to round up
  let numPages = Math.ceil(array.length / itemsPerPage);
  // target our DOM elements for manipulation
  const paginateItems = document.getElementById('paginate-items');
  
  // +++ error: if the array is empty, empty the pagination display
  if (array.length < 1) {
  	// +++ clear the pagination elements
    paginateItems.innerHTML = '';
    // +++ exit the function so that nothing else is done
    return
  }

  // +++ error: if current page number is out of range, do nothing
  if (current < 1 || current > numPages) {
    // +++ exit the function so that nothing else is done
    return
  }
};
```

Let's add our functionality in, starting with the previous and next buttons:

```js
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
    return
  }

  // error: if current page number is out of range, do nothing
  if (current < 1 || current > numPages) {
    // exit the function so that nothing else is done
    return
  }

  // +++ apply functionality to the previous and next buttons
  // +++ target the previous and next DOM elements
  let next = document.getElementById('next');
  let previous = document.getElementById('previous');
  // +++ remove previous event handlers (so event handlers don't pile up)
  next.onclick = null;
  previous.onclick = null;
  // +++ update the previous and next buttons to do the following:
  // +++ 1. re-render the pagination elements with new current page
  // +++ 2. send the array and new current page to render correct content
  previous.onclick = function () {
    paginate(array, current - 1);
    renderContent(array, current - 1, itemsPerPage, numPages);
  };
  next.onclick = function () {
    paginate(array, current + 1);
    renderContent(array, current + 1, itemsPerPage, numPages);
  };
};
```

For completeness sake, here's an example of what a `renderContent` function in this use case might look like:

> Here we assume the array will just be an array of numbers from 1 - 100.

```js
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
    listItem.textContent = item
    content.append(listItem);
  });
};
```

With that out of the way, let's add our pagination number items. First we add the logic for when the page numbers are low (in our case less than 7).

> Remember we want it to look like this: `[prev] [1, 2, 3, 4, 5, 6, 7] [next]`

```js
const paginate = (array, current) => {
  // ... collapsed previous code for clarity
 
  //  +++ clear previous pagination numbers so that we can redraw them
  paginateItems.innerHTML = '';
 
  // +++ add the pagination number items
  // +++ if the total page number is low, just render all the page numbers
  if (numPages < 8) {
    for (let i = 1; i <= numPages; i++) {
      // +++ create the pagination number element
      const paginateNum = document.createElement('div');
      paginateNum.classList = 'paginate-num';
      paginateNum.textContent = i;
      // +++ apply styling if number matches current number
      if (current === i) {
        paginateNum.classList.add('active');
      }
      // +++ apply click event for pagination element
      paginateNum.onclick = function () {
        // +++ re-render the pagination elements with pagination item number
        paginate(array, i);
        // +++ render content based on pagination item number
        renderContent(array, i, itemsPerPage, numPages);
      };
      // +++ add number into pagination container
      paginateItems.append(paginateNum);
    }
  }
};
```

Since we're going to be adding pagination numbers very often, to maintain [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself "DRY Wikipedia") let's relegate this task to it's own function.

```js
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
```

Now our previous paginate number functionality looks much cleaner.

```js
const paginate = (array, current) => {
  // ... collapsed previous code for clarity
 
  // clear previous pagination numbers so that we can redraw them
  paginateItems.innerHTML = '';
 
  // add the pagination number items
  // if the total page number is low, just render all the page numbers
  if (numPages < 8) {
    for (let i = 1; i <= numPages; i++) {
      addPaginateNum(array, i, current, itemsPerPage, numPages);
    }
  }
};
```

Before we move ahead with longer page number cases. We can predict that we will need to dynamically add `...` skip items to our pagination items depending on where the current page number is. Let's create a function for this as well so we can call it when we need it.

```js
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
```

Continuing with functionality, we are going to add our render cases for when the total number of pages is greater than 7. Remember that we have 3 different render cases:

* When the page number is in the early ranges:

  > `[prev] [1, 2, 3, 4, ..., 99, 100] [next]`
* When the page number is in the middle range:

  > `[prev] [1, ..., 45, 46, 47 ..., 100] [next]`
* When the page number is in the end ranges:

  > `[prev] [1, 2, ..., 97, 98, 99, 100] [next]`

Let's start with the first case, the early ranges.

```js
const paginate = (array, current) => {
  // ... collapsed previous code for clarity
 
  // clear previous pagination numbers so that we can redraw them
  paginateItems.innerHTML = '';
 
  // add the pagination number items
  // if the total page number is low, just render all the page numbers
  if (numPages < 8) {
    for (let i = 1; i <= numPages; i++) {
      addPaginateNum(array, i, current, itemsPerPage, numPages);
    }
  // +++ if the total number of pages is greater than 7
  } else if (numPages > 7) {
    // +++ if the current page number is in the early ranges (here less than 4)
    if (current < 4) {
      // +++ render all the early numbers
      for (let i = 1; i < 5; i++) {
        addPaginateNum(array, i, current, itemsPerPage, numPages);
      }
      // +++ render a paginate skip
      addPaginateSkip();
      // +++ render the last two page numbers
      for (let i = numPages - 1; i <= numPages; i++) {
        addPaginateNum(array, i, current, itemsPerPage, numPages);
      }
    }
  }
};
```

Extending this pattern to the next two display cases is relatively straightforward.

```js
const paginate = (array, current) => {
  // ... collapsed previous code for clarity
 
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
      
    // +++ if the current page number is in the middle (3 < current < max - 2)
    } else if (current > 3 && current < numPages - 2) {
      // +++ render the first number
      addPaginateNum(array, 1, current, itemsPerPage, numPages);
      // +++ render a paginate skip
      addPaginateSkip();
      // +++ render the current number and it's adjacent numbers as well
      for (let i = current - 1; i <= current + 1; i++) {
        addPaginateNum(array, i, current, itemsPerPage, numPages);
      }
      // +++ render a paginate skip
      addPaginateSkip();
      // +++ render the last number
      addPaginateNum(array, numPages, current, itemsPerPage, numPages);

    // +++ if current page number is at the end ranges (greater than max - 3)
    } else if (current >= numPages - 2) {
      // +++ render the first two numbers
      addPaginateNum(array, 1, current, itemsPerPage, numPages);
      addPaginateNum(array, 2, current, itemsPerPage, numPages);
      // +++ render a paginate skip
      addPaginateSkip();
      // +++ render the end numbers
      for (let i = numPages - 3; i <= numPages; i++) {
        addPaginateNum(array, i, current, itemsPerPage, numPages);
      }
    }
  }
};
```

And with that we are done! Let's take one final look at the entire thing before we look at a live example of it in action.

# Finished Code

```js
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
```

# Live Examples

With a long list:

{{< codepen id="QWqJdxv" >}}


With a shorter list:

{{< codepen id="RwLqpra" >}}

# Conclusion

I hope you've enjoyed how I wrap my head around making pagination. With a little thoughtfulness, making a consistent predictable pagination is relatively simple. Till next time!