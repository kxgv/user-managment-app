import { Pipe, PipeTransform } from "@angular/core";
import { UserDto } from "../models/user";

@Pipe({
    name: 'filterUser'
})
export class FilterPipe implements PipeTransform {
    transform(users: UserDto[], filterText: string) {
        if(users.length === 0 || filterText === '') {
            return users;
        } else {
            return users.filter(function(user) {
                return user.name.toLowerCase().includes(filterText.toLocaleLowerCase());
            })
        }
        
    }
}