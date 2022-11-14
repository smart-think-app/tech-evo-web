import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TopicsService } from 'src/app/services/topics.service';
import { TopicDto, TopTopicDto } from './../../dto/topics.dto';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {
  topTopicsDto: TopTopicDto = {
    devops: [],
    backend: [],
  };
  selected = new FormControl(0);
  backendPageIndex = 1;
  previousBackendPageIndex = 0;
  devopsPageIndex = 1;
  previousDevopsPageIndex = 0;
  constructor(private _topicService: TopicsService) {}

  ngOnInit(): void {
    this._topicService.getTopics.subscribe((data) => {
      switch (this.selected.value) {
        case 0:
          if (this.previousBackendPageIndex == this.backendPageIndex) {
            this.topTopicsDto.backend = data;
          } else {
            this.topTopicsDto.backend = this.topTopicsDto.backend.concat(data);
            this.previousBackendPageIndex = this.backendPageIndex;
          }
          break;
        case 1:
          if (this.previousDevopsPageIndex == this.devopsPageIndex) {
            this.topTopicsDto.devops = data;
          } else {
            this.topTopicsDto.devops = this.topTopicsDto.devops.concat(data);
            this.previousDevopsPageIndex = this.devopsPageIndex;
          }
          break;
        default:
          break;
      }
    });
    this._topicService.getTopicFromAPI({
      type: 1,
      page_index: 1,
      page_size: 2,
    });
  }

  initAPI() {
    let type = 1;
    let pageIndex = this.backendPageIndex;
    let isLoadData = false;
    switch (this.selected.value) {
      case 0:
        type = 1;
        pageIndex = this.backendPageIndex;
        if (this.previousBackendPageIndex != pageIndex) {
          isLoadData = true;
        }
        break;
      case 1:
        type = 2;
        pageIndex = this.devopsPageIndex;
        if (this.previousDevopsPageIndex != pageIndex) {
          isLoadData = true;
        }
        break;
      default:
        break;
    }
    
    if (isLoadData) {
      console.log("load data")
      this._topicService.getTopicFromAPI({
        type: type,
        page_index: pageIndex,
        page_size: 2,
      });
    }
  }

  switchTab(data: any) {
    this.selected.setValue(data);
    this.initAPI();
  }

  loadMoreBackendTopics() {
    this.backendPageIndex += 1;
    this.initAPI();
  }
}
