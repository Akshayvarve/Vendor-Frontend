import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
   })

   constructor(private http: HttpClient, private router: Router, ) { }

   IsLoggedIn() {
    return !!localStorage.getItem('jwt_token')
  }

  signupUser(form) {
    return this.http.post(`${environment.Auth_URL}user`, form, { headers: this.httpHeaders })
  }
  logout() {
    localStorage.clear();
    this.router.navigate([''])
  }
  login(user: any) {
    return this.http.post(`${environment.Auth_URL}user/login`, user)
  }
  getAllvendor() {
    return this.http.get(`${environment.Auth_URL}vendor/All`, { headers: this.httpHeaders })
  }
  getSinglevendor(id:any) {
    return this.http.get(`${environment.Auth_URL}vendor/single/data/${id}`, { headers: this.httpHeaders })
  }
  getSingleVendorid() {
    return this.http.get(`${environment.Auth_URL}vendor/vendorid`, { headers: this.httpHeaders })
  }
  createvendor(user: any) {
    return this.http.post(`${environment.Auth_URL}vendor/add`, user, { headers: this.httpHeaders })
  }
  Updatevendor(id,data){
    return this.http.put(`${environment.Auth_URL}vendor/update/${id}`,data, { headers: this.httpHeaders })
  }
  deleteVendor(id: any) {
    return this.http.delete(`${environment.Auth_URL}vendor/delete/${id}`)
  }

  //  Vendor Address APIs
  getAllAddress(){
    return this.http.get(`${environment.Auth_URL}vendorAddress/All`,{headers:this.httpHeaders});
  }
  getSingleAddressId(){
    return this.http.get(`${environment.Auth_URL}vendorAddress/addressid/`,{headers:this.httpHeaders});
  }
  createvendoraddress(form:any){
    return this.http.post(`${environment.Auth_URL}vendorAddress/add`,form,{headers:this.httpHeaders})
  }
  Updatevendoradd(id,data){
    return this.http.put(`${environment.Auth_URL}vendorAddress/update/${id}`,data, { headers: this.httpHeaders })
  }
  deleteVendorAddress(id: any) {
    return this.http.delete(`${environment.Auth_URL}vendorAddress/delete/${id}`)
  }

  // Country APIs

  getAllCountries(){
    return this.http.get(`${environment.Auth_URL}country/All`,{headers:this.httpHeaders});
  }
  getSingleCountry(id:any){
    return this.http.get(`${environment.Auth_URL}country/Single/${id}`,{headers:this.httpHeaders});
  }
  createCountry(form:any){
    return this.http.post(`${environment.Auth_URL}country/`,form,{headers:this.httpHeaders})
  }
  updateCountry(id,data){
    return this.http.put(`${environment.Auth_URL}country/${id}`,data, { headers: this.httpHeaders })
  }
  deleteCountry(id: any) {
    return this.http.delete(`${environment.Auth_URL}country/${id}`)
  }

 //  State APIs
 getAllStates(){
    return this.http.get(`${environment.Auth_URL}state/All`,{headers:this.httpHeaders});
  }
  getSingleState(id:any){
    return this.http.get(`${environment.Auth_URL}state/Single/${id}`,{headers:this.httpHeaders});
  }
  createState(form:any){
    return this.http.post(`${environment.Auth_URL}state/`,form,{headers:this.httpHeaders})
  }
  updateState(id,data){
    return this.http.put(`${environment.Auth_URL}state/${id}`,data, { headers: this.httpHeaders })
  }
  deleteState(id: any) {
    return this.http.delete(`${environment.Auth_URL}state/${id}`)
  }

   //  City APIs
getAllCities(){
  return this.http.get(`${environment.Auth_URL}city/All`,{headers:this.httpHeaders});
}
getSingleCity(id:any){
  return this.http.get(`${environment.Auth_URL}city/Single/${id}`,{headers:this.httpHeaders});
}
createCity(form:any){
  return this.http.post(`${environment.Auth_URL}city/`,form,{headers:this.httpHeaders})
}
updateCity(id,data){
  return this.http.put(`${environment.Auth_URL}city/${id}`,data, { headers: this.httpHeaders })
}
deleteCity(id: any) {
  return this.http.delete(`${environment.Auth_URL}city/${id}`)
}

// Bank APIs
getAllBank(){
  return this.http.get(`${environment.Auth_URL}bank/All`,{headers:this.httpHeaders});
}
createBank(form:any){
  return this.http.post(`${environment.Auth_URL}bank/add`,form,{headers:this.httpHeaders})
}
UpdateBank(id,data){
  return this.http.put(`${environment.Auth_URL}bank/update/${id}`,data, { headers: this.httpHeaders })
}
deleteBank(id: any) {
  return this.http.delete(`${environment.Auth_URL}bank/delete/${id}`)
}



}
