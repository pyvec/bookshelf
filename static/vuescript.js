Vue.component('products-filter', {
    template:"\
    <ul>\
        <li v-for='filter in filters' >\
        {{ filter.tags }}</li>\
    </ul>\
    ",
    props:['filters']
})
Vue.component('products-list', {
    template:"\
    <ul>\
        <li v-for='product in products' class='col-sm-6 col-md-4 col-lg-3 p-0'>\
            <div class='book-box m-2'>\
                    <div class='book-about d-flex flex-column'>\
                        <div class='book-name m-0 p-O'>\
                            <h2 class='h-c m-0'>{{ product.name }}</h2>\
                        </div>\
                        <div class='book-author m-0'>\
                            <p class='a-c mt-2 mb-0 font-italic'>{{ product.author}}</p>\
                        </div>\
                        <div class='book-author m-0'>\
                            <p class='a-c mt-2 mb-0 font-italic'>{{ product.tags}}</p>\
                        </div>\
                    </div>\
                    <div  class='book-img text-center'>\
                        <img v-bind:src='product.img_url' class='img-thumbnail img-preview' alt='obal_knihy'/>\
                    </div>\
            </div>\
        </li>\
    </ul>\
",
    props:['products']
    })

fetch("/data/")
    .then(r => r.json())
    .then(data => {
        console.log(data)
        new Vue({
            el: "#root",
             // delimiters: ['{{',']]'],
            data: {
                active : true,
                products: data,
            },
        })
        new Vue({
            el: "#filter",
            data: {
                active: true,
                filters: data,
            }
        })
    })
