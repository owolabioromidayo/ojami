// @Entity()
// export class Card {
  
// @PrimaryKey()
// id!: number;

// @ManyToOne(() => User)
// user!: User;

// @OneToMany(() => Transaction, transaction => transaction.sendingCard)
// transactions = new Collection<Transaction>(this);

// @ManyToOne(() => Wallet, { nullable: true })
// wallet?: Wallet; 

// @ManyToOne(() => Storefront, { nullable: true })
// storefront?: Storefront;
// constructor(user: User, wallet?: Wallet, storefront?: Storefront) {
//     this.user = user;
//     this.wallet = wallet;
//     this.storefront = storefront;
// }
// }