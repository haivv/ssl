require('dotenv').config(); //load environment parameters from .env file
var express = require('express');
var router = express.Router();
var database = require('../database');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
var bodyParser = require("body-parser");
const fs = require('fs');
var database = require('../database');
var multer = require('multer');

//Read .env file to get accessKey
const dotenv = require('dotenv');
const path = require('path');
const { title } = require('process');
//dotenv.config({ path: path.join(__dirname, '../config', '.env') });

let accessToken = null;
var accessTokenExp = '3600s'; //  Access Token 만료
const refreshTokenExp = '1d'; //  Refresh Token 만료
const accesssecretKey = "simg1";
const refreshsecretKey = "simg2";

let loginResult = '';
let addResult = '';
let delResult = '';

// Config multer to save imgs into uploads
// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, path.join(__dirname, '../public/uploads'));
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, Date.now() + '-' + file.originalname);
// 	}
// });
// const upload = multer({ storage: storage });

// Endpoint to upload image
// router.post('/upload', upload.single('upload'), (req, res) => {
// 	const file = req.file;
// 	if (!file) {
// 		console.error('No file uploaded');
// 		return res.status(400).json({ error: { message: 'No file uploaded' } });
// 	}
// 	console.log(`File uploaded: ${file.filename}`);
// 	res.status(200).json({
// 		uploaded: true,
// 		url: `/uploads/${file.filename}`
// 	});
// });


// //////// // SET STORAGE news
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '../public/uploads/news'));
	},
	filename: (req, file, cb) => {
		var today = new Date();
		var year = today.getFullYear();
		var month = ('0' + (today.getMonth() + 1)).slice(-2);
		var day = ('0' + today.getDate()).slice(-2);
		var dateString = year + '-' + month + '-' + day;
		file.originalname = dateString + '_' + Buffer.from(file.originalname, 'latin1').toString('utf8');

		cb(null, file.originalname);
	}
});

const upload = multer({ storage: storage });

// Endpoint to upload image
router.post('/upload_news', upload.single('myfile'), (req, res) => {
	const file = req.file;
	if (!file) {
		console.error('No file uploaded');
		return res.status(400).json({ error: { message: 'No file uploaded' } });
	}

});


//// END SET STORAGE news

//////// // SET STORAGE PATCER
const storage_patcer = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '../public/uploads/patcer'));
	},
	filename: (req, file, cb) => {
		var today = new Date();
		var year = today.getFullYear();
		var month = ('0' + (today.getMonth() + 1)).slice(-2);
		var day = ('0' + today.getDate()).slice(-2);
		var dateString = year + '-' + month + '-' + day;
		file.originalname = dateString + '_' + Buffer.from(file.originalname, 'latin1').toString('utf8');

		cb(null, file.originalname);
	}
});

const upload_patcer = multer({ storage: storage_patcer });

// Endpoint to upload image
router.post('/upload_patcer', upload_patcer.single('myfile'), (req, res) => {
	const file = req.file;
	if (!file) {
		console.error('No file uploaded');
		return res.status(400).json({ error: { message: 'No file uploaded' } });
	}

});


////// END SET STORAGE PATCER

// //////// // SET STORAGE CLIENT
var storage_client = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, './public/uploads/client');
	},
	filename: function (req, file, callback) {
		var today = new Date();
		var year = today.getFullYear();
		var month = ('0' + (today.getMonth() + 1)).slice(-2);
		var day = ('0' + today.getDate()).slice(-2);
		var dateString = year + '-' + month + '-' + day;
		file.originalname = dateString + '_' + Buffer.from(file.originalname, 'latin1').toString('utf8');
		callback(null, file.originalname);
	}
});
var upload_client = multer({ storage: storage_client }).single('myfile');
router.post('/upload_client', (req, res) => {
	upload_client(req, res, function (err) {
		if (err) {
			return res.end("Error uploading file.");
		}
		else {
		}
	});

});

////// END SET STORAGE PATCER


// //////// // SET STORAGE PARTNERSHIP
var storage_partnership = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, './public/uploads/partnership');
	},
	filename: function (req, file, callback) {
		var today = new Date();
		var year = today.getFullYear();
		var month = ('0' + (today.getMonth() + 1)).slice(-2);
		var day = ('0' + today.getDate()).slice(-2);
		var dateString = year + '-' + month + '-' + day;
		file.originalname = dateString + '_' + Buffer.from(file.originalname, 'latin1').toString('utf8');
		callback(null, file.originalname);
	}
});
var upload_partnership = multer({ storage: storage_partnership }).single('myfile');
router.post('/upload_partnership', (req, res) => {
	upload_partnership(req, res, function (err) {
		if (err) {
			return res.end("Error uploading file.");
		}
		else {
		}
	});

});

////// END SET STORAGE PARTNERSHIP

// //////// // SET STORAGE Product

var storage_product = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, './public/uploads/product');
	},
	filename: function (req, file, callback) {
		var today = new Date();
		var year = today.getFullYear();
		var month = ('0' + (today.getMonth() + 1)).slice(-2);
		var day = ('0' + today.getDate()).slice(-2);
		var dateString = year + '-' + month + '-' + day;
		file.originalname = dateString + '_' + Buffer.from(file.originalname, 'latin1').toString('utf8');
		callback(null, file.originalname);
	}
});
var upload_product1 = multer({ storage: storage_product }).single('myfile1');
router.post('/upload_product1', (req, res) => {
	upload_product1(req, res, function (err) {
		if (err) {
			return res.end("Error uploading file.");
		}
		else {
		}
	});

});


var upload_product2 = multer({ storage: storage_product }).single('myfile2');
router.post('/upload_product2', (req, res) => {
	upload_product2(req, res, function (err) {
		if (err) {
			return res.end("Error uploading file.");
		}
		else {
		}
	});

});

var upload_product3 = multer({ storage: storage_product }).single('myfile3');
router.post('/upload_product3', (req, res) => {
	upload_product3(req, res, function (err) {
		if (err) {
			return res.end("Error uploading file.");
		}
		else {
		}
	});

});

var upload_product4 = multer({ storage: storage_product }).single('myfile4');
router.post('/upload_product4', (req, res) => {
	upload_product4(req, res, function (err) {
		if (err) {
			return res.end("Error uploading file.");
		}
		else {
		}
	});

});

var upload_product5 = multer({ storage: storage_product }).single('myfile5');
router.post('/upload_product5', (req, res) => {
	upload_product5(req, res, function (err) {
		if (err) {
			return res.end("Error uploading file.");
		}
		else {
		}
	});

});

