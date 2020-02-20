import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { SQLite, DbTransaction, SQLiteObject } from '@ionic-native/sqlite/ngx';
import * as moment from 'moment';

@Component({
  selector: 'app-tambah-data',
  templateUrl: './tambah-data.page.html',
  styleUrls: ['./tambah-data.page.scss'],
})
export class TambahDataPage implements OnInit {

  container = '';
  size: any = 0;
  type = '';
  slot: any = 0;
  row: any = 0;
  tier: any = 0;

  timeNow = '';

  config = {
    name: 'dryportcikarang.db',
    location: 'default'
  };

  constructor(private alertCtrl: AlertController, private loadingCtrl: LoadingController, public toastCtrl: ToastController, public nav: NavController, private route: Router, private sqlite: SQLite) {
    moment.locale('id');
    this.timeNow = moment().format('LL');
  }

  ngOnInit() {
  }

  async alertCheckedForm() {
    const alert = await this.alertCtrl.create({
      header: 'BAHAYA',
      message: 'Silahkan lengkapi form nya !',
      buttons: ['SAYA MENGERTI'],
      backdropDismiss: false
    });

    await alert.present();
  }

  async alertCheckedData(cont) {
    const alert = await this.alertCtrl.create({
      header: 'BAHAYA',
      message: `Container ${cont} suda ada !`,
      buttons: ['INPUT DATA LAIN'],
      backdropDismiss: false
    });

    await alert.present();
  }

  async alertSuksesKonfirmasi() {
    const alert = await this.alertCtrl.create({
      header: 'INFO',
      message: `Tambah data container berhasil`,
      buttons: [
        {
          text: 'Add More',
          handler: () => {
            this.reset();
          }
        },
        {
          text: 'Go Back to List',
          handler: () => {
            this.nav.navigateRoot('home');
          }
        },
      ],
      backdropDismiss: false
    });
    alert.present();
  }

  inputData(data) {
    this.sqlite.create(this.config).then((q: SQLiteObject) => {
      q.executeSql('INSERT INTO tbl_container VALUES(?,?,?,?,?,?,?)', [`${data.container}`, `${data.size}`, `${data.type}`, `${data.slot}`, `${data.row}`, `${data.tier}`, `${data.time}`]).then((res: any) => {
        this.alertSuksesKonfirmasi();
      }, err => {
        console.log(JSON.stringify(err));
        if (err.code === 6) {
          this.alertCheckedData(data.container);
        }
      });
    }, err => {
      alert(JSON.stringify(err));
      console.log(err);
    });
  }

  submit() {
    if (this.container === '' || this.size === 0 || this.type === '' || this.slot === 0 || this.row === 0 || this.tier === 0) {
      this.alertCheckedForm();
    } else {
      const data = {
        container: this.container,
        size: this.size,
        type: this.type,
        slot: this.slot,
        row: this.row,
        tier: this.tier,
        time: this.timeNow
      };
      this.inputData(data);
    }
    console.log(this.container);
    console.log(this.size);
    console.log(this.type);
    console.log(this.slot);
    console.log(this.row);
    console.log(this.tier);
  }

  jadiNolSlot(data) {
    if (data === '') {
      this.slot = 0;
    }
  }

  jadiClearSlot() {
    this.slot = '';
  }

  jadiNolRow(data) {
    if (data === '') {
      this.row = 0;
    }
  }

  jadiClearRow() {
    this.row = '';
  }

  jadiNolTier(data) {
    if (data === '') {
      this.tier = 0;
    }
  }

  jadiClearTier() {
    this.tier = '';
  }

  reset() {
    this.container = '';
    this.size = 0;
    this.type = '';
    this.slot = 0;
    this.row = 0;
    this.tier = 0;
  }

}
