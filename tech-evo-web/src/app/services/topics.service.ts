import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TopicDto, TopTopicDto } from './../dto/topics.dto';
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
  get getTopics() {
    return this._topicsData.asObservable();
  }
  get getTopTopics() {
    return this._topTopicsData.asObservable();
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
}
