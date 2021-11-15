/*import { BaseController } from "../core/interfaces/base-controller";
import { AppConfig } from "../app-start/app-config";
import { ImageUrl } from "../images/image.url";
import { ImageEnum } from "../enums/image.enum";
import { logger } from "../services/logger.service";
import { ImageService } from "../services/image.service";

export class ImageController extends BaseController {
    //GET
    // /images/:id
    getImage() {
        
        let params: string = this.request.parms;
        logger.info("Request IMAGE", { Params: params })
        const imageService = ImageService.getInstance();

        try {
            const imageUrl = imageService.getImageUrl(params);

            logger.info("controlleur image", {imagePath: imageUrl})

            if(imageUrl == ImageEnum.NOT_FOUND) {
                this.response.status = 404
                this.response.body = ImageEnum.NOT_FOUND

            } else {
                this.response.isFileResult = true;
                this.response.filePath = imageUrl

            }

        } catch (e) {

            logger.error("Request Image : Failed", { Error : e })
            this.response.status = 400
            this.response.body = ImageEnum.ERROR
        }

    }

}*/ 
//# sourceMappingURL=image.controller.js.map