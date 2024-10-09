import { Component, DestroyRef, inject, OnInit, signal } from "@angular/core";

import { Place } from "../place.model";

import { PlacesService } from "../places.service";

import { PlacesComponent } from "../places.component";
import { PlacesContainerComponent } from "../places-container/places-container.component";

@Component({
  selector: "app-user-places",
  standalone: true,
  templateUrl: "./user-places.component.html",
  styleUrl: "./user-places.component.css",
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);

  isFetching = signal(false);
  error = signal("");

  places = this.placesService.loadedUserPlaces;

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.placesService.loadUserPlaces().subscribe({
      complete: () => {
        this.isFetching.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
