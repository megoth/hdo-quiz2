import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { QuizComponent } from './quiz';
import { StackListComponent } from './stack-list';
import { StackComponent } from './stack';
import { ResultComponent } from './result';
import { StartComponent } from "./start/start.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'start', component: StartComponent },
  { path: 'quiz/:id', component: QuizComponent },
  { path: 'stack/:id', component: StackComponent },
  { path: 'stack/:id/:responses', component: StackComponent },
  { path: 'result/:id/:responses', component: ResultComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
