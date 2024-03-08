# Think Alike

Think Alike is a nodejs web application. The game offers an exciting twist to classic word games. Designed for multiplayer interactions, it features real-time gameplay where players enter a virtual room, challenge each other by guessing words, and see results dynamically as the game unfolds. Its architecture is built on efficient client-server communication, ensuring a seamless and responsive user experience. Utilizing web sockets for instantaneous data transfer, it allows players to see updates without any delay, making every round thrilling and competitive.
## Features

- **Real-time** multiplayer word guessing game
- **Dynamic** word submission and reveal system
- **Interactive** player-to-player communication

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need Node 20 installed on your machine.

### Installation with Node

Clone the repository:
```
git clone https://github.com/Latzox/Think-Alike.git
```
Navigate to the project directory:
```
cd Think-Alike
```
Install dependencies:
```
npm install
```
Run the application:
```
node server.js
```
Access the application at: http://localhost:3000

### Installation with Docker

Get the latest Docker image from the registry

```
docker pull latzo.azurecr.io/thinkalike:latest
```
Start the Docker container
```
docker run --name thinkalike -p 80:3000 latzo.azurecr.io/thinkalike:latest
```
Access the application at: http://localhost:80

## Usage
- Enter a custom room id which you tell your partner. You then enter your name and join the room, and so does your partner.
- Discuss topics or themes before each round to see how well you can align your thoughts.
- The goal is to enter the same word as your partner. It's all about thinking alike!
- There’s no limit on the number of attempts. Feel free to play as many rounds as you like.
- Take your time to think. The fun lies in seeing how in-tune you are with each other.

## Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please refer to the CONTRIBUTING.md for more information.

## Versioning
We use SemVer for versioning. For the versions available, see the tags on this repository.

## Authors
Marco Platzer - Initial Work - latzox

See also the list of contributors who participated in this project.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.