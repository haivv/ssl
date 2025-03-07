require('dotenv').config(); //load environment parameters from .env file
var express = require('express');
var router = express.Router();
const IP = require('ip'); //get server ip
var requestIp = require('request-ip');//get client ip

var database = require('../database');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const cheerio = require('cheerio'); // to handle HTML string
var sqlCat1 = "SELECT pro_id, pro_title_vi FROM product where cat_id='1'";
	var sqlCat2 = "SELECT pro_id, pro_title_vi FROM product where cat_id='2'";
	var sqlCat3 = "SELECT pro_id, pro_title_vi FROM product where cat_id='3'";
	var sqlCat4 = "SELECT pro_id, pro_title_vi FROM product where cat_id='4'";
	var sqlCat5 = "SELECT pro_id, pro_title_vi FROM product where cat_id='5'";




/* GET home page. */


router.get('/', function (req, res, next) {
	console.log("Index page");
	var current_page = '';
	const message = req.query.message;
	var sqlClient = "SELECT * FROM client ";
	var sqlNews = "SELECT * FROM news ORDER BY news_date DESC";

	database.query(sqlCat1, function (error, dataCat1) {
		database.query(sqlCat2, function (error, dataCat2) {
			database.query(sqlCat3, function (error, dataCat3) {
				database.query(sqlCat4, function (error, dataCat4) {
					database.query(sqlCat5, function (error, dataCat5) {

						database.query(sqlClient, function (error, dataClient) {
							if (error) {
								//throw error;
								res.render('error');
							}
							else {
								database.query(sqlNews, function (error, dataNews) {
									if (error) {
										//throw error;
										res.render('error');
									}
									else {
										res.render('publication/vi/index', { current_page, message, dataClient, dataNews, dataCat1, dataCat2, dataCat3, dataCat4, dataCat5 });
									}
								});
							}
						});
					});
				});
			});
		});
	});




	//res.render('publication/en/test');
});

router.post('/contactus-proAdd', (req, res) => {
	var today = new Date();
	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);

	var dateString = year + '-' + month + '-' + day;




	const { txtname, txtemail, txtphone, txtcompany, txtsubject, txtmessage } = req.body;
	// console.log(pro_content);
	var checkEmailSql = `SELECT COUNT(*) AS count FROM contact_form WHERE contact_form_email = ?`;
	database.query(checkEmailSql, [txtemail], function (error, results) {
		if (results[0].count < 1 && txtname.length > 2 && txtemail.length > 6 && txtphone.length > 8 && txtcompany.length > 2 && txtsubject.length > 6 && txtmessage.length > 10) {

	var sql = `
				INSERT INTO contact_form
				(contact_form_name, contact_form_email, contact_form_phone,contact_form_company, contact_form_subject, contact_form_message, contact_form_date )
				VALUES (?,?,?,?,?,?,?)`;
	// res.send(sql);
	database.query(sql, [txtname, txtemail, txtphone, txtcompany, txtsubject, txtmessage, dateString], function (error) {
		if (error) {
			throw error;
		}
		else {
			res.redirect('/vi/?message=Cảm ơn bạn đã gửi lời nhắn tới chúng tôi.#form-section');
		}
	});

}
else{
	res.redirect('/en/?message=Cảm ơn bạn đã gửi lời nhắn tới chúng tôi.#form-section');
}
});



	// 		}
	// 	});
	// } catch (error) {
	// 	//res.send('Login fail');
	// 	res.status(400).json({ message: 'Login fail' });
	// }

});




router.get('/aboutus', function (req, res, next) {
	var current_page = 'aboutus';

	var sqlAbout = "SELECT * FROM about";
	database.query(sqlCat1, function (error, dataCat1) {
		database.query(sqlCat2, function (error, dataCat2) {
			database.query(sqlCat3, function (error, dataCat3) {
				database.query(sqlCat4, function (error, dataCat4) {
					database.query(sqlCat5, function (error, dataCat5) {
						database.query(sqlAbout, function (error, dataAbout) {
							res.render('publication/vi/aboutus', { current_page, dataCat1, dataCat2, dataCat3, dataCat4, dataCat5, dataAbout });
						});
					});

				});
			});
		});

	});

});

