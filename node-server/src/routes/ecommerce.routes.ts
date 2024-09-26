

//PRODUCT VARIANTS?



//get product

// get products as admin

// get products in category (paginated)

//get products from store

//remove product

// tickets


//TODO: the catch errors are not capturing the full range of ORM failures


import express, { Request, Response } from "express";
import { RequestWithContext } from "../types";
import { Storefront } from "../entities/Storefront";
import { Product } from "../entities/Product";
import { Order } from "../entities/Order";
import { User } from "../entities/User";
import { Cart } from "../entities/Cart"; 
import { CartItem } from "../entities/CartItem";
import { serialize } from "v8";
import { isAuth } from "../middleware/isAuth";

const router = express.Router();

//TODO: more CRUD routes, emphasis on U and D

// Storefront Routes
router.post("/storefronts", isAuth,  createStorefront);
//TODO: do we want storefronts to be indexed by id or name? 
router.get("/storefronts/:id", getStorefront);
router.get("/storefronts/:id/products", getAllProductsFromStorefront);
router.get("/storefronts", getAllStorefronts);


// Product Routes
router.post("/products", isAuth, createProduct);
router.get("/products", getAllProducts);
router.get("/products/:id", getProduct);

// Order Routes
router.post("/orders", isAuth,  createOrder);
router.get("/orders/me/", isAuth,  getUserOrders);
router.get("/orders/:id", isAuth, getOrder);

// Cart Routes
router.post("/carts", isAuth, createCart);
router.get("/carts/me", isAuth, getUserCart);
router.post("/carts/add", isAuth, addToCart);
router.post("/carts/remove", isAuth, removeFromCart);


//dispute order, refund, and the like

//TODO: cart checkout (update product stock count, push to payin/checkout link)

//TODO: fix error responses


async function createStorefront(req: Request, res: Response) {
    const { storename,  description , tags } = req.body;

    const em = (req as RequestWithContext).em;


    try {
        const user = await em.fork({}).findOneOrFail(User, { id: req.session.userid  });
        const storefront = new Storefront(user, storename, description, tags, em);

        await em.fork({}).persistAndFlush(storefront);

        //TODO: add potential extra fields

        return res.status(201).json({ storefront });
    } catch (err) {
        return res.status(500).json({ errors: [{ field: 'storefront', message: 'Could not create storefront', error: err }] });
    }
}

async function getStorefront(req: Request, res: Response) {

    const id  = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ errors: [{ field: 'id', message: 'Invalid ID' }] });
    }


    const em = (req as RequestWithContext).em;

    try {
        //TODO : do we want to populate with products in the req?

        const storefront = await em.fork({}).findOneOrFail(Storefront, { id: Number(id) });
        return res.status(200).json({ storefront });
    } catch (err) {
        return res.status(404).json({ errors: [{ field: 'storefront', message: 'Storefront not found' }] });
    }
}

async function getAllStorefronts(req: Request, res: Response) {
    const em = (req as RequestWithContext).em;

    try {
        const storefronts = await em.fork({}).find(Storefront, {});
        return res.status(200).json({ storefronts });
    } catch (err) {
        return res.status(500).json({ errors: [{ field: 'storefronts', message: 'Could not fetch storefronts', error: err }] });
    }
}

async function createProduct(req: Request, res: Response) {

    const { name, images, description, tags } = req.body;

    const storefrontId = Number(req.body.storefrontId);
    const quantity = Number(req.body.quantity);
    const price = Number(req.body.price);


    if (isNaN(storefrontId)) {
        return res.status(400).json({ errors: [{ field: 'storefrontId', message: 'Invalid Storefront ID' }] });
    }

    if (isNaN(quantity)) {
        return res.status(400).json({ errors: [{ field: 'quantity', message: 'Invalid quantity value' }] });
    }

    if (isNaN(storefrontId)) {
        return res.status(400).json({ errors: [{ field: 'price', message: 'Invalid price value' }] });
    }

    const em = (req as RequestWithContext).em;

    try {
        const user = await em.fork({}).findOneOrFail(User, { id: req.session.userid  });
        const storefront = await em.fork({}).findOneOrFail(Storefront, { id: storefrontId }, {populate: ["user"]} );

        //confirm that store belonds to user first
        if(!(user.id === storefront.user.id)) {
            return res.status(401).json({ errors: [{ field: 'auth', message: 'Not authenticated' }] });
        }

        const product = new Product(storefront, name, price , images, description, quantity, tags, em);
        await em.fork({}).persistAndFlush(product);
        return res.status(201).json({ product });
    } catch (err) {
        return res.status(500).json({ errors: [{ field: 'product', message: 'Could not create product', error: err }] });
    }
}

