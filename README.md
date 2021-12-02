### side-connect4

##### Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
A variety of connect4 game
	
## Technologies
Project is built with:
* [MYSQL](https://www.mysql.com)
* [ExpressJs](http://expressjs.com/)
* [Ws](https://github.com/websockets/ws)
* [MochaJs](https://mochajs.org/)
* [NodeJs](https://nodejs.org)
	
## Setup
> Clone the repo here https://github.com/Joyce-O/side-connect4.git

Note: This project requires node version 12.18 and up

To run locally
```
$ cd side-connect4
$ yarn install
$ yarn run dev


> Visit http://localhost:8080 copy and share the generated link with another player
```

Note: See env-example file for database setup parameters

To test 

>> $ yarn test

<img width="1085" alt="sidesgame" src="https://user-images.githubusercontent.com/26967919/143244020-de2ccdd0-675a-4d3a-9ee0-0d3556e336e7.png">


TODO: 
- Improve system player logic, currently plays randomly 
- Handle center cell click when side is empty
