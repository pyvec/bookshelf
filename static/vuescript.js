Vue.component('accordion', {
  props: ['theme'],
  template: `<div class="accordion" v-bind:class="theme">
    <div class="header" v-on:click="toggle">

      <i class="fa fa-2x fa-angle-down header-icon" v-bind:class="{ rotate: show }"></i>
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
<ul v-on:input="$emit('input', $event.target.value)" >
    <li class='col-3 col-md-2 col-xl-1 p-0'>
        <label class='checkbox-inline mx-3' ><input type='radio' v-model='selectedlanguage' value='All'/> All </label>
    </li>
    <li v-for='lang in language' class='col-3 col-md-2 col-xl-1 p-0'>
        <label class='checkbox-inline mx-3' ><input type='radio' v-model='selectedlanguage' :value='lang' /> {{ lang }} </label>
    </li>
</ul>
    `,
    props:['language', 'selectedlanguage'],
})
Vue.component('tag-list', {
    template:`
<ul>
    <li class='col-6 col-md-4 col-lg-2 cl-xl-2 p-0'>
        <label class='checkbox-inline mx-3' ><input type='checkbox' @input=\"handle_all($event);\" :checked='selectedtags.includes(\"All\")' name='All' value='All' :disabled='selectedtags.includes(\"All\")'/> All </label>
    </li>
    <li v-for='tag in tags' class='col-6 col-md-4 col-lg-2 p-0'>
        <label class='checkbox-inline mx-3' ><input type='checkbox' @input=\"add_or_remove($event);\" :checked='selectedtags.includes(tag)' :name='tag' :value='tag' /> {{ tag }} </label>
    </li>
</ul>
    `,
    methods: {
        handle_all: function (event) {
            this.$emit('input', ["All"]);
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
                if (array.includes("All")) {
                    array.splice(array.indexOf("All"), 1);
                }
            } else {
                if (array.includes(name)) {
                    array.splice(array.indexOf(name), 1);
                    if (array.length == 0) {
                        array = ["All"];
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
    <ul>
        <li v-for='book in books' class='col-6 col-md-4 col-lg-3 p-0'>
            <div class='book-box m-2'>
                <a v-bind:href='book.book_url'>
                    <div class='book-about d-flex flex-column'>
                        <div class='book-name m-0 p-O'>\
                            <h2 class='h-c m-0'>{{ book.name }}</h2>
                        </div>
                        <div class='book-author m-0'>
                            <p class='a-c mt-2 mb-0 font-italic'>{{ book.author}}</p>
                        </div>
                    </div>
                    <div  class='book-img text-center'>
                        <img v-bind:src='book.img_url' class='img-thumbnail img-preview' alt='obal_knihy'/>
                    </div>
                </a>
            </div>
        </li>
    </ul>
`,
    props:['books', 'selectedtags', 'selectedlanguage']
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
                selectedtags: ["All"],
                language: data.language,
                selectedlanguage: "All",
            },
            computed: {
                books: function() {
                    var lang = this.selectedlanguage;
                    var tags = this.selectedtags;
                    var result = Object.values(data.books);
                    if(lang !== "All") {
                        result = result.filter(function(book){
                            return book.language.includes(lang);
                        });
                    };
                    for (let tag of tags) {
                        if(tag !== "All") {
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
