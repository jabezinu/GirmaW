import { create } from 'zustand'

const getInitialCategories = () => {
  const stored = localStorage.getItem('categories');
  return stored ? JSON.parse(stored) : [
    { _id: '1', name: 'Appetizers' },
    { _id: '2', name: 'Main Course' },
    { _id: '3', name: 'Desserts' }
  ];
};

const getInitialMenuItems = () => {
  const stored = localStorage.getItem('menuItems');
  return stored ? JSON.parse(stored) : {
    '1': [
      { _id: '1', name: 'Spring Rolls', price: 5.99, ingredients: 'Vegetables, rice paper', badge: 'Popular', image: '', outOfStock: false },
      { _id: '2', name: 'Chicken Wings', price: 8.99, ingredients: 'Chicken, spices', badge: '', image: '', outOfStock: false }
    ],
    '2': [
      { _id: '3', name: 'Grilled Chicken', price: 15.99, ingredients: 'Chicken, herbs', badge: 'Recommended', image: '', outOfStock: false },
      { _id: '4', name: 'Pasta Alfredo', price: 12.99, ingredients: 'Pasta, cream, parmesan', badge: '', image: '', outOfStock: true }
    ],
    '3': [
      { _id: '5', name: 'Chocolate Cake', price: 6.99, ingredients: 'Chocolate, flour, sugar', badge: 'New', image: '', outOfStock: false }
    ]
  };
};

const useMenuStore = create((set, get) => ({
  categories: getInitialCategories(),
  menuItems: getInitialMenuItems(),
  loading: false,
  error: null,
  selectedCategory: null,

  // Fetch categories and menu items (simulate loading)
  fetchCategoriesAndMenus: async () => {
    set({ loading: true, error: null });
    setTimeout(() => {
      const categories = getInitialCategories();
      const menuItems = getInitialMenuItems();
      set({
        categories,
        menuItems,
        selectedCategory: get().selectedCategory || (categories[0]?._id || null),
        loading: false,
        error: null
      });
    }, 500);
  },

  setSelectedCategory: (id) => set({ selectedCategory: id }),

  // Category CRUD
  addCategory: async (name) => {
    const newCategory = { _id: Date.now().toString(), name };
    const categories = [...get().categories, newCategory];
    localStorage.setItem('categories', JSON.stringify(categories));
    set({ categories });
    await get().fetchCategoriesAndMenus();
  },

  updateCategory: async (_id, name) => {
    const categories = get().categories.map(cat => cat._id === _id ? { ...cat, name } : cat);
    localStorage.setItem('categories', JSON.stringify(categories));
    set({ categories });
    await get().fetchCategoriesAndMenus();
  },

  deleteCategory: async (_id) => {
    const categories = get().categories.filter(cat => cat._id !== _id);
    const menuItems = { ...get().menuItems };
    delete menuItems[_id];
    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
    set({ categories, menuItems });
    await get().fetchCategoriesAndMenus();
  },

  // Menu CRUD
  addMenuItem: async (categoryId, formData) => {
    const newItem = {
      _id: Date.now().toString(),
      name: formData.get('name'),
      price: parseFloat(formData.get('price')),
      ingredients: formData.get('ingredients'),
      badge: formData.get('badge'),
      image: '',
      outOfStock: formData.get('outOfStock') === 'true'
    };
    const menuItems = { ...get().menuItems };
    if (!menuItems[categoryId]) menuItems[categoryId] = [];
    menuItems[categoryId].push(newItem);
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
    set({ menuItems });
    await get().fetchCategoriesAndMenus();
  },

  updateMenuItem: async (_id, formData) => {
    const menuItems = { ...get().menuItems };
    for (const categoryId in menuItems) {
      const index = menuItems[categoryId].findIndex(item => item._id === _id);
      if (index !== -1) {
        menuItems[categoryId][index] = {
          ...menuItems[categoryId][index],
          name: formData.get('name'),
          price: parseFloat(formData.get('price')),
          ingredients: formData.get('ingredients'),
          badge: formData.get('badge'),
          outOfStock: formData.get('outOfStock') === 'true'
        };
        break;
      }
    }
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
    set({ menuItems });
    await get().fetchCategoriesAndMenus();
  },

  deleteMenuItem: async (_id) => {
    const menuItems = { ...get().menuItems };
    for (const categoryId in menuItems) {
      menuItems[categoryId] = menuItems[categoryId].filter(item => item._id !== _id);
    }
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
    set({ menuItems });
    await get().fetchCategoriesAndMenus();
  },
}))

export default useMenuStore
