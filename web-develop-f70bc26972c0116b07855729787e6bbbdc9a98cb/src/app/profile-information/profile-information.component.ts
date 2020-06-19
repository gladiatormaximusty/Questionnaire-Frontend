import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http-service'
import { StroageService } from '../service/stroage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.less']
})
export class ProfileInformationComponent implements OnInit {

  //加載
  public elLoading:any;

  public inspect: Array<any> = [
    {
      //由login傳值：
      "id": "3"
    }
  ];
  public firstName: string;
  public lastName: string;
  public email: string;
  public latestLogin: string;
  public latestUpdate: string;
  public creatTime: string;
  public image: string;

  constructor(
    public http: HttpService,
    public stroage:StroageService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.elLoading = true;
    this.http.postData("/api/services/app/user/GetProfileInfo", this.inspect)
      .then(res => {
        if (res.error == null) {
          let data = res.result.data;

          this.firstName = data.name;
          this.lastName = data.surname;
          this.email = data.emailAddress;
          // this.latestLogin = data.lastLogin.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3");
          this.latestLogin = data.lastLogin.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3");
          this.latestUpdate = data.lastModificationTime.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3");
          this.creatTime = data.creationTime.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3");
          this.image = data.image;
          console.log("測試",this.image)
          console.log('res',res)
          console.log("Testing Profile")
          this.elLoading = false;
        } else {
          alert("服務器異常，請聯繫管理員")
        }

      })
  }

  logout():void{
    this.stroage.clear('token')
    this.router.navigate(['/'])
  }

}
