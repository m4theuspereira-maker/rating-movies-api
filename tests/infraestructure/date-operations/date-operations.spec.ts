import { BusinessError } from "@/domain/errors/business-error";
import { DateOperations } from "@/infraestructure/date-operations/date-operations";

describe("date-operations", () => {
  let dateOperationsSut: DateOperations;
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
