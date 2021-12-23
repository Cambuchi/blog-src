---
title: My First Post
date: 2021-12-22T13:53:01.000-08:00

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
<section id="main">
  <div>
   <h1 id="title">{{ .Title }}</h1>
    {{ range .Pages }}
        {{ .Render "summary"}}
    {{ end }}
  </div>
</section>
{{< /highlight >}}

follow up with some JS

{{< highlight js >}}
const Person = (name, age) => {
    const sayName = () => console.log(name)
}
let Cam = Person('Cam', '30');
{{< /highlight >}}