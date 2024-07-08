import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h1>Kredi Hesaplama</h1>
    <div>
      <label>Kredi Tutarı</label>
      <input [(ngModel)]="krediTutari" />
    </div>
    <div>
      <label>Taksit Sayısı</label>
      <select [(ngModel)]="taksitSayisi">
        @for(data of taksitler; track data){
        <option>{{ data }}</option>
        }
      </select>
    </div>
    <div>
      <button (click)="hesapla()">Hesapla</button>
    </div>
    <hr />
    <h1>{{ result }}</h1>
    <hr />
    <table>
      <thead>
        <tr>
          <th>Taksit</th>
          <th>Taksit Tutarı</th>
          <th>Kalan Geri Ödeme</th>
        </tr>
      </thead>
      <tbody>
        @for(data of odemePlani; track data){
        <tr>
          <td>
            {{ $index + 1 }}
          </td>

          <td>
            {{ data.taksitTutari }}
          </td>

          <td>
            {{ data.kalanGeriOdeme }}
          </td>
        </tr>
        }
      </tbody>
    </table>
  `,
  styles: [
    `
      :host {
        font-family: Arial, sans-serif;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        display: block;
      }

      h1 {
        color: #333;
        text-align: center;
      }

      div {
        margin-bottom: 15px;
      }

      label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
      }

      input,
      select {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }

      button {
        background-color: #4caf50;
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
      }

      button:hover {
        background-color: #45a049;
      }

      hr {
        margin: 20px 0;
        border: 0;
        border-top: 1px solid #ddd;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }

      th,
      td {
        border: 1px solid #ddd;
        padding: 12px;
        text-align: left;
      }

      th {
        background-color: #f2f2f2;
        font-weight: bold;
      }

      tr:nth-child(even) {
        background-color: #f9f9f9;
      }

      tr:hover {
        background-color: #f5f5f5;
      }
    `,
  ],
})
export class AppComponent {
  krediTutari: number = 0;
  taksitSayisi: number = 3;
  taksitler: number[] = [3, 6, 12, 24];
  result: string = '';
  odemePlani: { taksitTutari: number; kalanGeriOdeme: number }[] = [];
  hesapla() {
    const taksitTutari: number = (this.krediTutari / this.taksitSayisi) * 1.29;
    let toplamGeriOdeme: number = taksitTutari * this.taksitSayisi;
    this.result = ` Taksit Tutarı: ${taksitTutari} - Taksit Sayısı:  ${this.taksitSayisi} - Toplam Geri Ödeme: ${toplamGeriOdeme}`;
    this.odemePlani = [];
    for (let i = 0; i < this.taksitSayisi; i++) {
      toplamGeriOdeme -= taksitTutari;
      const data = {
        taksitTutari: taksitTutari,
        kalanGeriOdeme: toplamGeriOdeme,
      };
      this.odemePlani.push(data);
    }
  }
}
