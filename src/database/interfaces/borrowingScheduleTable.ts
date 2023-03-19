import { IAuthor } from "../../services/library/library";
export interface IBorrowingScheduleTable {
  id: string;
  user_id: string;
  title: string;
  cover_edition_key: string;
  authors: IAuthor[];
  pickup_in: string;
}
