import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { GameComponent } from './game/game.component'
import { FormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import { PlayerComponent } from './player/player.component';
import { DeckComponent } from './deck/deck.component'
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { InputsModule } from '@progress/kendo-angular-inputs';





@NgModule({
  declarations: [AppComponent, GameComponent, CardComponent, PlayerComponent, DeckComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ButtonsModule, BrowserAnimationsModule, LayoutModule, InputsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
