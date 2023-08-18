import BaseRoutes from "../../../router/base/BaseRouter";
import DocumentShareController from "../controller/DocumentShareController";
import multer from "multer";
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(req.body);
        const senderEmail = req.body.senderEmail;
        const userFolderPath: string = `./storage/${senderEmail}/`

        if (!fs.existsSync(userFolderPath)) {
            fs.mkdirSync(userFolderPath);
        }

        cb(null, userFolderPath);
    },
    filename: (req, file, cb) => {
        const originalFilename = file.originalname;

        cb(null, originalFilename);
    },

});

const upload = multer({ storage });

class DocumentShareRouter extends BaseRoutes {
    public routes(): void {
        this.router.get('/sharedDocuments/:userEmail/:fileName', DocumentShareController.getSharedDocument);
        this.router.get('/sharedDocumentsNames/:receiverEmail', DocumentShareController.getSharedDocumentsNames);
        this.router.post('/', upload.single('file'), DocumentShareController.shareDocumentByEmail);
    }

}

export default new DocumentShareRouter().router