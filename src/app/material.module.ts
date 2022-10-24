import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule} from '@angular/material/list';

const myModules = [MatToolbarModule, MatSidenavModule, MatButtonModule, MatMenuModule, MatListModule, MatFormFieldModule, MatInputModule];

@NgModule({
    imports: [ ...myModules],
    exports: [ ...myModules],
})

export class MaterialModule { }