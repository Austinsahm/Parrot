import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { ErrorMessageService } from "src/app/services/error-message.service";
import { AssetDataAccessService } from "../asset-data-access.service";
import { UseCaseService } from "../http/use-case.service";
import { Asset } from "../models/asset.model";
import { UseCase } from "../models/use-case.model";
import { searchByField } from "../utilities/collection.util";

@Injectable({
  providedIn: "root",
})
export class AssetStoreService {
  private assets = new BehaviorSubject<Asset[]>([]);
  private usecases = new BehaviorSubject<UseCase[]>([]);

  assets$ = this.assets.asObservable();
  usecases$ = this.usecases.asObservable();

  constructor(
    private assetDataService: AssetDataAccessService,
    private errMsgService: ErrorMessageService,
    private useCaseService: UseCaseService,
    private toastrService: ToastrService
  ) {}

  allAssets(subdomain: string, reload?: boolean) {
    if (this.assets.getValue().length === 0 || reload) {
      this.assetDataService
        .getAccessor(subdomain)
        .fetch()
        .pipe(
          catchError((err) => {
            if (!err.status) {
              this.errMsgService.errorExist("You're probably offline");
            } else this.errMsgService.errorExist("Unknown Error occured");
            return of([]);
          }),
          tap((assets) => this.assets.next(assets))
        )
        .subscribe({ error: () => {} });
    }
  }

  searchAssets(keywords: string): Observable<Asset[]> {
    return this.assets.pipe(
      map((assets) =>
        searchByField(assets, (asset) => asset.assetName, keywords)
      ),
      tap((assets) => {
        if (!assets.length) {
          return this.errMsgService.errorExist(
            "Your search do not return any result"
          );
        }
        this.errMsgService.clearError();
      })
    );
  }

  /**fetch all usescases */
  allUsecases() {
    if (!this.usecases.getValue().length) {
      this.useCaseService
        .fetchUseCases()
        .pipe(
          catchError((err) => {
            if (!err.status) {
              this.errMsgService.errorExist("You're probably offline");
            } else this.errMsgService.errorExist("Unknown Error occured");
            return of([]);
          }),
          tap((usecase) => this.usecases.next(usecase))
        )
        .subscribe({ error: () => {} });
    }
  }
}
