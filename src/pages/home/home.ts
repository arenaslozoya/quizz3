import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
registro = RegistroPage;
usuarios=[];
usuario;
password;

  constructor(public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public storage: Storage) {
     this.storage.keys()
      .then(keys => {if(keys.some(key => key == 'usuarios')){
        this.storage.get('usuarios')
        .then(usuarios =>{this.usuarios= JSON.parse(usuarios);})
     }
  });
  }
  clickRegistro()
  {
    this.navCtrl.push(this.registro, {usuarios:this.usuarios});
  }

  clickMensaje(){
      if (this.usuarios.length > 0 ) {
        let index= this.usuarios.findIndex(usuarios => usuarios.usuario == this.usuario &&
                                                       usuarios.password == this.password);
        const alert = this.alertCtrl.create({
          title: 'Éxito',
          subTitle: 'Su inicio de sesión fue todo un éxito',
          buttons: ['OK']
        });
        alert.present();
        
        this.storage.set('usuarios', JSON.stringify(this.usuarios))
      }
      else {
        console.log('el usuario y contraseña estan vacios');
        const alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Su inicio de sesión tuvo un error',
          buttons: ['OK']
        });
        alert.present();
      }
    }
}
