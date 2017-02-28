import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, ToastController } from 'ionic-angular';
import { Http,Headers,RequestOptions } from '@angular/http';

import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';


@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: {username?: string, nama?: string, email?: string, password?: string} = {};
  submitted = false;
  headers = new Headers({ 'Content-Type': 'application/json'});
  options = new RequestOptions({ headers: this.headers});

  constructor(
    public toastCtrl: ToastController,
    public navCtrl: NavController, 
    public http: Http,
    public userData: UserData
    ) {}

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      let input = JSON.stringify({
        username: this.signup.username, 
        name: this.signup.nama, 
        email: this.signup.email, 
        password: this.signup.password, 
        role: '1'
      });
      this.http.post(this.userData.BASE_URL+"user/inputUser",input,this.options).subscribe(data => {
           let response = data.json();
           this.userData.signup(response);
           this.showToast(response.message);
        });
      this.navCtrl.setRoot(TabsPage);

    }
  }
  showToast(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}