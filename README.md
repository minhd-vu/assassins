<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h1 align="center">Assassins Party Game</h1>
  <p align="center">
    Developed by Minh Vu
    <br />
    <a href="https://assassinspartygame.herokuapp.com/">View Demo</a>
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
	- [How to Play](#how-to-play)
		- [Create a User](#create-a-user)
		- [Party System](#party-system)
			- [Create a Party](#create-a-party)
			- [Join a Party](#join-a-party)
			- [Leave a Party](#leave-a-party)
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

Assassins is a game that can be played almost anywhere, but best done in semi-crowded environments. The goal of the game is to be the last remaining person alive and to assassinate whomever you are assigned.

### How to Play

#### Create a User

Before doing anything, you should create a user. It will keep track of your statistics as well as identifying who you are in a party. You can register yourself by heading to the [register](https://assassinspartygame.herokuapp.com/register) link in the navbar. Once you create a user, you will no longer be able to change the username or password.

If you already have a user, you can login by heading to the [login](https://assassinspartygame.herokuapp.com/login) link in the navbar.

#### Party System

Once you have logged in you have the option of joining or creating a party. A party is an instance of the assassins game; it is how you connect with your friends.

##### Create a Party

To create a party, click the **Create Party** button on the [home page](https://assassinspartygame.herokuapp.com/). Once you have created it, the app will display the party code in **bold**. Give this code to your friends so that you they can join. When you create a party, you are given administrative rights. You are given the ability to kick players from the party and to start the party.

##### Join a Party

To join a party, type in the party code in the input field on the [home page](https://assassinspartygame.herokuapp.com/) then click the **Join Party** button. Once a party has started you can no longer join it.

##### Leave a Party

Once you join a party, you have the option of leaving it. You can leave it anytime, and the app will handle the reshuffling of players.

### Built With

* [MongoDB](https://www.mongodb.com/)
* [Express](https://expressjs.com/)
* [React](https://reactjs.org/)
* [Node.JS](https://nodejs.org/en/)

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
3. Start the backend
```sh
npm run dev
```
4. Start the frontend
```sh
npm start
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

