import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http-service';//封装的http请求
import { ActivatedRoute,Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser'
import { StroageService } from '../service/stroage';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.less']
})
export class UserInfoComponent implements OnInit {
  public title:any
  public changeId:any
  public imageFile:any={}
  public imgSize:any
  public imgUrl:any='../../assets/images/eira-img-face.svg'
  public search:any={
    id:''
  }
  public elLoading:any
  public ActiveStatus:any = {isOnlyShowActiveStatus:true}
  public BuName:any
  public userData:any={
    "name": "",
    "surname": "",
    "emailAddress": "",
    "status": 'Active',
    "updateTime": new Date(),
    "account": "",
    "image": "",
    "bU_Id": 0,
    "isAdmin": false,
    "id": 0,
    "updateUser":''
  }
  public changeid:any

  constructor(
    public http:HttpService,
    public router:Router,
    public route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    public stroage: StroageService,) { }

  saveUser(){
    var patt = /^[\w\u4e00-\u9fa5\-_][\s\w\u4e00-\u9fa5\-_]*[\w\u4e00-\u9fa5\-_]$/;
    var Email= /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if(this.userData.name=="" ||!patt.test(this.userData.name)){
      alert("please enter the correct User First Name")
      return false
    }
    if(this.userData.surname=="" ||!patt.test(this.userData.surname)){
      alert("please enter the correct User Last Name")
      return false
    }
    if(this.userData.account=="" || !patt.test(this.userData.account)){
      alert("please enter User ID")
      return false
    }
    if(!Email.test(this.userData.emailAddress)){
      alert("please enter the correct emailAddress")
      return false
    }
    this.elLoading = true
    this.http.postData('/api/services/app/user/InsertOrUpdate',this.userData).then((res)=>{
      this.elLoading = false
      if(res.error==null){
        if(res.result.status.code!=200){
          alert(res.result.status.message)
        }else{
          if (res.result.data.isCurrentLoginUser) {
            this.stroage.setStroage('image', res.result.data.image);
          }
          this.router.navigate(['/Users'])
        }
      }else{
        alert(res.error.message)
      }
    })
  }

  fileChange(event){
    this.imageFile=event.target.files[0]
    // let Url=window.URL.createObjectURL(this.imageFile)
    // this.imgUrl=this.sanitizer.bypassSecurityTrustUrl(Url)  //缩略图
    if(this.imageFile){
      this.elLoading = true
      var formData:FormData=new FormData()
      formData.append('imgFile',this.imageFile)

      this.http.flierData("/api/services/app/common/UploadImage",formData).then((res)=>{
        this.elLoading = false
        if(res.error==null){
          if(res.result.status.code!=200){
            alert(res.result.status.message)
          }else{
            this.userData.image=res.result.data
            this.imgUrl = res.result.data
            event.target.value = ""
          }
        }else{
          alert(res.error.message)
        }
      })
    }
  }

  ngOnInit(): void {
    this.elLoading = true
    this.userData.updateUser=localStorage.getItem('currentUser')
    this.route.queryParams.subscribe((res: any) => {
      this.search.id = res.id
      this.changeid = res.change
      if(res.change==1){
        this.title="User Info"
        this.changeId=1
        this.http.postData("/api/services/app/user/GetUserInfo",this.search).then((res)=>{
          this.elLoading = false
          if(res.error==null){
            if(res.result.status.code!=200){
              alert(res.result.status.message)
            }else{
              this.userData=res.result.data
              this.imgUrl=res.result.data.image
              console.log("Testing",this.userData)
              console.log("ImageUrl", this.imgUrl);
            }
          }else{
            alert(res.error.message)
          }
        })
        //獲取BU
        this.http.postData("/api/services/app/bUs/GetAll",this.ActiveStatus).then((res)=>{
          this.elLoading = false
          if(res.error==null){
            if(res.result.status.code!=200){
              alert(res.result.status.message)
            }else{
              this.BuName=res.result.data
            }
          }else{
            alert(res.error.message)
          }
        })
      }else{
        this.title="Add User"
        // this.userData.image='../../assets/images/eira-img-face.svg'
        //獲取BU
        this.http.postData("/api/services/app/bUs/GetAll",this.ActiveStatus).then((res)=>{
          this.elLoading = false
          if(res.error==null){
            if(res.result.status.code!=200){
              alert(res.result.status.message)
            }else{
              this.BuName=res.result.data
              this.userData.bU_Id=this.BuName[0].id
            }
          }else{
            alert(res.error.message)
          }
        })
      }
    })
  }

}
