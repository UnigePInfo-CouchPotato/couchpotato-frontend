import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stage-display',
  templateUrl: './stage-display.component.html',
  styleUrls: ['./stage-display.component.scss']
})
export class StageDisplayComponent {
  @Input() isAdmin: boolean;
  @Input() stage: number;

  stageDescription = {
    0: 'Create or Join a Room',
    1: 'Wait on party members',
    2: 'Movie discovery in progress',
    3: 'Vote on your favorite movie(s)',
    4: 'Wait on party members',
    5: 'View result',
    6: 'Watch movie'
  };

}
