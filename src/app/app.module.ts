import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroTypeColorPipe } from './hero-type-color.pipe';
import { HeroBorderCardDirective } from './hero-border-card.directive';
import { HeroSkillColorPipe } from './hero-skill-color.pipe';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroCardTypeBgPipe } from './hero-card-type-bg.pipe';
import { PageNotFoundComponent } from './heroes/page-not-found.component';
import { HeroEditComponent } from './hero-edit/hero-edit.component';
import { HeroFormComponent } from './hero-form/hero-form.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { HeroCreateComponent } from './hero-create/hero-create.component';
import { HeroStatsComponent } from './hero-stats/hero-stats.component';


@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroTypeColorPipe,
    HeroBorderCardDirective,
    HeroSkillColorPipe,
    HeroDetailComponent,
    HeroCardTypeBgPipe,
    HeroEditComponent,
    HeroFormComponent,
    HeroSearchComponent,
    HeroCreateComponent,  
    PageNotFoundComponent,
    HeroStatsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
		AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
