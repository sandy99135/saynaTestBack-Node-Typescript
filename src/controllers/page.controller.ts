import { BaseController } from "../core/interfaces/base-controller";
export class PageController extends BaseController{
 renderPage(){
 	try{
 	 this.response.isFileResult = true;
     this.response.filePath =  process.cwd() + "\\dist\\public\\index.html"
 	}catch{
 		this.response.status=404
 		this.response.isFileResult = true;
     	this.response.filePath =  process.cwd() + "\\dist\\public\\404.notfound.html"
 	}
 	
 }	 
}