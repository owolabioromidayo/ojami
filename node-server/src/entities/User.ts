import { Entity, PrimaryKey, Property, OneToMany, Collection, OneToOne, ManyToOne, ManyToMany, EntityManager } from "@mikro-orm/core";
import { Storefront } from "./Storefront";
import { VirtualAccount } from "./VirtualAccount";
import { Transaction } from "./Transaction";
import { KYC } from "./KYC";
import { KYB } from "./KYB";
import { VirtualWallet } from "./VirtualWallet";


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


  @OneToMany(() => Storefront, storefront => storefront.user)
  storefronts = new Collection<Storefront>(this);

  // @OneToOne(() => VirtualAccount, virtualAccount => virtualAccount.user, { owner: true })
  // virtualAccount?: VirtualAccount;

  @OneToOne(() => VirtualAccount, virtualAccount => virtualAccount.user, { owner: true })
  virtualWallet = new VirtualWallet(this);

  @OneToOne(() => KYC, kyc => kyc.user, { owner: true })
  KYC?: KYC;

  @OneToOne(() => KYB, kyb => kyb.user, { owner: true })
  KYB?: KYB;

  @OneToMany(() => Transaction, transaction => transaction.sendingUser)
  transactions = new Collection<Transaction>(this);


  constructor(firstname: string, lastname: string, username: string, email: string, passwordHash: string) {
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.passwordHash = passwordHash;
  }

}