<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">Assassins Party Game</h3>

  <p align="center">
    Developed by Minh Vu & Michael Asare
    <br />
    <a href="https://github.com/minhd-vu/assassins">View Demo</a>
    ·
    <a href="https://github.com/minhd-vu/assassins/issues">Report Bug</a>
    ·
    <a href="https://github.com/minhd-vu/assassins/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- ABOUT THE PROJECT -->
## About The Project

Assassins is a game that can be played almost anywhere, but best done in semi-crowded environments. The goal of the game is to be the last remaining person alive and to assassinate whoever you are assigned.

1. Login & Character Cards
  - Character cards consist of a image and a nickname.
2. Lobby System
  - One person makes the lobby--he/she is deemed the lobby leader and has administrative rights to the lobby
  - This person may start the game once everyone joins.
  - Players may join the game with a randomly generated key.
  - Once the lobby is started no other players may join the lobby.
  - Lobby leaders have the ability to cancel a lobby and return everyone into a neutral state.
3. The Game
  - Once the game starts, everyone is assigned a random person from the lobby.
    - That person cannot be yourself.
  - Once assigned a person, the player is instructed to kill given player as defined by the lobby leader.
  - Once you kill that player, you must send a request to the killed player and that player must confirm that you killed him/her.
    - You cannot kill any other player except for that player that is your target.
    - The server will then notify everyone that that player has died (but not necessarily who killed him/her).
  - Once a player has died everyone will have their target rerolled ensuring to ensure that no one receives themselves or a target that is dead.
    - The reshuffle will have a delay of 30 seconds after the kill.

### Built With

* []()
* []()
* []()

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* npm
```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo
```sh
git clone https://github.com/minhd-vu/assassins.git
```
2. Install dependencies
```sh
npm install
```

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/minhd-vu/assassins/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

Project Link: [https://github.com/minhd-vu/assassins](https://github.com/minhd-vu/assassins)

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* []()
* []()
* []()

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/minhd-vu/repo.svg?style=flat-square
[contributors-url]: https://github.com/minhd-vu/repo/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/minhd-vu/repo.svg?style=flat-square
[forks-url]: https://github.com/minhd-vu/repo/network/members
[stars-shield]: https://img.shields.io/github/stars/minhd-vu/repo.svg?style=flat-square
[stars-url]: https://github.com/minhd-vu/repo/stargazers
[issues-shield]: https://img.shields.io/github/issues/minhd-vu/repo.svg?style=flat-square
[issues-url]: https://github.com/minhd-vu/repo/issues
[license-shield]: https://img.shields.io/github/license/minhd-vu/repo.svg?style=flat-square
[license-url]: https://github.com/minhd-vu/repo/blob/master/LICENSE.txt
[product-screenshot]: images/screenshot.png
