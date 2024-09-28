import { Entity, PrimaryKey, Property, OneToMany, Collection, ManyToOne, ManyToMany, EntityManager } from "@mikro-orm/core";
import { User } from "./User";
import { Product } from "./Product";
import { Tag } from "./Tag";

@Entity()
export class Storefront {
  @PrimaryKey()
  id!: number;

  @Property()
  storename!: string;

  @Property()
  profileImageUrl?: string;

  @Property()
  bannerImageUrl?: string;

  @Property()
  description!: string;

  @Property()
  ratings = []

  @ManyToOne(() => User)
  user!: User;

  @OneToMany(() => Product, product => product.storefront)
  products = new Collection<Product>(this);

  @Property()
  //TODO: need better bookkeeping than this
  salesCount: number = 0; // Track total sales

  @ManyToMany(() => Tag, tag => tag.storefronts)
  tags = new Collection<Tag>(this);


  constructor(user: User, storename: string, description: string) {
    this.user = user;
    this.storename = storename;
    this.description = description;
  }
}