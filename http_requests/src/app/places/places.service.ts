import { inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, tap, throwError } from "rxjs";

import { Place } from "./place.model";

import { ErrorService } from "../shared/error.service";

@Injectable({
  providedIn: "root",
})
export class PlacesService {
  private errorService = inject(ErrorService);
  private httpClient = inject(HttpClient);

  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces(
      "http://localhost:3000/places",
      "Oops! Something went wrong, try again later."
    );
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      "http://localhost:3000/user-places",
      "Oops! Something went wrong fetching your places, try again later."
    ).pipe(
      tap({
        next: (userPlaces) => this.userPlaces.set(userPlaces.places),
      })
    );
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces();

    if (!prevPlaces.some((pl) => pl.id === place.id)) {
      this.userPlaces.set([...prevPlaces, place]);
    }

    return this.httpClient
      .put("http://localhost:3000/user-places", {
        placeId: place.id,
      })
      .pipe(
        catchError((err) => {
          this.errorService.showError("Oops! Failed to store selected places.");
          this.userPlaces.set(prevPlaces);
          return throwError(
            () => new Error("Oops! Failed to store selected places.")
          );
        })
      );
  }

  removeUserPlace(place: Place) {
    const prevPlaces = this.userPlaces();

    if (prevPlaces.some((pl) => pl.id === place.id)) {
      this.userPlaces.set(prevPlaces.filter((p) => p.id !== place.id));
    }

    return this.httpClient
      .delete(`http://localhost:3000/users-places/${place.id}`)
      .pipe(
        catchError((err) => {
          this.userPlaces.set(prevPlaces);
          this.errorService.showError("Oops! Failed to delete selected place.");
          return throwError(() => new Error("Failed to delete place."));
        })
      );
  }

  private fetchPlaces(url: string, errMessage: string) {
    return this.httpClient.get<{ places: Place[] }>(url).pipe(
      catchError((err: Error) =>
        throwError(() => {
          console.log(err);
          return new Error(errMessage);
        })
      )
    );
  }
}
