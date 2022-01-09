import { mock, MockProxy } from "jest-mock-extended";
import { DateHelper } from "@/domain/date/date-helper";

describe("hash-user-password", () => {
  let dateHelper: MockProxy<DateHelper>;
  const AGE = 22;
  const BIRTH_DATE = "01/01/2000";

  beforeAll(() => {
    dateHelper = mock();
    //dateHelper.getAgeByBirthDate.mockImplementationOnce(() => AGE);
  });

  test("should call method from data helper", () => {
    const getAgeByBirthDateSpy = jest.spyOn(dateHelper, "getAgeByBirthDate");

    dateHelper.getAgeByBirthDate(BIRTH_DATE);

    expect(getAgeByBirthDateSpy).toHaveBeenCalled();
  });

  test("should call method from data helper", () => {
    const getAgeByBirthDateSpy = jest.spyOn(dateHelper, "getAgeByBirthDate");

    dateHelper.getAgeByBirthDate(BIRTH_DATE);

    expect(getAgeByBirthDateSpy).toHaveBeenCalledWith(BIRTH_DATE);
  });
});
