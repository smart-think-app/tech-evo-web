import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SkillDto } from './../dto/skill.dto';
import { environment } from './../../environments/environment';
import { ApiResponseBase } from '../dto/api-response.dto';


@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  private _skillData: BehaviorSubject<SkillDto[]> = new BehaviorSubject<
    SkillDto[]
  >([]);


  get getSkill() {
    return this._skillData.asObservable();
  }
  constructor(private httpClient: HttpClient) {}

  getSKillDataAPI() {
    return this.httpClient
      .get<ApiResponseBase>(environment.domain_tech_evo_api + '/skills')
      .subscribe({
        next: (resp) => {
          if (resp.code == 200) {
            this._skillData.next(
              resp.data == null
                ? []
                : resp.data.map((item: any) => {
                    const skill: SkillDto = {
                      name: item.name,
                      value: item.value,
                      display: item.display,
                      type: item.type,
                    };
                    return skill;
                  })
            );
          }
        },
      });
  }
}