//// END SET STORAGE PRODUCT


/* GET home page. */
router.get('/', function (req, res, next) {
	if (!req.session.sesLog) {
		res.render('admin/admin_login', { title: 'Express' });
		// res.redirect('/');
	} else {


	}
});

router.post('/check-login', (req, res) => {
	// admin/123456
	const { txtuser, txtpass } = req.body;
	const username = txtuser;
	const password = txtpass;
	const new_password = crypto.createHash('md5').update(password).digest('hex');
	// console.log(password);
	// res.send(username);
	//	console.log(new_password);
	const query = `SELECT * FROM user WHERE username="${username}" AND password="${new_password}"`;

	//console.log(query);
	database.query(query, function (error, data) {
		if (error) {
			throw error;
		} else {
			var total_records = data.length;
			if (total_records > 0) {
				loginResult = { message: 'Login success' };

				// Create token
				const payload = { username };

				//const secretKey ="test";
				accessToken = jwt.sign(payload, accesssecretKey, { expiresIn: accessTokenExp });
				refreshToken = jwt.sign(payload, refreshsecretKey, { expiresIn: refreshTokenExp });
				
				//	res.status(200).json({ success: true, message: 'Login successful' });
				res.redirect('/admin/manage');

			} else {
				loginResult = { message: 'login fail' };
				//res.status(401).json({ success: false, message: 'Invalid username or password' });
				res.redirect('/admin');
			}
		}
	});
});

router.get('/accessTokenCheck', (req, res) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {
				const username = decoded.username;
				//res.send(`Login successful - Username: ${username}`);
				res.status(200).json({ message: 'Login success', username });
			}
		});
	} catch (error) {
		
		//res.send('Login fail');
		// res.status(400).json({ message: 'Login fail' });
	}

});

// ========================================== CATEGORY MANAGE =========================================

router.get('/manage', (req, res) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {

	var sql = "SELECT * FROM category ORDER BY cat_id DESC";
	// res.send(sql);
	database.query(sql, function (error, dataCate) {
		if (error) {
			throw error;
		}
		else {
			res.render('admin/admin-manage', { title: 'Category Manage', dataCate });
		}
	});

			}
		});
	} catch (error) {
		//res.send('Login fail');
		//res.status(400).json({ message: 'Login fail' });
		
		res.redirect('/admin');
	}

});

router.get('/cat_edit/:cat_id', (req, res) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {

	var cat_id = req.params.cat_id;
	var sql = `SELECT * FROM category WHERE cat_id= "${cat_id}"`;
	// res.send(sql);
	database.query(sql, function (error, dataCate) {
		if (error) {
			throw error;
		}
		else {
			res.render('admin/cat-edit', { title: 'Category', dataCate, cat_id });
		}
	});

			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});

router.post('/cat_proUpdate', function (req, res, next) {
	const { cat_id, cat_title } = req.body;
	var sql = `
	UPDATE category 
	SET cat_title = ?
	WHERE cat_id = "${cat_id}"
	`;
	database.query(sql, [cat_title], function (error, data) {

		if (error) {
			res.redirect('/admin/error');
		}
		else {
			res.redirect('/admin/manage');
		}
	});

});

router.get('/cat_delete/:cat_id', (req, res) => {
	// try {
	// 	jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
	// 		if (err) {
	// 			throw new Error('Invalid access token');
	// 		} else {

	var cat_id = req.params.cat_id;
	var sql = `DELETE FROM category WHERE cat_id= "${cat_id}"`;
	// res.send(sql);
	database.query(sql, function (error, dataCate) {
		if (error) {
			throw error;
		}
		else {
			res.redirect('/admin/manage');
		}
	});

	// 		}
	// 	});
	// } catch (error) {
	// 	//res.send('Login fail');
	// 	res.status(400).json({ message: 'Login fail' });
	// }

});

router.get('/cat-add', (req, res) => {
	// try {
	// 	jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
	// 		if (err) {
	// 			throw new Error('Invalid access token');
	// 		} else {
	res.render('admin/cat-add', { title: 'Category Add' });
	// 		}
	// 	});
	// } catch (error) {
	// 	//res.send('Login fail');
	// 	res.status(400).json({ message: 'Login fail' });
	// }

});


router.post('/cat-proAdd', (req, res) => {
	// try {
	// 	jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
	// 		if (err) {
	// 			throw new Error('Invalid access token');
	// 		} else {

	const { cat_title } = req.body;
	var sql = `
				INSERT INTO category
				(cat_title)
				VALUES (?)`;
	// res.send(sql);
	database.query(sql, [cat_title], function (error, data) {
		if (error) {
			throw error;
		}
		else {
			res.redirect('/admin/manage');
		}
	});

	// 		}
	// 	});
	// } catch (error) {
	// 	//res.send('Login fail');
	// 	res.status(400).json({ message: 'Login fail' });
	// }

});


// ========================================== END CATEGORY MANAGE =========================================



// ========================================== USER MANAGE =================================================
router.get('/user', (req, res) => {
	// try {
	// 	jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
	// 		if (err) {
	// 			throw new Error('Invalid access token');
	// 		} else {

	var sql = "SELECT * FROM user ORDER BY user_id DESC";
	// res.send(sql);
	database.query(sql, function (error, dataUser) {
		if (error) {
			throw error;
		}
		else {
			res.render('admin/user-manage', { title: 'User Manage', dataUser });
		}
	});

	// 		}
	// 	});
	// } catch (error) {
	// 	//res.send('Login fail');
	// 	res.status(400).json({ message: 'Login fail' });
	// }

});



router.get('/user-add', (req, res) => {
	// try {
	// 	jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
	// 		if (err) {
	// 			throw new Error('Invalid access token');
	// 		} else {
	res.render('admin/user-add', { title: 'User Add', mes: '' });
	// 		}
	// 	});
	// } catch (error) {
	// 	//res.send('Login fail');
	// 	res.status(400).json({ message: 'Login fail' });
	// }

});


