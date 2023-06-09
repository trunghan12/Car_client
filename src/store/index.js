import { createStore } from 'vuex'
import axios from 'axios'
// Create a new store instance.
const store = createStore({
  state () {
    return {
      list_blog: [],
      list_category:[],
      blog_detail: {

      },
      auth: {
        isAuthentication: false,
      },
      length_blog: 0,
      all_blog_admin:[]
    }
  },
  mutations: {
    GETLISTBLOG(state,data){
      state.list_blog = data
    },
    GETALLBLOGADMIN(state,data){
      state.all_blog_admin = data
    },
    ADD_BLOG(state,data){
      state.list_blog.unshift(data)
    },
    GET_BLOG_DETAIL(state,data){
      state.blog_detail = data
    },
    DELETE_BLOG(state,id){
      state.list_blog = state.list_blog.filter(blog => blog._id != id)
    },
    UPDATE_BLOG(state,data){
      const {_id, ...info} = data
      state.list_blog = state.list_blog.map(blog=>{
        return  blog._id == _id ? info : blog
      })
    },
    UPDATE_AUTH(state, isAuth){
      state.auth.isAuthentication = isAuth
    },
    GET_LIST_CATEGORY(state,data){
      state.list_category = data
    },
    UPDATE_LENGTH_BLOG(state, data){
      state.length_blog = data.length
    }
  },
  actions: {
    async getListBlog({commit},page){
      try{
        const response = await axios.get('http://localhost:3000/api/blog?page='+page)
        commit('GETLISTBLOG',response.data)
      }catch(error){
          console.log("Loi action getListBlog")
      }
    },
    async getAllBlogAdmin({commit}){
      try{
        const response = await axios.get('http://localhost:3000/api/blog')
        commit('GETALLBLOGADMIN',response.data)
      }catch(error){
          console.log("Loi action getAllBlogAdmin")
      }
    },
    async getAllBlog({commit}){
      try{
        const response = await axios.get('http://localhost:3000/api/blog')
        commit('UPDATE_LENGTH_BLOG',response.data)
      }catch(error){
          console.log("Loi action getAllBlog")
      }
    },
    async addNewBlog({commit},data){
      try{
        const response = await axios.post('http://localhost:3000/api/blog',data)
        console.log(response.data)
        // console.log(commit)
        commit('ADD_BLOG', response.data)
      }catch(error){
        console.log("loi action addNewBlog")
      }
    },
    async getBlogDetail({commit},id){
      try{  
        const response = await axios.get('http://localhost:3000/api/blog/'+id)
        commit('GET_BLOG_DETAIL',response.data)
      }catch(error){
        console.log("Loi action getBlogDetail")
      }
    },
    async deleteBlog({commit},id){
      try{  
        await axios.delete('http://localhost:3000/api/blog/'+id)
        commit('DELETE_BLOG',id)
      }catch(error){
        console.log("Loi action deleteBlog")
      }
    },
    async updateBlog({commit},data){
      try{  
        const {id, ...info} = data
        const response = await axios.put('http://localhost:3000/api/blog/'+id, info)
        commit('UPDATE_BLOG',response.data)
      }catch(error){
        console.log("Loi action updateBlog")
      }
    },
    async getListCategory({commit}){
      try{
        const response = await axios.get('http://localhost:3000/api/category')
        commit('GET_LIST_CATEGORY',response.data)
      }catch(error){
        console.log('Loi action getListCategory')
      }
    },
    async getListBlogByCategory({commit},category){
      try{
        const response = await axios.get('http://localhost:3000/api/blog?category='+category)
        commit('GETLISTBLOG',response.data)
      }catch(error){
          console.log("Loi action getListBlog")
      }
    },
  }
})


export default store