# instagram-viewer-react

Instagram Viewer React App - [Demo](https://instagram-viewer-react.herokuapp.com/)

## Install

```sh
$ git clone git://github.com/minjunk/instagram-viewer-react.git
$ npm install
```

**NOTE:** Do not forget to set the Instagram `INSTAGRAM_CLIENT_ID`s and `INSTAGRAM_ACCESS_TOKEN`s. In `development` env, you can set the env variables by doing

```sh
$ cp .env.example .env
```

and replace the values there. In `production` env, it is not safe to keep the client id and access token in a file, so you need to set it up via commandline.

```sh
INSTAGRAM_CLIENT_ID=INSTAGRAM_CLIENT_ID
INSTAGRAM_ACCESS_TOKEN=INSTAGRAM_ACCESS_TOKEN
```

then

```sh
$ npm start
```

Or, use [yarn](https://yarnpkg.com/en/)

```sh
$ yarn install
$ yarn start
```

## License

MIT