router.post('/user-proAdd', (req, res) => {
	// try {
	// 	jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
	// 		if (err) {
	// 			throw new Error('Invalid access token');
	// 		} else {

	const { txtuser, txtpass } = req.body;
	const username = txtuser;
	const password = txtpass;	//Default: Simg@123

	const new_password = crypto.createHash('md5').update(password).digest('hex');


	var sql1 = `SELECT username FROM user WHERE username="${username}"`;

	database.query(sql1, function (error, data) {
		if (error) {
			throw error;
		}
		else {
			var total_records = data.length;
			if (total_records == 0) {


				var sql2 = `
				INSERT INTO user
				(username, password)
				VALUES (?,?)`;
				// res.send(sql);
				database.query(sql2, [username, new_password], function (error, data2) {
					if (error) {
						res.redirect('/admin/error');
					}
					else {
						res.redirect('/admin/user');
					}
				});
			}
			else {
				console.log("not ok");
				res.render('admin/user-add', { title: 'User Add', mes: `${username} 이미 사용 중인 ID입니다.	` })
			}

		}

	});

	// 		}
	// 	});
	// } catch (error) {
	// 	//res.send('Login fail');
	// 	res.status(400).json({ message: 'Login fail' });
	// }

});



router.get('/user_edit/:user_id', (req, res) => {
	// try {
	// 	jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
	// 		if (err) {
	// 			throw new Error('Invalid access token');
	// 		} else {


	var user_id = req.params.user_id;


	var sql = `SELECT * FROM user WHERE user_id= "${user_id}"`;
	// res.send(sql);
	database.query(sql, function (error, dataUser) {
		if (error) {
			throw error;
		}
		else {
			res.render('admin/user-edit', { title: 'User Edit', dataUser, user_id, mes: '' });
		}
	});

	// 		}
	// 	});
	// } catch (error) {
	// 	//res.send('Login fail');
	// 	res.status(400).json({ message: 'Login fail' });
	// }

});

router.post('/user_proUpdate', function (req, res, next) {
	const { txtuser, txtpass, user_id } = req.body;
	const username = txtuser;
	const password = txtpass;	//Default: Simg@123
	//console.log(password);

	const new_password = crypto.createHash('md5').update(password).digest('hex');

	var sql = `
	UPDATE user 
	SET username = ?,
	password = ?
	WHERE user_id = "${user_id}"
	`;
	database.query(sql, [username, password], function (error, data) {

		if (error) {
			throw error;
		}
		else {
			res.redirect('/admin/user');
		}
	});

});


router.get('/user_delete/:user_id', (req, res) => {
	// try {
	// 	jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
	// 		if (err) {
	// 			throw new Error('Invalid access token');
	// 		} else {


	var user_id = req.params.user_id;
	var sql = `DELETE FROM user WHERE user_id= "${user_id}"`;
	// res.send(sql);
	database.query(sql, function (error, dataUser) {
		if (error) {
			throw error;
		}
		else {
			res.redirect('/admin/user');
		}
	});

	// 		}
	// 	});
	// } catch (error) {
	// 	//res.send('Login fail');
	// 	res.status(400).json({ message: 'Login fail' });
	// }

});



// ========================================== END USER MANAGE ==============================================

// ========================================= NEWS MANAGE ===============================================

router.get('/news', (req, res, next) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {


	var page = 1;
	var sql = "SELECT * FROM news";
	database.query(sql, function (error, data) {
		if (error) {
			//throw error;
			res.render('error');
		}
		else {
			var per_page_record = 5;
			var total_records = data.length;
			var total_pages = Math.ceil(total_records / per_page_record);

			var start_from = (page - 1) * per_page_record;
			var sqlpage = `SELECT* FROM news ORDER BY news_date DESC LIMIT ${start_from}, ${per_page_record}`;

			database.query(sqlpage, function (error, dataNews) {
				if (error) {
					//throw error;
					res.render('error');
				}
				else {
					res.render('admin/news-manage', { title: 'News Manage', title2: 'Member Management', dataNews, total_pages, page, total_records });
				}
			});
		}
	});




			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});


router.get('/news/:page', (req, res, next) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {


	var page = req.params.page;


	function isNumber(value) {
		return !isNaN(parseFloat(value)) && isFinite(value);
	}

	if (isNumber(page)) {

		var sql = "SELECT * FROM news";
		database.query(sql, function (error, data) {
			if (error) {
				//throw error;
				res.render('error');
			}
			else {
				var per_page_record = 5;
				var total_records = data.length;
				var total_pages = Math.ceil(total_records / per_page_record);

				var start_from = (page - 1) * per_page_record;
				var sqlpage = `SELECT* FROM news ORDER BY news_date DESC LIMIT ${start_from}, ${per_page_record}`;

				database.query(sqlpage, function (error, dataNews) {
					if (error) {
						//throw error;
						res.render('error');
					}
					else {
						res.render('admin/news-manage', { title: 'News Manage', title2: 'Member Management', dataNews, total_pages, page, total_records });
					}
				});
			}
		});
	} else {
		// res.send("Not found");
		next(createError(404));
	}






			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});


router.get('/news-add', (req, res) => {
	// try {
	// 	jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
	// 		if (err) {
	// 			throw new Error('Invalid access token');
	// 		} else {
	res.render('admin/news-add', { title: 'News Add', mes: '' });
	// 		}
	// 	});
	// } catch (error) {
	// 	//res.send('Login fail');
	// 	res.status(400).json({ message: 'Login fail' });
	// }

});


router.post('/news-proAdd', (req, res) => {
	// try {
	// 	jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
	// 		if (err) {
	// 			throw new Error('Invalid access token');
	// 		} else {

	var today = new Date();
	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);

	var dateString = year + '-' + month + '-' + day;




	const { news_title,news_title_en,news_title_ja,news_title_vi, news_content, news_content_en,news_content_ja,news_content_vi, createDate,   news_cover_image } = req.body;

	const news_cover_image2 = dateString + '_' + news_cover_image;

	//console.log(createDate);

	var sql2 = `
				INSERT INTO news
				(news_title, news_title_en, news_title_ja,news_title_vi, news_content,news_content_en,news_content_ja,news_content_vi, news_cover_image,news_date )
				VALUES (?,?,?,?,?,?,?,?,?, ?)`;
	// res.send(sql);
	database.query(sql2, [news_title, news_title_en, news_title_ja,news_title_vi, news_content,news_content_en,news_content_ja,news_content_vi, news_cover_image2, createDate], function (error, data2) {
		if (error) {
			res.redirect('/admin/error');
		}
		else {
			res.redirect('/admin/news');
		}
	});




	// 		}
	// 	});
	// } catch (error) {
	// 	//res.send('Login fail');
	// 	res.status(400).json({ message: 'Login fail' });
	// }

});



