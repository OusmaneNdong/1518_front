import { Component, Input, OnInit } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend1518';
  @Input() bdColor: string | undefined;


  ngOnInit(): void {
  }
  
}
function setOptions(arg0: { theme: string; themeVariant: string; }) {
  throw new Error('Function not implemented.');
}

