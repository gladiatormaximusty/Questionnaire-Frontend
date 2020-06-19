import { promises } from "dns"
import { get } from "http"

Angular笔记

  // 声明属性

  // public  公共   可以在这个类使用，也可以在类外面使用

  // private 私有    只可以在当前类访问这个属性

  // protected 保护    只可以在当前类及子类使用

  //*ngSwitch  多重判断
  //*ngSwitchCase  不满足条件就跳过
  //*ngSwitchDefault  默认

管道-常用管道

// 例：{ { 2010-10-10 | date:'yyyy-MM-dd'}}
// uppercase   转换成大写
// lowercase   转换成小写
// date        日期格式转换
// number      小位数格式为'最少整数位数.最少小数位数-最多小数位数'   number:'1.2-4'
// json        js对象序列化
// slice

表单事件


    // (keydown) = "function( $even )"   监听input键盘输入
    // function(e){ console.log(e) } 获取按了那个键位    e.target   获取当前对象（可用来获取dom节点做操作）   e.targer.value获取当前对象的值
    // splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
    // indexof()   判断字符串值是否存在，不存在未-1

创建服务--相当于js 的封包闭包，公共方法
// 1.ng g service services / storage
// 2.在app.module.ts 引入服务
// 3.需要用到该服务的组件import引用
// 4.constructor ( public storage: StroageService ) { }  通过构造函数来使用该服务

数据持久化
// 将数据保存在localStorage里，页面刷新在读取，实现缓存机制   token一样


生命周期函数

// ngAfterViewInit 在组件视图初始化渲染完成后调用ngAfterContentInit。仅适用于组件。  dom操作放在这里
// ngOnInit   在组件视图初始化加载时调用，一般用去请求数据
// ngOnChanges  数据改变时调用，调用发生在ngOnInit之前，可用于监听双向绑定input值的变化等
// ngOnDestroy  组件销毁 防止内存泄露
// ngDoCheck,ngAfterViewChecked,ngAfterContentChecked只要数据发生改变就会触发

ViewChild  获取dom节点进行操作
// 1.import { ViewChild } from '@angular/core';  组件中引入ViewChild模块
// 2.在需要的操作的html dom节点 上增加 #myapp
// 3.在ts文件中声明 @ViewChild('myapp') myapp:any  获取dom节点
// 4.在ngAfterViewInit 使用 this.myapp.nativeElement 对dom节点进行操作


子组件向父组件传方法，数据的两种方法
1.使用ViewChild  （常用）
// 1.import { ViewChild } from '@angular/core';  父组件中引入ViewChild模块
// 2.在父组件html中引用子组件并增加 #new   <app-new #new></app-new>
// 3.在父组件中@ViewChild('new') new:any
// 4.使用 this.new.get()   调用到子组件的get方法  使用 this.new.msg  获取到子组件的msg数据

2.使用Output 和EvenEmitter事件驱动 （比较复杂）
// 1.import { 使用Output,和EvenEmitter } from '@angular/core';  子组件引入
// 2.@Output() private outer = EvenEmitter<string>();  子组件实例化和EvenEmitter
// 3.this.outer.emit('我是子组件数据')   向父组件传数据    父组件创建run(e) {}方法
// 4.在父组件html中引用子组件  <app-new (outer)="run($even)"></app-new> 可以调用到父组件的方法
// 5.run(e){ conlose.log(e)} 就可以获取到子组件的数据


// 1.mport { Input } from '@angular/core';  组件中引入Input模块
父组件向子组件传值
// 1.mport { Input } from '@angular/core';  子组件中引入Input模块
// 2.父组件ts public title:any="我是一个标题"
// 3.父组件html中的引用子组件模块中传入 <app-new [title]="title"></app-new>
// 4. @Input() title:any  接收父组件传过来的数据

