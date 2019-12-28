import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../shared/custom-validators';
import {User} from '../../shared/models/user';
import {Adress} from '../../shared/models/adress';
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
        ]),
        userPhones: new FormArray([new FormControl('', [
          Validators.required,
          Validators.pattern('((?:\\+|00)[17](?: |\\-)?|(?:\\+|00)[1-9]\\d{0,2}(?: |\\-)?|(?:\\+|00)1\\-\\d{3}(?: |\\-)?)?(0\\d|\\([0-9]{3}\\)|[1-9]{0,3})(?:((?: |\\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: ?|\\-?)[0-9]{3}(?: ?|\\-?)[0-9]{7})|([0-9]{7}))')])]),
        userComment: new FormControl(''),
      });
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

  checker(form: FormGroup, controlName: string): string {
    if (form.controls[controlName].valid) {
      return 'is-valid';
    } else if (form.controls[controlName].touched && form.controls[controlName].invalid) {
      return 'is-invalid';
    } else {
      return 'is-default';
    }
  }

  makeOrder() {

    const user: User = {
      firstName: this.buyerContactsForm.controls.userFirstName.value,
      lastName: this.buyerContactsForm.controls.userLastName.value,
      email: this.buyerContactsForm.controls.userEmail.value,
      phone: this.buyerContactsForm.controls.userPhones.value[0],
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

    this.isBuyerContactsFormValid = this.checkBuyerContactsFormValid(this.buyerContactsForm);
    if (this.deliveryAdressForm.controls.adress.value === 'novaPoshta') {
      this.isDeliveryAdressFormValid = this.checkBuyerContactsFormValid(this.deliveryAdressForm);
    } else {
      this.isDeliveryAdressFormValid = true;
    }
  }

  get buyerContactsFormUserPhones() {
    return this.buyerContactsForm.get('userPhones') as FormArray;
  }
}
