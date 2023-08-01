import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';

// Injectable({
//   providedIn: 'root'
// })
 export const AuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> =>{// here we are only returning an observable of boolean.Therefore this will return true if they are allowed to proceed otherwise false
    
      const router: Router = inject(Router);
      const accountService: AccountService = inject(AccountService);
    
      return accountService.currentUser$.pipe(
      map(auth => {
        if (auth) return true;
        else {
        router.navigate(['/account/login'], {queryParams: {returnUrl: state.url}}); //this will redirect user to login component if they are not signed in

          return false
        }
      })
    );
  }  















