import { Entity, PrimaryKey, Property } from "@mikro-orm/core";


@Entity()
export class User {

  @PrimaryKey()
  id!: number;

  @Property()
  createdAt = new Date();

  @Property({ unique: true, length: 60 })
  username!: string;

  @Property({ length: 60 })
  firstname: string;

  @Property({ length: 60 })
  lastname: string;

  @Property({ unique: true, length: 120 })
  email!: string;

  @Property({ hidden: true })
  passwordHash!: string;

  @Property()
  isDisabled = false;

  @Property()
  profileImgUrl = "https://i.imgur.com/OQENGf1.jpeg";


  constructor(firstname: string, lastname: string, username: string, email: string, passwordHash: string) {
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.passwordHash = passwordHash;
  }

}