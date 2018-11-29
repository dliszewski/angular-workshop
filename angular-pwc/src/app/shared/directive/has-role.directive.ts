import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {UserService} from '../services/user.service';
import {BehaviorSubject, combineLatest, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit, OnDestroy {
  private hasView = false;
  private destroy$ = new Subject();
  private user$ = this.userService.user$;
  private roles$ = new BehaviorSubject<string[]>([]);

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private userService: UserService) { }

  @Input() set appHasRole(role: string[]) {
      console.log('set user role', role);
    // tak robić
      this.roles$.next(role || []);

    // jak nie robić
    // const sub: Subscription = this.user$
    //   .pipe(takeUntil(this.destroy$)) // ->
    //   .subscribe(
    //     (user) => {
    //       console.log('subscribe', roles, user);
    //       if (user && roles.includes(user.role)) {
    //         this.setView();
    //       } else {
    //         this.clearView();
    //       }
    //     }
    //   );
    // sub.unsubscribe();
  }


  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    combineLatest(this.user$, this.roles$)
      .pipe(takeUntil(this.destroy$))
      // przykład że możemy coś jeszcze asynchronicznego zrobić
      // switchMap(([roles, user]) => this.userService.logChange(roles, user))
      .subscribe( ([user, roles]) => {
      console.log('sub', user, roles);
      if (user && roles.includes(user.role)) {
        this.setView();
      } else {
        this.clearView();
      }
    });
  }


  private setView() {
    if (!this.hasView) {
      this.hasView = true;
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  private clearView() {
    this.viewContainer.clear();
    this.hasView = false;
  }
}
