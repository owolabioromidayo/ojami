import { Entity, PrimaryKey, Property, ManyToOne, DecimalType, OneToOne } from "@mikro-orm/core";
import { User } from "./User"; 
import {  VoucherStatus } from "../types"; 


@Entity()
export class Voucher{

  @PrimaryKey()
  id!: number;

  @Property()
  voucherId!: string; 

  @Property()
  currency!: string;

  @Property({type: DecimalType})
  amount!: number;

  @Property()
  status!: VoucherStatus;

  @Property()
  createdAt = new Date();

  @ManyToOne(() => User) 
  owner!: User;

  @ManyToOne(() => User, { nullable: true }) 
  redeemer?: User;

  @Property()
  publicKey!: string; 

  @Property()
  signature!: string; 

  constructor(owner: User, amount: number, currency: string, voucherId: string, publicKey: string, signature: string) {
    this.status = VoucherStatus.VALID;
    this.amount = amount;
    this.currency = currency;
    this.owner = owner;
    this.voucherId = voucherId;
    this.publicKey = publicKey;
    this.signature = signature;
  }
}
