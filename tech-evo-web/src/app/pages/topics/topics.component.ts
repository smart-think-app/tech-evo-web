import { HttpStatusCode } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TopicTypeEnum } from 'src/app/enums/topic-type.enum';
import { TopicsService } from 'src/app/services/topics.service';
import {
  GetTopicsRequestDto,
  TopicDto,
  TopTopicDto,
} from './../../dto/topics.dto';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {
  selected = new FormControl(0);
  devopsTopics: TopicDto[] = [];
  devopsCurrentIndex = 0;

  backendTopics: TopicDto[] = [];
  backendCurrentIndex = 1;

  pageSize = 2;
  constructor(private _topicService: TopicsService) {}

  ngOnInit(): void {
    this.initAPI({
      type: TopicTypeEnum.Backend,
      page_index: this.backendCurrentIndex,
      page_size: this.pageSize,
    });
  }

  initAPI(request: GetTopicsRequestDto) {
    this._topicService.getTopicFromAPI(request).subscribe((result) => {
      if (result.code == HttpStatusCode.Ok) {
        this.appendTopics(request.type, result.data);
      }
    });
  }

  appendTopics(topicType: number, data: TopicDto[]) {
    switch (topicType) {
      case TopicTypeEnum.Backend:
        if (data.length != 0) {
          this.backendCurrentIndex += 1;
        }
        this.backendTopics = this.backendTopics.concat(data);
        break;
      case TopicTypeEnum.Devops:
        if (data.length != 0) {
          this.devopsCurrentIndex += 1;
        }
        this.devopsTopics = this.devopsTopics.concat(data);
        break;
      default:
        break;
    }
  }

  switchTab(data: any) {
    this.selected.setValue(data);
    this.initDataTab(data);
  }

  initDataTab(data: any) {
    let requestTopicType = 0;
    switch (data) {
      case 0: //backend tab
        if (this.backendCurrentIndex == 0) {
          requestTopicType = TopicTypeEnum.Backend;
          this.backendCurrentIndex = 1;
        }
        break;
      case 1: //Devops tab
        if (this.devopsCurrentIndex == 0) {
          requestTopicType = TopicTypeEnum.Devops;
          this.devopsCurrentIndex = 1;
        }
        break;
      default:
        break;
    }
    if (requestTopicType > 0) {
      this.initAPI({
        type: requestTopicType,
        page_size: this.pageSize,
        page_index: 1,
      });
    }
  }

  loadMoreBackendTopics() {
    this.initAPI({
      type: TopicTypeEnum.Backend,
      page_index: this.backendCurrentIndex,
      page_size: this.pageSize,
    });
  }

  loadMoreDevopsTopics() {
    this.initAPI({
      type: TopicTypeEnum.Devops,
      page_index: this.devopsCurrentIndex,
      page_size: this.pageSize,
    });
  }

  @HostListener('window:scroll', ['$event'])
  async onWindowScroll() {
    //In chrome and some browser scroll is given to body tag
    let pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    if (pos == max) {
      let requestTopic: GetTopicsRequestDto = {
        type: 0,
        page_size: this.pageSize,
        page_index: 0,
      };
      switch (this.selected.value) {
        case 0: //backend tab
          requestTopic.type = TopicTypeEnum.Backend;
          requestTopic.page_index = this.backendCurrentIndex;
          break;
        case 1: //devops tab
          requestTopic.type = TopicTypeEnum.Devops;
          requestTopic.page_index = this.devopsCurrentIndex;
          break;
        default:
          break;
      }

      if (requestTopic.type > 0 && requestTopic.page_index > 0) {
        await this.initAPI(requestTopic);
      }
    }
  }
}
