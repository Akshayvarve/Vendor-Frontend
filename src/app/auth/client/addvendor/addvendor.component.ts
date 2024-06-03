import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-addvendor',
  templateUrl: './addvendor.component.html',
  styleUrl: './addvendor.component.scss'
})
export class AddvendorComponent {


  @ViewChild('Bdate') Bdate: ElementRef;
  @ViewChild('AnnvDate') AnnvDate: ElementRef;

  addVendor: UntypedFormGroup;
  AllVendor: any
  date: Date;
  dealerid: any;
  selectedItem?: number;
  allStates: any;
  allCountry: any;
  allCity: any;

  constructor(private http: HttpClient, public dialog: MatDialog, private fb: UntypedFormBuilder, private toastrService: ToastrService,  private service: AuthService) {
  }

  ngOnInit(): void {
    const data = JSON.parse(localStorage.getItem('access_token'))
   

    this.date = new Date;

    this.addVendor = new UntypedFormGroup({
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


    this.fngetVendorId();
    this.fngetStates();
    this.fngetCountry();
    this.fngetCity();
  }

  fngetVendorId() {
    this.service.getSingleVendorid().subscribe((response) => {
      this.AllVendor = response
      if (this.AllVendor.length != 0) {
        this.dealerid = this.AllVendor[0].dealer_id + 1
      }
      else {
        this.dealerid = 1;
      }
    })
  }

  fngetCountry(){
    this.service.getAllCountries().subscribe((data) =>{
      this.allCountry = data ;
    })
  }
  
  fngetStates(){
    this.service.getAllStates().subscribe((data) =>{
      this.allStates = data ;
    })
  }

  fngetCity(){
    this.service.getAllCities().subscribe((data) =>{
      this.allCity = data ;
    })
  }
  


  fnaddBooks() {

    // const date = this.Bdate.nativeElement.value;
    // const date1 = new Date(date);
    // this.Books.controls.date_of_birth.setValue(date);

    // const mdate = this.AnnvDate.nativeElement.value;
    // const mdate1 = new Date(mdate);
    // this.Books.controls.anniversary_date.setValue(mdate);

    this.service.createvendor(this.addVendor.value).subscribe((response) => {
      this.toastrService.success('Book Created Succesfully')
    });

    this.service.createvendoraddress(this.addVendor.value).subscribe((response) => {
    });

    this.service.createBank(this.addVendor.value).subscribe((response) => {
    });

  }


  clear() {
    this.addVendor.reset();
  }

  tempaddOtherSet(templateRef: any) {
    let dialogRef = this.dialog.open(templateRef, { disableClose: true });
  }

 

}

