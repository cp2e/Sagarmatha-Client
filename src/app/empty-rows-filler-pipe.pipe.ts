import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyRowsFillerPipe'
})
export class EmptyRowsFillerPipePipe implements PipeTransform {

  transform(items: any[], page: number,limit:number): any {
    let len=limit-items.length
    if (!items)
      return new Array(limit).fill(null)
    else
      if (items.length < limit){
        for(let x=0;x<len;x++)
        {
          items.push(null) 
        }
        return items
      }
      return items
     
  }

}
