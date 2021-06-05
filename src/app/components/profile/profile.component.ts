import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { mockGenres } from 'src/app/data/mock-genres';

/** The number of max genres that can be displayed. */
const MAX_GENRES = 3;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  /** The subscription to the backend service to acquire the list of languages. */
  observableGenres: Subscription = new Subscription();

  /** The number of languages currently set to be displayed on the subgraph. */
  numberOfAvailableGenres: number = 2;

  /** The number of max languages to be displayed. */
  maxGenres: number = MAX_GENRES;

  formControl = {
    selectedGenres: []
  };

  /** The full list of genres. */
  genresList: string[] = mockGenres.map(x => x.name);

  /** Whether or not the form has been modified. */
  formModified = false;

  /** Creates an instance of the Profile Component
   * @param formBuilder The service used to build and handle forms
   */
   constructor() { }

  ngOnInit(): void {
    this.initControls();
    this.observableGenres = interval(10000)
      .pipe(startWith(0))
      .subscribe(async () => {
        this.genresList = mockGenres.map(x => x.name).filter(x => !this.formControl.selectedGenres.includes(x));
      });
  }

  ngOnDestroy(): void {
    this.observableGenres.unsubscribe();
  }

  /** Initializes the form's fields. */
  initControls(): void {
    // TODO request current selected, insert into controls
  }

  /** Submits the form. */
  onFormSubmit() {
  }

  /** Function fired whenever the state of the form changes.
   *
   * @param event The new value for that form element.
   * @param index Which element of that array was modified.
   */
   onChangeState(event: string, index: number) {
    this.formModified = true;
    console.log(this.formControl.selectedGenres);
    /**
    console.log(index);
    // @ts-ignore
    const control: AbstractControl = (this.formData.get('genres') as FormArray).get(['' + index, 'genre']);
    if (control.value !== '') {
      this.selectedGenres = this.selectedGenres.filter(x => x !== control.value);
    }
    control.patchValue(event);
    (this.formData.get('genres') as FormArray).markAsTouched();
    this.selectedGenres[index] = event;
     */
    this.genresList = this.genresList.filter(x => !this.formControl.selectedGenres.includes(x));
  }
}
