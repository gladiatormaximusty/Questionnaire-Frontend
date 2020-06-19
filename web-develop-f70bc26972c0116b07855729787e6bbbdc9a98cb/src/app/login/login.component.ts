import { Component, OnInit } from '@angular/core';
// import { HttpClient  } from "@angular/common/http";
import { HttpService } from '../service/http-service';//封装的http请求
import { ActivatedRoute,Router } from '@angular/router';
import { StroageService } from '../service/stroage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {


  public chooseValue: number = 1;//只允许number类型
  public postData:any = {
    account :'',
    password :''
  }
  public AdminData:any = {
    account :'',
    password :''
  }
  public elLoading:any=false

  constructor(//构造函数
    public http:HttpService,
    public router:Router,
    public route: ActivatedRoute,
    public stroage:StroageService,
    // public https:HttpClient
  ) {}

  chooseLogin(index){
    this.chooseValue = index
  }
  loginAdmin(){
    if(this.AdminData.account=='' || this.AdminData.password==''){
      alert("請輸入賬號密碼")
      return
    }
    this.elLoading = true
    this.http.login('/api/services/app/account/AdminLogin', this.AdminData).then((res) => {
      if(res.result.status.code!=502){
        this.stroage.setStroage('token',res.result.data.token);
        if(res.result.data.isForceChangPwd){
          this.router.navigate(['/PasswordReset']);
        }else{
          this.stroage.setStroage('currentUser',res.result.data.currentUser);
          this.stroage.setStroage('image',res.result.data.image);
          this.router.navigate(['/Homepage']);
        }
        this.elLoading = false
      }else {
        alert(res.result.status.message);
        this.elLoading = false
      }
    })
  }
  login(){
    if(this.postData.account=='' || this.postData.password==''){
      alert("請輸入賬號密碼")
      return
    }
    this.elLoading = true
    this.http.login('/api/services/app/account/Login', this.postData).then((res) => {
      if(res.result.status.code!=502){
        this.stroage.setStroage('token',res.result.data.token);
        if(res.result.data.isForceChangPwd){
          this.router.navigate(['/PasswordReset']);
        }else{
          this.stroage.setStroage('currentUser',res.result.data.currentUser);
          this.stroage.setStroage('image',res.result.data.image);
          this.router.navigate(['/MyQuestions']);
        }
        this.elLoading = false
      }else {
        alert(res.result.status.message);
        this.elLoading = false
      }
    })
  }
  EnterLogin(e){
    if(e.keyCode == 13){
      this.login()
    }
  }
  EnterAdminLogin(e){
    if(e.keyCode == 13){
      this.loginAdmin()
    }
  }
  submitAdmin(){
    this.loginAdmin()
  }
  submit(){
    this.login()
  }

  ngOnInit(): void {
  }


}
