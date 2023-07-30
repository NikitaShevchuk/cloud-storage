import { createActionGroup, props } from '@ngrx/store';
import { UserFile } from './interfaces';

export const FilesActions = createActionGroup({
  source: 'Files',
  events: {
    'Insert File': props<UserFile>(),
    'Remove File': props<{ id: number }>(),
  },
});

export const FilesApiActions = createActionGroup({
  source: 'Files',
  events: {
    'Retrieve Files': props<{ files: ReadonlyArray<UserFile> }>(),
  },
});
