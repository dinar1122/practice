import http from "./api.js"

class CategoryService {
  getCategories() {
    return http.get('/category')
  }
  getCategoryById(category_id) {
    return http.post('/category/categoryById', {category_id})
  }
}
export default new CategoryService()