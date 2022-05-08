import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, value: any) {
    let json = JSON.stringify(value)
    localStorage.setItem(key, json)
  }

  getItem(key: string): any {
    let json = localStorage.getItem(key)
    let value
    if (json != null) {
      value = JSON.parse(json)
    }
    return value
  }

  removeItem(key: string) {
    localStorage.removeItem(key)
  }
}
