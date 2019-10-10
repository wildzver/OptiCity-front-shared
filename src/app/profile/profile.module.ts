import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileComponent} from './profile.component';
import {ProfileRoutingModule} from './profile-routing.module';
import { ProfileSidebarComponent } from './profile-sidebar/profile-sidebar.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import {BreadcrumbNavigationModule} from '../breadcrumb-navigation/breadcrumb-navigation.module';

@NgModule({
  declarations: [ProfileComponent, ProfileSidebarComponent, ProfileEditComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    BreadcrumbNavigationModule
  ]
})
export class ProfileModule { }
