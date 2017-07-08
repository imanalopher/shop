var Basket = {
    options: {
        addProductUrl: ''
    },
    basket: null,
    init: function (options) {
        $.extend(Basket.options, options);
        Basket.basket = $('#cart');
    },
    addProductToBasket: function (objectId) {
        var data = { objectId: objectId };
        Basket.postOrderProduct(data);
    },
    updateBasket: function (result) {
        Basket.basket.find('#cart-total2').text(result.count + ' товаров');
        // Basket.basket.find('#basketSum').text(result.totalSum + ' сом.');
    },
    postOrderProduct: function (data) {
        $.post(Basket.options.addProductUrl, data, function (response, status) {
            if(status == 'success') {
                noty({
                    text: 'Ваш заказ добавлен в корзину',
                    type: 'success',
                    dismissQueue: true,
                    timeout: 3000,
                    closeWith: ['click'],
                    layout: 'topRight',
                    theme: 'defaultTheme',
                    maxVisible: 10,
                    animation: {
                        open: 'animated bounceInLeft', // Animate.css class names
                        close: 'animated bounceOutLeft', // Animate.css class names
                        easing: 'swing', // unavailable - no need
                        speed: 500 // unavailable - no need
                    }
                });
            }
            Basket.updateBasket(response);
        });
    }
};