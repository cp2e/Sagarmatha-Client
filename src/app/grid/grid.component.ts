
import { Component, Input, EventEmitter, Output,OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  @Input() dataSource:any[]
  @Input() displayedColumns: string[]
  @Input() pagesToShow:number 
  @Input() page:number 
  @Input() perPage:number 
  @Input() count:number 
  

  constructor() { }

  ngOnInit() {
  }
  goToPage(n: number): void {
    this.page = n;
  //  this.appStore.dispatch(searchAction.selectPage(this.page))
  }

  onNext(): void {
    this.page++;
   // this.appStore.dispatch(searchAction.selectPage(this.page))
  }

  onPrev(): void {
    this.page--;
  //  this.appStore.dispatch(searchAction.selectPage(this.page))
  }

}
