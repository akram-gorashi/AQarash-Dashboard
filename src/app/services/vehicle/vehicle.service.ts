import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public getMasterTableData() {
    return this.http.get<any>(this.apiUrl + 'masterTable');
  }

  public createVehicle(vehicleFormData: FormData): Observable<any> {
    return this.http.post(this.apiUrl + 'vehicle', vehicleFormData);
  }
}
