import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http-service';//封装的http请求
import { ActivatedRoute,Router } from '@angular/router';
import { StroageService } from '../service/stroage';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.less']
})
export class PasswordResetComponent implements OnInit {
  public password:any={
    newPassword:"",
    confirmPassword:""
  }
  public elLoading:any
  constructor(
    public http:HttpService,
    public router:Router,
    public route: ActivatedRoute,
    public stroage:StroageService,) { }
  submit(){
    var rex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8}$/
    if(this.password.newPassword=='' || this.password.confirmPassword==''){
      alert("請輸入密碼")
      return
    }
    if(!rex.test(this.password.newPassword) || !rex.test(this.password.confirmPassword)){
      alert("8 digits including uppercase and lowercase numbers")
      return
    }
    if(this.password.newPassword != this.password.confirmPassword){
      alert("Please enter the same password")
      return
    }
    this.elLoading = true
    this.http.postData('/api/services/app/account/ResetPassword', this.password).then((res) => {
      if(res.result.status.code!=502){
        this.stroage.clear();
        this.elLoading = false
        this.router.navigate(['/Login']);
      }else {
        alert(res.result.status.message);
        this.elLoading = false
      }
    })

  }
  ngOnInit(): void {
  }

}
