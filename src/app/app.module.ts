import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroTypeColorPipe } from './hero-type-color.pipe';
import { HeroBorderCardDirective } from './hero-border-card.directive';
import { HeroSkillColorPipe } from './hero-skill-color.pipe';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroCardTypeBgPipe } from './hero-card-type-bg.pipe';
import { PageNotFoundComponent } from './heroes/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroTypeColorPipe,
    HeroBorderCardDirective,
    HeroSkillColorPipe,
    HeroDetailComponent,
    HeroCardTypeBgPipe,
    PageNotFoundComponent,  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService,{dataEncapsulation:false}),
    InMemoryDataService,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
