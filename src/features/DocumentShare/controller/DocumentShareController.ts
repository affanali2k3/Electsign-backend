import { Request, Response } from 'express';
import SharedDocumentRepo from '../repository/DocumentSharingRepo'
import fs from 'fs';

class DocumentShareController {
    async shareDocumentByEmail(req: Request, res: Response) {
        try {
            if (!req.file) return res.status(400).json({ message: 'No file received.' });

            const senderEmail: string = req.body.senderEmail;
            const receiverEmail: string = req.body.receiverEmail;
            const fileName: string = req.file.originalname;

            const sharedUserPath: string = `C:/Users/Affan/Desktop/react_electsign/backend/storage/${receiverEmail}/${fileName}`;
            const userPath: string = req.file.path;

            await SharedDocumentRepo.shareDocument({ senderEmail: senderEmail, receiverEmail: receiverEmail, fileName: fileName });

            fs.copyFile(userPath, sharedUserPath, (err) => { console.log(err) });

            res.status(200).json({
                message: `Document shared succesfully`
            })
        } catch (err) {
            res.status(500).json({
                message: `Could not share document ${err}`
            })
        }
    }

    async getSharedDocument(req: Request, res: Response) {
        try {
            const userEmail: string = req.params.userEmail;
            const fileName: string = req.params.fileName;

            res.sendFile(`C:/Users/Affan/Desktop/react_electsign/backend/storage/${userEmail}/${fileName}`);
        } catch (err) {
            res.status(500).json({
                message: `Could not get document ${err}`
            })
        }
    }

    async getSharedDocumentsNames(req: Request, res: Response) {
        try {
            const receiverEmail: string = req.params.receiverEmail;

            const sharedDocumentsNames: string[] =
                await SharedDocumentRepo.getSharedDocumentNames({ receiverEmail: receiverEmail });

            res.status(200).json({
                message: 'Got shared documents names succesfully',
                data: sharedDocumentsNames
            })
        } catch (err) {
            res.status(500).json({
                message: `Could not get shared documents ${err}`
            })
        }
    }
}

export default new DocumentShareController;