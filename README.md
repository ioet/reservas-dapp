# Reservations Dapp
## Environment Setup
  - Node v7.+ [http://nodejs.org](http://nodejs.org)
  - Truffle [https://truffleframework.com](https://truffleframework.com)
    - `npm install -g truffle`
  - Ganache [https://truffleframework.com/ganache](https://truffleframework.com/ganache)
    - `npm install -g ganache-cli`
  - Angular [https://angular.io](https://angular.io)
    - `npm install -g @angular/cli`

## Creating a Truffle project using a Box [https://truffleframework.com/boxes](https://truffleframework.com/boxes)
  - Create a folder `mkdir reservas-dapp`
  - `cd reservas-dapp `
  - `truffle unbox LimelabsTech/angular-truffle-box`

## Quick start
### shell 1
  - Cargar el docker
   - `docker load --input sandbox.tar`
  - Iniciar el bash de desarrollo
   - `docker run -it --rm --name=sandbox -p 4200:4200 -p 8545:8545 \
      -v $(pwd)/contracts:/reservas-dapp/contracts \
      -v $(pwd)/src:/reservas-dapp/src \
      -v $(pwd)/migrations:/reservas-dapp/migrations \
      -v $(pwd)/test:/reservas-dapp/test  reservas/sandbox /bin/bash`
### shell 2
  - Conectarse al docker
   - `docker exec -it sandbox /bin/bash `
  - Iniciar el cliente de Ethereum
   - `ganache-cli -h 0.0.0.0 -m "NEMONICs"`
## Run the project
 - Compile and migrate contracts
 	- `truffle compile && truffle migrate`
 - `npm start`

## Testing
 - Angular tests
 	- `npm test`
 - Contracts tests
 	- `truffle test`

## Docker Tips
# iniciar ganache desde el container
docker run -d --name=sandbox -p 4200:4200 reservas/sandbox

# borrar el sandbox
docker rm sandbox

# terminar el sandbox
docker stop sandbox
