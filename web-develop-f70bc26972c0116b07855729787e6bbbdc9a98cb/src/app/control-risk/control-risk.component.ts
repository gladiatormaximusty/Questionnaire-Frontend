import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http-service';//封装的http请求
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-control-risk',
  templateUrl: './control-risk.component.html',
  styleUrls: ['./control-risk.component.less']
})
export class ControlRiskComponent implements OnInit {
  public pageShow:any=false
  public elLoading:any
  public searchData:any={
    id: 0,
    skipCount: 0,
    maxResultCount: 10
  }
  public totalCount:any
  public EntityData:any
  public DataList:any[]
  public NoDownload:any
  constructor(public http:HttpService,
    public router:Router,
    public route: ActivatedRoute) { }
  ChangePage(page){
    this.searchData.skipCount=(page-1)*this.searchData.maxResultCount
    this.SearchInput()
  }
  download(){
    if(this.NoDownload){
      this.elLoading = true
      this.http.postData('/api/services/app/questionnaire/ExportQuestionnaire',{id:this.searchData.id}).then((res)=>{
        this.elLoading = false
        if(res.error==null){
          if(res.result.status.code!=200){
            alert(res.result.status.message)
          }else{
            window.open(res.result.data)
          }
        }else{
          alert(res.error.message)
        }
      })
    }
  }
  SearchInput(){
    this.http.postData('/api/services/app/questionnaire/GetControlRiskQuestionnaire',this.searchData).then((res)=>{
      this.elLoading = false
      if(res.error==null){
        if(res.result.status.code!=200){
          alert(res.result.status.message)
        }else{
          this.DataList=res.result.data.items
          this.totalCount=res.result.data.totalCount
          this.pageShow=true
          if(this.DataList.length==0){
            this.NoDownload=false
          }
        }
      }else{
        alert(res.error.message)
      }
    })
  }
  ngOnInit(): void {
    this.elLoading = true
    this.route.queryParams.subscribe((res: any) => {
      this.searchData.id=res.id
    })
    this.http.postData('/api/services/app/questionnaire/GetQuestionnaireEntity',{id:this.searchData.id}).then((res)=>{
      this.elLoading = false
      if(res.error==null){
        if(res.result.status.code!=200){
          alert(res.result.status.message)
        }else{
          this.EntityData=res.result.data
        }
      }else{
        alert(res.error.message)
      }
    })
    this.SearchInput()
  }

}
