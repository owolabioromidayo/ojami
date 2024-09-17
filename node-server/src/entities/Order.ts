import { Entity, PrimaryKey, Property, OneToMany, Collection, ManyToOne, ManyToMany, EntityManager } from "@mikro-orm/core";

import {Product} from './Product';
import {Storefront} from './Storefront';
import {User} from './User';


@Entity()
export class Order {

    @PrimaryKey()
    id!: number;

    @ManyToOne(() => Product)
    product!: Product;

    @Property()
    count!: number;

    @ManyToOne(() => Storefront)
    storefront!: Storefront;

    @ManyToOne(() => User)
    fromUser!: User;

    @ManyToOne(() => User)
    toUser!: User;

    // Order status can be an enum or a simple string
    @Property()
    status!: 'pending' | 'completed' | 'canceled';

    constructor(product: Product, count: number,
        storefront: Storefront,
        fromUser: User,
        toUser: User,
        status: 'pending' | 'completed' | 'canceled') {
        this.product = product;
        this.count = count;
        this.storefront = storefront;
        this.fromUser = fromUser;
        this.toUser = toUser;
        this.status = status;
    }
}