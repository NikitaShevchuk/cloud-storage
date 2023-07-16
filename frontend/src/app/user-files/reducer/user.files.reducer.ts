import { UserFile } from './interfaces';
import { createReducer, on } from '@ngrx/store';
import { userFileActions } from './user.files.actions';

export const initialState = {
  files: [] as UserFile[],
};

const { setFiles } = userFileActions;

export const userFilesReducer = createReducer(
  initialState,
  on(setFiles, (state) => ({ ...state, files: [{ title: 'test' }] }))
);
