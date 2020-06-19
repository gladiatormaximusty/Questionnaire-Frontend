import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http-service';//封装的http请求
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-eiq',
  templateUrl: './eiq.component.html',
  styleUrls: ['./eiq.component.less']
})
export class EIQComponent implements OnInit {
  public pageShow:any=false
  public elLoading:any
  public TypeData:any
  public EntityData:any
  public questionData:any={
      "hasBeenAnsweredCount": 0,
      "questionCount": 0,
      "isReadOnly": true,
      "questionnaire": [
        {
          "questionnairesAsignId": 0,
          "questionId": 0,
          "questionCode": "",
          "question": "",
          "answers": [
            {
              "answerContent": "",
              "isSeleted": true,
              "id": 0
            }
          ],
          "selectedAnswerId": 0,
          "freeTextPlaceholder": "",
          "freeText": "",
          "supportingDocument": [
            {
              "name": "",
              "pathUrl": "",
              "id": 0
            }
          ],
          "hasAnswer": true,
          "isAnswerMandatory": true,
          "hasFreeText": true,
          "isFreeTextMandatory": true,
          "isFreeTextNumeric": true,
          "hasSupportingDocument": true,
          "isSupportingDocumentMandatory": true,
          "hasBeenAnswered": true
        }
      ]
    }
  public questionTypeName:any
  public Search:any={
    "questionnaireId": 0,
    "entitiesId": 0,
    "questionTypeId": 0,
    "buId": 0
  }
  public typeIndex:any
  public entityIndex:any
  public File:any
  constructor(
    public http:HttpService,
    public router:Router,
    public route: ActivatedRoute) { }

  // 滑動參數
  public index:any=0
  public move:any=0
  public maxMove:any
  public marquee:any
  public WidthArry=new Array
  public imagesTX:any
  public QuestionNumber:any=0
  public percentage:any=0
  // 左滑
  leftClick(){
    if(this.index==0){
      return
    }else{
      this.index--
      this.move=this.move-this.WidthArry[this.index]
      if(this.move>this.maxMove){
        this.marquee.style.transform="translateX("+-this.maxMove+"px)"
      }else{
        this.marquee.style.transform="translateX("+-this.move+"px)"
      }
      this.marquee.style.transition="transform.4s ease-in-out"
    }
  }
  // 右滑
  rightClick(){
      if(this.move>this.maxMove){
        // this.marquee.style.transform="translateX("+-this.maxMove+"px)"
        // this.marquee.style.transition="transform.4s ease-in-out"
        return
      }else{
        this.move=this.move+this.WidthArry[this.index]
        this.marquee.style.transform="translateX("+-this.move+"px)"
        this.marquee.style.transition="transform.4s ease-in-out"
      }
      // document.querySelectorAll("#marquee span")[this.index].classList.remove("active")
      this.index++
      // document.querySelectorAll("#marquee span")[this.index].classList.add("active")
  }
  fileChange(event,key){
    var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
	      regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
    this.File=event.target.files[0]
    console.log(this.File.name.replace(".",''))
    if(regEn.test(this.File.name.replace(".",''))||regCn.test(this.File.name.replace(".",''))){
      alert("Do not upload pictures with special characters")
      return
    }
    var size=(this.File.size / 1024).toFixed(0)
    if(Number(size) >20480){
      alert("The upload file cannot be larger than 20M")
      return
    }

    this.elLoading=true
    var formData:FormData=new FormData()
    formData.append('File',this.File)

    this.http.flierData("/api/services/app/common/UploadAccessory",formData).then((res)=>{
      this.elLoading = false
      if(res.error==null){
        if(res.result.status.code!=200){
          alert(res.result.status.message)
        }else{
          var nowFileData={
            "id":0,
            "pathUrl":"",
            "name":""
          }
          nowFileData.pathUrl=res.result.data

          var name=res.result.data
          var index =name.lastIndexOf("\/");
          name  = name.substring(index + 1, name.length);
          nowFileData.name=name

          this.questionData.questionnaire[key].supportingDocument.push(nowFileData)
          event.target.value=""
          this.changeStat()
        }
      }else{
        alert(res.error.message)
      }
    })
    this.changeStat()
  }

  typeSearch(){
    this.elLoading=true
    this.http.postData('/api/services/app/myQuestionnaire/GetQuestionnaireQuestionType',this.Search).then((res)=>{
      this.elLoading=false
      if(res.error==null){
        if(res.result.status.code!=200){
          alert(res.result.status.message)
        }else{
          this.TypeData=res.result.data
          this.typeClick(this.TypeData[0].id, 0, this.TypeData[0].questionTypeName)
        }
      }else{
        alert(res.error.message)
      }
    })
  }

  typeClick(id,index,name){
    this.Search.questionTypeId=id
    this.typeIndex = index;
    this.elLoading=true
    this.questionTypeName=name
    this.EntitySearch()
  }

  EntitySearch(){
    this.http.postData('/api/services/app/myQuestionnaire/GetQuestionnaireEntity',this.Search).then((res)=>{
      this.elLoading=false
      if(res.error==null){
        if(res.result.status.code!=200){
          alert(res.result.status.message)
        }else{
          this.EntityData=res.result.data
          this.EntityClick(this.EntityData[0].id,0)
        }
      }else{
        alert(res.error.message)
      }
    })
  }

