import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicsRoutingModule } from './topics-routing.module';
import { TopicsComponent } from './topics.component';
import { MatCardModule } from '@angular/material/card';
import { TopicsService } from 'src/app/services/topics.service';
import { MatTabsModule } from '@angular/material/tabs';
@NgModule({
  declarations: [TopicsComponent],
  imports: [CommonModule, TopicsRoutingModule, MatCardModule, MatTabsModule],
  providers: [TopicsService],
})
export class TopicsModule {}
