# Assassins Party Game
### Developed by Minh Vu & Michael Asare
Assassins is a game that can be played almost anywhere, but best done in semi-crowded environments. The goal of the game is to be the last remaining person alive and to assassinate whoever you are assigned.
## 1. Login & Character Cards
  - Character cards consist of a image and a nickname.
## 2. Lobby System
  - One person makes the lobby--he/she is deemed the lobby leader and has administrative rights to the lobby
  - This person may start the game once everyone joins.
  - Players may join the game with a randomly generated key.
  - Once the lobby is started no other players may join the lobby.
  - Lobby leaders have the ability to cancel a lobby and return everyone into a neutral state.
## 3. The Game
  - Once the game starts, everyone is assigned a random person from the lobby.
    - That person cannot be yourself.
  - Once assigned a person, the player is instructed to kill given player as defined by the lobby leader.
  - Once you kill that player, you must send a request to the killed player and that player must confirm that you killed him/her.
    - You cannot kill any other player except for that player that is your target.
    - The server will then notify everyone that that player has died (but not necessarily who killed him/her).
  - Once a player has died everyone will have their target rerolled ensuring to ensure that no one receives themselves or a target that is dead.
    - The reshuffle will have a delay of 30 seconds after the kill.
### License
MIT License

Copyright (c) 2018 Minh Vu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
