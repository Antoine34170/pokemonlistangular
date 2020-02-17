import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroesComponent } from './heroes/heroes.component'
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroEditComponent} from './hero-edit/hero-edit.component';
import { HeroCreateComponent } from './hero-create/hero-create.component';
import { HeroStatsComponent } from './hero-stats/hero-stats.component';


const routes: Routes = [

  { path: 'heroes', component: HeroesComponent },
  { path: 'heroes/stats', component: HeroStatsComponent},
  { path: 'heroes/create', component: HeroCreateComponent},
  { path: 'heroes/:id', component: HeroDetailComponent },
  { path: 'heroes/edit/:id', component: HeroEditComponent },
  { path: '', redirectTo: 'heroes', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
