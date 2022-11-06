import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-above',
  templateUrl: './above.component.html',
  styleUrls: ['./above.component.scss']
})
export class AboveComponent implements OnInit {
  value = 70;
  mode: ProgressSpinnerMode = 'determinate';
  constructor() { }

  ngOnInit(): void {
  }

}
