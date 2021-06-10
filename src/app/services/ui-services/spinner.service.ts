import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private isSpinning: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  get spinningListener(): Observable<boolean> {
    return this.isSpinning.asObservable()
      .pipe(
        map((val: number) =>  val != 0)
      );
  }

  private get nSpins(): number { return this.isSpinning.getValue(); }

  startSpinning() { this.isSpinning.next(this.nSpins + 1); }

  stopSpinning() { this.isSpinning.next(this.nSpins != 0 ? this.nSpins - 1 : 0); }
}
