import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './profile.component';
import {ProfileEditComponent} from './profile-edit/profile-edit.component';

const profileRoutes: Routes = [
  {path: '', component: ProfileComponent},
  {path: 'edit', component: ProfileEditComponent},

]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(profileRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProfileRoutingModule { }
