import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isStep1: any = false;

  showObj: any = {
    userAccount: '',
    chainId: '',
    networkName: ''
  };

  constructor(private router: Router,
    private _route: ActivatedRoute,
    private toaster: ToastrService,
    private apiService: ApiService,
  ) {

    // this.id = this._route.snapshot.params['id'];
  }

 async ngOnInit() {
    this.showObj.userAccount = await this.apiService.export();
    if (this.showObj.userAccount == undefined || !this.showObj.userAccount.length) {
      this.isStep1 = false;
    } else {
      this.isStep1 = true;
      this.getNetworkName();
    }
  }

  async getNetworkName() {
    this.showObj.networkName = await this.apiService.getNetworkName();
  }

  connectToMetaMask() {

    this.apiService.connect().then((data) => {
      this.toaster.success('User Connected Successfully');
      // if (this.router.url) {
        // this.router.navigate(['/' +this.router.url.split('/')[0] +'/'+ this.router.url.split('/')[1] ]).then(() => {
        //   this.onClickRefresh();
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
