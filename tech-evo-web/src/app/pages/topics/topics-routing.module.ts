import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopicsComponent } from './topics.component';

const routes: Routes = [
  {
    path: '',
    component: TopicsComponent
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('../topic-detail/topic-detail.module').then(m => m.TopicDetailModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicsRoutingModule { }
