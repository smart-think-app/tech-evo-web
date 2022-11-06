import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicsRoutingModule } from './topics-routing.module';
import { TopicsComponent } from './topics.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    TopicsComponent
  ],
  imports: [
    CommonModule,
    TopicsRoutingModule,
    MatCardModule
  ]
})
export class TopicsModule { }
