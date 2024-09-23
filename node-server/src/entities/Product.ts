import { Entity, PrimaryKey, Property, OneToMany, Collection, ManyToOne, EntityManager, ManyToMany, OneToOne } from "@mikro-orm/core";
import { Storefront } from "./Storefront";
import { Tag } from "./Tag";
import { ProductLink } from "./ProductLink";

//TODO : handle product variations?

@Entity()
export class Product {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ type: 'json' })
  images!: string[];

  @Property({ type: 'blob' })
  threeDModel?: Buffer;

  @Property()
  description!: string;

  @Property()
  quantity!: number;

  @Property()
  price!: number;

  @ManyToOne(() => Storefront)
  storefront!: Storefront;

  @OneToOne(() => ProductLink, productLink => productLink.product, { owner: true })
 link?: ProductLink 

  @ManyToMany(() => Tag, tag => tag.products)
  tags = new Collection<Tag>(this);

  constructor(storefront: Storefront, name: string, price: number, images: string[], description: string, quantity: number, tagNames: string[], em: EntityManager) {
    this.storefront = storefront;
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.images = images;
    this.price = price;

    tagNames.forEach(async (tagName) => {
      let tag = await em.findOne(Tag, { name: tagName });

      if (!tag) {
        tag = new Tag();
        tag.name = tagName;
        await em.persistAndFlush(tag);
      }

      this.tags.add(tag);
    });
  }
}
