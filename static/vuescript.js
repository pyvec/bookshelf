
  Vue.component('products-list', {
    template:"<div class='x'>\
    <ul>\
<li v-for='product in products'> {{product.author}} - {{product.name}}   </li>\
</ul>\
    </div>\
    ",
    props:['products']
  })

fetch("/data/")
  .then(r => r.json())
  .then(data => {
      console.log(data)
      new Vue({
        el: "#root",
        data: {
          active : true,
          products: data,
        },
      })
  })
