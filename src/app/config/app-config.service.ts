import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private config = {
    production: 'https://api.example.com',
    development: 'http://localhost:8081'
  };

  getApiUrl(): string {
    const env = this.getEnvironment();
    return this.config[env];
  }

  private getEnvironment(): 'production' | 'development' {
    // Logic to determine the environment
    // This can be based on environment variables or other logic
    return window.location.hostname === 'localhost' ? 'development' : 'production';
  }
}
