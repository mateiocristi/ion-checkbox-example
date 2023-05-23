import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  roles: string[] = ["dev", "tester", "sm", "wpm"];
  selectedRoles: string[] = [];
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  get rolesArray() {
    return this.form.get('rolesArray') as FormArray
  }

  ngOnInit() {
    this.form = this.fb.group({
      rolesArray: this.fb.array([])
    });

    this.roles.forEach(role => {
      this.rolesArray.push(this.fb.group({desc: role, checked: false}));
    })
  }

  toggleCheck(i: number) {
    let roleControl = this.rolesArray.controls[i] as FormControl
    let initVal: boolean = roleControl.get('checked')!.value;
    roleControl.get('checked')?.patchValue(!initVal);

    this.setRoles()
  }

  setRoles() {
    this.selectedRoles = [];
    this.rolesArray.controls.forEach((roleControl) => {
      if (roleControl.get('checked')!.value)
        this.selectedRoles.push(roleControl.get('desc')!.value)
    })
  }

  manualCheck() {
    this.toggleCheck(2);
  }
}
