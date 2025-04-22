import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptServiceService {

  private secretKey = 'Xl82M!d@93vZ-Secret-Key2025'; // Puedes inventarte una más loca si quieres

  /**
   * Encripta cualquier objeto (ID, config, etc) y devuelve un string cifrado.
   */
  encrypt(data: any): string {
    const textoPlano = JSON.stringify(data);
    return CryptoJS.AES.encrypt(textoPlano, this.secretKey).toString();
  }

  /**
   * Desencripta un string y devuelve el objeto original
   */
  decrypt(textoCifrado: string): any {
    try {
      const bytes = CryptoJS.AES.decrypt(textoCifrado, this.secretKey);
      const textoPlano = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(textoPlano);
    } catch (error) {
      console.error('❌ Error al desencriptar:', error);
      return null;
    }
  }
}
