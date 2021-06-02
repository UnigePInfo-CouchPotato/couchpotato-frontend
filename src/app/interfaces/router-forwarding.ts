import { NavigationBehaviorOptions } from "@angular/router";

export interface RouterForwarding extends NavigationBehaviorOptions {
  state: {
    next: string;
  };
}
