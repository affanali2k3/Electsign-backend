import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript";


@Table({
    tableName: User.TABLE_NAME
})

export class User extends Model {
    public static TABLE_NAME = "users" as string;
    public static ID = "user_id" as string;
    public static EMAIL = "user_email" as string;


    @Column({
        type: DataType.INTEGER,
        field: User.ID,
        autoIncrement: true,
        primaryKey: true,
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        field: User.EMAIL,
        allowNull: false,
        unique: true
    })
    email!: string;
}

