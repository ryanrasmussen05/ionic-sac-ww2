import { Component, OnDestroy } from '@angular/core';
import { Platform, ViewController } from 'ionic-angular';
import { ExhibitDataService } from '../../data/exhibit.data.service';
import { AudioProvider, ITrackConstraint } from 'ionic-audio';
import { Exhibit } from '../../data/model/exhibit';

@Component({
    selector: 'about-page',
    templateUrl: 'about.page.html'
})
export class AboutPage implements OnDestroy {
    exhibit: Exhibit;

    track: ITrackConstraint;

    private _pauseSubscription: any;

    constructor(exhibitDataService: ExhibitDataService, public viewCtrl: ViewController, public audioProvider: AudioProvider, platform: Platform) {
        this.exhibit = exhibitDataService.getExhibitData();

        this.track = {
            src: 'assets/audio/' + this.exhibit.audio,
            preload: 'metadata'
        };

        platform.ready().then(() => {
            this._pauseSubscription = platform.pause.subscribe(() => {
                console.log('PLATFORM PAUSE - ABOUT EXHIBIT PAGE');
                this.audioProvider.stop();
            });
        });
    }

    ngOnDestroy(): void {
        this.audioProvider.stop();
        this.audioProvider.tracks.length = 0;

        this._pauseSubscription.unsubscribe();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}