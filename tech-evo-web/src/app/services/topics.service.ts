import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  TopicDto,
  TopTopicDto,
  TopicDetailDto,
  GetTopicsRequestDto,
} from './../dto/topics.dto';
import { ApiResponseBase } from './../dto/api-response.dto';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TopicsService {

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
  

  get getTopicDetail() {
    return this._topicDetailData.asObservable();
  }
  constructor(private _httpClient: HttpClient) {}

  getTopicFromAPI(request: GetTopicsRequestDto) {
    return this._httpClient
      .get<ApiResponseBase>(
        environment.domain_tech_evo_api +
          '/topics' +
          `?type=${request.type}&page_index=${request.page_index}&page_size=${request.page_size}`
      )
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
