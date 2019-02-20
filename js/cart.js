var cart={}; //корзина

$.getJSON('goods.json', function(data){
	var goods = data; //все товары в массиве
	//console.log(goods);
	checkCart();
	//console.log(cart);
	showCart();// вывожу товары на страницу

	function showCart(){
		if(  $.isEmptyObject(cart)   ){
			//корзина пуста
			var out = 'Корзина пуста. Добавьте товар в корзину <a href="index.html">главная страница</a> ';
			$('#my-cart').html(out);
		}
		else{
	var out = '';
 	for(var key in cart){
 		out+='<div class="image">';
 		out+= '<button class="delete" data-art="'+key+'">x</button>';
 		out+= '<img src="'+goods[key].img+'" >';
 		out+= goods[key].name;
 		out+= '<button class="minus" data-art="'+key+'">-</button>';
 		out+= cart[key];
 		out+= '<button class="plus" data-art="'+key+'">+</button>'
 		out+= cart[key]*goods[key].cost;
 		out+='<br>';
 		out+='</div>';
	}
	$('#my-cart').html(out);
	$('.plus').on('click', plusGoods);
	$('.minus').on('click', minusGoods);
	$('.delete').on('click', deleteGoods);
}
}
function plusGoods(){
	var articul = $(this).attr('data-art');
	cart[articul]++;
	saveCartTols();
	showCart();
}
function minusGoods(){
	var articul = $(this).attr('data-art');
	if (cart[articul]>1){ 
		cart[articul]--;
	}
	else{ 
		delete cart[articul];
	}
	saveCartTols();
	showCart();
}
function deleteGoods(){
	var articul = $(this).attr('data-art');
	delete cart[articul];
	saveCartTols();
	showCart();
}

});

function checkCart(){
	//проверяю наличие корзины в localStorage;
if(localStorage.getItem('cart')!=null){
	cart = JSON.parse (localStorage.getItem('cart'));
}
}
function saveCartTols(){
	localStorage.setItem('cart', JSON.stringify(cart));
}