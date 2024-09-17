import { Entity, PrimaryKey, Property, OneToMany, Collection, ManyToOne, ManyToMany, EntityManager } from "@mikro-orm/core";
import { Product } from "./Product";
import { Storefront } from "./Storefront";


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

  // @OneToMany(() => Card, card => card.user)
  // cards = new Collection<Card>(this);

  // @OneToMany(() => Wallet, wallet => wallet.user)
  // wallets = new Collection<Wallet>(this);

  // @OneToMany(() => Transaction, transaction => transaction.sendingUser)
  // transactions = new Collection<Transaction>(this);


  constructor(firstname: string, lastname: string, username: string, email: string, passwordHash: string) {
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.passwordHash = passwordHash;
  }

}