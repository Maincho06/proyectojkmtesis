import { FormGroup } from '@angular/forms';

export function validarFormularioJKM(formGroup: FormGroup): void {
  if (formGroup.invalid) {
    return Object.values(formGroup.controls).forEach((control) => {
      control.markAllAsTouched();
    });
  }
}

export function imageToBase64(fileList: any) {
  return Object.values(fileList).map((file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  });
}

export function base64ToFile(imageList: string[]) {
  return imageList.map(
    (base64, index) =>
      new Promise((resolve, reject) => {
        fetch(base64)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], `file-${index}`, {
              type: 'image/png',
            });
            resolve(file);
          });
      })
  );
}
