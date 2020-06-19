import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../service/http-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.less']
})
export class HomepageComponent implements OnInit {

  // @ViewChild("image")image:any;
  public inspectLoginData: Array<any> = [
    {
      //由login傳值：
      "id": "3"
    }
  ];

  public inspectImage:any={
    "id" : 0
  }
  //加載
  public elLoading: any;

  public image: any;

  public keyword: Array<any> = [];

  public index:boolean = true;

  public inspect: Array<any> = [];

  public inspectPending: any =
    {
      "status": "Pending",
      "questionnaireName": "",
      "sorting": "",
      "skipCount": 0,
      "maxResultCount": 3
    };

  public inspectReviewing: any =
    {
      "status": "Reviewing",
      "questionnaireName": "",
      "sorting": "",
      "skipCount": 0,
      "maxResultCount": 3
    };

  public inspectFinished: any =
    {
      "status": "Finished",
      "questionnaireName": "",
      "sorting": "",
      "skipCount": 0,
      "maxResultCount": 3
    };

  //Question狀態及細節：
  public pendinglist: Array<any> = [];
  public reviewinglist: Array<any> = [];
  public finishedlist: Array<any> = [];

  //Question數量：
  public pendingQuestion: number;
  public reviewingQuestion: number;
  public finishedQuestion: number;


  //Search功能：
  inputPendingSearch(e) {
    if (e.keyCode == 13) {
      this.searchPendingInput();
    }
  }

  inputReviewingSearch(e) {
    if (e.keyCode == 13) {
      this.searchReviewingInput();
    }
  }

  inputFinishedSearch(e) {
    if (e.keyCode == 13) {
      this.searchFinishedInput();
    }
  }


  //PendingSearch：
  searchPendingInput() {
    this.elLoading = true;
    this.http.postData('/api/services/app/questionnaire/GetAll', this.inspectPending)
      .then(res => {
        if (res.error == null) {
          // this.pendinglist=[];
          this.pendinglist = res.result.data.items
          this.elLoading = false;
        } else {
          alert("服務器異常，請聯繫管理員")
        }
      })
  }
  //ReviewingSearch：
  searchReviewingInput() {
    this.elLoading = true;
    this.http.postData('/api/services/app/questionnaire/GetAll', this.inspectReviewing)
      .then(res => {
        if (res.error == null) {
          // this.pendinglist=[];
          this.reviewinglist = res.result.data.items
          this.elLoading = false;
        } else {
          alert("服務器異常，請聯繫管理員")
        }
      })
  }
  //FinishedSearch：
  searchFinishedInput() {
    this.elLoading = true;
    this.http.postData('/api/services/app/questionnaire/GetAll', this.inspectFinished)
      .then(res => {
        if (res.error == null) {
          // this.pendinglist=[];
          this.finishedlist = res.result.data.items
          this.elLoading = false;
        } else {
          alert("服務器異常，請聯繫管理員")
        }
      })
  }

  constructor(
    public http: HttpService,
    public router: Router,
    public route: ActivatedRoute
  ) { }


  ngOnInit(): void {

    this.elLoading = true;

    // image;
    this.http.postData("/api/services/app/user/GetProfileInfo", this.inspectImage)
      .then(res => {
        if (res.error == null) {
          let imageData = res.result.data.image;
          this.image = imageData;
          this.elLoading = false;
        } else {
          alert("服務器異常，請聯繫管理員")
        }
      })

    //getQuestionnaireStatusCount
    this.http.postData("/api/services/app/questionnaire/GetQuestionnaireStatusCount", this.inspect)
      .then(res => {
        if (res.error == null) {
          let questionFromServer = res.result.data;
          this.pendingQuestion = questionFromServer.pendingQuestionnaireCount;
          this.reviewingQuestion = questionFromServer.reviewingQuestionnaireCount;
          this.finishedQuestion = questionFromServer.finishedQuestionnaireCount;
          this.elLoading = false;
        } else {
          alert("服務器異常，請聯繫管理員")
        }
      })

    //getAllQuestionnaire

    //Pending Questionnaire：
    this.http.postData("/api/services/app/questionnaire/GetAll", this.inspectPending)
      .then(res => {
        if (res.error == null) {
          let questionType = res.result.data.items;
          this.pendinglist = questionType;
          this.elLoading = false;
        } else {
          alert("服務器異常，請聯繫管理員")
        }
      })
    //Reviewing Questionnaire：
    this.http.postData("/api/services/app/questionnaire/GetAll", this.inspectReviewing)
      .then(res => {
        if (res.error == null) {
          let questionType = res.result.data.items;
          this.reviewinglist = questionType;
          this.elLoading = false;
        } else {
          alert("服務器異常，請聯繫管理員")
        }
      })
    //Finished Questionnaire：
    this.http.postData("/api/services/app/questionnaire/GetAll", this.inspectFinished)
      .then(res => {
        if (res.error == null) {
          let questionType = res.result.data.items;
          this.finishedlist = questionType;
          this.elLoading = false;
        } else {
          alert("服務器異常，請聯繫管理員")
        }
      })
  }


  sortList(questionType) {
    if(this.index==true){
      this.ascList(questionType);
      this.index = false;
    }else{
      this.descList(questionType);
      this.index = true;
    }
  }

  ascList(questionType:any) {
    questionType = questionType.sort(function (a, b) {
      return a.submissionDeadline > b.submissionDeadline ? 1 : -1;
    })
  }
  descList(questionType:any) {
    questionType = questionType.sort(function (a, b) {
      return a.submissionDeadline < b.submissionDeadline ? 1 : -1;
    })
  }


}
