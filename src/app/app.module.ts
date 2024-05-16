import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TopBarComponent} from './components/top-bar/top-bar.component';
import {HttpClientModule} from "@angular/common/http";
import {PostListComponent} from './components/post-list/post-list.component';
import {PostService} from "./service/PostService";
import {PostListItemComponent} from './components/post-list-item/post-list-item.component';
import {NgOptimizedImage} from "@angular/common";
import {PostFormComponent} from './components/post-form/post-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CategoryService} from "./service/CategoryService";

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    PostListComponent,
    PostListItemComponent,
    PostFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    HttpClientModule,
    NgOptimizedImage,
    ReactiveFormsModule
  ],
  providers: [
    PostService,
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
