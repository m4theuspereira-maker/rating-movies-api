import { DateHelper, getAgeByBirthDateDto } from "@/domain/date/date-helper";
import { BusinessError } from "@/domain/errors/business-error";

describe("date-operations", () => {
  let dateOperationsSut: DateHelper;
  const AGE = 22;
  const BIRTH_DATE = {
    day: "01",
    month: "01",
    year: "2000",
  };

  beforeAll(() => {
    dateOperationsSut = new DateOperations();
  });

  test("should call implementation with right dto", () => {
    const getAgeByBirthDateSpy = jest.spyOn(
      dateOperationsSut,
      "getAgeByBirthDate"
    );

    dateOperationsSut.getAgeByBirthDate(BIRTH_DATE);

    expect(getAgeByBirthDateSpy).toHaveBeenCalledWith(BIRTH_DATE);
  });

  test("should return the age based in birth date", () => {
    const validAge = dateOperationsSut.getAgeByBirthDate(BIRTH_DATE);

    expect(validAge).toEqual(22);
  });
});

export class DateOperations implements DateHelper {
  getAgeByBirthDate({ day, month, year }: getAgeByBirthDateDto): number {
    const birthDate = new Date(`${month}/${day}/${year}`);
    const now = new Date();
    const age = now.getUTCFullYear() - birthDate.getUTCFullYear();

    return age;
  }
}
