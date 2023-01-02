import { IUser } from './../../Models/iuser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('add') add!: ElementRef;
  existUserEmail!: string[];
  userRegFrm: FormGroup;
  constructor(private fb: FormBuilder) {
    // call from API emails
    this.existUserEmail = ['magdymagdy94.srag@gmail.com', 'aa@aa', 'bb@bb'];
    this.userRegFrm = fb.group(
      {
        //   fullName: new FormControl('', [
        //     Validators.required,
        //     Validators.pattern(/[A-Za-z]{4,}/),
        //   ]),
        //   email: new FormControl('',Validators.required),
        //   phoneNo: new FormControl(''),
        //   address: new FormGroup({
        //     city: new FormControl(''),
        //     postelCode: new FormControl(''),
        //     street: new FormControl(''),
        //   }),
        //   password: new FormControl('',Validators.required),
        //   conformPassword: new FormControl(''),

        fullName: [
          '',
          [Validators.required, Validators.pattern(/[A-Za-z]{4,}/)],
        ],
        email: [
          '',
          [Validators.required, this.existEmailValidator(this.existUserEmail)],
        ],
        // phoneNo: new FormArray([]),
        phoneNo: fb.array(['']),
        address: fb.group({
          city: [''],
          postelCode: [''],
          street: [''],
        }),
        password: ['', Validators.required],
        conformPassword: [''],
        referral: [''],
        referralOthers: [''],
      },
      { Validators: [this.passwordWatch()] }
    );
  }
  updateReferralValidator() {
    if (this.referral?.value == 'others') {
      this.userRegFrm.get('referralOthers')?.addValidators(Validators.required);
    } else {
      this.userRegFrm.get('referralOthers')?.clearValidators();
    }
    this.userRegFrm.get('referralOthers')?.updateValueAndValidity();
  }
  passwordWatch(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let passControl = control.get('password');
      let confirmPassControl = control.get('conformPassword');
      if (
        !(
          passControl ||
          confirmPassControl ||
          passControl!.value ||
          confirmPassControl!.value
        )
      ) {
        return null;
      }
      let validationError = {
        UnMatchedPassword: {
          pass: passControl?.value,
          confirm: confirmPassControl?.value,
        },
      };
      return passControl?.value == confirmPassControl?.value
        ? null
        : validationError;
    };
  }
  fillForm() {
    // this.userRegFrm.setValue({ // must  provide all properties
    //   fullName: 'formValidation',
    //   email: 'magdysrag94@gmail.com',
    //   phoneNo: '01274929279',
    //   address: {
    //     city: 'cairo',
    //     street:'kkk',
    //     postelCode: '1234',
    //   },
    //   password:'1234',
    //   conformPassword:'1234'
    // });

    this.userRegFrm.patchValue({
      // can  provide some properties
      fullName: 'formValidation20',
      email: 'magdymagdy.srag@gmail.com',
      // phoneNo: '0242440334',
      address: {
        city: 'cairo',
        postelCode: '1234',
      },
      password: '1234',
    });
    this.userRegFrm.get('fullName')?.setValue('test'); // set spacific variable
  }
  existEmailValidator(existEmails: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let emailVal: string = control.value;
      if (emailVal.length == 0 && control.untouched) {
        return null;
      }
      let validationError = { existEmail: { value: emailVal } };
      let foundEmail = existEmails.includes(emailVal);
      return foundEmail ? validationError : null;
    };
  }
  ngOnInit(): void {}
  get fullName() {
    return this.userRegFrm.get('fullName');
  }
  get referral() {
    return this.userRegFrm.get('referral');
  }
  get referralOthers() {
    return this.userRegFrm.get('referralOthers');
  }
  get phoneNumbers() {
    return this.userRegFrm.get('phoneNo') as FormArray;
  }
  get email() {
    return this.userRegFrm.get('email');
  }
  addPhone(e: any, i: number) {
    this.phoneNumbers.push(new FormControl(''));
    if (this.phoneNumbers.length > 1) {
      e.classList.add('d-none');
    }
  }
  removePhone(e: any, i: number, addButton: any) {
    console.log(this.phoneNumbers.length);
    if (this.phoneNumbers.length == 2) {
      this.add.nativeElement.classList.remove('d-none');
    }
    if (this.phoneNumbers.length - 1 == i) {
      console.log(this.phoneNumbers.controls[i]);
    }
    if (i != 0) {
      this.phoneNumbers.removeAt(i);
    }
  }
  submit() {
    let dataFromUser: IUser = <IUser>this.userRegFrm.value;
    console.log(dataFromUser);
  }
}
