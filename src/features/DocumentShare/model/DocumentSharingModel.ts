import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import { User } from "../../User/model/UserModel";


@Table({
    tableName: SharedDocument.TABLE_NAME
})

export class SharedDocument extends Model {
    public static TABLE_NAME = "shared_documents" as string;
    public static ID = "shared_document_id" as string;
    public static SENDER_EMAil = "shared_document_sender_email" as string;
    public static RECEIVER_EMAIL = "shared_document_receiver_email" as string;
    public static FILE_NAME = "shared_document_name" as string;

    @Column({
        type: DataType.INTEGER,
        field: SharedDocument.ID,
        autoIncrement: true,
        primaryKey: true,
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        field: SharedDocument.SENDER_EMAil,
        allowNull: false,
        references: { model: User.TABLE_NAME, key: User.EMAIL }
    })
    senderEmail!: string;

    @Column({
        type: DataType.STRING,
        field: SharedDocument.RECEIVER_EMAIL,
        allowNull: false,
        references: { model: User.TABLE_NAME, key: User.EMAIL }
    })
    receiverEmail!: string;

    @Column({
        type: DataType.TEXT,
        field: SharedDocument.FILE_NAME,
        allowNull: false,
    })
    fileName!: string;
}

