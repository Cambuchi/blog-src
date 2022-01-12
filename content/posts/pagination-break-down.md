+++
ShowBreadCrumbs = false
ShowPostNavLinks = false
ShowReadingTime = false
TocOpen = true
canonicalURL = "cambuchi.github.io/blog/pagination-break-down"
comments = false
date = 2022-01-11T05:50:00Z
description = "Breaking down the process to create a nice looking pagination for your array."
disableHLJS = false
disableShare = false
hideSummary = false
hidemeta = false
searchHidden = false
showToc = true
tags = ["JavaScript", "Tutorial", "Code", "Web Development", "HTML", "CSS"]
title = "Pagination Break Down"
[cover]
alt = "Example of pagination."
caption = "Consistent, dynamic pagination that does not shift in size is the goal."
hidden = false
image = "https://cambuchi.github.io/blog/uploads/pagination-cover.gif"
relative = false
[editPost]
Text = ""
URL = ""
appendFilePath = false

+++
# Introduction

What is pagination? Let's say you have a list of items you want to display on your site, displaying the entire list at once can be problematic if it's extremely large or if each list item is resource intensive such as requiring an API call. Pagination is a way to display only a set number of items on your page while allowing easy access to the other items if needed. This is a guide to walk you through the thought process, white-boarding, and implementation of pagination in vanilla JavaScript.

# White-boarding & Design Process

Our pagination module will consist of a single function with a couple callbacks, let's go over what that function will need in order to be successful:

1. Parameters required for pagination
2. Design choices / features we will want
3. What the functionality of the pagination will look like
4. Error handling

Here's the entire whiteboard we will use for our function. Please click the image for a full size version. Don't worry we will go over each process one by one:

![Whiteboard for pagination process](https://cambuchi.github.io/blog/uploads/paginate-whiteboard.png "paginate whiteboard")

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