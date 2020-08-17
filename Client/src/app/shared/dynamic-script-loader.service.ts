import { Injectable } from '@angular/core';

interface Scripts {
  name: string;
  src: string;
}

export const ScriptStore: Scripts[] = [
  { name: 'mainJquery', src: '../../assets/js/main.js' },
  { name: 'revolutionJquery', src: '../../assets/js/jquery.themepunch.revolution.js' },
  { name: 'toolsJquery', src: '../../assets/js/jquery.themepunch.tools.min.js' },
  { name: 'imagesLoadedJquery', src: '../../assets/js/imagesLoaded.pkgd.min.js' },
  { name: 'pluginsJquery', src: '../../assets/js/plugins.js' },
  { name: 'scriptsJquery', src: '../../assets/js/scripts.js' },
  { name: 'scrollrevealJquery', src: '../../assets/js/scrollreveal.min.js' },
  { name: 'includeJquery', src: '../../assets/js/include.js' },
  { name: 'sliderJquery', src: '../../assets/js/slider.js' },
  
  { name: 'venoboxJquery', src: '../../assets/js/venobox.min.js' },
  { name: 'isotopeJquery', src: '../../assets/js/isotope.pkgd.min.js' }


];

declare var document: any;

@Injectable({
  providedIn: 'root'
})
export class DynamicScriptLoaderService {

  private scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  load(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      if (!this.scripts[name].loaded) {
        //load script
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        if (script.readyState) {  //IE
            script.onreadystatechange = () => {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    this.scripts[name].loaded = true;
                    resolve({script: name, loaded: true, status: 'Loaded'});
                }
            };
        } else {  //Others
            script.onload = () => {
                this.scripts[name].loaded = true;
                resolve({script: name, loaded: true, status: 'Loaded'});
            };
        }
        script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
        document.getElementsByTagName('head')[0].appendChild(script);
      } else {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
    });
  }

}