import { BaseModel } from "./base-model";

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE"
}

export enum Role {
    ROLE_USER = "ROLE_USER",
    ROLE_ADMIN = "ROLE_ADMIN",
    ROLE_EMPLOYEE = "ROLE_EMPLOYEE"
}

export interface User extends BaseModel {
    username: string;
    email: string;
    name?: string;
    phoneNumber?: string;
    gender?: Gender;
    dateOfBirth: Date;
    avatar?: string;
    roles: Role[];
    
}