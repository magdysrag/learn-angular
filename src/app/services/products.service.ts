import { environment } from './../../environments/environment';
import { catchError, Observable, observable, retry, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iproduct } from '../Models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  httpOption;
  constructor(private httpClient: HttpClient) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: 'my-auth-token'
      }),
    };
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      // console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
  getAllProduct(): Observable<Iproduct[]> {
    return this.httpClient
      .get<Iproduct[]>(`${environment.APIURL}/products`)
      // .pipe(retry(3), catchError(this.handleError));
  }
  getProductByCatId(cId: number): Observable<Iproduct[]> {
    if (cId == 0) {
      return this.getAllProduct();
    } else {
      return this.httpClient
        .get<Iproduct[]>(`${environment.APIURL}/products?categoryId=${cId}`)
        .pipe(
          retry(3),
          catchError((err: HttpErrorResponse) => {
            console.log(err.status, err.error);
            return throwError(
              () =>
                new Error(
                  'Something bad happened; please try again later id. '
                )
            );
          })
        );
    }
  }
  getProductById(id: number): Observable<Iproduct> {
    return this.httpClient
      .get<Iproduct>(
        `${environment.APIURL}/products/${id}`
        // `${environment.APIURL}/products?id=${id}`
      )
      .pipe(
        retry(3),
        catchError((err: HttpErrorResponse) => {
          return throwError(
            () => new Error(`can't get to data ,please try again`)
          );
        })
      );
  }
  addProduct(newPrd: Iproduct): Observable<Iproduct> {
    // return this.httpClient.post<Iproduct>(
    //   `${environment.APIURL}/products`,
    //   JSON.stringify(newPrd),
    //   this.httpOption
    // );
    return this.httpClient
      .post<Iproduct>(
        `${environment.APIURL}/products`,
        JSON.stringify(newPrd),
        this.httpOption
      )
      .pipe(
        retry(2), 
        catchError(this.handleError));
  }
}
