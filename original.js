
import { ApiService } from './ApiService';

interface Category {}

export class CategoryService extends ApiService {
    
    async getCategoryId(id: number): Promise {
    
         const response = await this.get('/categoryId', id, false);
        return response.json();

    }
}

export class CategoryController {
    
    private _category: Category;

    constructor(private categoryService: CategoryService) {
    
    }

    async setCategoryId(id: number): Promise<void> {
        try {
            this._category = await this.categoryService.getCategoryId(id);
            console.log('Categoria configurada:', this._category);
        } catch (error) {
            console.error('Erro ao configurar a categoria:', error);
        }
    }

}
