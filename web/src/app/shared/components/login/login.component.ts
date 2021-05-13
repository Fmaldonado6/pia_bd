import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';

interface FormData {
  numEpleado: string
  password: string
}

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authService: AuthService
  ) {
    this.loginForm = new FormGroup({
      numEmpleado: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit(): void {

  }

  login(value: FormData) {
    let username = value.numEpleado
    let password = value.password

  }

}
