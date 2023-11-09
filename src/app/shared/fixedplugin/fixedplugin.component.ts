import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'fixedplugin-cmp',
    templateUrl: 'fixedplugin.component.html'
})

export class FixedPluginComponent implements OnInit{

  public sidebarColor: string = "white";
  public sidebarActiveColor: string = "success";

  public state: boolean = true;

  changeSidebarColor(color: string){
    var sidebar = <HTMLElement>document.querySelector('.sidebar');

    this.sidebarColor = color;
    if(sidebar != undefined){
        sidebar.setAttribute('data-color',color);
    }
  }
  changeSidebarActiveColor(color: string){
    var sidebar = <HTMLElement>document.querySelector('.sidebar');
    color = 'success';
    this.sidebarActiveColor = color;
    if(sidebar != undefined){
        sidebar.setAttribute('data-active-color', 'success');
    }
  }
  ngOnInit(){}
}
