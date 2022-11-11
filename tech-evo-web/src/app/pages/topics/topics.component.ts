import { Component, OnInit } from '@angular/core';
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

  constructor(private _topicService: TopicsService) {}

  ngOnInit(): void {
    this._topicService.getTopTopics.subscribe((data) => {
      this.topTopicsDto = data;
    });
    this.initAPI();
  }

  initAPI() {
    this._topicService.getTopTopicFromAPI();
  }
}
