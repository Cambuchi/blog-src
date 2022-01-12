+++
ShowBreadCrumbs = true
ShowPostNavLinks = false
ShowReadingTime = true
TocOpen = true
canonicalURL = ""
comments = false
date = 2022-01-12T12:51:10Z
description = "Frustrated at other options, I built my own card finder for a Yu-Gi-Oh video game."
disableHLJS = false
disableShare = false
draft = true
hideSummary = false
hidemeta = false
searchHidden = false
showToc = true
summary = "I made a card finder for LOTD: Link Evolution for people like me who don't follow the franchise thus can never remember who \"Gong Strong\" or \"Tetsu Trudge\" etc are."
tags = ["Mediawiki", "API", "Javascript", "Yu-Gi-Oh"]
title = "LOTD: Link Evolution Card Finder"
[cover]
alt = "LOTD: Link Evolution Card Finder in action"
caption = "Images and information helps a lot when you're trying to create the perfect deck."
hidden = false
image = "https://cambuchi.github.io/blog/uploads/card-finder-cover.png"
relative = false
[editPost]
Text = "Suggest changes"
URL = "https://github.com/Cambuchi/blog-src/issues"
appendFilePath = true

+++
# I caught COVID.

On the 28th of Dec I developed COVID-19 symptoms, but thankfully the symptoms were very mild (thanks vaccine!). During my 2 week quarantine and recovery I got into Yu-Gi-Oh through "Legacy of the Duelist: Link Evolution". Finding out where cards were was a huge pain because I have not kept up with the franchise and over 10,000 cards were hidden behind character specific booster packs & challenge duels. Other card finders did not have any visual aid or provide card information so they were useless to me because I had no idea who "Gong Strong" or "Akiza Izinski" etc were. Frustrated, I built my own card finder that utilizes the Yugipedia mediawiki API to grab images and information.

Searching out archetypes like "Vampire", "Elemental Hero", "Utopia", or "Blue-Eyes" and looking at all the cool card art on my phone was also a nice bedridden activity. Hopefully this is useful to someone else out there!

## See Live At:

[LOTD: Link Evolution Card Finder](https://cambuchi.github.io/LOTD-Link-Evolution-Card-Finder/)

## Features

* Image for the booster pack characters, so that those not knowledgeable about the Yu-Gi-Oh franchise can still target the correct cards.
* Pulls card images from the Yugipedia mediawiki API so that you can preview the card's stats and effects.
* Extra information such as alternate farming locations or card rarity also provided.
* Resetting delay on key-up event for the search to prevent flooding the API with requests.
* Straightforward mobile and desktop UI

## Built With

* Coded lovingly in vanilla Javascript and CSS.
* Built with [Webpack](https://webpack.js.org/)
* Hosted on [GitHub Pages](https://pages.github.com/)

## Improvements

Features to be added in the future:

* Card saving feature to create your own searchable list.

## Special Thanks

* This [google sheet](https://docs.google.com/spreadsheets/d/19tRadwIu9HH8nKa81Vk4XJSmZdwCy5k2pyACB6ma0yo/) by reddit user /u/Sephiroth0327 that provided the card names, booster locations, and alternate farm locations.
* [Yugipedia](https://yugipedia.com/wiki/Yugipedia) and the mediawiki API for providing the card and booster images.

## Contributing

Contributions, issues, and feature requests are welcome!