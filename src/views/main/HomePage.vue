<template>
    <div class="col-lg-9">
        <div class="row">
            <div v-for="(blog) in listblog" :key="blog._id" class="col-lg-6 col-md-6 mb-5">
                <div class="card custom_card p-3" >
                    <img class="card-img-top img-fluid" :src="'http://localhost:3000/images/'+blog.image" alt="Card image cap" width="200" height="200">
                    <div class="card-body">
                        <h6>{{ blog.title }}</h6>
                        <p class="card-text text">{{ blog.header }}
                        </p>
                    </div>
                    <h6 @click="handlerBlogDetail(blog._id)" class="read_more">read more <span><i class="fa fa-arrow-right" aria-hidden="true"></i></span> </h6>
                </div>
            </div>
        </div>

        <div>
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <!-- <li class="page-item"><a class="page-link" href="#">1</a></li> -->
                  <li style="margin-left: 0px;" v-for="item in length_all_blog" @click="handlerClickChangePage(item)" :key="item" class="page-item"><a class="page-link">{{ item }}</a></li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
import store from '@/store';
import { mapActions } from 'vuex';
export default{
    name: "HomePage",
    data(){
        return {
        }
    },
    computed: {
        listblog(){
            return store.state.list_blog
        },
        length_all_blog(){
            const quantity = store.state.length_blog
            return Math.ceil(quantity/4);
        }
    },
    methods: {
        ...mapActions(['getListBlog','getBlogDetail']),
        handlerBlogDetail(id){
            this.getBlogDetail(id)
            this.$router.push({name: "blogdetail",params: {id: id}})
        },
        handlerClickChangePage(page){
            this.getListBlog(page)
        }
    },
    created(){
        this.getListBlog(1)
        
    },
    updated(){
        
    }
}
</script>

<style scoped>
    .text {
   overflow: hidden;
   display: -webkit-box;
   -webkit-line-clamp: 1; /* number of lines to show */
           line-clamp: 1; 
   -webkit-box-orient: vertical;
}
</style>