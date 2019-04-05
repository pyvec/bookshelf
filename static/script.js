// Adapted from accordion demo
// Copyright (c) 2017 - codepen user ktsn - https://codepen.io/ktsn/pen/dzNRjx
Vue.component('accordion', {
  props: ['theme'],
  template: `<div class="accordion " v-bind:class="theme">
    <div class="header " v-on:click="toggle">
          <i class="fa fa-2x fa-angle-down header-icon" v-bind:class="{ rotate: show }"></i>
          <span>Filtrovat dle témat</span>
    </div>
    <transition name="accordion"
      v-on:before-enter="beforeEnter" v-on:enter="enter"
      v-on:before-leave="beforeLeave" v-on:leave="leave">
      <div class="body" v-show="show">
        <div class="body-inner">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>`,
  data() {
    return {
      show: false
    };
  },

  methods: {
    toggle: function() {
      this.show = !this.show;
    },
    beforeEnter: function(el) {
      el.style.height = '0';
    },
    enter: function(el) {
      el.style.height = el.scrollHeight + 'px';
    },
    beforeLeave: function(el) {
      el.style.height = el.scrollHeight + 'px';
    },
    leave: function(el) {
      el.style.height = '0';
    }
  }
});

Vue.component('language-list', {
    template:`
<div v-on:input="$emit('input', $event.target.value)">
    <div class='col-6 col-sm-4 col-lg-3 p-0'>
        <label class='checkbox-inline mx-3 pointer' ><input class='pointer' type='radio' v-model='selectedlanguage' value='Vše'/> Vše </label>
    </div>
    <div v-for='lang in language' class='col-6 col-sm-4 col-lg-3 p-0'>
        <label class='checkbox-inline mx-3 pointer' ><input class='pointer' type='radio' v-model='selectedlanguage' :value='lang' /> {{ lang }} </label>
    </div>
</div>
    `,
    props:['language', 'selectedlanguage'],
})
Vue.component('tag-list', {
    template:`
<div class='p-0'>
    <div class='col-6 col-sm-4 col-lg-3 p-0'>
        <label class='checkbox-inline mx-3 pointer' ><input class='pointer' type='checkbox' @input=\"handle_all($event);\" :checked='selectedtags.includes(\"Vše\")' name='Vše' value='Vše' :disabled='selectedtags.includes(\"Vše\")'/> Vše </label>
    </div>
    <div v-for='tag in tags' class='col-6 col-sm-4 col-lg-3 p-0'>
        <label class='checkbox-inline mx-3 pointer' ><input class='pointer' type='checkbox' @input=\"add_or_remove($event);\" :checked='selectedtags.includes(tag)' :name='tag' :value='tag' /> {{ tag }} </label>
    </div>
</div>
    `,
    methods: {
        handle_all: function (event) {
            this.$emit('input', ["Vše"]);
        },
        add_or_remove: function (event) {
            var array = this.selectedtags;
            var name = event.target.name;
            var checked = event.target.checked;
            // If "checked" is true, adds "name" to "array" (if it's not there yet)
            // If "checked" is false, removes "name" to "array" (if it's there)
            // Also adds/removes "All" as appropriate
            if (checked) {
                if (!array.includes(name)) {
                    array.push(name);
                }
                if (array.includes("Vše")) {
                    array.splice(array.indexOf("Vše"), 1);
                }
            } else {
                if (array.includes(name)) {
                    array.splice(array.indexOf(name), 1);
                    if (array.length == 0) {
                        array = ["Vše"];
                    }
                }
            }
            this.$emit('input', array);
        },
    },
    props:['tags', 'selectedtags'],
})
Vue.component('book-list', {
    template:`
    <div class='p-0'>
        <div v-for='book in books' class='col-6 col-md-4 col-lg-3 p-0'>
            <a v-bind:href='book.book_url'>
                <div class='book-box img-thumbnail rounded-0  m-1 m-md-2'>
                    <div  class='book-img text-center'>
                        <img v-bind:src='book.img_url' class='img-thumbnail rounded-0 img-preview' alt='obal_knihy'/>
                    </div>
                    <div class="d-flex">
                        <div v-for='copy in book.copies'>
                            <i v-if="copy.days < 31" class="fas fa-book-reader red dot" title="Knihu právě někdo čte."></i>
                            <i v-else-if="copy.days >= 31" class="fas fa-book-open orange dot" title="Kniha už je dlouho půjčena a ještě nebyla vrácena. Můžeš si ji půjčit."></i>
                            <i v-else class="fas fa-book green dot" title="Knihu si můžeš půjčit."></i>
                        </div>
                    </div>
                    <div class='book-about d-flex flex-column'>
                        <div class='book-name m-0 p-O'>\
                            <h2 class='h-c m-0'>{{ book.name }}</h2>
                        </div>
                        <div class='book-author m-0'>
                            <p class='a-c  m-0 '>{{ book.author}}</p>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    </div>
`,
    props:['books', 'selectedtags', 'selectedlanguage']
    })

fetch(document.getElementById('data-url').getAttribute('href'))
    .then(r => r.json())
    .then(data => {
        console.log(data)
        new Vue({
            el: "#root",
            data: {
                active: true,
                tags: data.tags,
                selectedtags: ["Vše"],
                language: data.language,
                selectedlanguage: "Vše",
            },
            computed: {
                books: function() {
                    var lang = this.selectedlanguage;
                    var tags = this.selectedtags;
                    var result = Object.values(data.books);
                    if(lang !== "Vše") {
                        result = result.filter(function(book){
                            return book.language.includes(lang);
                        });
                    };
                    for (let tag of tags) {
                        if(tag !== "Vše") {
                            result = result.filter(function(book){
                                return book.tags.includes(tag);
                            });
                        };
                    };
                    return result;
                },

            }
        })

    })
