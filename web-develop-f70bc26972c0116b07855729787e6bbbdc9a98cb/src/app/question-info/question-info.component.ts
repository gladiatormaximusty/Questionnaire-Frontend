import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http-service';//封装的http请求
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-question-info',
  templateUrl: './question-info.component.html',
  styleUrls: ['./question-info.component.less']
})
export class QuestionInfoComponent implements OnInit {

  public elLoading:any
  public title:any
  public changeId:any
  public typeList:any
  public search:any={
    id:''
  }
  public userData:any={
    questionTypeId: 0,
    questionCode: "",
    question: "",
    highestRating: "1",
    status: "Active",
    scoringMethod: "Aggregate",
    hasAnswer: false,
    freeTextPlaceholder:"",
    isAnswerMandatory: false,
    hasFreeText: false,
    isFreeTextMandatory: false,
    isFreeTextNumeric: false,
    hasSupportingDocument: false,
    isSupportingDocumentMandatory: false,
    questionsAnswers: [
      {
        answerContent: "",
        recommendedScore: "",
        id: 0
      }
    ],
    updateTime: new Date(),
    updateUser: "",
    id: 0
  }

  constructor(
    public http:HttpService,
    public router:Router,
    public route: ActivatedRoute) { }

  inputSearch(e){
    this.search.skipCount=0
    if(e.keyCode == 13){
      this.searchData()
    }
  }
  addList(){
    var Answers={
      answerContent: "",
      recommendedScore: "",
      id: 0}
    var AnswersLength=this.userData.questionsAnswers.length
    if(AnswersLength==10){
      return
    }else{
      this.userData.questionsAnswers.push(Answers)
    }
  }

  DelAnswer(index){
    var AnswersLength=this.userData.questionsAnswers.length
    if(AnswersLength==2){
      return
    }else{
      this.userData.questionsAnswers.splice(index,1)
    }
  }

  searchType(){
    this.elLoading = true
    var typeId
    this.route.queryParams.subscribe((res: any) => {
        typeId=res.change
    })
    this.http.postData('/api/services/app/questionTypes/GetAll',{}).then((res)=>{
      this.elLoading = false
      if(res.error==null){
        if(res.result.status.code!=200){
          alert(res.result.status.message)
        }else{
          this.typeList=res.result.data
          if(typeId==0){
            this.userData.questionTypeId=this.typeList[0].questionTypeId
          }
        }
      }else{
        alert(res.error.message)
      }
    })

  }
  searchData(){
    this.elLoading = true
    this.http.getData("/api/services/app/questions/GetQuestionsById",this.search).then((res)=>{
      this.elLoading = false
      if(res.error==null){
        if(res.result.status.code!=200){
          alert(res.result.status.message)
        }else{
          this.userData=res.result.data
        }
      }else{
        alert(res.error.message)
      }
    })
  }
  saveUser(){
    var patt = /^[\s]*$/;
    var inputText
    this.userData.questionsAnswers.forEach((item,index) => {
      if(item.answerContent=="" || item.recommendedScore==""){
        inputText = false
      }else{
        inputText = true
      }
    });
    if(this.userData.questionCode==""){
      alert("please enter the correct Question ID")
      return false
    }
    if(this.userData.question==""){
      alert("please enter the correct Question")
      return false
    }
    if(!((this.userData.hasAnswer&&this.userData.isAnswerMandatory)|| (this.userData.hasFreeText&&this.userData.isFreeTextMandatory)|| (this.userData.hasSupportingDocument&&this.userData.isSupportingDocumentMandatory))){
      alert("please select the Mandatory")
      return false
    }else if(this.userData.hasAnswer&&this.userData.isAnswerMandatory&&!inputText){
      alert("please enter the answerContent or recommendedScore")
      return false
    }
    this.elLoading = true
    this.http.postData('/api/services/app/questions/InsertOrUpdate',this.userData).then((res)=>{
      this.elLoading = false
      if(res.error==null){
        if(res.result.status.code!=200){
          alert(res.result.status.message)
        }else{
          this.router.navigate(['/Questions'])
        }
      }else{
        alert(res.error.message)
      }
    })
  }

  ngOnInit(): void {
    this.userData.updateUser=localStorage.getItem('currentUser')
    this.searchType()
    this.route.queryParams.subscribe((res: any) => {
      this.search.id=res.id
      if(res.change==1){
        this.title="Question Info"
        this.changeId=1
        this.searchData()
      }else{
        this.title="Add Question"
        this.addList()
      }
    })
  }

}
