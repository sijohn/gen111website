import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchpipe',
    pure: false
})
export class SearchPipe implements PipeTransform {
    transform(data: any[], searchTerm: string): any[] {
        if (!data) return;
        searchTerm = searchTerm.toUpperCase();
        return data.filter(item => {
            if (item.name)
                return item.name.toString().toUpperCase().indexOf(searchTerm) !== -1
            else
                return null;
        });
    }
}