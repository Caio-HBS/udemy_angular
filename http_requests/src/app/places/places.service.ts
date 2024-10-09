import { inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

import { Place } from "./place.model";

@Injectable({
  providedIn: "root",
})
export class PlacesService {
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
    );
  }

  addPlaceToUserPlaces(placeId: string) {
    return this.httpClient.put("http://localhost:3000/user-places", {
      placeId,
    });
  }

  removeUserPlace(place: Place) {}

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
