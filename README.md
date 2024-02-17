<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h1 align="center">Assassins Party Game</h1>
  <p align="center">
    Developed by Minh Vu
    <br />
    <a href="https://assassinspartygame.vercel.app/">View Demo</a>
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
  - [How to Play](#how-to-play)
    - [Create a User](#create-a-user)
    - [Party System](#party-system)
      - [Join a Party](#join-a-party)
      - [Create a Party](#create-a-party)
      - [Leave a Party](#leave-a-party)
      - [Start a Party](#start-a-party)
    - [Eliminate Targets](#eliminate-targets)
    - [Game Modes](#game-modes)
      - [Classic](#classic)
      - [Shuffle](#shuffle)
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

Assassins is a game that can be played almost anywhere, but best done in semi-crowded environments. The goal of the game is to be the last remaining person alive and to assassinate whomever you are assigned. Read more about assassins [here](<https://en.wikipedia.org/wiki/Assassin_(game)>).

This project is designed to easily facilitate the distribution of targets to players, along with the transfer of targets post-assassination. Additionally, assassins aims to resolve some of the complications that can arise in these processes.

### Built With

- [Next.js](https://nextjs.org/)
- [MongoDB](https://www.mongodb.com/)

<details>
  <summary><h2>How to Play</h2></summary>
  
  ### How to Play

Assassins is a live action game that can be played almost anywhere, but best done in semi-crowded environments. The goal of the game is to be the last remaining person alive and to assassinate whomever you are assigned.

#### Create a User

Before doing anything, you should create a user. It will keep track of your statistics as well as identifying who you are in a party. You can register yourself by heading to the register link in the navbar. Once you create a user, you will no longer be able to change the username or password.

If you already have a user, you can login by heading to the login link in the navbar.

#### Party System

![lobby](docs/lobby.png?raw=true "Party Lobby")

Once you have logged in you have the option of joining or creating a party. A party is an instance of the assassins game; it is how you connect with your friends.

##### Join a Party

To join a party, type in the party code in the input field on the <Link to="/">home page</Link> then click the **Join Party** button. Once a party has started you can no longer join it.

##### Create a Party

To create a party, click the **Create Party** button on the home page. Once you have created it, the app will display the party code in bold. Give this code to your friends so that they can join.

##### Leave a Party

Once you join a party, you have the option of leaving it. You can leave it anytime, and the app will handle the reshuffling of players.

##### Start a Party

Only the party leader can start the party. Once started everyone is assigned a target.

#### Eliminate Targets

![lobby-started](docs/lobby-started.png?raw=true "Lobby Started")
![leaderboard](docs/leaderboard.png?raw=true "Leaderboard")

You will be assigned a target to assassinate, hence the name _assassins_. Once you assassinated your target, either by means of dart blasters, tag, projectile launchers, or any other method, click the **Assassinate** button.

A notification will be send to the target just eliminated, the target will have option of confirming or denying the assassination attempt. If the attempt is denied, the game continues; this is in place to prevent accidental clicks. If the attempt is successful, you will be assigned a new target depending on the game mode.

#### Game Modes

##### Classic

When you assassinate a target, your next target will be the target your target had.

##### Shuffle

When a player assassinates a target, all players will receive a new target from the remaining players alive.

</details>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Installation

1. Clone the repo

```sh
git clone https://github.com/minhd-vu/assassins.git
```

2. Install dependencies

```sh
npm install
```

3. Run in development

```sh
npm run dev
```

4. Run in production

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

- [Minh Vu](https://github.com/minhd-vu)
- [Bisrat Mekonnen](https://github.com/bismek)
