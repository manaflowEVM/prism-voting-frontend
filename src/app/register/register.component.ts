import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';


declare const $: any;
declare let window: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerForm: FormGroup;
  submitted: Boolean = false;


  OTPForm: FormGroup;
  submitted1: Boolean = false;

  showObj: any = {
    userAccount: ''
  };
  isStep1: any = false;

  constructor(private _formBuilder: FormBuilder,
    private router: Router,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private apiService: ApiService,) { }

  async ngOnInit() {
    
    this.showObj.userAccount = await this.apiService.export();
    if (this.showObj.userAccount == undefined || !this.showObj.userAccount.length) {
      this.isStep1 = false;
    } else {
      this.isStep1 = true;
    }
  }

  connectToMetaMask() {

    this.apiService.connect().then((data) => {
      this.toaster.success('User Connected Successfully');
      // if (this.router.url) {
      // this.router.navigate(['/' +this.router.url.split('/')[0] +'/'+ this.router.url.split('/')[1] ]).then(() => {
        this.onClickRefresh();
      // });
      // }

    }).catch((er) => {

      if (er && er.code) {
        this.toaster.error(er.message);
      }
    })
  }
 


  onClickRefresh() {
    window.location.reload();
  }

}