async function getProduct(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ errors: [{ field: 'id', message: 'Invalid ID' }] });
    }

    const em = (req as RequestWithContext).em;

    try {
        //TODO: what do we need to populate?
        const product = await em.fork({}).findOneOrFail(Product, { id });
        return res.status(200).json({ product });
    } catch (err) {
        return res.status(404).json({ errors: [{ field: 'product', message: 'Product not found' }] });
    }
}

async function getAllProducts(req: Request, res: Response) {
    const em = (req as RequestWithContext).em;

    try {
        const products = await em.fork({}).find(Product, {});
        return res.status(200).json({ products });
    } catch (err) {
        return res.status(500).json({ errors: [{ field: 'products', message: 'Could not fetch products', error: err }] });
    }
}


async function getAllProductsFromStorefront(req: Request, res: Response) {
    //TODO: make paginated? optimize which fields we are populating?

    const storefrontId  = Number(req.params.id); 

    if (isNaN(storefrontId)) {
        return res.status(400).json({ errors: [{ field: 'id', message: 'Invalid ID' }] });
    }

    const em = (req as RequestWithContext).em;

    try {
        // Find the storefront by ID
        const storefront = await em.fork({}).findOneOrFail(Storefront, { id: storefrontId });

        // Fetch products associated with the storefront
        const products = await em.fork({}).find(Product, { storefront });

        return res.status(200).json({ products });
    } catch (err) {
        return res.status(404).json({ errors: [{ field: 'storefront', message: 'Storefront not found or has no products' }] });
    }
}

async function createOrder(req: Request, res: Response) {

    const count = Number(req.body.count);
    const productId = Number(req.body.productId);
    const fromUserId = Number(req.body.fromUserId);

    if (isNaN(count)) {
        return res.status(400).json({ errors: [{ field: 'count', message: 'Invalid count value' }] });
    }
    if (isNaN(productId)) {
        return res.status(400).json({ errors: [{ field: 'productId', message: 'Invalid product id' }] });
    }
    if (isNaN(fromUserId)) {
        return res.status(400).json({ errors: [{ field: 'fromUserId', message: 'Invalid from user id' }] });
    }

    const em = (req as RequestWithContext).em;

    try {
        const product = await em.fork({}).findOneOrFail(Product, { id: productId }, {populate: ['storefront']});
        const storefront = await em.fork({}).findOneOrFail(Storefront, { id: product.storefront.id } );
        const fromUser = await em.fork({}).findOneOrFail(User, { id: fromUserId });
        const toUser = await em.fork({}).findOneOrFail(User, { id: Number(req.session.id)});
        
        if (product.quantity < count) {
            return res.status(400).json({ errors: [{ field: 'quantity', message: 'Not enough stock' }] });
        }

        const order = new Order(product, count, storefront, fromUser, toUser, 'pending');
        await em.fork({}).persistAndFlush(order);
        return res.status(201).json({ order });
    } catch (err) {
        return res.status(500).json({ errors: [{ field: 'order', message: 'Could not create order', error: err }] });
    }
}

async function getOrder(req: Request, res: Response) {

    const id  = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ errors: [{ field: 'id', message: 'Invalid ID' }] });
    }
    

    const em = (req as RequestWithContext).em;

    try {
        const order = await em.fork({}).findOneOrFail(Order, { id: Number(id) });

        if (order.fromUser.id !== id || order.toUser.id !== id ) {
            return res.status(401).json({ errors: [{ field: 'auth', message: 'Not authorized' }] });
        }

        return res.status(200).json({ order });
    } catch (err) {
        return res.status(404).json({ errors: [{ field: 'order', message: 'Order not found' }] });
    }
}

