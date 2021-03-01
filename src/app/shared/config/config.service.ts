import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { IPanelConfigModel } from './models/panel-config.model';
import { HttpClient } from '@angular/common/http';
import { IAppConfigModel } from './models/app-config.model';
import { NavigationEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

const configFilesPath = 'assets/config/';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private isSubscribedToRouterEvents = false;

  private panels: { [panelName: string]: IPanelConfigModel } = {};

  private currentUrl: string | undefined;
  private previousUrl = null;

  public app: IAppConfigModel | undefined;

  // easy access shortcuts for a specific panel configuration
  public current: IPanelConfigModel | undefined;
  public currentConfigurationName = '';

  constructor(
    private httpClient: HttpClient,
    @Inject(LOCALE_ID) public locale: string
  ) {
  }



  private setActiveConfiguration(configurationName: string) {
    // update configuration
    this.current = this.panels[configurationName];
    this.currentConfigurationName = configurationName;
  }

  

  public subscribeToRouterEvents(router: Router) {
    if (!this.isSubscribedToRouterEvents) {
      router.events.subscribe(event => {
        if (event instanceof RouteConfigLoadStart) {
          const routeConfigLoadStart = event as RouteConfigLoadStart;
          if (routeConfigLoadStart.route.data && routeConfigLoadStart.route.data.configurationName) {
            this.setActiveConfiguration(
              routeConfigLoadStart.route.data.configurationName
            );
          }
        }
        if (event instanceof NavigationEnd) {
          this.setActiveUrl(event.url);
        }
      });
      this.isSubscribedToRouterEvents = true;
    }
  }

  public setActiveUrl(url: string) {
    // update urls
    this.currentUrl = url;
  }
  public getPanelApiUrl(endpoint: string): string {
    if (this.current) {
      if (!endpoint) {
        // return api url but without the last slash, like we would do if we had an endpoint
        return this.current.urls.backendApiUrl.substring(0, this.current.urls.backendApiUrl.length - 1);
      }
      return this.current.urls.backendApiUrl + endpoint;
    } else {
      console.error(`Cannot determine api url for endpoint ${endpoint}`);
      return '';
    }
  }



  public getImagePath(imageName: string): string {
    if (this.current && this.current.settings) {
      return this.current.settings.imagesPath + imageName;
    }
    return '';
  }

  isDict(value: any): boolean {
    return typeof value === 'object' && value !== null && !(value instanceof Array) && !(value instanceof Date);
  }

  mergeObjects<T>(a: any, b: any): T {
    for (const key in a) {
      
      if (a.hasOwnProperty(key) && this.isDict(a[key])) {
        if (b.hasOwnProperty(key) && this.isDict(b[key])) {
          b[key] = this.mergeObjects(a[key], b[key]);
        }
      }
    }
    return Object.assign({}, a, b) as T;
  }

  loadPanelConfiguration(panelName: string, fileName: string): Promise<null> {
    return new Promise<null>(
      (resolve, reject) => {
        const panelConfigFile = configFilesPath + fileName;
        this.httpClient.get(configFilesPath).toPromise().then(
          (baseResponse: any) => {
            this.httpClient.get(panelConfigFile).toPromise().then(
              (response: any) => {
                this.panels[panelName] = this.mergeObjects<IPanelConfigModel>(baseResponse, response);
                resolve(null);
              }
            ).catch(
              () => {
                reject('Failed to load configuration file ${fileName} for panel ${panelName}');
              }
            );
          }
        ).catch(
          () => {
            reject('Failed to load base configuration file ${fileName} for panel ${panelName}');
          }
        );
      }
    );
  }

  load() {
    return new Promise<void>((resolve, reject) => {
      const promises:any = [];
      Object.keys(environment.panels).map((panelName,i) => {
        // const panel = environment.panels[panelName];
        var panel = Object.values(environment.panels)[i];
        promises.push(this.loadPanelConfiguration(panelName, panel.configFile));
      });
      Promise.all(promises).then(
        () => {
          resolve();
        }
      ).catch(
        () => {
          reject('Failed to load panel configurations');
        }
      );
    });
  }
}
