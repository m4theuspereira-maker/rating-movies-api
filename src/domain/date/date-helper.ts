export interface getAgeByBirthDateDto {
  day: string;
  month: string;
  year: string;
}
export interface DateHelper {
  getAgeByBirthDate(birthDate: getAgeByBirthDateDto): number;
}

// var date1 = new Date("05/31/1996");
// var date2 = new Date();
// var timeDiff = date2.getUTCFullYear() - date1.getUTCFullYear();
