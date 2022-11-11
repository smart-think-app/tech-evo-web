import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicDetailRoutingModule } from './topic-detail-routing.module';
import { TopicDetailComponent } from './topic-detail.component';


@NgModule({
  declarations: [
    TopicDetailComponent
  ],
  imports: [
    CommonModule,
    TopicDetailRoutingModule
  ]
})
export class TopicDetailModule { }
