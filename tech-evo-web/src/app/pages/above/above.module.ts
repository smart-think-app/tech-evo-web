import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboveComponent } from './above.component';
import { AboveRoutingModule } from './above-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SkillsService } from 'src/app/services/skills.service';

@NgModule({
  declarations: [AboveComponent],
  imports: [
    CommonModule,
    AboveRoutingModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  providers: [SkillsService],
})
export class AboveModule {}
