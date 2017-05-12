import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchViewComponent } from './search-view/search-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
    {
        path:'search/:sitename',
        component: SearchViewComponent
    },
    {
        path:'search',
        component: SearchViewComponent
    },
    {
        path:'404',
        component: PageNotFoundComponent
    },
    {
        path: '',
        redirectTo: '/search',
        pathMatch: 'full'
    },
    {
        path: '**', 
        pathMatch: 'full',
        redirectTo:'/404'
    }

];
export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);