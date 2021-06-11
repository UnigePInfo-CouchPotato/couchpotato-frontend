import { ChangeDetectorRef, Component, Input, OnDestroy } from '@angular/core';
import { interval, Subscription, BehaviorSubject } from 'rxjs';
import { filter, startWith } from 'rxjs/operators';
import { Auth0User } from 'src/app/interfaces/auth0/auth0-user';
import { ApiGatewayService } from 'src/app/services/api-gateway/api-gateway.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

/** The number of max genres that can be displayed. */
const MAX_GENRES = 3;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnDestroy {
  @Input() showError: boolean = false;

  /** The subscription to the backend service to acquire the list of languages. */
  observableGenres: Subscription = new Subscription();
  observableSelectedGenres: Subscription = new Subscription();

  user$: BehaviorSubject<Auth0User> = new BehaviorSubject(null);

  /** The number of languages currently set to be displayed on the subgraph. */
  numberOfAvailableGenres: number = 2;

  /** The number of max languages to be displayed. */
  maxGenres: number = MAX_GENRES;

  formControl = {
    selectedGenres: []
  };

  /** The full list of genres. */
  genresList: string[] = [];
  selectedGenresBackup: string[] = [];
  dataAcquired: boolean = false;

  /** Whether or not the form has been modified. */
  formModified = false;

  /** Creates an instance of the Profile Component
   * @param formBuilder The service used to build and handle forms
   */
  constructor(private apiGatewayService: ApiGatewayService,
              private auth: AuthenticationService,
              private ref: ChangeDetectorRef) {
    this.user$.next(this.auth.user);
    this.auth.userObs$.subscribe({
      next: (u: Auth0User) => this.user$.next(u)
    });

    this.observableGenres = interval(1000)
      .pipe(startWith(0))
      .pipe(filter(_ => this.apiGatewayService.movieGenres != null && !this.dataAcquired))
      .subscribe({
        next: async () => {
        this.genresList = this.apiGatewayService.movieGenres?.map(x => x.name) ?? [];
        this.ref.markForCheck();
      }
    });

    this.observableSelectedGenres = interval(1000)
      .pipe(startWith(0))
      .pipe(filter(_ => this.apiGatewayService.movieGenres != null && this.auth.preferences != null && !this.dataAcquired))
      .subscribe({
        next: async () => {
          this.formControl.selectedGenres = this.apiGatewayService.movieGenres
                                                                  ?.filter(x => this.auth.preferences.includes(x.id))
                                                                  .map(x => x.name) ?? [];
          this.dataAcquired = true;
          this.ref.markForCheck();
        }
      });
  }

  ngOnDestroy(): void {
    this.observableGenres.unsubscribe();
    this.observableSelectedGenres.unsubscribe();
  }

  /** Submits the form. */
  onFormSubmit() {
    if (this.formModified) {
      const newSelectedGenres = this.apiGatewayService.movieGenres.filter(m => this.formControl.selectedGenres.includes(m.name));
      if (newSelectedGenres.length != 0) {
        this.apiGatewayService.updateUserPreferences(newSelectedGenres).then(
          _ => window.location.reload()
        );
      } else {
        this.showError = true;
      }
    }

  }

  /** Function fired whenever the state of the form changes. */
   onChangeState() {
    this.formModified = true;
  }
}
