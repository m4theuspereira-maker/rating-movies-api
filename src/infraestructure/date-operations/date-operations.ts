import { DateHelper, getAgeByBirthDateDto } from "@/domain/date/date-helper";

export class DateOperations implements DateHelper {
  getAgeByBirthDate({ day, month, year }: getAgeByBirthDateDto): number {
    const birthDate = new Date(`${month}/${day}/${year}`);
    const now = new Date();
    const age = now.getUTCFullYear() - birthDate.getUTCFullYear();

    return age;
  }
}