router.get('/news', function (req, res, next) {
	var current_page = 'news';

	database.query(sqlCat1, function (error, dataCat1) {
		database.query(sqlCat2, function (error, dataCat2) {
			database.query(sqlCat3, function (error, dataCat3) {
				database.query(sqlCat4, function (error, dataCat4) {
					database.query(sqlCat5, function (error, dataCat5) {

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
									} else {
										res.render('publication/vi/news', { current_page, dataCat1, dataCat2, dataCat3, dataCat4, dataCat5, dataNews, total_pages, page, total_records });
									}
								});
							}
						});


					});

				});
			});
		});

	});
});


router.get('/news/:page', function (req, res, next) {
	var current_page = 'news';

	database.query(sqlCat1, function (error, dataCat1) {
		database.query(sqlCat2, function (error, dataCat2) {
			database.query(sqlCat3, function (error, dataCat3) {
				database.query(sqlCat4, function (error, dataCat4) {
					database.query(sqlCat5, function (error, dataCat5) {

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
											res.render('publication/vi/news', { current_page, dataCat1, dataCat2, dataCat3, dataCat4, dataCat5, dataNews, total_pages, page, total_records });
										}
									});
								}
							});
						} else {
							// res.send("Not found");
							next(createError(404));
						}

					});
				});
			});
		});

	});

});

router.get('/news-detail/:news_id', function (req, res, next) {
	var news_id = req.params.news_id;
	var current_page = 'news-detail/'+news_id;

	database.query(sqlCat1, function (error, dataCat1) {
		database.query(sqlCat2, function (error, dataCat2) {
			database.query(sqlCat3, function (error, dataCat3) {
				database.query(sqlCat4, function (error, dataCat4) {
					database.query(sqlCat5, function (error, dataCat5) {

						var page = 1;
						var sql = `SELECT * FROM news WHERE news_id=${news_id}`;
						database.query(sql, function (error, dataNews) {
							if (error) {
								//throw error;
								res.render('error');
							}
							else {
									res.render('publication/vi/news-detail', { current_page, dataCat1, dataCat2, dataCat3, dataCat4, dataCat5, dataNews });
									
							}
						});


					});

				});
			});
		});

	});

});

router.get('/pat-cer', function (req, res, next) {
	var current_page = 'pat-cer';

	database.query(sqlCat1, function (error, dataCat1) {
		database.query(sqlCat2, function (error, dataCat2) {
			database.query(sqlCat3, function (error, dataCat3) {
				database.query(sqlCat4, function (error, dataCat4) {
					database.query(sqlCat5, function (error, dataCat5) {

						var page = 1;
						var sql = "SELECT * FROM patcer";
						database.query(sql, function (error, data) {
							if (error) {
								//throw error;
								res.render('error');
							}
							else {
								var per_page_record = 22;
								var total_records = data.length;
								var total_pages = Math.ceil(total_records / per_page_record);

								var start_from = (page - 1) * per_page_record;
								var sqlpage = `SELECT* FROM patcer ORDER BY patcer_id DESC LIMIT ${start_from}, ${per_page_record}`;

								database.query(sqlpage, function (error, dataPatCer) {
									if (error) {
										//throw error;
										res.render('error');
									} else {
										res.render('publication/vi/pat-cer', { current_page, dataCat1, dataCat2, dataCat3, dataCat4, dataCat5, dataPatCer, total_pages, page, total_records });
									}
								});
							}
						});


					});

				});
			});
		});

	});

});


router.get('/r-d', function (req, res, next) {
	var current_page = 'r-d';


	var sqlQa = "SELECT qa_id, qa_question, qa_answer FROM qa";
	var sqlPatnership = "SELECT * FROM partnership WHERE partner_name_en != 'Volvo Korea' ORDER BY partner_id DESC";
	var sqlPatnership_volvo = "SELECT * FROM partnership WHERE partner_name_en = 'Volvo Korea' ";
	database.query(sqlCat1, function (error, dataCat1) {
		database.query(sqlCat2, function (error, dataCat2) {
			database.query(sqlCat3, function (error, dataCat3) {
				database.query(sqlCat4, function (error, dataCat4) {
					database.query(sqlCat5, function (error, dataCat5) {
						database.query(sqlQa, function (error, dataQa) {
							database.query(sqlPatnership, function (error, dataPatnership) {
								database.query(sqlPatnership_volvo, function (error, dataPatnership_volvo) {

						res.render('publication/vi/partnership', { current_page, dataCat1, dataCat2, dataCat3, dataCat4, dataCat5 , dataQa, dataPatnership, dataPatnership_volvo});
					});
					});

					});



					});

				});
			});
		});

	});

});


