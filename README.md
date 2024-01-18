# Angular & TypeScript - Angular Heroes App

---

# Temas puntuales de la sección

### ¿Qué veremos en esta sección?

#### \* En primer lugar veremos:

Implementación de la carga perezosa aplicando el Lazyload y la forma como lo usaremos nos ayudará a manejar los dos posibles casos de uso donde uno de ellos es cuando la ruta hija no tiene estilo especial (concepto de layout para los componentes) y otra en la que requiere un estilo diferente por cada módulo.

El concepto de layout para los componentes hace referencia a que tendremos un componente padre con un estilo y componentes específicos los cuales se mostrarán en los componentes hijos como por ejemplo un menu que debería estar en todo lugar y solo se irían cambianos los componentes hijos.

- Rutas Hijas
- Rutas Principales
- LazyLoad
- Multiples estilos en la misma SPA
- Concepto de layout para los componentes

#### \* En segundo lugar veremos:

Aprender a utilizar Angular Material. Trabajaremos con muchos componentes de Angular material que ayudará a ver cualquier otro tipo de paquete modularizado de la misma manera y se sabrá cómo aplicarlo en el futuro.

- Angular Material
- Interfaces y tipado
- Pipes personalizados
- Variables de entorno
- Autocomplete de AngularMaterial
- Peticiones HTTP
- JSON-Server
- Prime Flex

#### \* En tercer lugar veremos:

Esta sección tendrá bases para poder realizar CRUD completos hacia cualquier backend basado en servicios web, mediante comunicación JSON

- CRUD
  - Create
  - Read
  - Update
  - Delete
- Pipes puros e impuros
- Snacks
- Dialogs
- Inyección de servicios manualmente

#### \* En cuarto lugar veremos:

Esta es una sección muy importante, donde controlaremos de forma básica una autenticación, veremos cómo Angular nos puede servir para proteger nuestras rutas.

- Protección de rutas
- Rutas privadas
- Rutas públicas
- Servicio de autenticación
- Guards (protectores de rutas)
- Can Activate
- Can Match
- Mantener la sesión del usuario

### \* PASOS A REALIZAR:

1. ejemplo
2. ejemplo
3. ejemplo

### \* RECURSOS A USAR:

- Angular Material (15.2.9): https://v15.material.angular.io/
  - `ng add @angular/material` (si aparece el ng add entonces hacerlo mediante ese ng add porque quiere decir que usa el Angular CLI y verifica la versión de Angular que estamos usando y dependiendo de eso entonces usaría la versión óptima del paquete que queremos instalar)
- PrimeFlex (3.3.0): https://primeflex.org/
  - `npm install primeflex@3.3.0` -o- `<link rel="stylesheet" href="https://unpkg.com/primeflex@3.3.0/primeflex.min.css">`
- json-server (0.17.4) (para hacer pruebas en local): https://www.npmjs.com/package/json-server // https://www.npmjs.com/package/json-server/v/0.17.4
  - `npm i -D json-server@0.17.4`
    - También se podría intentar con `npx json-server --watch data/db-hero.json` y ya no colocar el script o ya no instalar el paquete json-server con npm en la aplicación ya que se está haciendo uso del npx
- ejemplo

### \* NOTAS:

- Levantar el backend local: `npm run backend-local`
- Para trabajar con las variables de entorno en Angular es una forma distinta a cómo se trabajaría con los demás Frameworks ya que hay que crear en src una carpeta llamada environments y luego archivos environments.ts y según cómo se necesiten para producción, desarrollo, testing, etc.
- Hay que decirle también que cuando se trabaje en desarrollo se trabaje con el environments.ts pero en producción, es decir, cuando se hace el build, entonces utilice el environments.prod.ts, para eso hay que hacer la configuración en angular.json en configurations -> production -> agregar "fileReplacements". Esta es una configuración que venía antes de Angular 15, es decir, de Angular 14 para abajo ya venía puesta por defecto aunque ahora ya no viene por defecto pero igual esta configuración es un estandar en la mayor parte de aplicaciones que hay de Angular 15 para abajo anteriormente aunque algunas aplicaciones de Angular 15 hacen esto manualmente como en este caso.

  ```json (angular.json)
  "configurations": {
    "production": {
      "fileReplacements": [
        {
          "replace": "src/environments/environments.ts",
          "with": "src/environments/environments.prod.ts"
        }
      ],
      ......
    }
    ......
  }
  ```

  - Otra forma de hacerlo dinámicamente: https://christianlydemann.com/implementing-dynamic-environments-in-angular-for-avoiding-one-build-per-environment/

---

# AngularHeroesApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
