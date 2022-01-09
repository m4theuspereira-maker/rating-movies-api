export interface getAgeByBirthDateDto {
  day: string;
  month: string;
  year: string;
}
export interface DateHelper {
  getAgeByBirthDate(birthDate: getAgeByBirthDateDto): number;
}
