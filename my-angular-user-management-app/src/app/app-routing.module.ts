import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReadMeComponent } from './read-me/read-me.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { ChangeLogComponent } from './change-log/change-log.component';

const routes: Routes = [
  { path: 'read-me', component: ReadMeComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'change-log', component: ChangeLogComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
