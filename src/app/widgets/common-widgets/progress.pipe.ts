import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { attachProgress } from './functions';
import { ProgressOutput } from './types';

@Pipe({
    name: 'progress'
})
export class ProgressPipe implements PipeTransform {

    transform<T>(obj: Observable<T> | Promise<T> | T): Observable<ProgressOutput<T | any>>;
    transform<T>(obj: Observable<T> | Promise<T> | T) {
       return attachProgress(obj);
    }
}
