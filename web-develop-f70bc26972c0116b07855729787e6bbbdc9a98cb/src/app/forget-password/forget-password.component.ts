import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http-service';//封装的http请求
import { ActivatedRoute,Router } from '@angular/router';
import { StroageService } from '../service/stroage';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.less']
})
export class ForgetPasswordComponent implements OnInit {
  public email:any
  public elLoading:any
  constructor(
    public http:HttpService,
    public router:Router,
    public route: ActivatedRoute,
    public stroage:StroageService,) { }
  submit(){
    this.elLoading=true
    var Email= /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if(!Email.test(this.email)){
      alert("please enter the correct emailAddress")
      this.elLoading = false
      return false
    }
    this.http.login('/api/services/app/account/ForgetPassword', {emailAddr:this.email}).then((res) => {
      if(res.result.status.code!=502){
        this.elLoading=false
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
