import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/above/above.module').then(m => m.AboveModule)
  },
  {
    path: 'topics',
    loadChildren: () => import('./pages/topics/topics.module').then(m => m.TopicsModule)
  },
  {
    path: 'roadmap',
    loadChildren: () => import('./pages/roadmap/roadmap.module').then(m => m.RoadmapModule)
  },
  {
    path: 'documents',
    loadChildren: () => import('./pages/documents/documents.module').then(m => m.DocumentsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
