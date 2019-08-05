# Prueba

## Dependencias utilizadas

- Node.js
- Yarn
- Webpack 3
- Babel 6
- Phaser 3.18.1

## Requisitos para ejecutar el proyecto (modo desarrollo)

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/)
- En el directorio del proyecto, ejecutar `yarn install` desde la línea de comandos.

## Ejecutando el proyecto

Ingresar a la carpeta del proyecto desde la línea de comandos `cd carpeta-del-proyecto`.

1. Ejecutar el comando `yarn webpack-dev-server`.
2. Abrir en el navegador la dirección `http://localhost:8080`
3. Seleccionar la carpeta 'build' en la pantalla (o acceder directamente desde `http://localhost:8080/build`).

El código fuente está en la carpeta "src". Como es una build de desarrollo, cada vez que se haga un cambio en el código este se verá reflejado en el navegador automáticamente.

Nota: Sólo está probado en Windows.

## Extensión del proyecto

### Agregar frutas

Cada fruta es una clase que hereda de la clase Fruta (ubicada en 'src/entities/'). Para agregar una fruta hay que crear una nueva clase que herede de Fruta y definir sus parámetros(tipo, precio, unidad). Hay que importar la imagen en 'scenes/mainScene.js' y agregar la fruta donde se instancian las clases en la función 'create()' del mismo archivo.

Si se quieren agregar nuevos parámetros a las frutas, sólo hay que agregarlos a la clase Fruta si es general o a cualquier fruta en específico si no lo es.

### Agregar dificultad

Para aumentar la dificultad de la aplicación se pueden manipular los parámetros en el constructor de la escena principal. Se podría aumentar el número de frutas mostradas cambiando la variable *max_frutas*, pero también habría que regular la escala y el número de filas y columnas en las que se distribuirán. Con las variables *max_cajones* y *escala_cajones* se puede aumentar o disminuir el número de cajones mostrados.
