import { Plugins } from '@capacitor/core';
import * as PluginsLibrary from 'capacitor-video-player';
const { CapacitorVideoPlayer, Device } = Plugins;


import { Component, AfterViewInit,} from '@angular/core';
import { DataService, Video } from '../data.service';

@Component({
  selector: 'app-tab',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})


export class Tab2Page implements AfterViewInit {
  videoPlayer: any;
  videos: Video[];

  constructor(private data: DataService,        ) {
    this.videos = data.getVidoes();
  }

  async ngAfterViewInit() {
    const info = await Device.getInfo();
    if (info.platform === 'ios' || info.platform === 'android') {
      this.videoPlayer = CapacitorVideoPlayer;
    } else {
      this.videoPlayer = PluginsLibrary.CapacitorVideoPlayer;
    }

  }

  async play(url: string) {
    document.addEventListener('jeepCapVideoPlayerPlay', (e: CustomEvent) =>{ console.log('Event jeepCapVideoPlayerPlay ', e.detail)}, false);
    document.addEventListener('jeepCapVideoPlayerPause', (e: CustomEvent) =>{ console.log('Event jeepCapVideoPlayerPause ', e.detail)}, false);
    document.addEventListener('jeepCapVideoPlayerEnded', (e: CustomEvent) =>{ console.log('Event jeepCapVideoPlayerEnded ', e.detail)}, false);
    const res: any = await this.videoPlayer.initPlayer({ mode: 'fullscreen', url: url });
    console.log(this.videoPlayer);

  }
}
