# Memory Game Project

## Table of Contents

* [Description](#description)
* [How to play](#howtoplay)
* [Screenshots](#screenshots)
* [Tools & Dependencies](#tools)
* [Compatibility](#compatibility)
* [Contributing](#contributing)
* [License](#license)

## Description

This is a memory (concentration) game - player tries to find a pair of cards which have the same image.

The game board consists of twelve to eighteen cards arranged randomly in a grid. The deck is made up of six to nine pairs of cards, each with different symbols on one side.

At the start player selects a difficulty level: 
* Easy - 6 pairs of cards, 5 stars, 3 hints, bonus start for matching 2 pairs in a row
* Medium - 8 pairs of cards, 4 stars, 2 hints, bonus start for matching 3 pairs in a row
* Hard - 9 pairs of cards, 3 stars, 1 hint, bonus start for matching 4 pairs in a row

Once level is selected, game board displays. During the first 5 seconds, the card's symbols are shown to the player. This gives the player time to memorize their position. During this time, the player is not able to interact with the game. Once time is passed, symbols are hidden again and the player can start flipping the cards.

The player flips two cards over to reveal their underlying symbols. If symbols are the same, cards are matched and stay open. If cards do not match, the player loses one star, and cards are flipped over to a hidden position. 

The player can use the hint button, to display the underlying symbol of one random card. The symbol is shown for 1 second, and the card goes back to the hidden position.

The player can receive a bonus star for matching a certain number of pairs in a row. For instance, in an easy level, the player can receive bonus star for matching 2 pairs in a row. Bonus star will not be added if the players already have all stars. 

The game is over when there is no stars left. The game is won when all cards have been successfully matched. Once the game is finished, the player can see game statistics, like time, moves, stars etc. 

The scoreboard allows the player to see statistics of the last 5 games.

## How to play 🕹

Clone this repository and open index.html or play on GitHub.io: https://barbarastempien.github.io/FEND--Memory-Game/

## Screenshots
![alt text](/screenshots/WelcomePage.png "Start page")

![alt text](/screenshots/GamePlay2.png "Game play")

![alt text](/screenshots/GameWon.png "Game won")

## Tools & Dependencies

This game was built with vanilla Javascript (ES6), HTML, CSS.
* Font Awesome v5.3.1 from [Font Awesome](https://fontawesome.com/how-to-use/on-the-web/setup/getting-started?using=web-fonts-with-css)
* Font Pacifico from [Google Fonts](https://fonts.google.com/?query=pacifico)

* Background pattern was taken from [Free Vector Graphics by vecteezy.com](https://www.vecteezy.com/)

* Unicorn image was taken from [IconFinder.com](https://www.iconfinder.com/icons/2913106/animal_cartoon_fairytale_fantasy_horse_magic_unicorn_icon)

## Compatibility

Game was tested on modern browsers (Firefox, Chrome, Edge). Internet Explorer 11 is not supported.

## Contributing

I accept contributions. For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT License](LICENSE)

Copyright (c) 2018 Barbara Stempien

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.