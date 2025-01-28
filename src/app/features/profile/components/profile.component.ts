import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

type ProfileType = {
  givenName?: string;
  surname?: string;
  userPrincipalName?: string;
  id?: string;
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile!: ProfileType;
  isLoading = false;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.isLoading = true;
    this.getProfile();
  }

  // Get authenticated used profile from Microsfot Graph API. Pending to move a component service
  getProfile() {
    this.httpClient
      .get(environment.msalGraphURL)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((profile) => {
        this.profile = profile;
      });
  }
}
