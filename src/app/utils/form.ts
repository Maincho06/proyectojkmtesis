import { FormGroup } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
export function validarFormularioJKM(formGroup: FormGroup): void {
    
    if (formGroup.invalid) {
        return Object.values(formGroup.controls).forEach(control => {
          control.markAllAsTouched();
        })
      };

}