import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  /** The list of selected genres. */
  private selectedGenres: string[] = [''];

  /** The full list of genres. */
  genresList: string[] = mockGenres.map(x => x.name);

  /** Whether or not the form has been modified. */
  formModified = false;

  /** The group of data used in the form. */
  formData: FormGroup = this.formBuilder.group({});

  /** Creates an instance of the Profile Component
   * @param formBuilder The service used to build and handle forms
   */
   constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initControls();
    this.observableGenres = interval(10000)
      .pipe(startWith(0))
      .subscribe(async () => {
        this.genresList = mockGenres.map(x => x.name).filter(x => !this.selectedGenres.includes(x));
      });
  }

  ngOnDestroy(): void {
    this.observableGenres.unsubscribe();
  }

  /** Initializes the form's fields. */
  initControls(): void {
    this.formData = this.formBuilder.group({
      genres: this.formBuilder.array([
        this.formBuilder.group({
          genre: ['', Validators.required]
        }),
        this.formBuilder.group({
          genre: ['', Validators.required]
        }),
      ])
    });
  }


  /** Adds a form element to select a language. */
  addFormControl(): void {
    const formArray = this.formData.controls.genres as FormArray;
    const length = formArray.length;

    if (length >= MAX_GENRES) {
      return;
    }

    this.numberOfAvailableGenres = length;

    const newLanguageGroup: FormGroup = this.formBuilder.group({
      genre: ['', Validators.required],
    });

    formArray.insert(length, newLanguageGroup);
  }

  /** Removes the language at index {@param i}. */
  removeFormControl(i: number): void {
    const formArray = this.formData.controls.genres as FormArray;
    const genre = (this.formData.get('genres') as FormArray).get(['' + i, 'genre']);
    if (formArray.length > 1) {
      formArray.removeAt(i);
      this.numberOfAvailableGenres -= 1;
      // @ts-ignore
      this.genresList.push(genre.value);
    }
  }

  /** Gets the languages element. */
  get genres() {
    return this.formData.get('genres') as FormArray;
  }

  /** Submits the form. */
  onFormSubmit() {
    if (this.formData.valid) {
      this.formModified = false;
    }
  }

  /** Function fired whenever the state of the form changes.
   *
   * @param event The new value for that form element.
   * @param index Which element of that array was modified.
   */
   onChangeState(event: string, index: number) {
    this.formModified = true;
    console.log(index);
    // @ts-ignore
    const control: AbstractControl = (this.formData.get('genres') as FormArray).get(['' + index, 'genre']);
    if (control.value !== '') {
      this.selectedGenres = this.selectedGenres.filter(x => x !== control.value);
    }
    control.patchValue(event);
    (this.formData.get('genres') as FormArray).markAsTouched();
    this.selectedGenres[index] = event;
    this.genresList = this.genresList.filter(x => !this.selectedGenres.includes(x));
  }
}
