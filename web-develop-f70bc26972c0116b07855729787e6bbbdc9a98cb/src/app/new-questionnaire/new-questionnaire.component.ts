import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http-service';//封装的http请求
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-new-questionnaire',
  templateUrl: './new-questionnaire.component.html',
  styleUrls: ['./new-questionnaire.component.less']
})
export class NewQuestionnaireComponent implements OnInit {
  public elLoading:any
  public title:any
  public questionnaire:any={
    questionnaireId:0,
    selectedQuestionTypeId:[]
  }
  public nowIndex=0;
  public nowId:any
  public TypeValue = false
  public BUsValue = false
  public typeList:any[]=[]
  public search:any={
    id:0
  }
  public TypeData:any[]=[]
  public copyData:any=[]
  public entitiesData:any[]=[]
  public bUsData:any[]=[]
  public DataList:any={
    "questionnaire": {
      "questionnaireCode": "",
      "questionnaireName": "",
      "riskType": "Control Risk",
      "status": "Pending",
      "submissionDeadline": '',
      "questionType": [
        {
          "questionTypeId": 0,
          "questionTypeName": "",
          "isSeleted": true
        }
      ],
      "id": 0
    },
    "asignQuestionType": [
      {
        "questionTypeId": 0,
        "questionTypeName": "string",
        "questions": [
          {
            "questionId": 0,
            "questionCode": "string",
            "question": "string",
            "singleAnswer": true,
            "entities": [
              {
                "entitiesId": 0,
                "entityName": "string",
                "isChangeBU": true,
                "bUs": [
                  {
                    "questionnaireAsignId": 0,
                    "buId": 0,
                    "buName": "string",
                    "isSeleted": true
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
  // public questionnaireData:any[]
  constructor(
    public http:HttpService,
    public router:Router,
    public route: ActivatedRoute) { }

  timeTransition(){
    var d = new Date();
    this.DataList.questionnaire.submissionDeadline=d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate()
  }
  ChooseType(status){
    if(this.TypeValue == false){
      this.TypeValue = true
    }else{
      this.TypeValue = false
    }
    if(!status){
      this.DataList.questionnaire.questionType.forEach((item,index)=>{
        // 復原原先被選中的type
        this.TypeData[index].isSeleted=item.isSeleted
      })

    }
  }

  ChooseBUs(questionTypeId,questionId,entitiesId,isShowBU,isChangeBU){
    this.DataList.asignQuestionType.forEach((item)=>{
      if(item.questionTypeId==questionTypeId){

        item.questions.forEach((list)=>{
          if(list.questionId==questionId){
            list.entities.forEach((more)=>{
              if(more.entitiesId==entitiesId){
                if(!isChangeBU){
                  more.bUs.forEach((bu,index)=>{
                    bu.isSeleted=this.bUsData[index]
                  })
                }else{
                  this.bUsData=[]
                  more.bUs.forEach((bu)=>{
                    this.bUsData.push(bu.isSeleted)
                  })
                }
                more.isChangeBU=isShowBU
              }
            })
          }
        })
      }
    })
  }
  selectAll(questionTypeId,questionId,entitiesId,isChangeBU){
    this.DataList.asignQuestionType.forEach((item)=>{
      if(item.questionTypeId==questionTypeId){
        item.questions.forEach((list)=>{
          if(list.questionId==questionId){
            list.entities.forEach((more)=>{
              if(more.entitiesId==entitiesId){
                if(isChangeBU){
                  more.bUs.forEach((bu)=>{
                    bu.isSeleted=true
                  })
                }
              }
            })
          }
        })
      }
    })
  }
  typeSave(){
    // 賦值給提交數據所用的type以用以搜索數據
    this.TypeData.forEach((item,index)=>{
      this.DataList.questionnaire.questionType[index].isSeleted=item.isSeleted
    })

    this.questionnaire.selectedQuestionTypeId=[]
    this.DataList.questionnaire.questionType.forEach((item)=>{
      if(item.isSeleted){

        if(this.questionnaire.selectedQuestionTypeId.indexOf(item.questionTypeId)==-1){
          this.questionnaire.selectedQuestionTypeId.push(item.questionTypeId)
        }
      }
    })
    this.TypeValue = false
    this.elLoading = true
    this.http.postData('/api/services/app/questionnaire/GetQuestionnaireAsign',this.questionnaire).then((res)=>{
      this.elLoading = false
      if(res.error==null){
        if(res.result.status.code!=200){
          alert(res.result.status.message)
        }else{
          this.DataList.asignQuestionType=res.result.data.asignQuestionType
          this.entitiesData=res.result.data.entities

          for(let i=0;i<this.DataList.questionnaire.questionType.length;i++){
            if(this.DataList.questionnaire.questionType[i].isSeleted==true){
              this.tableSwitch(this.DataList.questionnaire.questionType[i].questionTypeId,i)
              return false
            }
          }
        }
      }else{
        alert(res.error.message)
      }
    })
  }

  tableSwitch(id,index){
    this.nowId=id
    this.nowIndex = index;
  }
  copy(data,id){
    this.copyData=[]
    if(this.copyData==[]){
      return
    }
    data.forEach((item)=>{
      item.entities.forEach((ent)=>{
        if(ent.entitiesId==id){
          this.copyData.push(ent.bUs)
        }
      })
    })
  }
  paste(data,id){
      data.forEach((list,index)=>{
        list.entities.forEach((ens)=>{
          if(ens.entitiesId==id){
            ens.bUs.forEach((bu,i)=>{
              bu.isSeleted=this.copyData[index][i].isSeleted
            })
          }
        })
      })
  }
  saveData(){
    if(this.DataList.questionnaire.questionnaireCode==""){
      alert("please enter the Questionnaire ID")
      return false
    }
    if(this.DataList.questionnaire.questionnaireName==""){
      alert("please enter the Questionnaire Name")
      return false
    }
    this.elLoading = true
    this.http.postData('/api/services/app/questionnaire/InsertOrUpdate',this.DataList).then((res)=>{
      this.elLoading = false
      if(res.error==null){
        if(res.result.status.code!=200){
          alert(res.result.status.message)
        }else{
          this.router.navigate(['/Questionnaires'])
        }
      }else{
        alert(res.error.message)
      }
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((res: any) => {
      this.search.id=res.id
      if(res.change==1 && res.id!=0){
        this.title="Questionnaire Info"
        this.questionnaire.questionnaireId=res.id
      }else{
        this.title="Add New Questionnaire"
      }
    })
    this.elLoading = true
    this.http.getData('/api/services/app/questionnaire/GetQuestionnaireById',this.search).then((res)=>{
      this.elLoading = false
      if(res.error==null){
        if(res.result.status.code!=200){
          alert(res.result.status.message)
        }else{
          // 賦值給與一個臨時儲存type的變量用來做type彈窗顯示
          this.TypeData=JSON.parse(JSON.stringify(res.result.data.questionType))

          if(this.search.id==0){
            // 提交數據所用的儲存type的變量
            this.DataList.questionnaire.questionType=res.result.data.questionType
          }else{
            this.DataList.questionnaire=res.result.data
            this.DataList.questionnaire.id=this.search.id
            this.typeSave()
          }
        }
      }else{
        alert(res.error.message)
      }
    })
    this.timeTransition()
  }

}
