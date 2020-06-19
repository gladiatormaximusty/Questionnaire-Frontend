import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http-service';//封装的http请求
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-supporting-document',
  templateUrl: './supporting-document.component.html',
  styleUrls: ['./supporting-document.component.less']
})
export class SupportingDocumentComponent implements OnInit {
  public pageShow:any=false
  public elLoading:any
  public search:any={
      id: 0,
      name: "",
      entitiesId: 0,
      buId: 0,
      questionTypeId: 0,
      skipCount: 0,
      maxResultCount: 10
  }
  public DataList:any[]
  public totalCount:any
  public entity:any[]
  public BUs:any[]
  public type:any[]
  constructor(public http:HttpService,
    public router:Router,
    public route: ActivatedRoute) { }
  inputSearch(e){
    this.search.skipCount=0
    if(e.keyCode == 13){
      this.searchData()
    }
  }
  ChangeSelect() {
    this.search.skipCount=0
    this.searchData()
  }
  download(url){
    window.open(url)
  }
  ChangePage(page){
    this.search.skipCount=(page-1)*this.search.maxResultCount
    this.searchData()
  }
  searchData() {
    this.elLoading = true
    this.http.postData('/api/services/app/questionnaire/GetSupportingDocument',this.search).then((res)=>{
      this.elLoading = false
      if(res.error==null){
        if(res.result.status.code!=200){
          alert(res.result.status.message)
        }else{
          this.DataList=res.result.data.items
          this.totalCount=res.result.data.totalCount
          this.pageShow=true
        }
      }else{
        alert(res.error.message)
      }
    })
  }
  ngOnInit(): void {
    this.elLoading = true
    this.route.queryParams.subscribe((res: any) => {
      this.search.id=res.id
    })
    this.http.postData('/api/services/app/questionnaire/GetQuestionnaireEntity',{id:this.search.id}).then((res)=>{
      this.elLoading = false
      if(res.error==null){
        if(res.result.status.code!=200){
          alert(res.result.status.message)
        }else{
          this.entity=res.result.data
        }
      }else{
        alert(res.error.message)
      }
    })
    this.http.postData('/api/services/app/questionnaire/GetQuestionnaireBUs',{id:this.search.id}).then((res)=>{
      this.elLoading = false
      if(res.error==null){
        if(res.result.status.code!=200){
          alert(res.result.status.message)
        }else{
          this.BUs=res.result.data
        }
      }else{
        alert(res.error.message)
      }
    })
    this.http.postData('/api/services/app/questionnaire/GetQuestionnaireQuestionType',{id:this.search.id}).then((res)=>{
      this.elLoading = false
      if(res.error==null){
        if(res.result.status.code!=200){
          alert(res.result.status.message)
        }else{
          this.type=res.result.data
        }
      }else{
        alert(res.error.message)
      }
    })
    this.searchData()
  }

}