async function getUserOrders(req: Request, res: Response) {

    const em = (req as RequestWithContext).em;

    try {
        const orders = await em.fork({}).find(Order, { toUser: Number(req.session.userid) });

        return res.status(200).json({ orders });
    } catch (err) {
        return res.status(500).json({ errors: [{ field: 'orders', message: 'Could not fetch orders for this user', error: err }] });
    }
}

// Cart Functions

async function createCart(req: Request, res: Response) {

    const em = (req as RequestWithContext).em;

    try {
        // Check if the cart already exists for the user
        const user = await em.fork({}).findOneOrFail(User, { id: Number(req.session.userid) });
        let cart = await em.fork({}).findOne(Cart, { user});

        if (!cart) {
            cart = new Cart(user); 
            await em.fork({}).persistAndFlush(cart);
        }

        return res.status(201).json({ cart });
    } catch (err) {
        return res.status(500).json({
            errors: [{ field: "cart", message: "Could not create or retrieve cart", error: err }],
        });
    }
}

async function getUserCart(req: Request, res: Response) {

    const em = (req as RequestWithContext).em;

    try {
        const user = await em.fork({}).findOneOrFail(User, { id: Number(req.session.userid) });
        const cart = await em.fork({}).findOneOrFail(Cart, { user }, {populate: ["items"]});

        let totalPrice = cart.items.getItems().reduce((total, item: CartItem) => {
            if (item.product && typeof item.product.price == 'number') { 
                return total + (item.quantity * item.product.price);
            }
            return total;
        }, 0);

        return res.status(200).json({ cart, totalPrice });
    } catch (err) {
        return res.status(404).json({
            errors: [{ field: "cart", message: "Cart not found for this user" }],
        });
    }
}

async function addToCart(req: Request, res: Response) {

    const productId = Number(req.body.productId);
    const quantity= Number(req.body.productId);
    
    if (isNaN(productId)) {
        return res.status(400).json({ errors: [{ field: 'productId', message: 'Invalid product ID' }] });
    }

    if (isNaN(quantity)) {
        return res.status(400).json({ errors: [{ field: 'quantity', message: 'Invalid quantity value' }] });
    }

    const em = (req as RequestWithContext).em;

    try {

        const user = await em.fork({}).findOneOrFail(User, { id: Number(req.session.userid) });
        const product = await em.fork({}).findOneOrFail(Product, { id: productId });
        let cart = await em.fork({}).findOneOrFail(Cart, { user  });

        let existingItem = cart.items.find(item => item.product.id === productId);  

        if (existingItem) {
            existingItem.quantity += quantity; 
            if (existingItem.quantity > product.quantity) {
                return res.status(400).json({ errors: [{ field: 'quantity', message: 'Not enough stock' }] });
            }
            await em.fork({}).persistAndFlush(existingItem);
        } else {
            let newCartItem = new CartItem(cart, product, quantity); 
            cart.items.add(newCartItem); 
            await em.fork({}).persistAndFlush([cart, newCartItem]);
        }


        return res.status(200).json({ cart });
    } catch (err) {
        return res.status(500).json({
            errors: [{ field: "cart", message: "Could not add item to cart", error: err }],
        });
    }
}

async function removeFromCart(req: Request, res: Response) {

    const productId = Number(req.body.productId);

    const em = (req as RequestWithContext ).em;

    try {
        const user = await em.fork({}).findOneOrFail(User, { id: Number(req.session.userid) });
        let cart = await em.fork({}).findOneOrFail(Cart, { user});
        let itemToRemove = cart.items.find(item => item.product.id === productId);

        if (!itemToRemove) {
            return res.status(404).json({
                errors: [{ field: "cart", message: "Item not found in cart" }],
            })
        }

        cart.items.remove(itemToRemove); // Remove item from collection

        await em.fork({}).persistAndFlush(cart);

        return res.status(200).json({ cart });
    }
    catch (err) {
        return res.status(500).json({
            errors: [{ field: "cart", message: "Could not remove item from cart", error: err }],
        })
    }
}



export default router;