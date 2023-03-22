import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProviderImageService {

  getImage(name: string) : string {
    const path = '../../../../assets/';
    const imageName = path.concat(name)
    console.log(imageName)
    return imageName;
  } 
}
