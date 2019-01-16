
import { Component, Input, EventEmitter, Output,OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  animal: string="dog";
  name: string="pop";
  @Input() dataSource:any[]
  @Input() displayedColumns: string[]
  @Input() pagesToShow:number 
  @Input() page:number 
  @Input() perPage:number 
  @Input() count:number
  @Output() goPrev = new EventEmitter<number>();
  @Output() goNext = new EventEmitter<number>();
  @Output() goPage = new EventEmitter<number>();
  @Output() Add = new EventEmitter<number>();
  @Output() Delete = new EventEmitter<number>();
  @Output() Edit = new EventEmitter<any>();


  

  constructor() { }
  

  ngOnInit() {
  }

  onEdit(item:any)
  {
    console.log("hi")
    this.Edit.emit(item)
  }

  goToPage(n: number): void {
    this.page = n;
    this.goPage.emit(n);
  //  this.appStore.dispatch(searchAction.selectPage(this.page))
  }
 
  onNext(): void {
    this.page++;
    this.goNext.emit(this.page);
   // this.appStore.dispatch(searchAction.selectPage(this.page))
  }

  onPrev(): void {
    this.page--;
    this.goPrev.emit(this.page);
  //  this.appStore.dispatch(searchAction.selectPage(this.page))
  }

}
