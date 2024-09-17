// from which card / wallet, to which other card / wallet


// @Entity()
// export class Transaction {

//     @PrimaryKey()
//     id!: number;

//     @ManyToOne(() => User)
//     sendingUser!: User;

//     @ManyToOne(() => User)
//     receivingUser!: User;

//     @ManyToOne(() => Card, { nullable: true })
//     sendingCard?: Card; 

//     @ManyToOne(() => Wallet, { nullable: true })
//     sendingWallet?: Wallet; 

//     @ManyToOne(() => Card, { nullable: true })
//     receivingCard?: Card; /

//     @ManyToOne(() => Wallet, { nullable: true })
//     receivingWallet?: Wallet;

//     @ManyToOne(() => Storefront, { nullable: true })
//     storefront?: Storefront; 

//     @ManyToOne(() => Order, { nullable: true })
//     order?: Order;

//     constructor(sendingUser: User, receivingUser: User,
//         sendingCard?: Card,
//         sendingWallet?: Wallet,
//         receivingCard?: Card,
//         receivingWallet?: Wallet,
//         storefront?: Storefront,
//         order?: Order) {
//         this.sendingUser = sendingUser;
//         this.receivingUser = receivingUser;
//         this.sendingCard = sendingCard;
//         this.sendingWallet = sendingWallet;
//         this.receivingCard = receivingCard;
//         this.receivingWallet = receivingWallet;
//         this.storefront = storefront;
//         this.order = order;
//     }
// }