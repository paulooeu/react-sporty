/* eslint-disable linebreak-style */
import { call, put } from 'redux-saga/effects';
import api from '../../services/api';

import { Creators as PlaylitDetailsActions } from '../ducks/playlistDetails';

export function* getPlaylistDetails(action) {
  try {
    const response = yield call(api.get, `/playlists/${action.payload.id}?_embed=songs`);

    yield put(PlaylitDetailsActions.getPlaylistDetailsSuccess(response.data));
  } catch (err) {
    console.log(err);
  }
}
