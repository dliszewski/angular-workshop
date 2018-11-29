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
      this.roles$.next(role || []);
  }


  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    combineLatest(this.user$, this.roles$)
      .pipe(takeUntil(this.destroy$))
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
