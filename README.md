### `Estilizando o player`

importar o rc-slider

### `Estilizando pagina de navegaçao`

importar o react-router-dom

### `Configurando o Reactotron`

importar o reactotron-react-js reactotron-redux reactotron-redux-saga 3.0.0

## Configuraçâo do Redux & Saga

Importe o `redux react-redux redux-saga`
Crie o store/index.js, store/ducks/index.js e store/saga/index.js

### `store/index`

```
/* eslint-disable linebreak-style */
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './ducks';
import sagas from './sagas';

const middlewares = [];

const sagaMonitor = process.env.NODE_ENV === 'development' ? console.tron.createSagaMonitor() : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

middlewares.push(sagaMiddleware);

const tronMiddleware = process.env.NODE_ENV === 'development' ? console.tron.createEnhancer : () => {};

const store = createStore(
  reducers,
  compose(
    applyMiddleware(...middlewares),
    tronMiddleware(),
  ),
);

sagaMiddleware.run(sagas);

export default store;

```

### `App`

```
import {Provider} from 'react-redux';
import store from './store';
```

### `ducks/index`

```
import { combineReducers } from 'redux';

export default combineReducers({
  example: () => [],
});
```

### `sagas/index`

```
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([]);
}
```

## Duck de Playlist

Crie o arquivo ducks/playlist.js

### `ducks/playlist.js`

```
export const Types = {
  GET_REQUEST: 'playlists/GET_REQUEST',
  GET_SUCCESS: 'playlists/GET_SUCCESS',
};

const INITIAL_STATE = {
  data: [],
  loading: false,
};

export default function playlists(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return { ...state, loading: true };
    case Types.GET_SUCCESS:
      return { ...state, loading: false, data: action.payload.data };
    default:
      return state;
  }
}

export const Creators = {
  getPlaylistsRequest: () => ({ type: Types.GET_REQUEST }),
  getPlaylistsSuccess: data => ({ type: Types.GET_SUCCESS, payload: { data } }),
};
```

Deve alterar o arquivo ducks/index para receber o redux

### `ducks/index`

```
import { combineReducers } from 'redux';
import playlists from './playlists';

export default combineReducers({
  playlists,
});
```

## Jason-serve

Para iniciar deve importar `global add json-server`.
Para iniciar o json `json-server server.json -p 3001 -w -d 500`

## Carregando playlists na sidebar

Para iniciar deve importar `axios` para requisições api

### `services/api.js`

```
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});
export default api;

```

### `sagas/playlists.js`

```
import { call, put } from 'redux-saga/effects';
import api from '../../services/api';

import { Creators as PlaylitsActions } from '../ducks/playlists';

export function* getPlaylists() {
  try {
    const response = yield call(api.get, '/playlists');
    yield put(PlaylitsActions.getPlaylistsSuccess(response.data));
  } catch (err) {
    console.log(err);
  }
}
```

Altere o arquivo `saga/index`

### `saga/index`

```
import { all, takeLatest } from 'redux-saga/effects';
import { Types as PlaylistsTypes } from '../ducks/playlists';
import { getPlaylists } from './playlist';

export default function* rootSaga() {
  yield all([takeLatest(PlaylistsTypes.GET_REQUEST, getPlaylists)]);
}
```

## Carregando Playlist

Deve alterar o arquivos `components/sidebar/index`

```
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as PlaylistsActions } from '../../store/ducks/playlists';

import { Container, NewPlaylist, Nav } from './styles';
import AddPlaylistIcon from '../../assets/images/add_playlist.svg';

class Sidebar extends Component {
  static propTypes = {
    getPlayListRequest: PropTypes.func.isRequired,
    playlists: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          title: PropTypes.string,
        }),
      ),
    }).isRequired,
  };

  componentDidMount() {
    this.props.getPlaylistsRequest();
  }

  render() {
    return (
      <Container>
        <div>
          <Nav main>
            <li>
              <Link to="/">Navegar</Link>
            </li>
            <li>
              <a href="">Radio</a>
            </li>
          </Nav>
          <Nav>
            <li>
              <span>SUA BIBLIOTECA</span>
            </li>
            <li>
              <a href="">Seu Daily Mix</a>
            </li>
            <li>
              <a href="">Tocados recentemantes</a>
            </li>
            <li>
              <a href="">Musicas</a>
            </li>
            <li>
              <a href="">Albums</a>
            </li>
            <li>
              <a href="">Artistas</a>
            </li>
            <li>
              <a href="">Estações</a>
            </li>
            <li>
              <a href="">Arquivos locais</a>
            </li>
            <li>
              <a href="">Videos</a>
            </li>
            <li>
              <a href="">Podcasts</a>
            </li>
          </Nav>
          <Nav>
            <li>
              <span>PLAYLISTS</span>
            </li>
            {this.props.playlists.data.map(playlist => (
              <li key={playlist.id}>
                <Link to={`playlists/${playlist.id}`}>{playlist.title}</Link>
              </li>
            ))}
          </Nav>
        </div>
        <NewPlaylist>
          <img src={AddPlaylistIcon} alt="Adiconar Playlist" />
          Nova Playlist
        </NewPlaylist>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  playlists: state.playlists,
});

const mapDispatchToProps = dispatch => bindActionCreators(PlaylistsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);

```

