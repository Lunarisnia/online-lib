import { serverConfig } from "../../config/components/server.config";
import axios from "axios";
import { DatabaseDriver } from "../../database/base";
import { IBorrowingScheduleTable } from "../../database/interfaces/borrowingScheduleTable";
import { BorrowingScheduleMockDBAdapter } from "../../database/drivers/mockDatabase/borrowingSchedule.model";
export interface IAuthor {
  key: string;
  name: string;
}

interface IAvailability {
  status: string;
  available_to_browse: boolean;
  available_to_borrow: boolean;
  available_to_waitlist: boolean;
  is_printdisabled: boolean;
  is_readable: boolean;
  is_lendable: boolean;
  is_previewable: boolean;
  identifier: string;
  isbn: any;
  oclc: any;
  openlibrary_work: string;
  openlibrary_edition: string;
  last_loan_date: any;
  num_waitlist: any;
  last_waitlist_date: any;
  is_restricted: boolean;
  is_browseable: boolean;
  __src__: string;
}

interface IWork {
  key: string;
  title: string;
  edition_count: number;
  cover_edition_key: string;
  subject: string[];
  ia_collection: string[];
  lendinglibrary: boolean;
  printdisabled: boolean;
  lending_edition: string;
  lending_identifier: string;
  authors: IAuthor[];
  first_publish_year: number;
  ia: string;
  public_scan: boolean;
  has_fulltext: boolean;
  availability: IAvailability;
}

interface ISubjectResponse {
  key: string;
  name: string;
  subject_type: string;
  work_count: number;
  works: IWork[];
}

export class Library {
  private static borrowingSchedule = new BorrowingScheduleMockDBAdapter();

  /**
   * Fetch book by genre/subject
   */
  public static async fetchBooksBySubject(
    subject: string
  ): Promise<ISubjectResponse> {
    const response = await axios.get(
      `${serverConfig.libraryHost}/subjects/${subject}.json`
    );
    return <ISubjectResponse>response.data;
  }

  /**
   * Make appointment to borrow book
   */
  public static async makeAppointment(
    detail: Omit<IBorrowingScheduleTable, "id">
  ) {
    const appointment = await this.borrowingSchedule.addOne({
      ...detail,
      user_id: "0",
    });
    return appointment;
  }
}
