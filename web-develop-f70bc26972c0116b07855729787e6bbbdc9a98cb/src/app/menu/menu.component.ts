  import { Component, OnInit ,ViewChild} from '@angular/core';

  import { ActivatedRoute, Router, NavigationStart, NavigationEnd} from '@angular/router';

  @Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.less']
  })
  export class MenuComponent implements OnInit {

    title = 'my-app';
    showFiller = true;
    nowIndex = 0;
    public imagesTX:any


    public navigation:Array<any>=[ //ts写法定义数组类型为any或者写为:any[]
      {name:'Homepage',link:'/Homepage',images:'../assets/images/ic_home.svg', activeImg:'../assets/images/ic_home_b.svg'},
      {name:'Entities',link:'/Entities',images:'../assets/images/ic_entities.svg', activeImg:'../assets/images/ic_entities_b.svg'},
      {name:'BUs',link:'/BUs',images:'../assets/images/ic_BUs.svg', activeImg:'../assets/images/ic_BUs_b.svg'},
      {name:'Users',link:'/Users',images:'../assets/images/ic_users.svg', activeImg:'../assets/images/ic_users_b.svg'},
      {name:'QuestionTypes',link:'/QuestionTypes',images:'../assets/images/ic_Qt.svg', activeImg:'../assets/images/ic_Qt_b.svg'},
      {name:'Questions',link:'/Questions',images:'../assets/images/ic_questions.svg', activeImg:'../assets/images/ic_questions_b.svg'},
      {name:'Questionnaires',link:'/Questionnaires',images:'../assets/images/ic_questionnaires.svg', activeImg:'../assets/images/ic_questionnaires_b.svg'},
    ]

    share(){
      if(this.showFiller){
        this.showFiller=false
      }else{
        this.showFiller=true
      }
    }
    routerTo(index){
      this.nowIndex = index;
    }
    constructor(
      private route: ActivatedRoute,
      private router: Router
    ) {}
    ngAfterViewInit(): void {
    }
    ngOnInit(): void {
      this.router.events.subscribe(e => {
        if (e instanceof NavigationStart) {
          this.imagesTX = localStorage.getItem('image')
        }
        if (e instanceof NavigationEnd) {
          this.imagesTX = localStorage.getItem('image')
          this.navigation.forEach((item,index)=>{
            if(this.router.url.indexOf(item.link)!=-1){
              this.nowIndex = index;
            }
          })
        }
      })
      this.imagesTX=localStorage.getItem('image')
    }

  }
