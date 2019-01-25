import { Component, OnInit } from '@angular/core';
import { Alert } from 'selenium-webdriver';
import { UserService } from '../services/UserService';

export interface Item {
  userName: string
  firstName: string
  lastName: string
  adress: string
  phoneNum: string
  roles: any[]
  orders: []

}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoggedIn=false;
  userName
  _UserService
  user: Item;
  constructor(public UserService: UserService) {
    this._UserService = UserService
    this.user = { userName: "", firstName: "", lastName: "", adress: "", phoneNum: "", roles: [], orders: [] }
  }

  ngOnInit() {
    if(JSON.parse(localStorage.getItem('userDetails')))
    this.LoggedIn=true
  }
  getLogin()
  {
    return JSON.parse(localStorage.getItem('userDetails'))?true:false
  }
  LogOut()
  {
    localStorage.clear();
    this.LoggedIn=false;
    window.location.reload();
  }
  Login() {

    this._UserService.GetUserByUserName(this.userName).subscribe(
      result => {
        console.log(result)
        if(result){
        // Put the object into storage
        localStorage.setItem('userDetails', JSON.stringify(result));
        var retrievedObject = JSON.parse(localStorage.getItem('userDetails'));
        this.LoggedIn=true;
        window.location.reload();
        }
         console.log (retrievedObject)
        // Retrieve the object from storage


        // this.dataSource = result
        //   dialogRef.close()
      },
      err => {
        //  dialogRef.afterClosed().subscribe(result => alert("problem preforming this action" + err))
        //  dialogRef.close()

      })
    alert("Login")
  }

}
