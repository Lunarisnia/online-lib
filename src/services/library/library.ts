import { serverConfig } from "../../config/components/server.config";
import axios from "axios";
import { IBorrowingScheduleTable } from "../../database/interfaces/borrowingScheduleTable";
import { BorrowingScheduleMockDBAdapter } from "../../database/drivers/mockDatabase/borrowingSchedule.model";
import dayjs from "dayjs";
import {
  BookUnavailableError,
  DayUnavailableError,
  ResourceNotFoundError,
} from "../error/types";
export interface IAuthor {
  key: string;
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

interface IBookDetailResponse {
  title: string;
  authors: IAuthor[];
}

export class Library {
  private static borrowingSchedule = BorrowingScheduleMockDBAdapter;
  private static maxUniquePlanPerDay = 2;

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

  public static async fetchBookByCoverEdition(coverEdition: string) {
    try {
      const response = await axios.get(
        `${serverConfig.libraryHost}/book/${coverEdition}.json`
      );
      return <IBookDetailResponse>response.data;
    } catch (error: any) {
      if (error.response?.data?.error == "notfound")
        throw new ResourceNotFoundError("Book not found");
      else throw error;
    }
  }

  /**
   * Only allow user to make an appointment if the day has less than a determined unique
   * person booking in.
   */
  private static async checkIfTheDayIsAvailable(
    userId: string,
    pickupIn: string
  ): Promise<boolean> {
    const isSameDate = (data: IBorrowingScheduleTable) =>
      dayjs(data.pickup_in).isSame(pickupIn, "day");
    const onlyUnique = (data: string, index: number, self: string[]) => {
      return self.indexOf(data) === index;
    };
    const uniquePlanInTheDay = (
      await this.borrowingSchedule.findAll(isSameDate)
    )
      .map((data) => data.user_id)
      .filter(onlyUnique);

    return !(
      uniquePlanInTheDay.length >= this.maxUniquePlanPerDay &&
      !uniquePlanInTheDay.includes(userId)
    );
  }

  private static checkDayNotPast(pickupIn: string) {
    return dayjs(pickupIn).isAfter(dayjs().subtract(1, "day"), "day");
  }

  /**
   * Make appointment to borrow book
   */
  public static async makeAppointment(
    pickupIn: string,
    coverEdition: string,
    userId: string
  ) {
    const isTheDayAvailable =
      this.checkDayNotPast(pickupIn) &&
      (await this.checkIfTheDayIsAvailable(userId, pickupIn));
    if (!isTheDayAvailable)
      throw new DayUnavailableError(
        "Day unavailable (too many person booked or invalid), please choose another day."
      );

    const hasBorrowed = await this.borrowingSchedule.findOne(
      (data: IBorrowingScheduleTable) => data.cover_edition_key == coverEdition
    );
    if (hasBorrowed)
      throw new BookUnavailableError(
        "Book is currently unavailable for borrowing."
      );

    const book = await this.fetchBookByCoverEdition(coverEdition);

    const appointment = await this.borrowingSchedule.addOne({
      authors: book.authors,
      cover_edition_key: coverEdition,
      title: book.title,
      user_id: userId,
      pickup_in: dayjs(pickupIn).format(serverConfig.dateFormat),
    });
    return appointment;
  }
}
