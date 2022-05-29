import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/modules/shared/services/form.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formService: FormService
  ) {
    this.loginForm = this.formService.getFormLogin();
  }

  ngOnInit(): void {
  }
  login(){
    
  }
}