router.get('/news_edit/:news_id', (req, res) => {
	// try {
	// 	jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
	// 		if (err) {
	// 			throw new Error('Invalid access token');
	// 		} else {


	var news_id = req.params.news_id;


	var sql = `SELECT * FROM news WHERE news_id= "${news_id}"`;
	// res.send(sql);
	database.query(sql, function (error, dataNews) {
		if (error) {
			throw error;
		}
		else {
			res.render('admin/news-edit', { title: 'News Edit', dataNews, news_id, mes: '' });
		}
	});

	// 		}
	// 	});
	// } catch (error) {
	// 	//res.send('Login fail');
	// 	res.status(400).json({ message: 'Login fail' });
	// }

});


router.post('/news-proUpdate', function (req, res, next) {
	var today = new Date();
	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);
	var dateString = year + '-' + month + '-' + day;

	const { news_title, news_title_en,news_title_ja,news_title_vi, news_content,news_content_en,news_content_ja,news_content_vi, news_cover_image, news_cover_image_db, createDate, news_id } = req.body;

	var originalString = news_cover_image_db.substring(11);

	var news_cover_image2 = '';
	if (news_cover_image === originalString) {
		news_cover_image2 = news_cover_image_db;
	} else {
		news_cover_image2 = dateString + '_' + news_cover_image;
	}



	var sql = `
	UPDATE news 
	SET news_title = ?,
	news_title_en = ?,
	news_title_ja = ?,
	news_title_vi = ?,
	news_content = ?,
	news_content_en = ?,
	news_content_ja = ?,
	news_content_vi = ?,
	news_date = ?,
	news_cover_image = ?
	WHERE news_id = "${news_id}"
	`;
	database.query(sql, [news_title,news_title_en,news_title_ja,news_title_vi, news_content,news_content_en,news_content_ja,news_content_vi,createDate,  news_cover_image2], function (error, data) {

		if (error) {
			throw error;
		}
		else {
			res.redirect('/admin/news');
		}
	});

});


router.get('/news_delete/:news_id', (req, res) => {
	// try {
	// 	jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
	// 		if (err) {
	// 			throw new Error('Invalid access token');
	// 		} else {


	var news_id = req.params.news_id;
	var sql = `DELETE FROM news WHERE news_id= "${news_id}"`;
	// res.send(sql);
	database.query(sql, function (error, dataUser) {
		if (error) {
			throw error;
		}
		else {
			res.redirect('/admin/news');
		}
	});

	// 		}
	// 	});
	// } catch (error) {
	// 	//res.send('Login fail');
	// 	res.status(400).json({ message: 'Login fail' });
	// }

});
// ========================================= END NEW MANAGE ===============================================

// ========================================= PATENTS AND CERTIFICATIONS MANAGE ===============================================
router.get('/patents-certifications', (req, res, next) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {


	var page = 1;
	var sql = "SELECT * FROM patcer";
	database.query(sql, function (error, data) {
		if (error) {
			//throw error;
			res.render('error');
		}
		else {
			var per_page_record = 5;
			var total_records = data.length;
			var total_pages = Math.ceil(total_records / per_page_record);

			var start_from = (page - 1) * per_page_record;
			var sqlpage = `SELECT* FROM patcer ORDER BY patcer_id DESC LIMIT ${start_from}, ${per_page_record}`;

			database.query(sqlpage, function (error, dataPatcer) {
				if (error) {
					//throw error;
					res.render('error');
				}
				else {
					res.render('admin/patcer-manage', { title: 'Patents and Certification Manage', dataPatcer, total_pages, page, total_records });
				}
			});
		}
	});




			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});

router.get('/patents-certifications/:page', (req, res, next) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {


	var page = req.params.page;


	function isNumber(value) {
		return !isNaN(parseFloat(value)) && isFinite(value);
	}

	if (isNumber(page)) {

		var sql = "SELECT * FROM patcer";
		database.query(sql, function (error, data) {
			if (error) {
				//throw error;
				res.render('error');
			}
			else {
				var per_page_record = 5;
				var total_records = data.length;
				var total_pages = Math.ceil(total_records / per_page_record);

				var start_from = (page - 1) * per_page_record;
				var sqlpage = `SELECT* FROM patcer ORDER BY patcer_id DESC LIMIT ${start_from}, ${per_page_record}`;

				database.query(sqlpage, function (error, dataPatcer) {
					if (error) {
						//throw error;
						res.render('error');
					}
					else {
						res.render('admin/patcer-manage', { title: 'Patents and Certification Manage', dataPatcer, total_pages, page, total_records });
					}
				});
			}
		});
	} else {
		// res.send("Not found");
		next(createError(404));
	}






			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});

router.get('/patents-certifications-add', (req, res) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {
	res.render('admin/patcer-add', { title: 'Patents and Certifications Add', mes: '' });
			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.status(400).json({ message: 'Login fail' });
	}

});


router.post('/patents-certifications-proAdd', (req, res) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {
	var today = new Date();
	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);

	var dateString = year + '-' + month + '-' + day;


	const { patcer_name, patcer_img } = req.body;
	const patcer_img2 = dateString + '_' + patcer_img;
	var sql2 = `
				INSERT INTO patcer
				(patcer_name, patcer_img )
				VALUES (?,?)`;
	// res.send(sql);
	database.query(sql2, [patcer_name, patcer_img2], function (error) {
		if (error) {
			res.redirect('/admin/error');
		}
		else {
			res.redirect('/admin/patents-certifications');
		}
	});




			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});
router.get('/patents-certifications-edit/:patcer_id', (req, res) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {


	var patcer_id = req.params.patcer_id;

	var sql = `SELECT * FROM patcer WHERE patcer_id= "${patcer_id}"`;
	// res.send(sql);
	database.query(sql, function (error, dataPatcer) {
		if (error) {
			res.send("404");
		}
		else {
			res.render('admin/patcer-edit', { title: 'Patents and Certifications Edit', dataPatcer, patcer_id, mes: '' });
		}
	});

			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});


router.post('/patents-certifications-proUpdate', function (req, res, next) {

	var today = new Date();
	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);

	var dateString = year + '-' + month + '-' + day;

	const { patcer_name, patcer_img, patcer_db_img, patcer_id } = req.body;

	var originalString = patcer_db_img.substring(11);

	var patcer_img2 = '';
	if (patcer_img === originalString) {
		patcer_img2 = patcer_db_img;
	} else {
		patcer_img2 = dateString + '_' + patcer_img;
	}

	var sql = `
	UPDATE patcer 
	SET patcer_name = ?,
	patcer_img = ?
	WHERE patcer_id = "${patcer_id}"
	`;

	database.query(sql, [patcer_name, patcer_img2], function (error) {
		if (error) {
			res.redirect('/admin/error');
		}
		else {
			res.redirect('/admin/patents-certifications');
		}
	});

});


