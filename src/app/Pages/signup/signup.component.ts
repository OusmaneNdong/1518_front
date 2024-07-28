import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/app/Servicess/utilisateur.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: any = FormGroup;
  responseMessage: any;
  nin: string = '';
  typenin!:string;
  legendText: string = "Prénom:";
  hidePassword: boolean = true;
  private helper = new JwtHelperService();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private utilisateurService: UtilisateurService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group(
      {
        prenom: [null, [Validators.required]],
        nom: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        confirmemail: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        confirmpassword: [null, [Validators.required]],
        nin: [null, [Validators.required]],
      },
      {
        validators: [this.matchValidator('password', 'confirmpassword'), this.matchValidator('email', 'confirmemail')],
      }
    );
    this.signupForm.get('nin')?.valueChanges.subscribe(() => this.updateNinValidators());
  

    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    if (signUpButton && container) {
      signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
      });
    }

    if (signInButton && container) {
      signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
      });
    }
  }

  openSpinner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
  }, 1000);
  }

  matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const controlToMatch = control.get(controlName);
      const matchingControl = control.get(matchingControlName);

      if (!controlToMatch || !matchingControl) {
        return null;
      }

      if (matchingControl.errors && !matchingControl.errors['matching']) {
        return null;
      }

      if (controlToMatch.value !== matchingControl.value) {
        matchingControl.setErrors({ matching: true });
        return { matching: true };
      } else {
        matchingControl.setErrors(null);
        return null;
      }
    };
  }

  updateNinValidators() {
    const ninControl = this.signupForm.get('nin');
    if (this.typenin === 'nin') {
      ninControl?.setValidators([Validators.required, Validators.maxLength(14)]);
    } else if (this.typenin === 'passeport') {
      ninControl?.setValidators([Validators.required, Validators.maxLength(9), Validators.pattern('^[a-zA-Z0-9]*$')]);
    } else {
      ninControl?.clearValidators();
    }
    ninControl?.updateValueAndValidity();
  }

  onTypeChange(event: any) {
    this.updateNinValidators();
  }

  handleSubmit() {
    if (this.signupForm.invalid) {
      return;
    }

    const formData = this.signupForm.value;
    const data = {
      prenom: formData.prenom,
      nom: formData.nom,
      email: formData.email,
      confirmemail: formData.confirmemail,
      password: formData.password,
      confirmpassword: formData.confirmpassword,
      nin: formData.nin,
    };

    this.utilisateurService.signUp(data).subscribe({
      next:(data)=>{
        this.router.navigate(['/connecter']); 
      },
      error:(err:any)=>{
        if (err.error.errorMessage==='EMAIL_EXIST') {
          Swal.fire({
            position: "center",
            icon: 'error',
            title: 'Inscription',
            text: 'Cet email existe deja',
          })
        }
        if (err.error.errorMessage==='NIN_EXIST') {
          Swal.fire({
            position: "center",
            icon: 'error',
            title: 'Inscription',
            text: 'Cet identifiant existe deja',
          })
        }
        if (err.error.errorMessage==='EMAIL_NIN_EXIST') {
          Swal.fire({
            position: "center",
            icon: 'error',
            title: 'Inscription',
            text: 'Email et identifiant existe deja',
          })
        }
      }
    })


  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  get f(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }
}