  EntityClick(id,index){
    this.Search.entitiesId=id
    this.entityIndex = index;
    this.elLoading=true
    this.questionSearch()
  }

  questionSearch(){
    this.percentage=0
    this.http.postData('/api/services/app/myQuestionnaire/GetQuestionnaireInfo',this.Search).then((res)=>{
      this.elLoading=false
      if(res.error==null){
        if(res.result.status.code!=200){
          alert(res.result.status.message)
        }else{
          this.questionData=res.result.data
          this.questionData.questionnaire.forEach((item)=>{
            item.iswarn = false
            // item.selectedAnswer=item.answers[0].id
          })
          this.changeStat()

          this.marquee = document.getElementById("marquee")
          var middleW = document.getElementById("marqueeContent").offsetWidth
          this.maxMove = this.marquee.offsetWidth - middleW

          document.querySelectorAll("#marquee span").forEach((item) => {
            this.WidthArry.push(item.clientWidth)
          })
          this.route.queryParams.subscribe((res: any) => {
            if(res.isReadOnly==0){
              this.questionData.isReadOnly=true
            }
          })
        }
      }else{
        alert(res.error.message)
      }
    })

  }

  changeStat(){
    this.QuestionNumber=0
    // var num=/^[0-9]*$/
    this.questionData.questionnaire.forEach((item)=>{
      var integral =1
      if(item.hasAnswer){
        if(item.isAnswerMandatory){
          if (item.selectedAnswerId){
            integral++
          }
        }else{
          integral++
        }
      }else{integral++}
      if(item.hasFreeText){
        if(item.isFreeTextMandatory){
          // if(item.isFreeTextNumeric){
          //   if(item.freeText && num.test(item.freeText)){
          //     integral++
          //   }
          // }else if(item.freeText){
          //   integral++
          // }
          if(item.freeText){
            integral++
          }
        }else{
          integral++
        }
      }else{integral++}
      if(item.hasSupportingDocument){
        if(item.isSupportingDocumentMandatory){
          if(item.supportingDocument.length!=0){
            integral++
          }
        }else{
          integral++
        }
      }else{integral++}
      if(integral==4){
        this.QuestionNumber++
        item.iswarn = false
      }else{
        item.iswarn = true
      }
      if (this.QuestionNumber != 0) {
        this.percentage = (this.QuestionNumber / this.questionData.questionCount) * 100
      }
    })
  }

  downloadFile(key,index){
    window.open(this.questionData.questionnaire[key].supportingDocument[index].pathUrl)
  }

  delFile(key,index){
    this.questionData.questionnaire[key].supportingDocument.splice(index, 1)
    this.changeStat()
  }

  SaveData(){
    // if( this.questionData.isReadOnly){
    //   alert("This is a read-only file")
    //   return
    // }
    // var data=this.questionData.questionnaire
    // for (let i = 0; i < data.length; i++){
    //   if (data[i].hasAnswer) {
    //     if (data[i].isAnswerMandatory) {
    //       if (!data[i].selectedAnswerId ) {
    //         data[i].iswarn = true
    //         // alert("There are still problems to be solved")
    //         return
    //       } else {
    //         data[i].iswarn = false
    //       }
    //     }
    //   }
    //   if (data[i].hasFreeText) {
    //     if (data[i].isFreeTextMandatory) {
    //       if (!data[i].freeText) {
    //         data[i].iswarn = true
    //         return
    //       } else {
    //         data[i].iswarn = false
    //       }
    //       if (data[i].isFreeTextNumeric) {
    //         var num = /^[0-9]*$/
    //         if (!num.test(data[i].freeText)) {
    //           data[i].iswarn = true
    //           return
    //         } else {
    //           data[i].iswarn = false
    //         }
    //       }
    //     }else{
    //       if (data[i].freeText) {
    //         if (data[i].isFreeTextNumeric) {
    //           var num = /^[0-9]*$/
    //           if (!num.test(data[i].freeText)) {
    //             data[i].iswarn = true
    //             return
    //           } else {
    //             data[i].iswarn = false
    //           }
    //         }
    //       }
    //     }
    //   }
    //   if (data[i].hasSupportingDocument) {
    //     if (data[i].isSupportingDocumentMandatory) {
    //       if (data[i].supportingDocument.length == 0) {
    //         data[i].iswarn = true
    //         // alert("There are still problems to be solved")
    //         return
    //       } else {
    //         data[i].iswarn = false
    //       }
    //     }
    //   }
    // }
    this.elLoading=true
    this.http.postData('/api/services/app/myQuestionnaire/UpdateMyQuestionnaire',this.questionData.questionnaire).then((res)=>{
      this.elLoading=false
      if(res.error==null){
        if(res.result.status.code!=200){
          alert(res.result.status.message)
        }else{
          this.router.navigate(['/MyQuestions']);
        }
      }else{
        alert(res.error.message)
      }
    })
  }

  ngOnInit(): void {


    this.imagesTX=localStorage.getItem('image')
    this.route.queryParams.subscribe((res: any) => {
        this.Search.questionnaireId=Number(res.id)
    })
    this.typeSearch()
  }


}
