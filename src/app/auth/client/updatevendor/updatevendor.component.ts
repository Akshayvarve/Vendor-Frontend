import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-updatevendor',
  templateUrl: './updatevendor.component.html',
  styleUrl: './updatevendor.component.scss'
})
export class UpdatevendorComponent {

  @ViewChild('Bdate') Bdate: ElementRef;
  @ViewChild('AnnvDate') AnnvDate: ElementRef;

  date: Date;
  dealerid: any;
  selectedItem?: number;
  allAddress: any;
  UpdateVendor: UntypedFormGroup;
  SingleVendor: any = {};
  allStates: any;
  allCountry: any;
  allCity: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, public dialog: MatDialog,
    private fb: UntypedFormBuilder, private toastrService: ToastrService,
     private service: AuthService,
  ) {
  }


  ngOnInit(): void {
    const data = JSON.parse(localStorage.getItem('access_token'))
  
    this.date = new Date;

    this.service.getSinglevendor(this.data.dealer_id).subscribe(data => {
      this.SingleVendor = data[0];
      console.log(this.SingleVendor);
    })

    this.fngetStates();
    this.fngetCountry();
    this.fngetCity();


    this.UpdateVendor = new UntypedFormGroup({
      dealer_id: new UntypedFormControl(''),
      login_access: new UntypedFormControl(''),
      name: new UntypedFormControl(''),
      company_name: new UntypedFormControl(''),
      mobile_no: new UntypedFormControl(''),
      date_of_birth: new UntypedFormControl(''),
      anniversary_date: new UntypedFormControl(''),
      telephone_no: new UntypedFormControl(''),
      whatsapp_no: new UntypedFormControl(''),
      remark: new UntypedFormControl(''),
      gst_type: new UntypedFormControl(''),
      gstin: new UntypedFormControl(''),
      pan_no: new UntypedFormControl(''),
      apply_tds: new UntypedFormControl(''),
      credit_limit: new UntypedFormControl(''),
      opening_balance: new UntypedFormControl(''),
      opening_balance_type: new UntypedFormControl(''),
      supplier_type: new UntypedFormControl(''),
      email: new UntypedFormControl(''),
      address_line_1: new UntypedFormControl(''),
      address_line_2: new UntypedFormControl(''),
      country: new UntypedFormControl(''),
      state: new UntypedFormControl(''),
      city: new UntypedFormControl(''),
      pincode: new UntypedFormControl(''),
      address_type: new UntypedFormControl(''),
      bank_ifsc_code: new UntypedFormControl(''),
      bank_name: new UntypedFormControl(''),
      branch_name: new UntypedFormControl(''),
      account_no: new UntypedFormControl(''),
      account_holder_name: new UntypedFormControl(''),
    });

  }

  fngetCountry() {
    this.service.getAllCountries().subscribe((data) => {
      this.allCountry = data;
    })
  }

  fngetStates() {
    this.service.getAllStates().subscribe((data) => {
      this.allStates = data;
    })
  }

  fngetCity() {
    this.service.getAllCities().subscribe((data) => {
      this.allCity = data;
    })
  }


  fnUpdateVendor() {
    this.service.Updatevendor(this.SingleVendor.dealer_id, this.UpdateVendor.value).subscribe((response) => {
      this.toastrService.success('::Update Succesfully!');
      console.log(response);
    })

    this.service.Updatevendoradd(this.SingleVendor.id, this.UpdateVendor.value).subscribe((response) => {
      console.log(response, "address");

    })

    this.service.UpdateBank(this.SingleVendor.id, this.UpdateVendor.value).subscribe((response) => {
      console.log(response, "bank");
    })
  }



}
