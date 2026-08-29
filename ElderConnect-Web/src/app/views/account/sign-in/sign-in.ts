import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/user/auth';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css'
})

export class SignIn implements OnInit{

  email = new FormControl ('',[Validators.required, Validators.email]);
  password = new FormControl('',[Validators.required])


  private authService = inject(AuthService); // Nome correto: authService
  private router = inject(Router);

  ngOnInit(): void {
    
  }


  validateFields(): boolean {
    return this.email.valid && this.password.valid;
  }


  logar(event: Event) {
    event.preventDefault();

    
    if (!this.validateFields()) {
      alert('Por favor, informe um e-mail válido e preencha a senha.');
      return;
    }

    const emailValue = this.email.value || '';

   
    this.authService.logar();

    
    if (emailValue.toLowerCase().includes('cuidador')) {
      this.router.navigate(['/dashboard/caregiver']);
    } else {
      this.router.navigate(['/dashboard/elder']);
    }
  }
}


