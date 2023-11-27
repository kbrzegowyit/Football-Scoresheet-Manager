# Football Scoresheet Manager
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![Mocha](https://img.shields.io/badge/Mocha-8D6748?style=for-the-badge&logo=mocha&logoColor=white)](https://mochajs.org/)
![[License]](https://badgen.net/github/license/micromatch/micromatch)
![GitHub last commit](https://img.shields.io/github/last-commit/kbrzegowyit/Football-Scoresheet-Manager)

## About the project
FSM is an educational project. It was designed to manage scoresheets.
This means that we can create them and add teams and leagues to them.
After each match, we need to update the statistics, assigning points to the team.
This allows us to track the current position of the teams in each league.

## Technologies
#### Backend
- Node.js
- SQLite
- TypeScript
- Mocha

#### UI
A user can interact with the app via CLI.

## Features
1. Teams
    - Add a team
    - Delete the team
    - Update the team
    - Show teams
2. Leagues
    - Add a league
    - Show leagues
    - Delete the league (*todo*)
    - Update the league (*todo*)
3. Statistics
    - Add points to the team
    - Assign the team to the league
    - Show league's scoresheet

I've implemented the Clean Architecture for the application to enhance its flexibility. I aimed to apply some of the sorting algorithms that I had learned. That's why I use the Quicksort instead of the default sorting method. With Clean Architecture, there is a possibility to inject any other algorithm. As you can see, I've not use too many dependencies because I aimed to implement as much as possible on my own. Testing for the project has been performed using Mocha framework and default Node.js asserts.

Because of its educational nature, the application focuses on the teams section, incorporating all CRUD (Create, Read, Delete, Update) operation with comprehensive tests coverage.


## Getting Started
* Clone the repository
```
https://github.com/kbrzegowyit/Football-Scoresheet-Manager.git
```
* Go to the project directory and install dependencies
```
npm install
```
* Run the project
```
npm run start:prod
```
