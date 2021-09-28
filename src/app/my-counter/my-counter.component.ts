import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, skip, startWith, take } from 'rxjs/operators';
import { increment, decrement, reset } from '../counter.actions';

@Component({
  selector: 'app-my-counter',
  templateUrl: './my-counter.component.html',
  styleUrls: ['./my-counter.component.css'],
})
export class MyCounterComponent {
  count$: Observable<number>;
  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.select('count');
    this.count$.pipe(map((item) => item * item)).subscribe((result) => {
      console.log('Squared Value', result);
    });
    this.count$
      .pipe(take(3))
      .subscribe((result) => console.log('Emit only 3 values', result));

    this.count$
      .pipe(filter((item) => item % 2 === 0))
      .subscribe((result) => console.log('Even numbers', result));

    this.count$
      .pipe(skip(3))
      .subscribe((result) => console.log('First 3 values are skipped', result));

    this.count$
      .pipe(startWith(100))
      .subscribe((data) => console.log('starting with 100', data));
  }

  operations(value: string) {
    if (value === 'addition') {
      this.count$.pipe(map((item) => item + item)).subscribe((result) => {
        console.log('Addition', result);
      });
    }
    if (value === 'multiplication') {
      this.count$.pipe(map((item) => item * item)).subscribe((result) => {
        console.log('Multiplication', result);
      });
    }
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  emitSquared(): Observable<number> {
    return this.count$.pipe(map((count) => Math.pow(count, 2)));
  }

  reset() {
    this.store.dispatch(reset());
  }
}

/*
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://github.com/ngrx/platform
*/
