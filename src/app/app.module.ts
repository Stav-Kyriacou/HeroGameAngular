import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroComponent } from '../components/hero/hero.component';
import { VillainComponent } from '../components/villain/villain.component';
import { GameComponent } from '../components/game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    VillainComponent,
    GameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
