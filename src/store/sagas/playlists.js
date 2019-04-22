/* eslint-disable linebreak-style */
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
