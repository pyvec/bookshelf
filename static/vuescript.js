Vue.component('language-list', {
    template:"\
<ul v-on:input=\"$emit('input', $event.target.value)\" >\
    <li class='col-6 col-md-4 col-lg-2 cl-xl-2 p-0'>\
        <label class='checkbox-inline mx-3' ><input type='radio' v-model='selectedlanguage' value='All'/> All </label>\
    </li>\
    <li v-for='lang in language' class='col-6 col-md-4 col-lg-2 p-0'>\
        <label class='checkbox-inline mx-3' ><input type='radio' v-model='selectedlanguage' :value='lang' /> {{ lang }} </label>\
    </li>\
</ul>\
    ",
    props:['language', 'selectedlanguage'],
})
Vue.component('tag-list', {
    template:"\
<ul v-on:input=\"$emit('input', $event.target.value)\" >\
    <li class='col-6 col-md-4 col-lg-2 cl-xl-2 p-0'>\
        <label class='checkbox-inline mx-3' ><input type='checkbox' v-model='selectedtag' value='All'/> All </label>\
    </li>\
    <li v-for='tag in tags' class='col-6 col-md-4 col-lg-2 p-0'>\
        <label class='checkbox-inline mx-3' ><input type='checkbox' v-model='selectedtag' :value='tag' /> {{ tag }} </label>\
    </li>\
</ul>\
    ",
    props:['tags', 'selectedtag'],
})
Vue.component('book-list', {
    template:"\
    <ul>\
        <li v-for='book in books' class='col-sm-6 col-md-4 col-lg-3 p-0'>\
            <div class='book-box m-2'>\
                <a v-bind:href='book.book_url'>\
                    <div class='book-about d-flex flex-column'>\
                        <div class='book-name m-0 p-O'>\
                            <h2 class='h-c m-0'>{{ book.name }}</h2>\
                        </div>\
                        <div class='book-author m-0'>\
                            <p class='a-c mt-2 mb-0 font-italic'>{{ book.author}}</p>\
                        </div>\
                    </div>\
                    <div  class='book-img text-center'>\
                        <img v-bind:src='book.img_url' class='img-thumbnail img-preview' alt='obal_knihy'/>\
                    </div>\
                </a>\
            </div>\
        </li>\
    </ul>\
",
    props:['books', 'selectedtag', 'selectedlanguage']
    })

fetch("/data/")
    .then(r => r.json())
    .then(data => {
        console.log(data)
        new Vue({
            el: "#root",
            data: {
                active: true,
                tags: data.tags,
                selectedtag: "All",
                language: data.language,
                selectedlanguage: "All",
            },
            computed: {
                books: function() {
                    var lang = this.selectedlanguage;
                    var tag = this.selectedtag;
                    console.log(lang);
                    var result = Object.values(data.books);
                    if(lang !== "All") {
                        result = result.filter(function(book){
                            return book.language.includes(lang);
                        });
                    };
                    if(tag !== "All") {
                        result = result.filter(function(book){
                            return book.tags.includes(tag);
                        });
                    };
                    return result;
                },



            }
        })
    })
