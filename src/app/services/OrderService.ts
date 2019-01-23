import { Injectable, Inject } from "@angular/core";
import {Http} from "@angular/http"
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import {timeout,map, catchError} from 'rxjs/operators'
import { throws } from 'assert';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs';

@Injectable()

export class OrderService {
    constructor(public http: Http,private http2:HttpClient){}

    public  GetAllOrders(page:number,page_size:number,userId:string):Observable<any> { 
         return this.http2.get(`/api/order/find_all_orders?page=${page}&page_size=${page_size}&userId=${userId}`).pipe(timeout(30000),catchError(this.handleError)) 
    }

    public GetOrderCount(page:number,page_size:number,userId:string) {
        return this.http.get(`/api/order/order_count?userId=${userId}`).pipe(timeout(30000),catchError(this.handleError)) 
        
    }

    public UpdateOrder(User:any) {
        return this.http.post(`/api/user/update`,User).pipe(timeout(15000),catchError(this.handleError))   
    }

    public DeleteOrder(Order:any,userId) {
       
        return this.http.get(`/api/order/delete_user_order?_id=${Order._id}&userId=${userId}`).pipe(timeout(15000),catchError(this.handleError))   
    }
    
    public AddOrder(User:any) {
        return this.http.post(`/api/user//add_user_order`,User).pipe(timeout(15000),catchError(this.handleError)) 
    }
   

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        throw new Error("Something bad happened; please try again later.")
        // return an observable with a user-facing error message
        return throwError(
          'Something bad happened; please try again later.');
      };

}