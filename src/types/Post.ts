
import { User } from "./User";

export interface Post {
  user: User | null;
  id: number;
  userId: number;
  title: string;
  body: string;
}