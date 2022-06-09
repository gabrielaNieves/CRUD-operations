const fs = require('fs');
const path = require('path');

function findAll(){
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
return products
}
function writeFile(array){
    let string = JSON.stringify(array, null, 4)
    fs.writeFileSync(path.join(__dirname, "../data/productsDataBase.json"), string)
}


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		const products = findAll();
		res.render("products", {products: products})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const products = findAll()

        //busco el producto
        let productFound = products.find(function(product){
            return product.id == req.params.id
        })

        res.render("detail", {product: productFound});
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let products = findAll();
		console.log(req.file)
		let newProduct= {
			id: products.length + 1,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: req.file.filename
		}	

		products.push(newProduct);

		writeFile(products);

		res.redirect('/products')

		
	},

	// Update - Form to edit
	edit: (req, res) => {
		let products = findAll();

		let productFound = products.find(function(product){
            return product.id == req.params.id
        })

		res.render('product-edit-form', {product: productFound})
	},
	// Update - Method to update
	update: (req, res) => {
		let products = findAll();

		let productFound = products.find(function(product){
            return product.id == req.params.id
        })

		productFound.name = req.body.name;
		productFound.price = req.body.price;
		productFound.discount = req.body.discount;
		productFound.category = req.body.category;
		productFound.description = req.body.description;

		writeFile(products);

		res.redirect('/products')
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let products = findAll();

		let productIndex = products.findIndex(function(product){
			return product.id == req.params.id
		})

		products.splice(productIndex, 1)

		writeFile(products)

		res.redirect('/products')
	}
	


};

module.exports = controller;