router.get('/client', function (req, res, next) {
	var current_page = 'client';

	database.query(sqlCat1, function (error, dataCat1) {
		database.query(sqlCat2, function (error, dataCat2) {
			database.query(sqlCat3, function (error, dataCat3) {
				database.query(sqlCat4, function (error, dataCat4) {
					database.query(sqlCat5, function (error, dataCat5) {

						var page = 1;
						var sql = "SELECT * FROM client ORDER BY client_id DESC";
						database.query(sql, function (error, data) {
							if (error) {
								//throw error;
								res.render('error');
							}
							else {
								var per_page_record = 22;
								var total_records = data.length;
								var total_pages = Math.ceil(total_records / per_page_record);

								var start_from = (page - 1) * per_page_record;
								var sqlpage = `SELECT* FROM client  LIMIT ${start_from}, ${per_page_record}`;

								database.query(sqlpage, function (error, dataClient) {
									if (error) {
										//throw error;
										res.render('error');
									} else {
										res.render('publication/vi/client', { current_page, dataCat1, dataCat2, dataCat3, dataCat4, dataCat5, dataClient, total_pages, page, total_records });
									}
								});
							}
						});


					});

				});
			});
		});

	});

});


router.get('/contact', function (req, res, next) {
	var current_page = 'contact';
	const message = req.query.message;
	
	database.query(sqlCat1, function (error, dataCat1) {
		database.query(sqlCat2, function (error, dataCat2) {
			database.query(sqlCat3, function (error, dataCat3) {
				database.query(sqlCat4, function (error, dataCat4) {
					database.query(sqlCat5, function (error, dataCat5) {


						res.render('publication/vi/contact', { current_page,message, dataCat1, dataCat2, dataCat3, dataCat4, dataCat5 });




					});

				});
			});
		});

	});

});
router.get('/product/:product_id', function (req, res, next) {
	var pro_id = req.params.product_id;
	const message = req.query.message;
	var current_page = 'product/'+pro_id;
	database.query(sqlCat1, function (error, dataCat1) {
		database.query(sqlCat2, function (error, dataCat2) {
			database.query(sqlCat3, function (error, dataCat3) {
				database.query(sqlCat4, function (error, dataCat4) {
					database.query(sqlCat5, function (error, dataCat5) {
						
								
								var sql = `SELECT * FROM product WHERE pro_id= "${pro_id}"`;
									database.query(sql, function (error, dataProduct) {
										if (error) {
											throw error;
										}
										else {
											res.render('publication/vi/product', { title: 'Product View', current_page,message, dataCat1, dataCat2, dataCat3, dataCat4, dataCat5,dataProduct });
										}
									});



					});

				});
			});
		});

	});

});

router.get('/privacy', function (req, res, next) {
	var current_page = 'privacy';
	const message = req.query.message;
	database.query(sqlCat1, function (error, dataCat1) {
		database.query(sqlCat2, function (error, dataCat2) {
			database.query(sqlCat3, function (error, dataCat3) {
				database.query(sqlCat4, function (error, dataCat4) {
					database.query(sqlCat5, function (error, dataCat5) {
						res.render('publication/vi/privacy-policy', { 
							current_page,message, dataCat1, dataCat2, dataCat3, dataCat4, dataCat5 
						});
					});
				});
			});
		});
	});
});

router.get('/term', function (req, res, next) {
	var current_page = 'term';
	const message = req.query.message;
	database.query(sqlCat1, function (error, dataCat1) {
		database.query(sqlCat2, function (error, dataCat2) {
			database.query(sqlCat3, function (error, dataCat3) {
				database.query(sqlCat4, function (error, dataCat4) {
					database.query(sqlCat5, function (error, dataCat5) {
						res.render('publication/vi/term-of-service', { 
							current_page,message, dataCat1, dataCat2, dataCat3, dataCat4, dataCat5 
						});
					});
				});
			});
		});
	});
});


module.exports = router;
