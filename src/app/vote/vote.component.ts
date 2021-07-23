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
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {


  candidates = ['0x8D32BBa13AbB1d0f2a0F109AF3af8DbeeD170Af3', '0x7347e43E0248735e64DBa72BcD3c2FBc8DBfb443', '0x1e0fbB8151c32B54D38A8abC604b942Cc69D8f26', '0x2054e8c562A2b0382d50CE519AfC6819fD1697cb', '0x1806e68847a7Bd74e311EA6F44222FF93E515dB0', '0x12C29a423d0dB15d38f9C20bf43Cd11C557B144f'];

  selectedCandidates: any = [];
  showObj: any = {
    userAccount: '',
    IOUBalance: 0,
    GOVBalance: 0,

  };
  isStep1: any = false;

  lockForm: FormGroup;
  submitted1: Boolean = false;
  freeForm: FormGroup;
  submitted2: Boolean = false;

  IOUInstance: any;
  presamInstance: any;
  GOVInstance: any;

  constructor(private _formBuilder: FormBuilder,
    private router: Router,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private apiService: ApiService,) { }

  async ngOnInit() {

    this.buildLockForm();
    this.buildFreeForm();

    this.showObj.userAccount = await this.apiService.export();
    if (this.showObj.userAccount == undefined || !this.showObj.userAccount.length) {
      this.isStep1 = false;
    } else {
      this.isStep1 = true;

      this.presamInstance = await this.apiService.exportInstance(environment.PRISAMAddress, environment.PRISAMABI);;
      this.IOUInstance = await this.apiService.exportInstance(environment.IOUAddress, environment.IOUABI);;
      this.GOVInstance = await this.apiService.exportInstance(environment.GOVAddress, environment.GOVABI);;
      console.log('-this.presamInstance --------------------', this.presamInstance)
      console.log('-this.IOUInstance --------------------', this.IOUInstance)
      console.log('-this.GOVInstance --------------------', this.GOVInstance)
      console.log('-this.GOVInstance --------------------', this.showObj.userAccount)

      if (this.IOUInstance && this.IOUInstance != undefined) {
        let bal = await this.IOUInstance.methods.balanceOf(this.showObj.userAccount).call({ from: this.showObj.userAccount });
        console.log('-this.GOVInstance -bal-------------------', bal)

        if (bal && bal > 0) {
          this.showObj.IOUBalance = (bal / environment.divideValue).toFixed(2);
        }
      }
      if (this.GOVInstance && this.GOVInstance != undefined) {
        let bal = await this.GOVInstance.methods.balanceOf(this.showObj.userAccount).call({ from: this.showObj.userAccount });;
        if (bal && bal > 0) {
          this.showObj.GOVBalance = (bal / environment.divideValue).toFixed(2);
        }
      }
      if (this.presamInstance && this.presamInstance != undefined) {

      }
    }
  }

  buildLockForm() {
    this.lockForm = this._formBuilder.group({
      _amount: ['', [Validators.required]]
    });
  }
  buildFreeForm() {
    this.freeForm = this._formBuilder.group({
      _amount: ['', [Validators.required]]
    });

  }

  onCreate() {

  }

  onLock() {
    this.spinner.show();

    this.submitted1 = true;

    if (this.lockForm.invalid) {
      this.spinner.hide();
      return;
    } else {
      let fd = this.lockForm.value;
      if (this.showObj.GOVBalance >= parseFloat(fd._amount)) {

        this.apiService.lock(this.presamInstance, this.showObj.userAccount, fd._amount).then((data) => {
          this.spinner.hide();
          if (data) {
            this.onClickRefresh();
          }
        }).catch(er => {
          console.log('------------------ere', er)
          this.spinner.hide();
          this.toaster.error('Please enter valid amount.')
        })

      } else {
        this.spinner.hide();
        this.toaster.error('Your balance shoud be greater then zero.')
      }




    }

  }

  onFree() {
    this.spinner.show();

    this.submitted2 = true;

    if (this.freeForm.invalid) {
      this.spinner.hide();
      return;
    } else {

      let fd = this.freeForm.value;
      if (this.showObj.IOUBalance >= parseFloat(fd._amount)) {

        this.apiService.free(this.presamInstance, this.showObj.userAccount, fd._amount).then((data) => {
          this.spinner.hide();
          if (data) {
            this.onClickRefresh();
          }
        }).catch(er => {
          console.log('------------------ere', er)

          this.spinner.hide();
          this.toaster.error('Please enter valid amount.')
        })
      } else {
        this.spinner.hide();
        this.toaster.error('Your balance shoud be greater then zero.')
      }
    }

  }


  onClickRefresh() {
    window.location.reload();
  }


  onClickCandidate(e, candidate) {

    console.log('--------------e', e.target.checked);
    console.log('--------------candidate', candidate)
    if (candidate) {

      if (e.target.checked == true) {
        this.selectedCandidates.push(candidate);
      } else {
        const index = this.selectedCandidates.indexOf(candidate);
        if (index > -1) {
          this.selectedCandidates.splice(index, 1);
        }
      }
    }
  }

  onVote() {
    console.log('--------------this.selectedCandidates', this.selectedCandidates)
    this.spinner.show();

    if (this.selectedCandidates.length) {

      this.apiService.votep(this.presamInstance, this.showObj.userAccount, this.selectedCandidates).then((data) => {
        this.spinner.hide();
        if (data) {
          this.onClickRefresh();
        }
      }).catch(er => {
        console.log('------------------ere', er)

        this.spinner.hide();
        this.toaster.error('Please enter valid Addresses.')
      })
    } else {
      this.spinner.hide();
      this.toaster.error('Please select any candidates.')
    }
    // votep
  }


}
