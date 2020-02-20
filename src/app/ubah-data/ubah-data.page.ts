import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController, NavController } from '@ionic/angular';
import { SQLite, DbTransaction, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-ubah-data',
  templateUrl: './ubah-data.page.html',
  styleUrls: ['./ubah-data.page.scss'],
})
export class UbahDataPage implements OnInit {

  // dataContainer = [
  //   {
  //     nocontainer: '12',
  //     size: 20,
  //     type: 'Wet',
  //     slot: 22,
  //     row: 98,
  //     tier: 34,
  //     insert_date: '19 February 2020'
  //   },
  //   {
  //     nocontainer: '13',
  //     size: 40,
  //     type: 'Dry',
  //     slot: 12,
  //     row: 91,
  //     tier: 32,
  //     insert_date: '20 February 2020'
  //   },
  // ];
  dataContainer;

  container = [];
  size = [];
  type = [];
  slot = [];
  row = [];
  tier = [];

  config = {
    name: 'dryportcikarang.db',
    location: 'default'
  };

  constructor(private alertCtrl: AlertController, private loadingCtrl: LoadingController, public toastCtrl: ToastController, public nav: NavController, private route: Router, private sqlite: SQLite, private param: ActivatedRoute) {
    this.dataContainer = JSON.parse(this.param.snapshot.paramMap.get('data'));
    console.log(this.dataContainer);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.dataContainer.length; i++) {
      this.container.push(this.dataContainer[i].nocontainer);
      this.size.push(this.dataContainer[i].size);
      this.type.push(this.dataContainer[i].type);
      this.slot.push(this.dataContainer[i].slot);
      this.row.push(this.dataContainer[i].row);
      this.tier.push(this.dataContainer[i].tier);
    }
  }

  ngOnInit() {
  }

  async submit() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await loading.present();

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.dataContainer.length; i++) {
      this.updateData({
        nocontainer: this.container[i],
        slot: this.slot[i],
        row: this.row[i],
        tier: this.tier[i],
      });
      if (this.dataContainer.length === i + 1) {
        setTimeout(() => {
          loading.dismiss();
          this.alertSuksesKonfirmasi();
        }, 2000);
      }
    }
    console.log(this.container);
    console.log(this.size);
    console.log(this.type);
    console.log(this.slot);
    console.log(this.row);
    console.log(this.tier);
  }

  updateData(data) {
    this.sqlite.create(this.config).then((q: SQLiteObject) => {
      q.executeSql('UPDATE tbl_container SET slot = ?,row = ?,tier = ? WHERE nocontainer = ?', [`${data.slot}`, `${data.row}`, `${data.tier}`, `${data.nocontainer}`]).then((r: any) => {
        console.log('Update berhasil');
      }, e => {
        console.log('Update gagal');
        console.log(e);
      });
    }, err => {
      console.log(err);
    });
  }

  async alertSuksesKonfirmasi() {
    const alert = await this.alertCtrl.create({
      header: 'INFO',
      message: `Update data container berhasil`,
      buttons: [
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

}
