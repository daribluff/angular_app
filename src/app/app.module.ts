import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { OnChanges } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContenteditableDirective } from 'ng-contenteditable';

import { OrderModule } from 'ngx-order-pipe';

//AngularFire imports
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

//Component Imports
import { AppComponent } from './app.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ApplicationComponent } from './components/application/application.component';
import { HtmlComponent } from './components/html/html.component';
import { CssComponent } from './components/css/css.component';

// Service Imports
import { BlockService } from './services/block.service';
import { BlocksComponent } from './components/blocks/blocks.component';

// JQuery Import
import * as $ from 'jquery';

const appRoutes: Routes = [
  { path: '', component: ApplicationComponent}
  // {path: '', component:}
]

export const firebaseConfig = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBe4hIuNmlrG6ToK0_UnG8wkBy3ggHr2Rc",
    authDomain: "htmlgenerator-90397.firebaseapp.com",
    databaseURL: "https://htmlgenerator-90397.firebaseio.com",
    projectId: "htmlgenerator-90397",
    storageBucket: "htmlgenerator-90397.appspot.com",
    messagingSenderId: "877311822168"
  }
}

@NgModule({
  declarations: [
    AppComponent,
    ApplicationComponent,
    HtmlComponent,
    CssComponent,
    BlocksComponent,
    ContenteditableDirective
  ],
  imports: [
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig.firebase, 'app'),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    OrderModule,
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    BlockService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
