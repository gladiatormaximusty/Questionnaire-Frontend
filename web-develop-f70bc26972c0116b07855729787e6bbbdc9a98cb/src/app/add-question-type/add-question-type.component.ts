import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http-service';//封装的http请求
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-add-question-type',
  templateUrl: './add-question-type.component.html',
  styleUrls: ['./add-question-type.component.less']
})
export class AddQuestionTypeComponent implements OnInit {

  public elLoading:any
  public search:any ={
    id: 0
  }
  public updateUser:any
  public TypeInfo:any={
    questionTypeName:'',
    questionTypeCode:'',
    status:'Active',
    id: 0
  }
  public time:any
  constructor(
    public http:HttpService,
    public router:Router,
    public route: ActivatedRoute) {}

  addType(){
    var patt = /^[\w\u4e00-\u9fa5\-_][\s\w\u4e00-\u9fa5\-_]*[\w\u4e00-\u9fa5\-_]$/;
    if(this.TypeInfo.questionTypeName=='' ||!patt.test(this.TypeInfo.questionTypeName)){
      alert("Please enter Question Type Name and Question Type ID")
      return
    }
    if( this.TypeInfo.questionTypeCode == '' ||!patt.test(this.TypeInfo.questionTypeName)){
      alert("Please enter Question Type Name and Question Type ID")
      return
    }
    this.elLoading = true
    this.http.postData('/api/services/app/questionTypes/InsertOrUpdate',this.TypeInfo).then((res)=>{
      this.elLoading = false
      if(res.error==null){
        if(res.result.status.code!=200){
          alert(res.result.status.message)
        }else{
          this.router.navigate(['/QuestionTypes'])
        }
      }else{
        alert(res.error.message)
      }
    })
  }
  ngOnInit(): void {
    this.updateUser=localStorage.getItem('currentUser')
    this.http.getData("/api/services/app/questionTypes/GetQuestionTypesById",this.search).then((res)=>{
      this.elLoading = false
      if(res.error==null){
        if(res.result.status.code!=200){
          alert(res.result.status.message)
        }else{
          this.time=new Date()
        }
      }else{
        alert(res.error.message)
      }
    })
  }

}
