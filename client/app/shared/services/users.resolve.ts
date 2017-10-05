import { UserService } from './user.service';
import { Observable } from 'rxjs/Rx';
import { MdSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class UsersResolve implements Resolve<any> {
  constructor(private users: UserService, private router: Router, private snack: MdSnackBar) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    let id = route.params['id'];
    return this.users.getUsers();
  }
}