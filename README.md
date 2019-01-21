# Example Express App using CSS/SCSS via Webpack

This is an example app that supports CSS and CSS Modules via `.css` and `.scss` imports. You should probably just be using CSS-in-JS (Emotion 9), but this might save you some trouble. Uses latest versions of Babel 7, Webpack 4+, and React 16.7.

Hot-reloading works and CSS is prefetched in development mode, so you won't have a FOUC (Flash of Unstyled Content).

All configuration lives in `./webpack`. This is a little more sophisticated setup than [example-react-hot-loader](https://github.com/staylor/example-react-hot-loader), because the server code has to compiled before the Express server is started. Babel can transpile the JS, but the CSS imports have to parsed by Webpack before the server runs. You can see what happens in `./cli/dev`.

## Install

```bash
yarn
```

## Development with Hot-reloading of React components

```bash
yarn dev
```

## Production
```bash
yarn prod
```

Your server will run at `http://localhost:3000`.
