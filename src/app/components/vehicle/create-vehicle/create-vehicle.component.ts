import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
import { Vehicle } from 'src/app/models/vehicle';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.css'],
})
export class CreateVehicleComponent implements OnInit {
  @ViewChild('vehicleCreationForm', { static: false })
  vehicleCreationForm: ElementRef;

  vehicleCreationFormGroup: FormGroup;
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  isUploading;
  masterTableData: any;
  showSuccessAlert: boolean = false;
  showErrorMeassageAlert: boolean = false;
  errorMessage: any;
  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.initForm();
    this.getMasterTableData();
    this.initUploader();
  }
  getMasterTableData() {
    this.vehicleService.getMasterTableData().subscribe((masterTableData) => {
      this.masterTableData = masterTableData[0];
      console.log(this.masterTableData);
    });
  }

  initForm(): void {
    this.vehicleCreationFormGroup = new FormGroup({
      makeId: new FormControl(null, Validators.required),
      mileage: new FormControl(null, Validators.required),
      colorId: new FormControl(null, Validators.required),
      conditionId: new FormControl(null, Validators.required),
      modalId: new FormControl(null, Validators.required),
      year: new FormControl(null, Validators.required),
      fuelId: new FormControl(null, Validators.required),
      transmissionId: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      agentName: new FormControl(null, Validators.required),
      agentPhoneNumber: new FormControl(null, Validators.required),
      agentLocation: new FormControl(null, Validators.required),
      userId: new FormControl(2),
    });
  }

  initUploader(): void {
    this.uploader = new FileUploader({ url: '', autoUpload: false });
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  createVehicle(): void {
    console.log(this.vehicleCreationFormGroup);
    if (this.vehicleCreationFormGroup.invalid) {
      return;
    }
    const uploadItems: any[] = this.uploader.getNotUploadedItems(); // Uploader's uploaded items
    const formData = new FormData(this.vehicleCreationForm.nativeElement); // Holds the files and data

    uploadItems.forEach((item) => {
      formData.append('images', item._file);
    });

    formData.append(
      'makeId',
      this.vehicleCreationFormGroup.get('makeId').value
    );
    formData.append(
      'mileage',
      this.vehicleCreationFormGroup.get('mileage').value
    );
    formData.append(
      'colorId',
      this.vehicleCreationFormGroup.get('colorId').value
    );
    formData.append(
      'conditionId',
      this.vehicleCreationFormGroup.get('conditionId').value
    );
    formData.append(
      'modalId',
      this.vehicleCreationFormGroup.get('modalId').value
    );
    formData.append('year', this.vehicleCreationFormGroup.get('year').value);
    formData.append(
      'fuelId',
      this.vehicleCreationFormGroup.get('fuelId').value
    );
    formData.append(
      'transmissionId',
      this.vehicleCreationFormGroup.get('transmissionId').value
    );
    formData.append('price', this.vehicleCreationFormGroup.get('price').value);
    formData.append(
      'description',
      this.vehicleCreationFormGroup.get('description').value
    );
    formData.append(
      'agentName',
      this.vehicleCreationFormGroup.get('agentName').value
    );
    formData.append(
      'agentPhoneNumber',
      this.vehicleCreationFormGroup.get('agentPhoneNumber').value
    );
    formData.append(
      'agentLocation',
      this.vehicleCreationFormGroup.get('agentLocation').value
    );
    formData.append(
      'userId',
      this.vehicleCreationFormGroup.get('userId').value
    );
    console.log(formData);

    this.isUploading = true;

    // Send the request to create the ticket
    this.vehicleService.createVehicle(formData).subscribe(
      (res) => {
        const createdVehicle: Vehicle = res.body;
        // Send the newly created Vehicle to the service to be viewed
        // this.VehicleService.addVehicleLists(createdVehicle);
        this.isUploading = false;
        // Navigate to Vehicles list
        // this.router.navigate(['/Vehicles']);
        // Show success message
        this.showSuccessAlert = true;
        setTimeout(() => {
          this.showSuccessAlert = false;
        }, 10000);
      },
      (err) => {
        this.isUploading = false;
        this.showErrorMeassageAlert = true;
        this.errorMessage = err.error.message;
        setTimeout(() => {
          this.showErrorMeassageAlert = false;
        }, 10000);
        console.log('Your Vehicle has not been created:', err.error.message);
        console.log(err);
      }
    );
  }

  resetForm(): void {
    this.vehicleCreationFormGroup.reset();
  }
}
