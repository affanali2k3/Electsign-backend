import { SharedDocument } from "../model/DocumentSharingModel";

interface IShareDocumentRepo {
    shareDocument({ senderEmail, receiverEmail, fileName }: { senderEmail: string, receiverEmail: string, fileName: string }): Promise<void>
    getSharedDocumentNames({ receiverEmail }: { receiverEmail: string }): Promise<string[]>
}

class SharedDocumentRepo implements IShareDocumentRepo {
    async shareDocument({ senderEmail, receiverEmail, fileName }: { senderEmail: string, receiverEmail: string, fileName: string }): Promise<void> {
        try {
            const sharedDocument = new SharedDocument();

            sharedDocument.senderEmail = senderEmail;
            sharedDocument.receiverEmail = receiverEmail;
            sharedDocument.fileName = fileName;

            await sharedDocument.save();
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    async getSharedDocumentNames({ receiverEmail }: { receiverEmail: string }): Promise<string[]> {
        try {
            const sharedDocumentsNames: string[] = (await SharedDocument.findAll({
                where: { receiverEmail: receiverEmail },
                attributes: [SharedDocument.FILE_NAME],
            })).map(sharedDocument => sharedDocument.dataValues.shared_document_name);

            return sharedDocumentsNames;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }


}

export default new SharedDocumentRepo;