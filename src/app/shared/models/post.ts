
export interface Post {
  _id: string;
  title: string;
  image: number;
  description: string;
  category: string;
  tags: string;
  created_by: string;
  created_on: string;
  status: string;
  post_reference_id: string;
  schedule_at: string;
  author: {
    name: string
  };
}