## Mostrando Playlist na home

`pages/browse/index.js`

```
/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Creators as PlaylistsActions } from '../../store/ducks/playlists';
import {
  Container, Title, List, Playlist,
} from './styles';

class Browse extends Component {
  static propTypes = {
    getPlayListRequest: PropTypes.func.isRequired,
    playlists: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          title: PropTypes.string,
          thumbnail: PropTypes.string,
          description: PropTypes.string,
        }),
      ),
    }).isRequired,
  };

  componentDidMount() {
    this.props.getPlaylistsRequest();
  }

  render() {
    return (
      <Container>
        <Title>Navegar</Title>
        <List>
          {this.props.playlists.data.map(playlist => (
            <Playlist key={playlist.id} to={`/playlists/${playlist.id}`}>
              <img src={playlist.thumbnail} alt={playlist.title} />
              <strong>{playlist.title}</strong>
              <p>{playlist.description}</p>
            </Playlist>
          ))}
        </List>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  playlists: state.playlists,
});

const mapDispatchToProps = dispatch => bindActionCreators(PlaylistsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Browse);

```

## Adicionando loading

`components/loading/index`

```
import React from 'react';
import LoadingIcon from '../../assets/images/loading.svg';
import { Spinner } from './styles';

const Loading = () => <Spinner src={LoadingIcon} alt="Carregando" />;

export default Loading;

```

`browse/styler`

```
import styled, { keyframes } from 'styled-components';

const rotate360 = keyframes`
from{
transform:rotate(0deg)
}
to{
  transform:rotate(360deg)
}
`;

export const Spinner = styled.img`
  animation: ${rotate360} 2s linear infinite;
`;

```

`siderbar/index`

```
import Loading from '../Loading';
...
),
      loading: PropTypes.bool,
...
     <span>PLAYLISTS</span>
              {this.props.playlists.Loading && <Loading />}
```

`siderbar/styler`

```
import { Spinner } from '../Loading/styles';
...
export const Nav = styled.ul`
 li {
      display:flex;
    align-items:center;
  ${Spinner}{
      height:15px;
      margin-left:5px;
    }

```

`brower/index`

```
import Loading from '../Loading';
...
),
      loading: PropTypes.bool,
...
      <Title>
          Navegar
          {this.props.playlists.loading && <Loading />}
```

`browse/styler`

```
import { Spinner } from '../Loading/styles';
...
export const Title = styled.h1`
  font-size: 48px;

  ${Spinner} {
    height: 24px;
  }

```

## Detalhe da playlist

`store/ducks/playlistDetails`

```
/* eslint-disable linebreak-style */
export const Types = {
  GET_REQUEST: 'playlistDetails/GET_REQUEST',
  GET_SUCCESS: 'playlistDetails/GET_SUCCESS',
};

const INITIAL_STATE = {
  data: {},
  loading: false,
};

export default function playlistDetails(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return { ...state, loading: true };
    case Types.GET_SUCCESS:
      return { ...state, loading: false, data: action.payload.data };
    default:
      return state;
  }
}

export const Creators = {
  getplaylistDetailsRequest: id => ({ type: Types.GET_REQUEST, payload: { id } }),
  getplaylistDetailsSuccess: data => ({ type: Types.GET_SUCCESS, payload: { data } }),
};

```

`store/ducks/index`

```
import playlistDetails from './playlistDetails';
...
playlistDetails,
```

`store/sagas/playlistDetails`

```
import { call, put } from 'redux-saga/effects';
import api from '../../services/api';

import { Creators as PlaylitDetailsActions } from '../ducks/playlists';

export function* getPlaylistDetails(action) {
  try {
    const response = yield call(api.get, `/playlists/${action.playload.id}?_embed=songs`);

    yield put(PlaylitDetailsActions.getPlaylistDetailsSuccess(response.data));
  } catch (err) {
    console.log(err);
  }
}
```

`store/sagas/index`

```
import { Types as PlaylistDetailsTypes } from '../ducks/playlistDetails';
import { getPlaylistDetails } from './playlistDetails';
...
    takeLatest(PlaylistDetailsTypes.GET_REQUEST, getPlaylistDetails),
```