router.get('/patents-certifications-delete/:patcer_id', (req, res) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {


	var patcer_id = req.params.patcer_id;
	var sql = `DELETE FROM patcer WHERE patcer_id= "${patcer_id}"`;
	// res.send(sql);
	database.query(sql, function (error) {
		if (error) {
			throw error;
		}
		else {
			res.redirect('/admin/patents-certifications');
		}
	});

			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});


// ========================================= END PATENTS AND CERTIFICATIONS MANAGE ===============================================


// ========================================= CLIENT MANAGE ===============================================
router.get('/client', (req, res, next) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {


	var page = 1;
	var sql = "SELECT * FROM client";
	database.query(sql, function (error, data) {
		if (error) {
			//throw error;
			res.render('error');
		}
		else {
			var per_page_record = 5;
			var total_records = data.length;
			var total_pages = Math.ceil(total_records / per_page_record);

			var start_from = (page - 1) * per_page_record;
			var sqlpage = `SELECT* FROM client ORDER BY client_id DESC LIMIT ${start_from}, ${per_page_record}`;

			database.query(sqlpage, function (error, dataClient) {
				if (error) {
					//throw error;
					res.render('error');
				}
				else {
					res.render('admin/client-manage', { title: 'Client Manage', dataClient, total_pages, page, total_records });
				}
			});
		}
	});




			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});

router.get('/client/:page', (req, res, next) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {


	var page = req.params.page;


	function isNumber(value) {
		return !isNaN(parseFloat(value)) && isFinite(value);
	}

	if (isNumber(page)) {

		var sql = "SELECT * FROM client";
		database.query(sql, function (error, data) {
			if (error) {
				//throw error;
				res.render('error');
			}
			else {
				var per_page_record = 5;
				var total_records = data.length;
				var total_pages = Math.ceil(total_records / per_page_record);

				var start_from = (page - 1) * per_page_record;
				var sqlpage = `SELECT* FROM client ORDER BY client_id DESC LIMIT ${start_from}, ${per_page_record}`;

				database.query(sqlpage, function (error, dataClient) {
					if (error) {
						//throw error;
						res.render('error');
					}
					else {
						res.render('admin/client-manage', { title: 'Client Manage', dataClient, total_pages, page, total_records });
					}
				});
			}
		});
	} else {
		// res.send("Not found");
		next(createError(404));
	}






			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});


router.get('/client-add', (req, res) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {
	res.render('admin/client-add', { title: 'Client Add', mes: '' });
			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});


router.post('/client-proAdd', (req, res) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {

	var today = new Date();
	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);

	var dateString = year + '-' + month + '-' + day;


	const { client_name, client_logo } = req.body;
	const client_logo2 = dateString + '_' + client_logo;
	var sql2 = `
				INSERT INTO client
				(client_name, client_logo )
				VALUES (?,?)`;
	// res.send(sql);
	database.query(sql2, [client_name, client_logo2], function (error) {
		if (error) {
			throw error;
		}
		else {
			res.redirect('/admin/client');
		}
	});




			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});


router.get('/client_edit/:client_id', (req, res) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {


	var client_id = req.params.client_id;


	var sql = `SELECT * FROM client WHERE client_id= "${client_id}"`;
	// res.send(sql);
	database.query(sql, function (error, dataClient) {
		if (error) {
			throw error;
		}
		else {
			res.render('admin/client-edit', { title: 'Client Edit', dataClient, client_id, mes: '' });
		}
	});

			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});


router.post('/client-proUpdate', function (req, res, next) {
	var today = new Date();
	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);

	var dateString = year + '-' + month + '-' + day;

	const { client_name, client_logo, client_logo_db, client_id } = req.body;

	console.log(client_logo_db);
	var originalString = client_logo_db.substring(11);

	var client_logo2 = '';
	if (client_logo === originalString) {
		client_logo2 = client_logo_db;
	} else {
		client_logo2 = dateString + '_' + client_logo;
	}



	var sql = `
	UPDATE client 
	SET client_name = ?,
	client_logo = ?
	WHERE client_id = "${client_id}"
	`;

	database.query(sql, [client_name, client_logo2], function (error) {


		if (error) {
			throw error;
		}
		else {
			res.redirect('/admin/client');
		}
	});

});


router.get('/client_delete/:client_id', (req, res) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {


	var client_id = req.params.client_id;
	var sql = `DELETE FROM client WHERE client_id= "${client_id}"`;
	// res.send(sql);
	database.query(sql, function (error) {
		if (error) {
			throw error;
		}
		else {
			res.redirect('/admin/client');
		}
	});

			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});


// ========================================= END CLIENT MANAGE ===============================================

// =========================================  PRODUCT MANAGE ===============================================
router.get('/product', (req, res, next) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {


	var page = 1;
	var sql = "SELECT * FROM product";
	database.query(sql, function (error, data) {
		if (error) {
			//throw error;
			res.render('error');
		}
		else {
			var per_page_record = 10;
			var total_records = data.length;
			var total_pages = Math.ceil(total_records / per_page_record);

			var start_from = (page - 1) * per_page_record;
			var sqlpage = `SELECT* FROM product ORDER BY pro_id DESC LIMIT ${start_from}, ${per_page_record}`;

			database.query(sqlpage, function (error, dataProduct) {
				if (error) {
					//throw error;
					res.render('error');
				}
				else {
					res.render('admin/product-manage', { title: 'Product Manage', dataProduct, total_pages, page, total_records });
				}
			});
		}
	});




			}
		});
	} catch (error) {
		//res.send('Login fail');
		//res.status(400).json({ message: 'Login fail' });
		res.redirect('/admin');
	}

});


router.get('/product-view/:pro_id', (req, res) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {


	var pro_id = req.params.pro_id;

	var sql = `SELECT * FROM product WHERE pro_id= "${pro_id}"`;
	// res.send(sql);
	database.query(sql, function (error, dataProduct) {
		if (error) {
			throw error;
		}
		else {
			//console.log(contact_form_ID)
			res.render('admin/product-view', { title: 'Product View Detail', dataProduct });
		}
	});

			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});

