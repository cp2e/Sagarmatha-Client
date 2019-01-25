import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
 
  userName;
  constructor() { }

  ngOnInit() {
    if(localStorage.getItem('userDetails'))
    {
    this.userName=JSON.parse(localStorage.getItem('userDetails')).userName
    console.log(this.userName)
    }
    


  }

}
