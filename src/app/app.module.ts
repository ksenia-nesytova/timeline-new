import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { FormsModule } from '@angular/forms';

// import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
// import { provideAuth,getAuth } from '@angular/fire/auth';
// import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { LineComponent } from './line/line.component';
// import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
// import { provideDatabase,getDatabase } from '@angular/fire/database';
// import { provideFunctions,getFunctions } from '@angular/fire/functions';
// import { providePerformance,getPerformance } from '@angular/fire/performance';
// import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
// import { provideStorage,getStorage } from '@angular/fire/storage';

// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { doc, getDoc, collection } from "firebase/firestore";
import { SharedModule } from './shared/shared.module';
import { EventComponent } from './event/event.component';
import { TimelineComponent } from './timeline/timeline.component';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        DragDropModule,
        FormsModule,
        // provideFirebaseApp(() => initializeApp(environment.firebase)),
        // provideAuth(() => getAuth()),
        // provideFirestore(() => getFirestore()),
        // provideAnalytics(() => getAnalytics()),
        // provideDatabase(() => getDatabase()),
        // provideFunctions(() => getFunctions()),
        // providePerformance(() => getPerformance()),
        // provideRemoteConfig(() => getRemoteConfig()),
        // provideStorage(() => getStorage()),
        SharedModule,
        LineComponent,
        EventComponent,
        TimelineComponent,
        FilterPanelComponent
    ],
    providers: [
    // ScreenTrackingService,UserTrackingService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDIwNIAztVSQgm0psrmJbXW2dRvZ403MfM",
//   authDomain: "timeline-elsewise.firebaseapp.com",
//   projectId: "timeline-elsewise",
//   storageBucket: "timeline-elsewise.appspot.com",
//   messagingSenderId: "974902701857",
//   appId: "1:974902701857:web:832e800d1caa67c7ee5860",
//   measurementId: "G-QN6T431QT3"
// };
//
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);
//
// const docRef = doc(db, 'period', 'Renaissance');
// const renaissance = await getDoc(docRef);
//
// if(renaissance.exists()) {
//   console.log(renaissance.data())
// } else {
//   console.log(404)
// }