router.get('/product/:page', (req, res, next) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {


	var page = req.params.page;


	function isNumber(value) {
		return !isNaN(parseFloat(value)) && isFinite(value);
	}

	if (isNumber(page)) {

		var sql = "SELECT * FROM product";
		database.query(sql, function (error, data) {
			if (error) {
				//throw error;
				res.render('error');
			}
			else {
				var per_page_record = 10;
				var total_records = data.length;
				var total_pages = Math.ceil(total_records / per_page_record);

				var start_from = (page - 1) * per_page_record;
				var sqlpage = `SELECT* FROM product ORDER BY pro_id DESC LIMIT ${start_from}, ${per_page_record}`;

				database.query(sqlpage, function (error, dataProduct) {
					if (error) {
						//throw error;
						res.render('error');
					}
					else {
						res.render('admin/product-manage', { title: 'Product Manage', dataProduct, total_pages, page, total_records });
					}
				});
			}
		});
	} else {
		// res.send("Not found");
		next(createError(404));
	}






			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});



router.get('/product-add', (req, res) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {



	var sql = "SELECT * FROM category";
	database.query(sql, function (error, dataCate) {
		if (error) {
			//throw error;
			res.render('error');
		}
		else {
			res.render('admin/product-add', { title: 'Product Add', dataCate });
		}
	});
			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});


