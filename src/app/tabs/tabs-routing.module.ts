import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'network',
        loadChildren: () => import('../network/network.module').then(m => m.NetworkPageModule)
      },

      {
        path: 'devices/hub/add-user',
        loadChildren: () => import('../devices/hub/add-user/add-user.module').then(m => m.AddUserPageModule)
      },
      {
        path: 'devices/hub/:id',
        loadChildren: () => import('../devices/hub/hub.module').then(m => m.HubPageModule)
      },

      {
        path: 'devices/verification/:id',
        loadChildren: () => import('../devices/verification/verification.module').then(m => m.VerificationPageModule)
      },


      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/network',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/network',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
