import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { AbstractDataAccessService, DataAccessKey } from './abstract-data-access.service';
import { StateHttpService } from './http/state-http.service';
import { ExceptionBag } from './models/http.model';
import { State, StateDirectory } from './models/location.model';

@Injectable()
export class StateDataAccessService extends AbstractDataAccessService<State> {

  private _source: Observable<State[]>;

  constructor(private readonly backend: StateHttpService) {
    super([]);
    this._source = this.backend.fetch()
      .pipe(tap((states) => this.setValues(...states)));
  }

  protected getKey(entry: State): DataAccessKey {
    return entry.stateid;
  }

  /**
   * Returns all available states
   */
  fetch(fromState?: string): Observable<State[]> {

    if(fromState){
      this._source = this.backend.fetchToState(fromState)
      .pipe(tap((states) => this.setValues(...states)));
      return this._source;
    }

    if (this.values.length) {
      return of(this.values);
    }

    return this._source;
  }

  /**
   * Finds a single state by Id
   * @param stateId 
   */
  findById(stateId: string): Observable<State> {
    return this.fetch().pipe(map((states) => {
      const state = states.find((curState) => curState.stateid === stateId);
      if (!state) {
        throw ExceptionBag.NOT_FOUND;
      }
      return state;
    }))
  }

   /**
   * Returns all available states
   */
  fetchDirectory(): Observable<StateDirectory[]> {
    return this.backend.fetchDirectory();
  }

  /**
   * Finds a single state by Id
   * @param stateId 
   */
  findDirectoryById(stateId: string): Observable<StateDirectory> {
   return this.backend.findDirectoryById(stateId);
  }
}
