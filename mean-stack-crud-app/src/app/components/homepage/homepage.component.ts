import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  
  constructor() { 
    this.loadScripts(); 
  }
  
  loadScripts() { 
  
    // This array contains all the files/CDNs 
    const dynamicScripts = [ 
       '../../../assets/js/jquery.backstretch.min.js',
       '../../../assets/js/bootstrap.min.js',
       '../../../assets/js/templatemo-script.js',
       '../../../assests/js/jquery-3.4.1.min.js'
    ]; 
    for (let i = 0; i < dynamicScripts.length; i++) { 
      const node = document.createElement('script'); 
      node.src = dynamicScripts[i]; 
      node.type = 'text/javascript'; 
      node.async = false; 
      document.getElementsByTagName('head')[0].appendChild(node); 
    } 
 } 
  ngOnInit(): void {
    this.loadScripts(); 
    
  }

}
