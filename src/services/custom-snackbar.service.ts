import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Shape files Service
 *
 * This service retrieves the region files from the API
 */
@Injectable({
  providedIn: 'root'
})
export class CustomSnackbarService extends MatSnackBar {
  /**
   * Method that presents the snackbar, with a static duration
   *
   * @param message Message to show
   * @param action Action buttons
   * @param duration The duration of the displayed snackbar
   *
   * @returns Reference to the snackbar
   */
  public present(message: string, action = '', duration = 3000): MatSnackBarRef<SimpleSnackBar> {
    return this.open(message, action, { duration });
  }

  /**
   * Returns the error message if exist, in other case returns 'Something went wrong'
   *
   * @param e Error response from subscribe
   */
  public showError(e: HttpErrorResponse): Observable<never> {
    const errorMessage = e.error && e.error.message ? 'Error: ' + e.error.message : 'Error: Something went wrong';
    this.present(errorMessage);

    return throwError(e);
  }
}
