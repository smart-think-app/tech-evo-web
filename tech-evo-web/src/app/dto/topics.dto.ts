export interface TopicDto {
  title: string;
  created_date: number;
  image_url: string;
  short_body: string;
  type: number;
  public_id: string;
}

export interface TopTopicDto {
  backend: TopicDto[];
  devops: TopicDto[];
}

export interface TopicDetailDto {
  title: string;
  created_date: number;
  image_url: string;
  short_body: string;
  body: string;
  type: number;
  public_id: string;
}
