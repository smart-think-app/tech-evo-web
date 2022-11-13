import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TopicsService } from 'src/app/services/topics.service';
import { TopicDetailDto } from './../../dto/topics.dto';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.scss'],
})
export class TopicDetailComponent implements OnInit {
  topicDetail: TopicDetailDto = {
    title: '',
    body: '',
    image_url: '',
    created_date: 0,
    public_id: '',
    type: 0,
    short_body: '',
  };

  isActiveTopic = false;
  constructor(
    private _activatedRouter: ActivatedRoute,
    private _topicService: TopicsService
  ) {}

  ngOnInit(): void {
    this._topicService.getTopicDetail.subscribe((result) => {
      this.topicDetail = result;
      if (this.topicDetail.public_id && this.topicDetail.public_id != '') {
        this.isActiveTopic = true;
      }
    });
    this.initApi();
  }

  initApi(): void {
    const publicId = this._activatedRouter.snapshot.params['id'];
    if (publicId && publicId != '') {
      this._topicService.getTopicDetailFromAPI(publicId)
    }
  }
}
