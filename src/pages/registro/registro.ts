import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
usuarios =[];
usuario;
password;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public storage: Storage) {
      this.storage.keys()
       .then(keys => {if(keys.some(key => key == 'usuarios')){
         this.storage.get('usuarios')
         .then(usuarios =>{this.usuarios= JSON.parse(usuarios);})
      }
   });
                this.usuarios = this.navParams.get('usuarios');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }
  clickanadir(){
    if(this.usuario.length > 0 && this.password.length > 0){
      this.usuarios.push({
        password:this.password,
        correo:this.usuario});
      this.navCtrl.pop();
      
    }
    else{
      console.log("falta algo")
      const alert=this.alertCtrl.create({
        title:"Oops!", subTitle:"correo y contraseña tienen que estar llenos", buttons: ["OK"]
      })
      alert.present();
    }
  }
}
