
import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowScrollService {
  private scrollY: BehaviorSubject<number> = new BehaviorSubject(0);
  scrollY$: Observable<number> = this.scrollY.asObservable();

  updateScrollY(value: number): void {
    this.scrollY.next(value);
    console.log(`NewY: ${value}`);
  }
}
