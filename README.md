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

## Run the project
 - Start Ethereum client
 	- `ganache-cli`
 - Compile and migrate contracts
 	- `truffle compile && truffle migrate`
 - `npm start`

## Testing
 - Angular tests
 	- `npm test`
 - Contracts tests
 	- `truffle test`

# Development
## Creación de contrato
	- Creamos el contrato `Catalog` dentro del directorio `/contracts`
	- Definición de variables
		- Tipos de datos
			- bool: (`true/false`)
			- int / uint: Enteros con y sin signo de varios tamaños respectivamente.
			- address: Dirección de Ethereum (20 bytes)
			- bytes1, bytes2, bytes3, ..., bytes32:
			- Struct
