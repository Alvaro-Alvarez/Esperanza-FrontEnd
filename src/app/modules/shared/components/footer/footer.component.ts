import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() tabletResolution: boolean = false;
  linkedin: string = '';
  facebook: string = '';

  constructor() {
    this.linkedin = environment.linkedin;
    this.facebook = environment.facebook;
  }

  ngOnInit(): void {
  }
}
