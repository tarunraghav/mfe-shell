import { loadRemoteModule } from '@angular-architects/module-federation';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as React from 'react';
import { createRoot, Root } from 'react-dom/client';

@Component({
  selector: 'app-react-wrapper',
  standalone: false,
  template: `<div #container id="react_button"></div>`,
})
export class ReactWrapperComponent implements AfterViewInit, OnDestroy {
  remoteEntry: string = 'http://localhost:5001/assets/remoteEntry.js'; // Add remoteEntry
  exposedModule!: string;
  elementId!: string;
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLDivElement>;
  root!: Root | undefined;
  reactComponent!: React.ComponentType<any>;
  componentProps: any = {};

  constructor(private route: ActivatedRoute, private cd: ChangeDetectorRef) { }

  async ngAfterViewInit() {
    this.exposedModule = this.route.snapshot.data['exposedModule'];
    this.elementId = this.route.snapshot.data['elementId'];
    this.componentProps = this.route.snapshot.data['props'] || {};

    console.log('Loading remote:', this.remoteEntry, 'Module:', this.exposedModule);

    try {
      const mod = await loadRemoteModule({
        type: 'module',
        remoteEntry: this.remoteEntry,
        exposedModule: this.exposedModule,
      });
      console.log('Loaded module:', mod);
      this.reactComponent = mod.default;
      this.render();
      this.cd.detectChanges();
    } catch (error) {
      console.error('Error loading remote module:', error);
    }
  }

  render() {
    if (this.reactComponent && !this.root) {
      this.root = createRoot(this.container.nativeElement);
      this.root.render(React.createElement(this.reactComponent, this.componentProps));
    }
  }

  ngOnDestroy() {
    this.root?.unmount();
  }
}