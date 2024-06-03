import { Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { AddvendorComponent } from './addvendor/addvendor.component';
import { UpdatevendorComponent } from './updatevendor/updatevendor.component';

export interface PartyDataInterface {

}
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort;
  @Input() deviceXs!: boolean;
  @ViewChild('pdfContainer') pdfContainer: ElementRef;
  @ViewChild('pdfOutput') pdfOutput: ElementRef;

  htmlContent: string;

  constructor(public dialog: MatDialog,private ngZone: NgZone,
    private service: AuthService,
    private router: Router, private toastrService: ToastrService) {}

  allVendor!: PartyDataInterface[];
  partyDisplayColumn = ['Sr.No','Name','Company Name','Address','Action'];
  partyDataSource = new MatTableDataSource(this.allVendor)

  async getVendor() {
    const vendor = await this.service.getAllvendor().toPromise();
    this.partyDataSource.data = vendor as PartyDataInterface[]
  }

  searchClient(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.partyDataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    const data = JSON.parse(localStorage.getItem('access_token'))
    if (data == null) {
      this.router.navigate(['']);
    }
    this.getVendor();
  }

  clear(){
    this.partyDisplayColumn = ['Sr.No','Name','Company Name','Address','Action'];
  }

  addVendor(): void {
    const dialogRef = this.dialog.open(AddvendorComponent, { disableClose: true });
    this.dialog.afterAllClosed.subscribe(result => {
      this.getVendor();
    });
  }
  
  updateVendor(dealer_id: any): void {
    const dialogRef = this.dialog.open(UpdatevendorComponent, {
      data: {
        dealer_id,
        Text: true
      },
      disableClose: true
    });
    this.dialog.afterAllClosed.subscribe(result => {
      this.getVendor();
    });
  }
  

  deleteVendor(id:any){
    this.service.deleteVendor(id).subscribe((data)=>{
      this.toastrService.warning('::Deleted Succesfully!');
      this.getVendor();
    })

    this.service.deleteVendorAddress(id).subscribe((data)=>{
    })

    this.service.deleteBank(id).subscribe((data)=>{
    })
  }


 
}

