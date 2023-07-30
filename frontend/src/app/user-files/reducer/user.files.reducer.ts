import { UserFile } from './interfaces';
import { createReducer, on } from '@ngrx/store';
import { FilesActions, FilesApiActions } from './user.files.actions';

export const initialState = {
  files: [] as ReadonlyArray<UserFile>,
};

export const userFilesReducer = createReducer(
  initialState,
  on(FilesActions.insertFile, (state, newFile) => {
    const alreadyExists = state.files.find(({ id }) => newFile.id === id);
    if (alreadyExists) {
      return state;
    }

    return { ...state, files: [...state.files, newFile] };
  }),

  on(FilesApiActions.retrieveFiles, (state, { files }) => {
    return { ...state, files };
  })
);

export type UserFilesState = typeof initialState;
