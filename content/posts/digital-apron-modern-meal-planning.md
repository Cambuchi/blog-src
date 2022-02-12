+++
ShowBreadCrumbs = true
ShowPostNavLinks = false
ShowReadingTime = true
TocOpen = true
canonicalURL = ""
comments = false
date = 2022-02-11T23:27:49Z
description = "I built a meal planner that captures the functionality of modern meal subscription services."
disableHLJS = false
disableShare = false
hideSummary = false
hidemeta = false
searchHidden = false
showToc = true
summary = "Behind the scenes of my meal planner application."
tags = ["Digital Apron", "Web Development", "Meal Planning", "Groceries", "Javascript"]
title = "Digital Apron: Modern Meal Planning"
[cover]
alt = "Digital Apron Cover Image"
caption = "Digital Apron is the smoothest meal planning experience available for home cooks."
hidden = false
image = "https://cambuchi.github.io/blog/uploads/og-image.png"
relative = false
[editPost]
Text = "Suggest changes"
URL = "https://github.com/Cambuchi/blog-src/issues"
appendFilePath = true

+++
# I tried a meal kit service.

And there's a lot that I actually enjoyed. However, as someone who cooks at home extremely often, there were some big pitfalls as well. I wanted this experience in my cooking work flow at home, so I created **Digital Apron**, a meal planner that captures the intuitiveness and functionality of modern meal subscription services.

# See live at:

[Digital Apron](https://digital-apron.web.app/ "Digital Apron")

# The Pros and Cons of Meal Kits

## Pros:

* **The recipe cards:** the process of cooking was made incredibly simple with the recipe cards that these services provide. Simply grab a card and follow along for a smooth cooking experience.
* **No micromanaging ingredients:** cooking the recipes required no mental energy tasked to listing out the ingredients available to you. You can just simply cook knowing that everything you need is in your pantry already.
* **Decision anxiety:** when dinner time approaches, there's no more struggling with deciding what’s for dinner. Your meals are planned out and grabbing a recipe card is extremely straightforward.

## Cons:

* **Environmental impact:** I'm someone who brings their own bags to the grocery store. So it's extra painful to receive a box every week that's padded with foam, insulated, containing single use ice packs, and full of ingredients that are individually wrapped in plastic. Additionally, I imagine a lot more fuel is used up delivering those ingredients to my door than it would take for me to go to my grocery store nearby which is a 4 minute drive away.
* **Meals can hit or miss:** some of the meals provided ended up being duds. At times you can kind of see this coming just by looking at the recipe card, which resulted in a sad time in the kitchen as you prepare a meal you know is only going to be subpar. It was hard to get excited making those meals in particular.
* **Limited recipe catalog:** the recipes that are offered in these meal kits are overwhelmingly western. The deeper spectrum of spice, funk, and ferments are nowhere to be found.
* **Pricing:** a lot of money goes to the marketing and branding for these meal kits. While on promotion, they might be worth trying, but the normal pricing is much more expensive than getting groceries and cooking yourself. I've observed the price to be about equal to eating out, so the real decision is between cooking yourself and enjoying a restaurant experience.

# Enter Digital Apron:

Digital apron was built to capture as much of the meal kit experience as possible for someone who enjoys cooking at home.

# Features:

* Seamless progression from planning, shopping, cooking.
* Auto-generated shopping list from your meal plan for the week.
* Shopping list items marked on click for straightforward use while at the grocery store.
* Auto generated recipe cards for choosing while in the kitchen.
* Recipe importing that draws from [The MealDB API](https://www.themealdb.com/ "The MealDB").
* Mobile and desktop UI.

# Built with:

* Coded lovingly in vanilla JavaScript and CSS.
* Built with [Webpack](https://webpack.js.org/ "Webpack").
* Back-end services such as authentication and data provided by [Firebase](https://firebase.google.com/ "Firebase").
* Hosted with [Firebase hosting](https://firebase.google.com/docs/hosting "Firebase hosting").
* Compiled with [Babel](https://babeljs.io/ "Babel").

# Improvements/Upcoming Features:

* Completely broken in iOS Safari. I currently don't have an apple device for debugging so until then this will remain. Also Safari is the new IE. See:
  * [https://www.safari-is-the-new-ie.com/](https://www.safari-is-the-new-ie.com/ "https://www.safari-is-the-new-ie.com/")
  * [https://www.macrumors.com/2022/02/09/safari-team-asks-for-feedback-amid-accusations/](https://www.macrumors.com/2022/02/09/safari-team-asks-for-feedback-amid-accusations/ "https://www.macrumors.com/2022/02/09/safari-team-asks-for-feedback-amid-accusations/")
* Importing from more popular meal websites such as Allrecipes or Bon Apetit.
* Parsing of ingredients text string so ingredients do not have to be entered in individually when manually adding recipes.
* Customization for number of meals/number of weeks to save.
* Sharing of recipes and meal plans. Made a really delicious week of Keto/Vegetarian meals? Share to your friends to view and import.
* Pantry option for ingredients. Highlight ingredients in your shopping list that are already in your pantry, good for staples like salt/sugar/etc.
* Grouping of grocery items by category in the shopping list.
* Servings adjustment when adding recipes to scale up or down.

# Special Thanks:

* Shout-out to my sister Chau Nguyen and Tony Tran for finding amazing deals on Hello Fresh/Every Plate/Blue Apron so that we got to try out these services for extremely cheap. Without them I would never have had the inspiration to make Digital Apron.
* Friends and family who gave feedback on the alpha versions of this, you guys rock!
* Blue Apron/Hello Fresh/Every Plate for the work flow template.

# Contributing

Contributions, issues, and feature requests are welcome!