router.post('/product-proAdd', (req, res) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {


	var today = new Date();
	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);

	var dateString = year + '-' + month + '-' + day;


	const {  selectOption, pro_title, pro_title_en, pro_title_ja, pro_title_vi,pro_img1, pro_img2,pro_img3,pro_img4,pro_img5, pro_content,pro_content_en, pro_content_ja,pro_content_vi,type_classify, video_page } = req.body;
	var pro_img12 = dateString + '_' + pro_img1;
	var pro_img22 = dateString + '_' + pro_img2;
	var pro_img32 = dateString + '_' + pro_img3;
	var pro_img42 = dateString + '_' + pro_img4;
	var pro_img52 = dateString + '_' + pro_img5;

	var sql = `
				INSERT INTO product
				(cat_id, pro_title, pro_title_en, pro_title_ja, pro_title_vi,pro_img1, pro_img2,pro_img3,pro_img4,pro_img5, pro_content,pro_content_en, pro_content_ja,pro_content_vi,type_classify, video_page )
				VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
	// res.send(sql);
	database.query(sql, [selectOption, pro_title, pro_title_en, pro_title_ja,pro_title_vi,pro_img12, pro_img22,pro_img32,pro_img42,pro_img52, pro_content,pro_content_en, pro_content_ja,pro_content_vi, type_classify, video_page], function (error, data2) {
		if (error) {
			throw error;
		}
		else {
			res.redirect('/admin/product');
		}
	});




			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});


router.get('/product_edit/:product_id', (req, res) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {


	var pro_id = req.params.product_id;


	var sqlCate = `SELECT * FROM category`;
	var sql = `SELECT * FROM product WHERE pro_id= "${pro_id}"`;
	// res.send(sql);
	database.query(sqlCate, function (error, dataCate) {
		// res.send(sql);
		database.query(sql, function (error, dataProduct) {
			if (error) {
				throw error;
			}
			else {
				res.render('admin/product-edit', { title: 'Product Edit', dataProduct, dataCate, pro_id, mes: '' });
			}
		});

	});

			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});

router.post('/product-proUpdate', function (req, res, next) {

	var today = new Date();
	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);
	var dateString = year + '-' + month + '-' + day;

	const { pro_id, selectOption, pro_title, pro_title_en, pro_title_ja,pro_title_vi,pro_img1, pro_img2,pro_img3,pro_img4,pro_img5, pro_db_img1, pro_db_img2,pro_db_img3,pro_db_img4,pro_db_img5,   pro_content,pro_content_en, pro_content_ja,pro_content_vi,type_classify, video_page } = req.body;

	var originalString1 = pro_db_img1.substring(11);
	var originalString2 = pro_db_img2.substring(11);
	var originalString3 = pro_db_img3.substring(11);
	var originalString4 = pro_db_img4.substring(11);
	var originalString5 = pro_db_img5.substring(11);

	var pro_img12 = '';
	if (pro_img1 === originalString1) {
		pro_img12 = pro_db_img1;
	} else {
		pro_img12 = dateString + '_' + pro_img1;
	}
	var pro_img22 = '';
	if (pro_img2 === originalString2) {
		pro_img22 = pro_db_img2;
	} else {
		pro_img22 = dateString + '_' + pro_img2;
	}
	var pro_img32 = '';
	if (pro_img3 === originalString3) {
		pro_img32 = pro_db_img3;
	} else {
		pro_img32 = dateString + '_' + pro_img3;
	}
	var pro_img42 = '';
	if (pro_img4 === originalString4) {
		pro_img42 = pro_db_img4;
	} else {
		pro_img42 = dateString + '_' + pro_img4;
	}
	
	var pro_img52 = '';
	if (pro_img5 === originalString5) {
		pro_img52 = pro_db_img5;
	} else {
		pro_img52 = dateString + '_' + pro_img5;
	}

	var sql = `
	UPDATE product 
	SET cat_id = ?,
	pro_title = ?, 
	pro_title_en = ?,
	pro_title_ja = ?,
	pro_title_vi = ?,
	pro_img1 = ?,
	pro_img2 = ?,
	pro_img3 = ?,
	pro_img4 = ?,
	pro_img5 = ?,
	pro_content = ?,
	pro_content_en = ?,
	pro_content_ja = ?,
	pro_content_vi = ?,
	type_classify = ?,
	video_page = ?

	WHERE pro_id = "${pro_id}"
	`;

	database.query(sql, [ selectOption, pro_title, pro_title_en, pro_title_ja,pro_title_vi,pro_img12, pro_img22,pro_img32,pro_img42,pro_img52, pro_content,pro_content_en, pro_content_ja,pro_content_vi,type_classify, video_page], function (error) {

		if (error) {
			throw error;
		}
		else {
			res.redirect('/admin/product');
		}
	});
});

router.get('/product-delete/:product_id', (req, res) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {


	var pro_id = req.params.product_id;
	var sql = `DELETE FROM product WHERE pro_id= "${pro_id}"`;
	// res.send(sql);
	database.query(sql, function (error) {
		if (error) {
			throw error;
		}
		else {
			res.redirect('/admin/product');
		}
	});

			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});

// =========================================  END PRODUCT MANAGE ===============================================



//========================================= CONTACT FORM MANAGE ================================================
router.get('/contact', (req, res, next) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {


	var page = 1;
	var sql = "SELECT * FROM contact_form";
	database.query(sql, function (error, data) {
		if (error) {
			//throw error;
			res.render('error');
		}
		else {
			var per_page_record = 5;
			var total_records = data.length;
			var total_pages = Math.ceil(total_records / per_page_record);

			var start_from = (page - 1) * per_page_record;
			var sqlpage = `SELECT* FROM contact_form ORDER BY contact_form_ID DESC LIMIT ${start_from}, ${per_page_record}`;

			database.query(sqlpage, function (error, dataContact) {
				if (error) {
					//throw error;
					res.render('error');
				}
				else {
					res.render('admin/contact-manage', { title: 'Contact Form Manage', dataContact, total_pages, page, total_records });
				}
			});
		}
	});




			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});

router.get('/contact/:page', (req, res, next) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {


	var page = req.params.page;


	function isNumber(value) {
		return !isNaN(parseFloat(value)) && isFinite(value);
	}

	if (isNumber(page)) {

		var sql = "SELECT * FROM contact_form";
		database.query(sql, function (error, data) {
			if (error) {
				//throw error;
				res.render('error');
			}
			else {
				var per_page_record = 5;
				var total_records = data.length;
				var total_pages = Math.ceil(total_records / per_page_record);

				var start_from = (page - 1) * per_page_record;
				var sqlpage = `SELECT* FROM contact_form ORDER BY contact_form_ID DESC LIMIT ${start_from}, ${per_page_record}`;

				database.query(sqlpage, function (error, dataContact) {
					if (error) {
						//throw error;
						res.render('error');
					}
					else {
						res.render('admin/contact-manage', { title: 'Contact Form Manage', dataContact, total_pages, page, total_records });
					}
				});
			}
		});
	} else {
		// res.send("Not found");
		next(createError(404));
	}






			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});


router.get('/contact-view/:contact_form_ID', (req, res) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {


	var contact_form_ID = req.params.contact_form_ID;

	var sql = `SELECT * FROM contact_form WHERE contact_form_ID= "${contact_form_ID}"`;
	// res.send(sql);
	database.query(sql, function (error, dataContact) {
		if (error) {
			throw error;
		}
		else {
			//console.log(contact_form_ID)
			res.render('admin/contact-view', { title: 'Contact View Detail', dataContact });
		}
	});

			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});

router.get('/contact-delete/:contact_form_ID', (req, res) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {


	var contact_form_ID = req.params.contact_form_ID;
	var sql = `DELETE FROM contact_form WHERE contact_form_ID= "${contact_form_ID}"`;
	// res.send(sql);
	database.query(sql, function (error) {
		if (error) {
			throw error;
		}
		else {
			res.redirect('/admin/contact');
		}
	});

			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});

//////====================== SLIDE SHOW ============================

router.get('/slide-show', (req, res, next) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {


	var page = 1;
	var sql = "SELECT * FROM slideshow";
	database.query(sql, function (error, data) {
		if (error) {
			//throw error;
			res.render('error');
		}
		else {
			var per_page_record = 5;
			var total_records = data.length;
			var total_pages = Math.ceil(total_records / per_page_record);

			var start_from = (page - 1) * per_page_record;
			var sqlpage = `SELECT* FROM slideshow ORDER BY slideshow_id DESC LIMIT ${start_from}, ${per_page_record}`;

			database.query(sqlpage, function (error, dataSlideShow) {
				if (error) {
					//throw error;
					res.render('error');
				}
				else {
					res.render('admin/slideshow-manage', { title: 'Slide Show Manage', dataSlideShow, total_pages, page, total_records });
				}
			});
		}
	});




			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});

router.get('/slide-show/:page', (req, res, next) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {


	var page = req.params.page;


	function isNumber(value) {
		return !isNaN(parseFloat(value)) && isFinite(value);
	}

	if (isNumber(page)) {

		var sql = "SELECT * FROM slideshow";
		database.query(sql, function (error, data) {
			if (error) {
				//throw error;
				res.render('error');
			}
			else {
				var per_page_record = 5;
				var total_records = data.length;
				var total_pages = Math.ceil(total_records / per_page_record);

				var start_from = (page - 1) * per_page_record;
				var sqlpage = `SELECT* FROM slideshow ORDER BY slideshow_id DESC LIMIT ${start_from}, ${per_page_record}`;

				database.query(sqlpage, function (error, dataSlideShow) {
					if (error) {
						//throw error;
						res.render('error');
					}
					else {
						res.render('admin/slideshow-manage', { title: 'Slide Show Manage', dataSlideShow, total_pages, page, total_records });
					}
				});
			}
		});
	} else {
		// res.send("Not found");
		next(createError(404));
	}






			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});



router.get('/slideshow-add', (req, res) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {

	res.render('admin/slideshow-add', { title: 'Slideshow Add' });


			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});


router.post('/slideshow-proAdd', (req, res) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {


	const { slideshow_title, slideshow_summary, slideshow_imgs } = req.body;
	var today = new Date();
	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);

	var dateString = year + '-' + month + '-' + day;

	// console.log(pro_content);
	// console.log(cat_id);
	// console.log(pro_title);

	//console.log(news_content);
	var sql = `
				INSERT INTO slideshow
				(slideshow_title, slideshow_summary, slideshow_img, slideshow_date )
				VALUES (?,?,?,?)`;
	// res.send(sql);
	database.query(sql, [slideshow_title, slideshow_summary, slideshow_imgs, dateString], function (error, data2) {
		if (error) {
			throw error;
		}
		else {
			res.redirect('/admin/slideshow');
		}
	});




			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});

router.get('/slide-show-edit/:slideshow_id', (req, res) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {


	var slideshow_id = req.params.slideshow_id;

	var sql = `SELECT * FROM slideshow WHERE slideshow_id= "${slideshow_id}"`;

	database.query(sql, function (error, dataSlideShow) {
		if (error) {
			throw error;
		}
		else {
			res.render('admin/slideshow-edit', { title: 'SlideShow Edit', dataSlideShow, slideshow_id, mes: '' });
		}
	});



			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});

router.post('/slideshow-proUpdate', function (req, res, next) {

	const { slideshow_title, slideshow_summary, slideshow_img, slideshow_id } = req.body;



	var sql = `
	UPDATE slideshow 
	SET slideshow_title = ?,
	slideshow_summary = ?, 
	slideshow_img = ?
	WHERE slideshow_id = "${slideshow_id}"
	`;

	database.query(sql, [slideshow_title, slideshow_summary, slideshow_img], function (error) {

		if (error) {
			throw error;
		}
		else {
			res.redirect('/admin/slide-show');
		}
	});
});

router.get('/slide-show-delete/:slideshow_id', (req, res) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {


	var slideshow_id = req.params.slideshow_id;
	var sql = `DELETE FROM slideshow WHERE slideshow_id= "${slideshow_id}"`;
	// res.send(sql);
	database.query(sql, function (error) {
		if (error) {
			throw error;
		}
		else {
			res.redirect('/admin/slide-show');
		}
	});

			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});
router.get('/error', (req, res) => {
	res.send("Error <a href='/admin/manage'>Back to home </a>")

});

//// ======================== END SLIDE SHOW ========================


//////====================== about  ============================

router.get('/about', (req, res, next) => {
	// try {
	// 	jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
	// 		if (err) {
	// 			throw new Error('Invalid access token');
	// 		} else {

	var sql = "SELECT * FROM about";
	database.query(sql, function (error, dataAbout) {
		if (error) {
			//throw error;
			res.render('error');
		}
		else {
			console.log("test");
			res.render('admin/admin-about', { title: 'About us Manage', dataAbout });
		}
	});



	// 		}
	// 	});
	// } catch (error) {
	// 	//res.send('Login fail');
	// 	res.status(400).json({ message: 'Login fail' });
	// }

});

router.get('/about-edit/:about_id', (req, res) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {


	var about_id = req.params.about_id;

	var sql = `SELECT * FROM about WHERE about_id= "${about_id}"`;

	database.query(sql, function (error, dataAbout) {
		if (error) {
			throw error;
		}
		else {
			res.render('admin/about-edit', { title: 'SlideShow Edit', dataAbout, about_id, mes: '' });
		}
	});



			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});

router.post('/about_proUpdate', function (req, res, next) {

	const { about_content,about_id  } = req.body;

	var sql = `
	UPDATE about 
	SET about_content = ?
	
	WHERE about_id = "${about_id}"
	`;

	database.query(sql, [about_content ], function (error) {

		if (error) {
			throw error;
		}
		else {
			res.redirect('/admin/about');
		}
	});
});

// ========================================= PARTNERSHIP MANAGE ===============================================
router.get('/partnership', (req, res, next) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {


	var page = 1;
	var sql = "SELECT * FROM partnership";
	database.query(sql, function (error, dataPartnership) {
		if (error) {
			//throw error;
			res.render('error');
		}
		else {
	

			
					res.render('admin/partnership-manage', { title: 'Partnership Manage', dataPartnership });
				}
			
	});




			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});



router.get('/partnership-add', (req, res) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {
	res.render('admin/partnership-add', { title: 'Partnership Add', mes: '' });
			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});


router.post('/partnership-proAdd', (req, res) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {
		var today = new Date();
	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);

	var dateString = year + '-' + month + '-' + day;


	const { partner_img, partner_name,partner_name_en,partner_name_ja, partner_project,partner_project_en, partner_project_ja, partner_detail, partner_detail_en,partner_detail_ja   } = req.body;


	var 	partner_img2 = dateString + '_' + partner_img;



	var sql2 = `
				INSERT INTO partnership
				(partner_img, partner_name,partner_name_en,partner_name_ja, partner_project,partner_project_en, partner_project_ja, partner_detail, partner_detail_en,partner_detail_ja )
				VALUES (?,?,?,?,?,?,?,?,?,?)`;

	database.query(sql2, [partner_img2, partner_name,partner_name_en,partner_name_ja, partner_project,partner_project_en, partner_project_ja, partner_detail, partner_detail_en,partner_detail_ja], function (error) {
		if (error) {
			res.redirect('/admin/error');
		}
		else {
			res.redirect('/admin/partnership');
		}
	});




			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});
router.get('/partnership-edit/:partner_id', (req, res) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {



	var partner_id = req.params.partner_id;

	var sql = `SELECT * FROM partnership WHERE partner_id= "${partner_id}"`;
	// res.send(sql);
	database.query(sql, function (error, dataPartnership) {
		if (error) {
			res.send("404");
		}
		else {
			res.render('admin/partnership-edit', { title: 'Partnership Edit', dataPartnership, partner_id, mes: '' });
		}
	});

			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});


router.post('/partnership-proUpdate', function (req, res, next) {

	var today = new Date();
	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);

	var dateString = year + '-' + month + '-' + day;

	const { partner_img,  partner_db_img,  partner_id, partner_name,partner_name_en,partner_name_ja, partner_project,partner_project_en, partner_project_ja, partner_detail, partner_detail_en,partner_detail_ja } = req.body;

	var originalString =  partner_db_img.substring(11);

	var  partner_img2 = '';
	if (partner_img === originalString) {
		partner_img2 =  partner_db_img;
	} else {
		partner_img2 = dateString + '_' +  partner_img;
	}

	var sql = `
	UPDATE partnership 
	SET partner_img = ?,
	partner_name = ?,
	partner_name_en = ?,
	partner_name_ja = ?,
	partner_project = ?,
	partner_project_en = ?,
	partner_project_ja = ?,
	partner_detail = ?,
	partner_detail_en = ?,
	partner_detail_ja = ?
	WHERE  partner_id = "${ partner_id}"
	`;

	database.query(sql, [partner_img2, partner_name,partner_name_en,partner_name_ja, partner_project,partner_project_en, partner_project_ja, partner_detail, partner_detail_en,partner_detail_ja], function (error) {
		if (error) {
			res.redirect('/admin/error');
			
		}
		else {
			res.redirect('/admin/partnership');
		}
	});

});


router.get('/partnership-delete/:partner_id', (req, res) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {


	var partner_id = req.params.partner_id;
	var sql = `DELETE FROM partnership WHERE partner_id= "${partner_id}"`;
	// res.send(sql);
	database.query(sql, function (error) {
		if (error) {
			throw error;
		}
		else {
			res.redirect('/admin/partnership');
		}
	});

			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.redirect('/admin');
	}

});


// ========================================= END PARTBERSHIP MANAGE ===============================================

// Logout route
router.post('/logout', (req, res) => {
	accessToken = null;
	  res.redirect('/admin');
	
  });

module.exports = router;
