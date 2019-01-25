import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/UserService';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})

export class AnalysisComponent implements OnInit {
  selectedUser: any;
  spinnerDisabled = true
  customerName = ""
  _UserService
  dataSource: Object;

  constructor(public UserService: UserService) {
    this._UserService = UserService;
    this.selectedUser = JSON.parse(localStorage.getItem('userDetails'))
    this.getUserOrderDataSourceData(this.selectedUser)
    this.dataSource = {
      chart: {
        "caption": `Last 7 Days Orders For ${this.selectedUser.userName} `,
        "subCaption": "",
        "xAxisName": "Date",
        "yAxisName": "Number of Orders",
        "numberSuffix": "",
        "theme": "fusion",
      },
      // Chart Data
      "data": []
    }; // end of this.dataSource
    this.Search(this.selectedUser.userName)
    

  }
  Search(customerName) {
    this.spinnerDisabled = false;
    this._UserService.GetUserByUserName(customerName).subscribe(res => {
      this.selectedUser = res
      console.log()
      // this.saveDisable=res?false:true
      this.spinnerDisabled = true;
      this.dataSource['data']=[]
      this.dataSource["data"]=this.getUserOrderDataSourceData(this.selectedUser)
    })
  }

  getUserOrderDataSourceData(user)
  {
    const data= new Array()
      for (let x = 0; x < 7; x++) {
        let label = new Date(new Date(new Date().setDate(new Date().getDate() - (x ))).setHours(0, 0, 0, 0));
        let value = this.selectedUser.orders.filter(order => {
          if (new Date(order.created_date).getDate() == label.getDate() && new Date(order.created_date).getMonth() == label.getMonth() && new Date(order.created_date).getFullYear() == label.getFullYear())
          return true;
        })
        data.push({label:label.getDate().toString()+'-'+(label.getMonth()+1).toString()+'-'+label.getFullYear(),value:value.length})
      }
      return data

  }
  ngOnInit() {
  }






}
