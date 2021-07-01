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

  createForm: FormGroup;
  submitted: Boolean = false;


  voteForm: FormGroup;
  submitted1: Boolean = false;

  contractInstance: any;

  liveElectObj: any = {
    count: 0,
    data: []
  };
  resultsElections: any = []

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
    this.buildCreateForm();
    this.buildVoteForm();


    this.showObj.userAccount = await this.apiService.export();
    if (this.showObj.userAccount == undefined || !this.showObj.userAccount.length) {
      this.isStep1 = false;
    } else {
      this.isStep1 = true;
      this.contractInstance = await this.apiService.exportInstance(environment.SCaddress, environment.SCABI);;

      if (this.contractInstance && this.contractInstance != null) {
        this.liveElectObj.count = await this.contractInstance.methods.counter_().call({ from: this.showObj.userAccount });

        console.log('--------------------this.', this.liveElectObj.count);

        if (this.liveElectObj.count && this.liveElectObj.count > 0) {
          for (var i = 0; i < this.liveElectObj.count; i++) {
            let candidates: any = await this.contractInstance.methods.getElectionList(i).call({ from: this.showObj.userAccount });
            console.log(candidates)
            if (candidates && candidates.length) {
              this.liveElectObj.data.push(candidates);

              if (candidates && candidates.length) {

                // 
                let ary = [];

                candidates.map(async (x) => {
                  let obj: any = {};
                  obj.votes = await this.contractInstance.methods.getVote(x).call({ from: this.showObj.userAccount });
                  obj.address = x.substring(0, 4)+'...'+x.substr(x.length - 3)  ;
                  ary.push(obj);

                  if (ary.length == candidates.length) {
                    await this.resultsElections.push(ary);
                  }

                })

              }

            } else {
              this.liveElectObj.data.push('');
            }
          }
        }

      }
    }
  }
  buildCreateForm() {
    this.createForm = this._formBuilder.group({
      _token_address: ['', [Validators.required]]
    });
  }

  buildVoteForm() {
    this.voteForm = this._formBuilder.group({
      _id: ['', [Validators.required]],
      _token_address: ['', [Validators.required]]
    });
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


  onCreate() {
    this.spinner.show();

    this.submitted = true;

    if (this.createForm.invalid) {
      this.spinner.hide();
      return;
    } else {

      let fd = this.createForm.value;

      var add = fd._token_address.split(",");
      this.apiService.createCampaign(this.contractInstance, this.showObj.userAccount, add).then((data) => {
        this.spinner.hide();
        if (data) {
          this.onClickRefresh();
        }
      }).catch(er => {
        console.log('------------------ere', er)

        this.spinner.hide();
        this.toaster.error('Please enter valid Addresses.')
      })



    }
  }


  onVote() {
    console.log('--------KKKKK',this.resultsElections)
    this.spinner.show();

    this.submitted1 = true;

    if (this.voteForm.invalid) {
      this.spinner.hide();
      return;
    } else {

      let fd = this.voteForm.value;


      var add = fd._token_address.split(",");
      var id = fd._id;


      this.apiService.vote(this.contractInstance, this.showObj.userAccount, add, id).then((data) => {
        this.spinner.hide();
        if (data) {
          this.onClickRefresh();
        }
      }).catch(er => {
        console.log('------------------ere', er)

        this.spinner.hide();
        this.toaster.error('Please enter valid Addresses & election Id.')
      })



    }
  }


  onClickRefresh() {
    window.location.reload();
  }



}
