import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {share, map} from 'rxjs/operators';

const myPromise = new Promise(((resolve, reject) => {
  setTimeout(() => {
    console.log('fire promise resolve');
    resolve('resolve promise after 1s');
  }, 1000);
  //
  // reject('my error instance here');
}));

const myObservable = Observable.create(observer => {
  setTimeout(() => {
    console.log('fire observable next');
    observer.next('fire event after 1s');
    observer.complete();
  }, 1000);
});

myObservable.subscribe(v => console.log('sub 1', v));
myObservable.subscribe(v => console.log('sub 2', v));
const shared = myObservable.pipe(share());
shared.subscribe(ob => console.log('sub shared 1', ob));

const timer = Observable.create(observer => {
  console.log('create timer');
  let count = 0;
  const sub = setInterval(() => {
    count++;
    console.log('create count', count);
    observer.next(count);
    if (count > 2) {
    observer.complete();
    }
  }, 1000);
  return () => clearInterval(sub);
});

const subscription = timer.subscribe(v => console.log('timer', v));
setTimeout( () => {
  subscription.unsubscribe();
}, 24000);

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent {

  action1() {
  }

  action2() {
  }
}
