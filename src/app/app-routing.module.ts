import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroesComponent } from './heroes/heroes.component'
import { PageNotFoundComponent } from './heroes/page-not-found.component'
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroEditComponent} from './hero-edit/hero-edit.component';


const routes: Routes = [

  { path: 'heroes', component: HeroesComponent },
  { path: 'heroes/:id', component: HeroDetailComponent },
  { path: 'heroes/edit/:id', component: HeroEditComponent },
  { path: '', redirectTo: 'heroes', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
