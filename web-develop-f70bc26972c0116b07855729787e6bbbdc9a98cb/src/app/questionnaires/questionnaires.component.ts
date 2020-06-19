import { Component, OnInit  } from '@angular/core';
import { HttpService } from '../service/http-service';//封装的http请求
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.less'],
})
export class QuestionnairesComponent implements OnInit {
  public pageShow:any=false
  public elLoading:any
  public nowIndex = 'Pending';
  public DataList:any[]=[]
  public totalCount:any
  public NumberData:any={
    draftingQuestionnaireCount: 0,
    finishedQuestionnaireCount: 0,
    pendingQuestionnaireCount: 0,
    reviewingQuestionnaireCount: 0,
  }
  public sort:any="desc"
  public Search:any={
    "status": "",
    "questionnaireName": "",
    "sorting": "",
    "skipCount": 0,
    "maxResultCount": 10
  }
  public isEdit:any=true
  constructor(
    public http:HttpService,
    public router:Router,
    public route: ActivatedRoute) { }

  inputSearch(e){
    this.Search.skipCount=0
    if(e.keyCode == 13){
      this.SearchInput()
    }
  }

  searchData(data){
    this.nowIndex = data;
    this.Search.status=data
    this.Search.questionnaireName=""
    this.elLoading = true
    if(data=='Finished'){
      this.isEdit=false
    }else{
      this.isEdit=true
    }
    this.SearchInput()
  }

  ChangePage(page){
    this.Search.skipCount=(page-1)*this.Search.maxResultCount
    this.SearchInput()
  }

  sorted(type){
    if(this.sort=="desc"){
      this.sort="asc"
      this.Search.sorting=type+" asc"
    }else{
      this.sort="desc"
      this.Search.sorting=type+" desc"
    }
    this.SearchInput()
  }

  SearchInput(){
    this.elLoading = true
    this.http.postData('/api/services/app/questionnaire/GetAll',this.Search).then((res)=>{
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
    this.http.postData('/api/services/app/questionnaire/GetQuestionnaireStatusCount',{}).then((res)=>{
      this.elLoading = false
      if(res.error==null){
        if(res.result.status.code!=200){
          alert(res.result.status.message)
        }else{
          this.NumberData=res.result.data
        }
      }else{
        alert(res.error.message)
      }
    })

    this.route.queryParams.subscribe((res: any) => {
      if (res.change == 0) {
        this.searchData("Pending")
      } else if (res.change == 1) {
        this.searchData("Reviewing")
      } else if (res.change == 2) {
        this.searchData("Finished")
      } else {
        this.searchData("Pending")
      }
    })
  }

}
