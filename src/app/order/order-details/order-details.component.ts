import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/app-services/user.service';
import {CustomValidators} from '../../signup/custom-validators';
import {User} from '../../shared/models/user';
import {Adress} from '../../shared/models/adress';
import {ValidateFn} from 'codelyzer/walkerFactory/walkerFn';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  styles: [`
    input, textarea, textarea.ng-pristine {
      border: 1px solid rgba(0, 44, 64, .3);
    }

    input.ng-valid, textarea.ng-dirty {
      border: 1px solid rgba(0, 44, 64, 1);
    }

    input.ng-touched.ng-invalid, select.ng-touched.ng-pristine {
      border: solid red 1px;
      /*border-left: solid red 6px;*/
    }
  `],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ])
  ]
})
export class OrderDetailsComponent implements OnInit {

  constructor(private fb: FormBuilder) {
  }

  @Input()
  buyerContactsForm: FormGroup;

  deliveryAdressForm: FormGroup;
  buyerContacts: User;
  userComment: string;
  deliveryAdress: Adress;
  isBuyerContactsFormValid = false;
  isDeliveryAdressFormValid = false;

  ngOnInit() {
    this.initBuyerContactsForm();
    this.initDeliveryAdressForm();

    this.buyerContactsForm.controls.userComment.valueChanges.subscribe(value => {
      if (value === '') {
        this.buyerContactsForm.get('userComment').markAsPristine();
      }
    });

  }

  private initBuyerContactsForm() {
    this.buyerContactsForm = this.fb.group({
        userFirstName: new FormControl('', [
          Validators.required,
          Validators.pattern('^([A-Za-zА-Яа-яІіЇїЄє]+(\\\'|\\-|\\.?\\s))*[A-Za-zА-Яа-яІіЇїЄє]+$'),
          CustomValidators.sizeValidator(2, 30, {size: true}),
        ]),
        userLastName: new FormControl('', [
          Validators.required,
          Validators.pattern('^([A-Za-zА-Яа-яІіЇїЄє]+(\\\'|\\-|\\.?\\s))*[A-Za-zА-Яа-яІіЇїЄє]+$'),
          CustomValidators.sizeValidator(2, 30, {size: true}),

        ]),
        userEmail: new FormControl('', [
          Validators.required,
          Validators.email
          // Validators.pattern('[a-zA-Z_]+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}')
        ]),
        userPhones: new FormArray([new FormControl('', [
          Validators.required,
          Validators.pattern('((?:\\+|00)[17](?: |\\-)?|(?:\\+|00)[1-9]\\d{0,2}(?: |\\-)?|(?:\\+|00)1\\-\\d{3}(?: |\\-)?)?(0\\d|\\([0-9]{3}\\)|[1-9]{0,3})(?:((?: |\\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: ?|\\-?)[0-9]{3}(?: ?|\\-?)[0-9]{7})|([0-9]{7}))')])]),
        // userSource: new FormControl('', Validators.required),
        userComment: new FormControl(''),

      },
    );
  }

  private initDeliveryAdressForm() {
    this.deliveryAdressForm = this.fb.group({

        adress: new FormControl('store', [
          Validators.required
        ]),
        settlement: new FormControl('', [
          Validators.required,
          Validators.minLength(2)
        ]),
        branch: new FormControl('', [Validators.required]),
      },
    );
  }

  private checkBuyerContactsFormValid(form: FormGroup) {
    if (form.valid) {
      return true;
    } else {
      return false;
    }
  }

  hasError(form: FormGroup, controlName: string, error: string): boolean {
    const control = form.get(controlName);

    return (control.touched || control.dirty) && control.hasError(error);
  }

  // private isControlRequired(form: FormGroup, controlName: string): boolean {
  //   const control = form.controls[controlName];
  //
  //   const result = control.touched && control.hasError('required');
  //
  //   return result;
  // }

  private isControlPatterned(form: FormGroup, controlName: string): boolean {
    const control = form.controls[controlName];

    const result = control.dirty && control.hasError('pattern');

    return result;
  }

  private isControlEmpty(controlName: string): boolean {
    const control = this.buyerContactsForm.controls[controlName];

    const result = control.value === '';

    return result;
  }

  private checker(form: FormGroup, controlName: string): string {
    if (form.controls[controlName].valid) {
      return 'is-valid';
    } else if (form.controls[controlName].touched && form.controls[controlName].invalid) {
      return 'is-invalid';
    } else {
      return 'is-default';
    }
  }

  private makeOrder() {

    const user: User = {
      firstName: this.buyerContactsForm.controls.userFirstName.value,
      lastName: this.buyerContactsForm.controls.userLastName.value,
      email: this.buyerContactsForm.controls.userEmail.value,
      phone: this.buyerContactsForm.controls.userPhones.value[0],
      // source: this.signupForm.controls.userSource.value
    };

    let adress: Adress;
    if (this.deliveryAdressForm.controls.adress.value === 'novaPoshta') {
      adress = {
        settlement: this.deliveryAdressForm.controls.settlement.value,
        branch: this.deliveryAdressForm.controls.branch.value
      };
    } else {
      adress = {
        settlement: '',
        branch: ''
      };
    }

    this.buyerContacts = user;
    this.userComment = this.buyerContactsForm.controls.userComment.value;
    this.deliveryAdress = adress;

    console.log('USERCOMMENT EXISTS!!!', this.buyerContactsForm.controls.userComment.value);
    console.log(JSON.stringify(user));
    console.log(this.buyerContacts);

    this.isBuyerContactsFormValid = this.checkBuyerContactsFormValid(this.buyerContactsForm);
    if (this.deliveryAdressForm.controls.adress.value === 'novaPoshta') {
      this.isDeliveryAdressFormValid = this.checkBuyerContactsFormValid(this.deliveryAdressForm);
    } else {
      this.isDeliveryAdressFormValid = true;
    }
    // this.submitted = true;
  }
}
