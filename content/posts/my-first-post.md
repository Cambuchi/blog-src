---
title: 'Build a blog with CMS & Git functionality '
date: 2021-12-22T13:53:01.000-08:00
tags:
- Blog
- CMS
- Git
- Hugo
- Forestry.io
- GitHub
- Web Development
- Hosting
- Development
- Free
showToc: true
TocOpen: false
hidemeta: false
comments: false
description: How to build and host a free blog with a content management system (CMS)
  for content creation that doesn't require diving into code or managing markdown
  files.
canonicalURL: https://canonical.url/to/page
disableHLJS: false
disableShare: false
hideSummary: false
searchHidden: false
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
cover:
  image: uploads/blog-build-banner.jpg
  alt: The blog build tech stack
  caption: With Hugo, Github Pages, & Forestry we can create a fully featured site.
  relative: false
  hidden: false
editPost:
  URL: https://github.com/Cambuchi/blog-src/blob/main/content
  Text: Suggest Changes
  appendFilePath: true

---
Some text above

```js
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}

package main

import "fmt"

func main() {
  fmt.Println("Hello, World!")
}
```

Some text below

```js
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}

package main

import "fmt"

func main() {
  fmt.Println("Hello, World!")
}
```

Another one

```js
const Person = (name, age) => {
  const sayName = () => console.log(name)
}
let Cam = Person('Cam', '30');
```

And we will see what the default code input is below:

    const Person = (name, age) => {
      const sayName = () => console.log(name)
    }
    let Cam = Person('Cam', '30');

how about `inline` code?

lastly let's check if the hugo method works

{{< highlight html >}}
`<section id="main"> <div> <h1 id="title">{{ .Title }}</h1> {{ range .Pages }} {{ .Render "summary"}} {{ end }} </div> </section>`
{{< /highlight >}}

follow up with some JS

{{< highlight js >}}

const Person = (name, age) => {

    const sayName = () => console.log(name) } 

let Cam = Person('Cam', '30');

{{< /highlight >}}

{{< highlight js >}}

const primes = num => {
let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
sqroot = Math.floor(Math.sqrt(num)),
numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
return arr;
};

{{< /highlight >}}

{{< highlight js >}}

// when trash icon is clicked, display modal and change onclick functionality to match
// target element actions
const clickTrashIcon = (data, element) => {
// display confirmation modal
const modal = document.getElementById('modal-confirm');
modal.style.display = 'flex';
// remove previous onclick functions
const confirm = document.getElementById('modal-confirm-submit');
confirm.onclick = null;
// onclick logic for when group trash items are clicked
if (element.classList.contains('group-item')) {
confirm.onclick = function deleteGroup() {
DOM.clickGroupTrash(element);
Logic.deleteGroup(data, element.textContent);
DataStorage.setLocalStorage('todolist', data);
modal.style.display = 'none';
};
// onclick logic for when tasks are being trashed
} else if (element.classList.contains('task')) {
confirm.onclick = function deleteTask() {
const currentGroup = document.getElementById('main-header-title').textContent;
Logic.deleteTask(data\[currentGroup\], element.id);
Logic.renumberTasks(data\[currentGroup\].tasks);
DOM.populateTasks(data, currentGroup);
DataStorage.setLocalStorage('todolist', data);
modal.style.display = 'none';
};
}
};

{{< /highlight >}}

Last but not least let's see how this works in practice.

{{< highlight js >}}
//play a move (move is an index on the board)
play(move) {
//if board index is not empty (0) or game is in win condition, invalid move
if (this.board\[move\] !== 0 || this.isWin) {
return false;
}
//plays a 1 or 2 on the board (representing X or O)
this.board\[move\] = this.turn;
this.moves.push(move);
//checks the board and updates the game state if needed
// Use regular expression to detect any 3-in-a-row
this.isWin = /^(?:...)*(\[12\])\\1\\1|^.?.?(\[12\])..\\2..\\2|^(\[12\])...\\3...\\3|^..(\[12\]).\\4.\\4/.test(this.board.join(""));
this.isDraw = !this.isWin && this.moves.length === this.board.length;
return true;
}
{{< /highlight >}}

Did that work?

Final test...? maybe.

```js
//play a move (move is an index on the board)
play(move) {
    //if board index is not empty (0) or game is in win condition, invalid move
    if (this.board[move] !== 0 || this.isWin) {
        return false;
     }
     //plays a 1 or 2 on the board (representing X or O)
    this.board[move] = this.turn;
    this.moves.push(move);
    //checks the board and updates the game state if needed
    // Use regular expression to detect any 3-in-a-row
    this.isWin = /^(?:...)*([12])\1\1|^.?.?([12])..\2..\2|^([12])...\3...\3|^..([12]).\4.\4/.test(this.board.join(""));
    this.isDraw = !this.isWin && this.moves.length === this.board.length;
    return true;
}
```

Complete?