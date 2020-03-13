
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SQLite, DbTransaction, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { ConfigDb } from '../config/setting';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  item = [];

  pilihCheckbox = [];
  tampungData = [];
  hideDetail = [];

  config = {
    name: ConfigDb.connection.name,
    location: ConfigDb.connection.location
  };

  timeNow = '';

  countNotChecked = 0;

  constructor(private alertCtrl: AlertController, private loadingCtrl: LoadingController, public toastCtrl: ToastController, public nav: NavController, private route: Router, private sqlite: SQLite) {
  }

  ionViewWillEnter() {
    this.initTable();
    this.ambilData();
  }

  ionViewDidEnter() {
    // this.initTable();
    // this.ambilData();
  }

  testgetdata() {
    this.initTable();
    this.ambilData();
  }

  // SQLITE
  initTable() {
    this.sqlite.create(this.config).then((q: SQLiteObject) => {
      q.transaction((tx: DbTransaction) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_container (nocontainer text NOT NULL UNIQUE,size TEXT,type TEXT,slot TEXT, row TEXT, tier TEXT, insert_date TEXT)');
      }).then(res => {
        console.log('Buat tabel-tabel berhasil');
      }, err => {
        alert(JSON.stringify(err));
        console.log(err);
      });

    }, err => {
      alert(JSON.stringify(err));
      console.log(err);
    });
  }

  ambilData() {
    this.item = [];
    this.pilihCheckbox = [];
    this.hideDetail = [];

    this.sqlite.create(this.config).then((q: SQLiteObject) => {
      q.executeSql('SELECT * FROM tbl_container', []).then((r: any) => {
        this.item = [];
        this.pilihCheckbox = [];
        this.hideDetail = [];

        for (let i = 0; i < r.rows.length; i++) {
          this.item.push(r.rows.item(i));
          this.pilihCheckbox.push(false);
          this.hideDetail.push(true);
          console.log(r.rows.item(i));
        }

        console.log(r.rows.length);
        console.log(r.rows);
      }, e => {
        console.log(e);
      });
    }, err => {
      console.log(err);
    });
  }

  hapusDataContainer(nocontainer) {
    this.item = [];
    this.pilihCheckbox = [];
    this.hideDetail = [];

    this.sqlite.create(this.config).then((q: SQLiteObject) => {
      q.executeSql('DELETE FROM tbl_container WHERE nocontainer = ?', [`${nocontainer}`]).then((r: any) => {
        console.log('Hapus berhasil');
        this.ambilData();
      }, e => {
        console.log('Hapus gagal');
        console.log(e);
      });
    }, err => {
      console.log(err);
    });
  }
  // SQLITE

  bukaDetail(i) {
    this.hideDetail[i] = this.hideDetail[i] ? false : true;
  }

  async toastChecked(text) {
    const toast = await this.toastCtrl.create({
      message: `Pilih salah satu data yang akan di ${text} !`,
      duration: 3000
    });
    toast.present();
  }

  async alertCheckedOver() {
    const alert = await this.alertCtrl.create({
      header: 'BAHAYA',
      message: 'Item yang di pilih tidak boleh lebih dari 2 item !',
      buttons: ['SAYA MENGERTI'],
      backdropDismiss: false
    });

    await alert.present();
  }

  tambahData() {
    this.nav.navigateForward('tambah-data');
  }

  ubahData() {
    let i;
    this.tampungData = [];
    this.countNotChecked = 0;

    for (i = 0; i < this.pilihCheckbox.length; i++) {
      console.log(this.pilihCheckbox[i]);
      if (this.pilihCheckbox[i]) {
        this.tampungData.push(this.item[i]);
      } else {
        this.countNotChecked++;
      }

      if (this.countNotChecked === this.pilihCheckbox.length) { // tidak ada data yang di checked
        this.toastChecked('edit');
      } else {
        if (this.pilihCheckbox.length === i + 1) {
          if (this.tampungData.length <= 2) {
            console.log('jml tdk cked ' + this.countNotChecked + ' jml tmpng data ' + this.tampungData.length);
            console.log(this.tampungData);
            this.route.navigate(['ubah-data', JSON.stringify(this.tampungData)]);
          } else {
            this.alertCheckedOver();
          }
        }
      }


    }
  }

  async alertHapusKonfirmasi(data) {
    const alert = await this.alertCtrl.create({
      header: 'INFO',
      message: `Yakin hapus data ${data.length === 1 ? data[0].nocontainer : 'multiple'} ?`,
      buttons: [
        {
          text: 'No'
        },
        {
          text: 'Yes',
          handler: () => {
            console.log(data);
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < data.length; i++) {
              this.hapusDataContainer(data[i].nocontainer);
            }
          }
        },
      ],
      backdropDismiss: false
    });
    alert.present();
  }

  hapusData() {
    let i;
    this.tampungData = [];
    this.countNotChecked = 0;

    for (i = 0; i < this.pilihCheckbox.length; i++) {
      console.log(this.pilihCheckbox[i]);
      if (this.pilihCheckbox[i]) {
        this.tampungData.push(this.item[i]);
      } else {
        this.countNotChecked++;
      }

      if (this.countNotChecked === this.pilihCheckbox.length) { // tidak ada data yang di checked
        this.toastChecked('hapus');
      } else {
        if (this.pilihCheckbox.length === i + 1) {
          if (this.tampungData.length <= 2) {
            console.log('jml tdk cked ' + this.countNotChecked + ' jml tmpng data ' + this.tampungData.length);
            console.log(this.tampungData);
            this.alertHapusKonfirmasi(this.tampungData);
          } else {
            this.alertCheckedOver();
          }
        }
      }


    }
  }

  lihatData() {

  }

  cariData() {
    this.nav.navigateForward('cari-data');
  }

}