父组件向子组件传方法
// 1.mport { Input } from '@angular/core';  子组件中引入Input模块
// 2.父组件ts run() 方法
// 3.父组件html中的引用子组件模块中传入 <app-new [run]="run"></app-new>
// 4. @Input() run:any  接收父组件传过来的方法
// 5. this.run()调用

将整个父组件传给子组件
// 1.mport { Input } from '@angular/core';  子组件中引入Input模块
// 2.父组件html中的引用子组件模块中传入 <app-new [xxx]="this"></app-new>
// 3. @Input() xxx:any  接收父组件
// 4. this.xxx()调用父组件的任意数据方法

非父子组件可以用服务进行传值 或者localStorage


RxJS 入门

// 回调函数
// run( (data) => { } )  传入一个方法
// promise   job1.then(job2).then(job3).catch(handleError);   ES6

RxJS
// 1.import { observable } from 'rxjs';
// observable

// filter  数据过滤
// map

跨域问题
// 1.创建代理配置文件proxy.conf.json
// {
//     "/api": {
//         "target": "http://13.250.190.214:4200",
//             "secure": false,
//                 "changeOrigin": true
//     }
// }
// 2.改写package.json
// start": "ng serven".改为
// start": "ng serve--proxy - config proxy.conf.json".
// 3.运行 npm start

http请求
// 1.app.module.ts  引入import { HttpClientModule } from '@angular/common/http'; 注入HttpClientModule,
// 2.组件中引入import { HttpClient, HttpHeaders } from "@angular/common/http";
// 3.constructor(public https: HttpClient) {} 构造函数
// 4.开始进行请求
// this.https.get('http://13.250.190.214:4200/api/api/services/app/account/Login', this.postData).subscribe((res: any) => {
//     console.log(res)
// })

// const Httpheader: any = { herders: new HttpHeaders({ "Content- Type": "application / json" }) }
// this.https.post('http://13.250.190.214:4200/api/api/services/app/account/Login', this.postData, Httpheader).subscribe((res: any) => {
//     console.log(res)
// })

RXJS对象需要.subscribe  重点

路由
// routerLink  路由自带的选中状态
routerLink传值
// 方法1：<a [routerLink]="[ '/ForgetPassword' ]" [queryParams]="{id:key}"> FORGET YOUR PASSWORD</a>
// <a [routerLink]="[ '/ForgetPassword'，key ]" > FORGET YOUR PASSWORD</a>
获取get传值
// 1.import { ActivatedRoute } from '@angular/router';
// 2.constructor(public route: ActivatedRoute) {} 声明构造函数
// 3.this.route.queryParams.subscribe((res: any) => {
//     console.log(res)
// })   调用

获取动态路由传值
// <a [routerLink]="[ '/ForgetPassword/', key ]"> FORGET YOUR PASSWORD</a>

// 1.import { ActivatedRoute } from '@angular/router';
// 2.constructor(public route: ActivatedRoute) {} 声明构造函数
// 3.this.route.Params.subscribe((res: any) => {
//     console.log(res)
// })   调用

js路由跳转
// 1.import { Router } from '@angular/router';
// 2.constructor(public router: Router) {} 声明构造函数
// 3.this.router.navigate(['/login/','key']);
//   this.router.navigate(['/login']);

跳转并get传值
// 1. import { NavigationExtras } from '@angular/router';  可引用可不引，但是一定要引入Router
// 2.  let queryParams:any={
//         queryParams: { "id":123}
//      }
// 3. this.router.navigate(['/login'],queryParams)



自定义模块组件化挂载
// ng g moudle moudle/user
// ng g component moudle/user
// import { userComponent } from './user.component';//根组件
// exports: [userModule]
路由懒加载
// ng g moudle moudle/user --routing
// ng g component moudle/user
// import { userComponent } from './user.component';//根组件
// exports: [userModule]
// 在user-routing-moudle.ts中配置  {path:'user',loadChildren:'./moudle/user/.moudle#usermoudle'}
// 所有子路由的子组件模块在routing里面配置实现懒加载
