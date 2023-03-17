import { serverConfig } from "../../config/components/server.config";
import axios from "axios";

/**
 * Needed (Borrower):
 * - Title
 * - Author
 * - Edition Number
 *
 * Needed (Librarian):
 * - All the previous
 * - Pick Up Schedule
 */

interface IAuthor {
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
  // This piece of code can see if the status is available for borrowing or not
  // "borrowed": str(response['status'] not in ['open', 'borrow_available']).lower(),

  /**
   * Fetch book by genre/subject
   * This is assuming you really like "Horror"
   */
  async fetchBooksBySubject(): Promise<ISubjectResponse> {
    const response = await axios.get(
      `${serverConfig.libraryHost}/subjects/horror.json`
    );
    return <ISubjectResponse>response.data;
  }
}
