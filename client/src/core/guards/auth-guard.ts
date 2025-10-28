import { CanActivateFn } from '@angular/router';
import {inject} from '@angular/core';
import {AccountService} from '../services/account-service';
import {ToastService} from '../services/toast-service';

export const authGuard: CanActivateFn = () => {
  const accountService = inject(AccountService);
  const toast = inject(ToastService);

  if(accountService.currentUser()) return true;
  else{
    toast.error("You are not allowed to view this resource");
    return false;
  }
};
