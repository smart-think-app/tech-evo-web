export interface TopicDto {
  title: string;
  created_date: number;
  image_url: string;
  short_body: string;
  type: number;
}

export interface TopTopicDto {
  backend: TopicDto[];
  devops: TopicDto[];
}
