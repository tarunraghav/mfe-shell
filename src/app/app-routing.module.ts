import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import React from 'react';
import { ReactWrapperComponent } from './react-wrapper/react-wrapper.component';

const routes: Routes = [
  {
    path: 'react',
    component: ReactWrapperComponent,
    data: {
      remoteName: 'remoteApp',
      exposedModule: './Button',
      elementId: 'react_button',
      props: {}
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
