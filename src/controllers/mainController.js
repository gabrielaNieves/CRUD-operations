const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let visited = products.filter(function(product){
return product.category == "visited"
})
let inSale = products.filter(function(product){
	return product.category == "in-sale"
	})


const controller = {
	index: (req, res) => {
		res.render("index", {visited: visited, inSale: inSale, toThousand})
	},
	search: (req, res) => {
		let keywords = req.query.keywords.toLowerCase();
		let searching = [];

		for (let i = 0; i < products.length; i++){
			if (products[i].name.toLowerCase().includes(keywords)){
				searching.push(products[i])
			}
		}
		res.render("results", {search: searching, vacio: "No hay coincidencias con tu búsqueda", toThousand})
	},
};

module.exports = controller;
