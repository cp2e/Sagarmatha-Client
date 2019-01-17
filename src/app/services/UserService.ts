import { Injectable, Inject } from "@angular/core";
//import { AppStore } from "./appStore"
//import {Trainee} from "../Reducer/AppState"
import {Http} from "@angular/http"
//import { actions as traineeAction} from "../Reducer/Trainee";
import {timeout,map} from 'rxjs/operators'
@Injectable()
export class UserService {
    constructor(public http: Http)
    {

    }
    public GetAllUsers(page:number,page_size:number) {
        try{
        return this.http.get(`/api/user/find_all_users?page=${page}&page_size=${page_size}`).pipe(timeout(5000))
        }
        catch (err)
        {
            console.log(err)
        }
        
    }
    public GetUserCount(page:number,page_size:number) {
        try{
        return this.http.get(`/api/user/user_count`).pipe(timeout(5000))
        }
        catch (err)
        {
            console.log(err)
        }
        
    }

    public UpdateUser(User:any) {
        try{
        return this.http.post(`/api/user/update`,User).pipe(timeout(5000)).subscribe(res=>
        {
            alert("updated successfully")
            console.log("updated successfully",res)
        })
        }
        catch (err)
        {
            alert(err)
            console.log(err)
        }
        
    }
    public DeleteUser(User:any) {
        try{
        return this.http.get(`/api/user/delete?_id=${User._id}`).pipe(timeout(5000))
        }
        catch (err)
        {
            alert(err)
            console.log(err)
        }
        
    }
    public AddUser(User:any) {
        try{
        return this.http.post(`/api/user/add`,User).pipe(timeout(5000))
        }
        catch (err)
        {
            alert(err)
            console.log(err)
        }
        
    }
   
    
    HandleResponse(error:any)
    {
           if(error.status==504)
           {

            alert('There is an internet connection problem please try refresh the page');
           }
           else
           {
            alert('There is a problem .we were notified and working on it');
           }
    }

}