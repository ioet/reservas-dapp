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


##Acerca de solidity, creando contratos
A contract consists of the following multiple constructs:

#State variables

Las variables en la programación se refieren a la ubicación de almacenamiento que puede contener valores. Estos valores se pueden cambiar durante el tiempo de ejecución. La variable se puede usar en múltiples lugares dentro del código y todos se referirán al valor almacenado en ella. Solidity proporciona dos tipos de variable-estado y variables de memoria.

- internal: Significa que esta variable solo se puede usar dentro de las funciones del contrato  y cualquier contrato que herede de ellas. No se puede acceder a estas variables desde afuera para modificarlas; sin embargo, pueden ser vistass.

- private: son variables internas con restricciones adicionales. Las variables de estado privado solo se pueden usar en contratos que las declaran.

- public: se puede acceder a las variables directamente

- constant: el valor de la variable se asigna en el momento de la declaracion

Ademas solidity provee las siguientes tipos de variables:

Los tipos de valores son tipos que no toman más de 32 bytes de memoria en tamaño. La solidez proporciona los siguientes tipos de valores:

bool: puede ser true o false
uint: Estos son enteros sin signo que pueden contener 0 y solo valores positivos
int: estos son enteros con signo que pueden contener valores negativos y positivos
address: representa el address de una cuenta en Ethereum
byte: es un array fixed (byte1 to bytes32)
enum: Enumeraciones que pueden contener valores constantes predefinidos

Solidity provides the following reference types:

Arrays:
Structs:
String:
Mappings:  es similar a una tabla  o diccionario en otros lenguajes de programacion que almacena pares clave-valor.

Cada variable declarada y utilizada dentro de un contrato tiene una ubicación de datos. EVM proporciona las siguientes cuatro estructuras de datos para almacenar variables:

#Storage and memory data locations
Storage: Esta es la memoria global disponible para todas las funciones dentro del contrato. Este almacenamiento es un almacenamiento permanente que Ethereum que se almacena en cada nodo.


Memory: Esta es la memoria local disponible para cada función dentro de un contrato. Esta es una memoria efímera y efímera que se destruye cuando la función completa su ejecución.

Calldata: Aquí es donde se almacenan todos los datos de ejecución de funciones entrantes, incluidos los argumentos de funciones. Esta es una ubicación de memoria no modificable.

Stack: EVM mantiene una pila para cargar variables y valores intermedios para trabajar con el conjunto de instrucciones de Ethereum. Esta es la memoria de conjunto de trabajo para EVM. Una pila tiene 1.024 niveles de profundidad en EVM y si almacena algo más que esto, genera una excepción.


#Structure definitions:
Las estructuras o estructuras ayudan a implementar tipos de datos personalizados definidos por el usuario. Una estructura es un tipo de datos compuesto, que consta de múltiples variables de diferentes tipos de datos. Son muy similares a los contratos; sin embargo, no contienen ningún código dentro de ellos.

#Modifier definitions

Event declarations:
Solidity admite eventos. Los eventos en Solidity son como eventos en otros lenguajes de programación. Los eventos de los contratos permiten que cualquier persona interesada en ellos pueda verlos / capturarlos y ejecutar código en respuesta.

Enumeration definitions
La palabra clave enum se usa para declarar enumeraciones. Las enumeraciones ayudan a declarar un tipo de datos personalizado definido por el usuario en Solidity. Enum consiste en una lista de un conjunto predeterminado de constantes con nombre.

Function definitions

Las funciones son el corazón de Ethereum y Solidity. Ethereum mantiene el estado actual de las variables de estado y ejecuta la transacción para cambiar los valores en las variables de estado.

Cuando se llama o invoca una función en un contrato, da como resultado la creación de una transacción. Las funciones son el mecanismo para leer y escribir valores desde / hasta variables de estado. Las funciones son una unidad de código que se puede ejecutar bajo demanda llamándolo. Las funciones pueden aceptar parámetros, ejecutar su lógica y, opcionalmente, devolver valores a la persona que llama.

public: su visibilidad hace que la función permita acceder directamente desde el exterior. Son  la interfaz de contratos y se pueden llamar tanto interna como externamente.
interno: por defecto, la variable de estado tiene un calificador interno si no se especifica nada. Significa que esta función solo puede usarse dentro del contrato actual y cualquier contrato que herede de él. No se puede acceder a estas funciones desde afuera. No son parte de la interfaz de contratos.

private: las funciones privadas solo se pueden usar en los contratos que las declaran. No pueden usarse incluso dentro de contratos derivados. No son parte de la interfaz de contratos.

externo: esta visibilidad hace que las funciones accedan directamente desde el exterior pero no internamente. Estas funciones se vuelven parte de la interfaz de contratos.

Las funciones también pueden tener los siguientes calificadores adicionales que cambian su comportamiento en términos de tener la capacidad de cambiar las variables de estado del contrato:


constant: Estas funciones no tienen la capacidad de modificar el estado de blockchain. Pueden leer las variables de estado y regresar a la persona que llama, pero no pueden modificar ninguna variable, invocar un evento, crear otro contrato, llamar a otras funciones que pueden cambiar el estado, y así sucesivamente. Piense en funciones constantes como funciones que pueden leer y devolver valores de variables de estado actuales.


view: son como las funciones contants

pure: Las funciones puras restringen aún más la capacidad de las funciones. Las funciones puras no pueden leer ni escribir; en resumen, no pueden acceder a las variables de estado. Las funciones que se declaran con este calificador deben garantizar que no tendrán acceso al estado actual y las variables de transacción.

payable: Las funciones declaradas con la palabra clave payable tienen la capacidad de aceptar Ether de la persona que llama. La llamada fallará en caso de que el emisor no proporcione Ether. Una función solo puede aceptar Ether si está marcado como payable.


#Address
Una dirección es un tipo de datos de 20 bytes. Está específicamente diseñado para contener direcciones de cuenta en Ethereum, que son de 160 bits o 20 bytes de tamaño. Puede contener direcciones de cuenta de contrato así como direcciones de cuenta de propiedad externa. La dirección es un tipo de valor y crea una copia nueva mientras se le asigna a otra variable.

La dirección tiene una propiedad de balance que devuelve la cantidad de Ether disponible con la cuenta y tiene algunas funciones para transferir Ether a cuentas e invocar funciones de contrato.

Provee dos funciones para transferir ether:
- transfer
- send

La función transfer es una mejor alternativa para transferir Ether a una cuenta que la función de send. La función send devuelve un valor booleano dependiendo de la ejecución exitosa de la transferencia de Ether, mientras que la función de transfer genera una excepción y devuelve el Ether a la persona que llama.

#Validations
Require:
  - Validar las entradas del usuario, es decir.
      require (entrada <20);
  - Validar la respuesta de un contrato externo, es decir.
    require (external.send (cantidad));
  - Validar las condiciones del estado antes de la ejecución, es decir.
    require (block.number> SOME_BLOCK_NUMBER) o require (balance [msg.sender]> = amount)
  - Se usa al inicio de una función

Revert:
  - Maneje el mismo tipo de situaciones que require (), pero con una lógica más compleja.

Assert:
  - Verifique el desbordamiento / subdesbordamiento, es decir
        c = a + b; assert (c> b)
  - Comprueba condiciones invariantes, es decir
        assert (this.balance> = totalSupply);
  - Valida el  estado después de hacer cambios
  - Previene condiciones que nunca deberían ser posibles
  - Se usará hacia el final de una función.
