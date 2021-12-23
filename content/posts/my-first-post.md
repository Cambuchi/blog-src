---
title: My First Post
date: 2021-12-22T13:53:01.000-08:00
# weight: 1
# aliases: ["/first"]
tags: ["first"]
author: "Me"
# author: ["Me", "You"] # multiple authors
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
description: "Desc Text."
canonicalURL: "https://canonical.url/to/page"
disableHLJS: true # to disable highlightjs
disableShare: false
disableHLJS: false
hideSummary: false
searchHidden: true
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
cover:
    image: "https://www.theodinproject.com/assets/odin-logo-bd86cf893a3de1f1daceabc1377f58669776616a91ab70c601fd5c16a4686468.svg" # image path/url
    alt: "test alt" # alt text
    caption: "test caption" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: false # only hide on current single page
editPost:
    URL: "https://github.com/<path_to_repo>/content"
    Text: "Suggest Changes" # edit text
    appendFilePath: true # to append file path to Edit link
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
      Logic.deleteTask(data[currentGroup], element.id);
      Logic.renumberTasks(data[currentGroup].tasks);
      DOM.populateTasks(data, currentGroup);
      DataStorage.setLocalStorage('todolist', data);
      modal.style.display = 'none';
    };
  }
};


{{< /highlight >}}