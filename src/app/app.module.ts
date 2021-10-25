import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroComponent } from '../components/hero/hero.component';
import { VillainComponent } from '../components/villain/villain.component';
import { GameComponent } from '../components/game/game.component';
import { HttpClientModule } from '@angular/common/http';
import { GameLogComponent } from '../components/game-log/game-log.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    VillainComponent,
    GameComponent,
    GameLogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
