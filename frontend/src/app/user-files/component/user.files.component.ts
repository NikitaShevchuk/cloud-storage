import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FilesActions, UserFilesState } from '../reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-user-files',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.files.component.html',
  styleUrls: ['./user.files.component.scss'],
})
export class UserFilesComponent {
  userFiles$: Observable<UserFilesState['files']>;

  constructor(private store: Store<UserFilesState>) {
    this.userFiles$ = store.select('files');
  }

  ngOnInit() {
    this.store.dispatch(FilesActions.insertFile({ title: 'test', id: 0 }));

    console.log(this.userFiles$);
  }
}
