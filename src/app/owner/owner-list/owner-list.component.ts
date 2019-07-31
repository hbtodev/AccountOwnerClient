import { Component, OnInit } from '@angular/core';
import { Owner } from './../../_interfaces/owner.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from './../../shared/services/repository.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
 
@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  public owners: Owner[];
  public errorMessage: string = '';

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.getAllOwners();
  }

  public getAllOwners() {
    let apiAddress: string = "api/owner";
    this.repository.getData(apiAddress)
      .subscribe(res => {
        this.owners = res as Owner[];
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
  }

  public getOwnerDetails(id){
    let detailsUrl: string = `/owner/details/${id}`
    this.router.navigate([detailsUrl]);
  }

  public redirectToUpdatePage(id){
    let updateUrl: string = `/owner/update/${id}`;
    this.router.navigate([updateUrl]);
  } 

  public redirectToDeletePage(id){
    let deleteUrl: string = `/owner/delete/${id}`;
    this.router.navigate([deleteUrl]);
  }

}