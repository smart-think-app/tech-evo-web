import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TopicDto, TopTopicDto, TopicDetailDto } from './../dto/topics.dto';
import { ApiResponseBase } from './../dto/api-response.dto';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TopicsService {
  private _topicsData: BehaviorSubject<TopicDto[]> = new BehaviorSubject<
    TopicDto[]
  >([]);

  private _topTopicsData: BehaviorSubject<TopTopicDto> =
    new BehaviorSubject<TopTopicDto>({
      backend: [],
      devops: [],
    });

  private _topicDetailData: BehaviorSubject<TopicDetailDto> =
    new BehaviorSubject<TopicDetailDto>({
      public_id: '',
      title: '',
      short_body: '',
      body: '',
      created_date: 0,
      type: 0,
      image_url: '',
    });
  get getTopics() {
    return this._topicsData.asObservable();
  }
  get getTopTopics() {
    return this._topTopicsData.asObservable();
  }

  get getTopicDetail() {
    return this._topicDetailData.asObservable();
  }
  constructor(private _httpClient: HttpClient) {}

  getTopicFromAPI() {
    this._httpClient
      .get<ApiResponseBase>(environment.domain_tech_evo_api + '/topics')
      .subscribe({
        next: (resp) => {
          if (resp.code == 200) {
            this._topicsData.next(
              resp.data == null
                ? []
                : resp.data.map((item: any) => {
                    const topic: TopicDto = {
                      title: item.title,
                      short_body: item.short_body,
                      created_date: item.created_date,
                      image_url: item.image_url,
                      type: item.type,
                      public_id: item.public_id
                    };
                    return topic;
                  })
            );
          }
        },
      });
  }

  getTopTopicFromAPI() {
    this._httpClient
      .get<ApiResponseBase>(environment.domain_tech_evo_api + '/topics/top')
      .subscribe({
        next: (resp) => {
          if (resp.code == 200) {
            this._topTopicsData.next({
              backend: resp.data.backend,
              devops: resp.data.devops,
            });
          }
        },
      });
  }

  getTopicDetailFromAPI(publicId: string) {
    this._httpClient
      .get<ApiResponseBase>(
        environment.domain_tech_evo_api + `/topics/${publicId}`
      )
      .subscribe({
        next: (resp) => {
          if (resp.code == 200) {
            this._topicDetailData.next({
              title: resp.data.title,
              short_body: resp.data.short_body,
              body: resp.data.body,
              image_url: resp.data.image_url,
              type: resp.data.type,
              created_date: resp.data.created_date,
              public_id: publicId,
            });
          }
        },
      });
  }
}
