import { ApiService } from './ApiService';

interface Category {}

export class CategoryService extends ApiService {
    getCategoryId(id: number, callback: (data: any) => void): void {
        // Realiza a chamada ao método `get` e utiliza o callback para processar o resultado
        this.get('/categoryId', id, false).then((response: any) => {
            const evt = new CustomEvent('setCategoryById', { detail: { data: response.json() } });
            window.dispatchEvent(evt);
            callback(response.json());
        }).catch((error: any) => {
            console.error('Erro ao buscar a categoria:', error);
        });
    }
}

export class CategoryController {
    private _category: Category;

    constructor(private categoryService: CategoryService) {}

    setCategoryId(id: number): void {
        // Usa o serviço para obter a categoria e define os dados diretamente
        this.categoryService.getCategoryId(id, (data: any) => {
            this._category = data;
            console.log('Categoria configurada:', this._category);
        });

        // Configura o listener para capturar eventos, se necessário
        window.addEventListener('setCategoryById', (e: any) => {
            this._category = e.detail.data;
            console.log('Categoria atualizada pelo evento:', this._category);
        });
    }
}
