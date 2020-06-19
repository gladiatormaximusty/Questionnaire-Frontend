import { BrowserModule } from '@angular/platform-browser';//浏览器解析模块
import { NgModule } from '@angular/core';//angular核心模块

import { AppComponent } from './app.component';//根组件
import { FormsModule } from '@angular/forms';//雙向綁定模塊
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpService } from './service/http-service';
import { StroageService } from './service/stroage'; //引用服务
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AuthGuard} from './service/auth.guard';
// import { HttpInterceptorService } from './service/http.interceptor';

import { ElModule } from 'element-angular'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { EntitiesComponent } from './entities/entities.component';
import { BUsComponent } from './bus/bus.component';
import { UsersComponent } from './users/users.component';
import { QuestionTypesComponent } from './question-types/question-types.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionnairesComponent } from './questionnaires/questionnaires.component';
import { ControlRiskComponent } from './control-risk/control-risk.component';
import { NewQuestionnaireComponent } from './new-questionnaire/new-questionnaire.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { QuestionInfoComponent } from './question-info/question-info.component';
import { QuestionTypeInfoComponent } from './question-type-info/question-type-info.component';
import { AddQuestionTypeComponent } from './add-question-type/add-question-type.component';
import { SupportingDocumentComponent } from './supporting-document/supporting-document.component';
import { EIQComponent } from './eiq/eiq.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { NewPassWordComponent } from './new-pass-word/new-pass-word.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { MyQuestionsComponent } from './my-questions/my-questions.component';
import { ProfileInformationComponent } from './profile-information/profile-information.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ProfileInformationPersonalComponent } from './profile-information-personal/profile-information-personal.component';

const routes: Routes = [
  { path: '', redirectTo: 'Homepage', pathMatch: 'full' },// 匹配空link如：www.baidu.com/，重定向到登陆页面www.baidu.com/login
  { path: '', component: MenuComponent,canActivate:[AuthGuard],children:[
    { path: 'Homepage', component: HomepageComponent },
    { path: 'Entities', component: EntitiesComponent },
    { path: 'BUs', component: BUsComponent },
    { path: 'Users', component: UsersComponent },
    { path: 'QuestionTypes', component: QuestionTypesComponent },
    { path: 'Questions', component: QuestionsComponent },
    { path: 'Questionnaires', component: QuestionnairesComponent },
    { path: 'Questionnaires/ControlRisk', component: ControlRiskComponent },
    { path: 'Questionnaires/NewQuestionnaire', component: NewQuestionnaireComponent },
    { path: 'Users/UserInfo', component: UserInfoComponent },
    { path: 'Questions/QuestionInfo', component: QuestionInfoComponent },
    { path: 'QuestionTypes/QuestionTypeInfo', component: QuestionTypeInfoComponent },
    { path: 'QuestionTypes/AddQuestionType', component: AddQuestionTypeComponent },
    { path: 'Questionnaires/ControlRisk/SupportingDocument', component: SupportingDocumentComponent },
    { path: 'ProfileInformation', component: ProfileInformationComponent }
  ] },
  { path: 'EIQ', component: EIQComponent,canActivate:[AuthGuard] },
  { path: 'Login', component: LoginComponent },
  { path: 'NewPassWord', component: NewPassWordComponent },
  { path: 'ForgetPassword', component: ForgetPasswordComponent },
  { path: 'MyQuestions', component: MyQuestionsComponent ,canActivate:[AuthGuard]},
  { path: 'PasswordReset', component: PasswordResetComponent,canActivate:[AuthGuard] },
  { path: 'ProfileInformationPersonal', component: ProfileInformationPersonalComponent,canActivate:[AuthGuard] }
  // { path: '**', redirectTo: 'Login' }//任意link匹配不到，跳转到login，一定要写在最后
]

@NgModule({//@NgModule装饰器，@NgModule接受一个元数据对象，告诉Angular如何编译启动
  declarations: [//配置当前项目运行的组件
    AppComponent,
    HomepageComponent,
    EntitiesComponent,
    BUsComponent,
    UsersComponent,
    QuestionTypesComponent,
    QuestionsComponent,
    QuestionnairesComponent,
    ControlRiskComponent,
    NewQuestionnaireComponent,
    UserInfoComponent,
    QuestionInfoComponent,
    QuestionTypeInfoComponent,
    AddQuestionTypeComponent,
    SupportingDocumentComponent,
    EIQComponent,
    MenuComponent,
    LoginComponent,
    NewPassWordComponent,
    ForgetPasswordComponent,
    MyQuestionsComponent,
    ProfileInformationComponent,
    PasswordResetComponent,
    ProfileInformationPersonalComponent,
  ],
  imports: [//配置当前运行依赖的其他木块
    BrowserModule,
    ElModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(routes,{useHash:true}),
    HttpClientModule,
  ],
  providers: [
    HttpService,
    StroageService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    // { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService,multi: true }
   ],//配置所需要的的服务
  bootstrap: [AppComponent],//指定应用的主视图，通过引导根AppComponent来启动应用
  exports: [RouterModule]
})
export class AppModule { }//暴露模块
