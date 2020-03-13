import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { SQLite, DbTransaction, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { ConfigDb } from '../config/setting';

@Component({
  selector: 'app-cari-data',
  templateUrl: './cari-data.page.html',
  styleUrls: ['./cari-data.page.scss'],
})
export class CariDataPage implements OnInit {

  searchText;

  item = [];
  hideDetail = [];

  config = {
    name: ConfigDb.connection.name,
    location: ConfigDb.connection.location
  };

  formatData = [];

  constructor(private alertCtrl: AlertController, private loadingCtrl: LoadingController, public toastCtrl: ToastController, public nav: NavController, private route: Router, private sqlite: SQLite) { }

  ngOnInit() {
    this.ambilData();
  }

  ionViewWillEnter() {
  }

  ambilData() {
    this.item = [];

    this.sqlite.create(this.config).then((q: SQLiteObject) => {
      q.executeSql('SELECT * FROM tbl_container', []).then((r: any) => {
        this.item = [];


        for (let i = 0; i < r.rows.length; i++) {
          this.item.push(r.rows.item(i));
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

  async alertMenu(data) {
    const alert = await this.alertCtrl.create({
      header: 'MENU',
      message: `Pilihan menu`,
      buttons: [
        {
          text: 'HAPUS',
          handler: () => {
            this.hapusData(data[0]);
          }
        },
        {
          text: 'DETAIL',
          handler: () => {
            this.route.navigate(['ubah-data', JSON.stringify(data)]);
          }
        },
      ]
    });
    alert.present();
  }

  detail(data) {
    this.formatData = [];
    this.formatData.push(data);
    console.log(data);
    console.log(this.formatData);
    this.alertMenu(this.formatData);
  }

  hapusData(data) {
    this.alertHapusKonfirmasi(data.nocontainer);
  }

  async alertHapusKonfirmasi(data) {
    const alert = await this.alertCtrl.create({
      header: 'INFO',
      message: `Yakin hapus data ${data} ?`,
      buttons: [
        {
          text: 'No'
        },
        {
          text: 'Yes',
          handler: () => {
            console.log(data);
            this.hapusDataContainer(data);
          }
        },
      ],
      backdropDismiss: false
    });
    alert.present();
  }

}
