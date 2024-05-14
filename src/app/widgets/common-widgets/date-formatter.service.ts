import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class DateFormatterService extends NgbDateParserFormatter {

  parse(value: string): NgbDateStruct {
    if (!value) {
      return null;
    }

    try {
      const date = new Date(value);
      return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    } catch (error) {
      return null;
    }
  }

  format(date: NgbDateStruct): string {
    if (!date) {
      return null;
    }

    return formatDate(`${date.year}-${date.month}-${date.day}`, 'd MMM y', 'en');
  }
}
