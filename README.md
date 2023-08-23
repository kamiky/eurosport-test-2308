# STEPS TO RUN THE PROJECT

### `Add the following .env file in the root folder`

REACT_APP_GRAPHQL_URI=https://(...).amazonaws.com/dev/

### `Install yarn dependencies`

yarn install

### `Run project`

(yarn prestart should generate src/api/graphql.ts and graphql.schema.json files)

yarn start

### `E2E Tests & React Component tests`

Run both commands :

yarn start<br>
yarn cypress:open

### `Unit tests`

yarn test
