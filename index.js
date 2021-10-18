const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const fileUpload = require("express-fileupload"); // declare this for file upload
const port = 5000;
const dbName = "electroUser";
const dbPass = "DPZk6w8yqqqOLe9T";

const uri = `mongodb+srv://${dbName}:${dbPass}@cluster0.y25ks.mongodb.net/${"electroDb"}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.use(cors());
app.use(bodyParser.json());
// need to initialize the file upload
app.use(express.static("products"));
app.use(fileUpload());

client.connect((err) => {
	const productDB = client.db("electroDb").collection("electro");

	app.post("/addProduct", (req, res) => {
		let number = Math.random() * 10000000000;
		let floorNumber = Math.floor(number);

		const category = req.body.category;
		const brand = req.body.brand;
		const name = req.body.name;
		const price = req.body.price;
		const imageOne = req.files.imageOne;
		const imageTwo = req.files.imageTwo;
		const imageThree = req.files.imageThree;
		const criteria1 = req.body.criteria1;
		const criteria2 = req.body.criteria2;
		const criteria3 = req.body.criteria3;
		const criteria4 = req.body.criteria4;
		const criteria5 = req.body.criteria5;
		const criteria6 = req.body.criteria6;
		const criteria7 = req.body.criteria7;
		const criteria8 = req.body.criteria8;
		const criteria9 = req.body.criteria9;
		const criteria10 = req.body.criteria10;
		const criteria11 = req.body.criteria11;
		const criteria12 = req.body.criteria12;
		const criteria13 = req.body.criteria13;
		const criteria14 = req.body.criteria14;
		const criteria15 = req.body.criteria15;
		const criteria16 = req.body.criteria16;
		const criteria17 = req.body.criteria17;

    const key = `${name}_${floorNumber}`;
		const imgOne = `${brand}_${imageOne.name}`;
		const imgTwo = `${brand}_${imageTwo.name}`;
		const imgThree = `${brand}_${imageThree.name}`;

		imageOne.mv(`${__dirname}/products/${brand}_${imageOne.name}`);
		imageTwo.mv(`${__dirname}/products/${brand}_${imageTwo.name}`);
		imageThree.mv(`${__dirname}/products/${brand}_${imageThree.name}`);

		productDB
			.insertOne({
				key,
				category,
				brand,
				name,
				price,
				imgOne,
				imgTwo,
				imgThree,
				criteria1,
				criteria2,
				criteria3,
				criteria4,
				criteria5,
				criteria6,
				criteria7,
				criteria8,
				criteria9,
				criteria10,
				criteria11,
				criteria12,
				criteria13,
				criteria14,
				criteria15,
				criteria16,
				criteria17
			})
			.then((result) => {
				res.send(result.insertedCount > 0);
			})
			.then((err) => {
				console.log(err);
			});
	});

	app.get('/allProduct',(req, res) => {
		productDB.find({}).toArray((err, documents) => {
			res.send(documents);
		});
	})
	app.get('/singleProduct/:id',(req, res) => {
		productDB.find({key: req.params.id}).toArray((err, documents) => {
			res.send(documents);
		});
	})
	app.get('/category/:name',(req, res) => {
		productDB.find({category: req.params.name}).toArray((err, documents) => {
			res.send(documents);
		});
	})

	app.get('/brand/:name',(req, res) => {
		productDB.find({brand: req.params.name}).toArray((err, documents) => {
			res.send(documents);
		})
	})
	app.get('/search/:name',(req, res) => {
		const collect = req.params.name;
		const regex = new RegExp(collect,'i');
		// console.log(regex,collect);
		productDB.find( { name: regex } ).toArray((err, documents) => {
			res.send(documents);
		})
	})
	console.log("Electro Connected");
});

app.get("/", (req, res) => {
	res.send("hello world");
});

app.listen(process.env.PORT || port);
