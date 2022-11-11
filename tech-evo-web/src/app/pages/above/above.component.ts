import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { SkillsService } from 'src/app/services/skills.service';
import { SkillDto } from './../../dto/skill.dto';

@Component({
  selector: 'app-above',
  templateUrl: './above.component.html',
  styleUrls: ['./above.component.scss'],
})
export class AboveComponent implements OnInit {
  value = 70;
  mode: ProgressSpinnerMode = 'determinate';
  skillData: SkillDto[] = [];
  constructor(private _skillService: SkillsService) {}

  ngOnInit(): void {
    this._skillService.getSkill.subscribe((data) => {
      this.skillData = data;
    });
    this.initAPI()
  }

  initAPI(): void {
    this._skillService.getSKillDataAPI();
  }
}
