# react-native-maps-examples

A aplicação, feita em React Native, serve para mostrar exemplos de uso da biblioteca [React Native Maps](https://github.com/react-community/react-native-maps)
A aplicação aborda todos os aspectos simples de um aplicativo que a Google Maps API, como o uso de Markers, Callouts, Directions e Rotas no mapa.

## Configurando

Para ver em funcionamento, dê um `$ git clone` neste projeto, depois rode

```
$ npm install or yarn add
```

## Estrutura do aplicativo

**Navegação**

A biblioteca usada para a navegação foi a [React Navigation V2] (https://github.com/react-navigation/react-navigation) usando o StackNavigator.

Na pasta ``` src/screens ``` temos as páginas disponíveis no aplicativo que são 

``` MapScreen.js ``` nessa página temos um MapView com um Callout onde você pode alterar o lugar dele pelo clique do mouse

``` MapScreenCallout.js ``` nessa página você temos um MapView onde você pode com o clique do mouse adicionar vários Callouts pelo mapa

``` MapScreenPlaces.js ``` nessa página temos um MapView e um container para mostrar as informações de lugares espalhados em pontos no mapa

``` MapScreenRoutes.js ``` nessa página temos um MapView onde você, pode informar o local de origem e destino e por meio da biblioteca [React Native Geocoding](https://github.com/marlove/react-native-geocoding) o endereço que foi digitado é transformado em coodernadas e elas são colocadas no mapa.

Para configurar e rodar o aplicativo e para em seus emuladores basta usar

```
react-native run-android or react-native run-ios
```
