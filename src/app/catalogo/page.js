"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaSearch, 
  FaFilter, 
  FaTimes, 
  FaChevronDown, 
  FaChevronUp, 
  FaSortAmountDown, 
  FaStar, 
  FaTags, 
  FaLaptop, 
  FaDesktop, 
  FaGamepad, 
  FaHeadset, 
  FaKeyboard, 
  FaMouse, 
  FaMemory, 
  FaMicrochip
} from 'react-icons/fa';

import ProductCardDos from '@/components/ProductCard/ProductCardDos';

export default function CatalogoPage() {
  // Estado para productos y filtros
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [sortOption, setSortOption] = useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Estados para secciones de filtro expandidas/colapsadas
  const [expandedSections, setExpandedSections] = useState({
    brands: true,
    categories: true,
    price: true
  });

  // Datos de ejemplo para las marcas
  const brands = [
    { id: 'asus', name: 'ASUS', count: 12 },
    { id: 'msi', name: 'MSI', count: 8 },
    { id: 'razer', name: 'Razer', count: 6 },
    { id: 'hp', name: 'HP', count: 9 },
    { id: 'lenovo', name: 'Lenovo', count: 5 },
    { id: 'dell', name: 'Dell', count: 7 },
    
  ];

  // Datos de ejemplo para categorías
  const categories = [
    { id: 'laptops', name: 'Laptops Gaming', icon: <FaLaptop /> },
    { id: 'desktops', name: 'PCs Gaming', icon: <FaDesktop /> },
    { id: 'monitors', name: 'Monitores', icon: <FaDesktop /> },
    { id: 'consoles', name: 'Consolas', icon: <FaGamepad /> },
    { id: 'keyboards', name: 'Teclados', icon: <FaKeyboard /> },
    { id: 'mice', name: 'Ratones', icon: <FaMouse /> },
    { id: 'headsets', name: 'Auriculares', icon: <FaHeadset /> },
    { id: 'components', name: 'Componentes', icon: <FaMicrochip /> },
  ];

  // Cargar productos de ejemplo
  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      // Productos de ejemplo
      const demoProducts = [
        {
          id: '1',
          name: 'ASUS ROG Strix G15',
          category: 'Gaming Laptop',
          price: 1299.99,
          originalPrice: 1499.99,
          image: '/img/omenmax.png',
          brand: 'asus',
          categoryId: 'laptops',
          specs: {
            processor: 'Intel Core i7',
            gpu: 'RTX 3070',
            ram: '16GB DDR4',
            storage: '1TB SSD'
          },
          discount: 13,
          isNew: true,
          rating: 4.8
        },
        {
          id: '2',
          name: 'MSI Katana GF66',
          category: 'Gaming Laptop',
          price: 999.99,
          originalPrice: 1199.99,
          image: '/img/omenmax.png',
          brand: 'msi',
          categoryId: 'laptops',
          specs: {
            processor: 'Intel Core i5',
            gpu: 'RTX 3060',
            ram: '16GB DDR4',
            storage: '512GB SSD'
          },
          discount: 17,
          isNew: false,
          rating: 4.5
        },
        {
          id: '3',
          name: 'Razer Blade 15',
          category: 'Gaming Laptop',
          price: 1799.99,
          originalPrice: 1899.99,
          image: '/img/omenmax.png',
          brand: 'razer',
          categoryId: 'laptops',
          specs: {
            processor: 'Intel Core i9',
            gpu: 'RTX 3080',
            ram: '32GB DDR4',
            storage: '1TB SSD'
          },
          discount: 5,
          isNew: true,
          rating: 4.9
        },
        {
          id: '4',
          name: 'Corsair K95 RGB',
          category: 'Gaming Keyboard',
          price: 169.99,
          originalPrice: 199.99,
          image: '/img/omenmax.png',
          brand: 'corsair',
          categoryId: 'keyboards',
          specs: {
            processor: 'N/A',
            gpu: 'N/A',
            ram: 'N/A',
            storage: 'N/A'
          },
          discount: 15,
          isNew: false,
          rating: 4.7
        },
        {
          id: '5',
          name: 'Logitech G Pro X',
          category: 'Gaming Headset',
          price: 129.99,
          originalPrice: 149.99,
          image: '/img/omenmax.png',
          brand: 'logitech',
          categoryId: 'headsets',
          specs: {
            processor: 'N/A',
            gpu: 'N/A',
            ram: 'N/A',
            storage: 'N/A'
          },
          discount: 13,
          isNew: false,
          rating: 4.6
        },
        {
          id: '6',
          name: 'HP Omen 30L',
          category: 'Gaming PC',
          price: 1899.99,
          originalPrice: 2099.99,
          image: '/img/omenmax.png',
          brand: 'hp',
          categoryId: 'desktops',
          specs: {
            processor: 'AMD Ryzen 9',
            gpu: 'RTX 3080',
            ram: '32GB DDR4',
            storage: '2TB SSD'
          },
          discount: 10,
          isNew: true,
          rating: 4.8
        }
      ];

      setProducts(demoProducts);
      setFilteredProducts(demoProducts);
      setLoading(false);
    }, 1000); // Simular 1 segundo de carga
  }, []);

  // Aplicar filtros y búsqueda
  useEffect(() => {
    let result = products;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por marcas seleccionadas
    if (selectedBrands.length > 0) {
      result = result.filter(product => selectedBrands.includes(product.brand));
    }

    // Filtrar por categorías seleccionadas
    if (selectedCategories.length > 0) {
      result = result.filter(product => selectedCategories.includes(product.categoryId));
    }

    // Filtrar por rango de precio
    result = result.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Aplicar clasificación
    switch (sortOption) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result = [...result].filter(item => item.isNew).concat([...result].filter(item => !item.isNew));
        break;
      case 'discount':
        result = [...result].sort((a, b) => b.discount - a.discount);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      // Por defecto es 'featured', no se modifica el orden
    }

    setFilteredProducts(result);
  }, [products, searchTerm, selectedBrands, selectedCategories, priceRange, sortOption]);

  // Manejar cambios en los filtros de marcas
  const handleBrandChange = (brandId) => {
    setSelectedBrands(prev => {
      if (prev.includes(brandId)) {
        return prev.filter(id => id !== brandId);
      } else {
        return [...prev, brandId];
      }
    });
  };

  // Manejar cambios en los filtros de categorías
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  // Alternar las secciones expandidas/colapsadas
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Limpiar todos los filtros
  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setPriceRange({ min: 0, max: 5000 });
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header de catálogo */}
      <div className="bg-gradient-to-r from-gray-900 to-black py-8 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Catálogo <span className="text-red-500">Gaming</span>
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Descubre nuestra amplia selección de productos gaming de alta calidad: 
            laptops, periféricos, componentes y mucho más para elevar tu experiencia.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Barra superior con búsqueda y filtro móvil */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          {/* Buscador */}
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full py-2.5 bg-gray-800/70 text-white placeholder-gray-500 rounded-lg border border-gray-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-colors duration-200"
              placeholder="Buscar productos..."
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
              >
                <FaTimes />
              </button>
            )}
          </div>

          {/* Botón de filtros (visible solo en móvil) */}
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="md:hidden flex items-center gap-2 py-2.5 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-colors"
          >
            <FaFilter />
            <span>Filtros</span>
          </button>

          {/* Selector de ordenamiento */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-sm text-gray-400 whitespace-nowrap">Ordenar por:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 outline-none focus:border-red-500 transition-colors"
            >
              <option value="featured">Destacados</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="newest">Lo más nuevo</option>
              <option value="discount">Mayor descuento</option>
              <option value="rating">Mejor valorados</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar de filtros para escritorio */}
          <div className="hidden md:block md:w-1/4 lg:w-1/5">
            <div className="sticky top-8">
              <div className="bg-gray-900/60 rounded-xl border border-gray-800 overflow-hidden mb-6">
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                  <h2 className="text-xl font-bold text-white">Filtros</h2>
                  <button 
                    onClick={clearAllFilters}
                    className="text-sm text-red-500 hover:text-red-400"
                  >
                    Limpiar todo
                  </button>
                </div>

                {/* Sección de marcas */}
                <div className="border-b border-gray-800">
                  <button 
                    onClick={() => toggleSection('brands')}
                    className="flex items-center justify-between w-full p-4 text-left"
                  >
                    <span className="font-medium">Marcas</span>
                    {expandedSections.brands ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  
                  {expandedSections.brands && (
                    <div className="p-4 pt-0 space-y-2 max-h-60 overflow-y-auto">
                      {brands.map(brand => (
                        <label key={brand.id} className="flex items-center justify-between cursor-pointer hover:bg-gray-800/50 p-1 rounded transition-colors">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedBrands.includes(brand.id)}
                              onChange={() => handleBrandChange(brand.id)}
                              className="w-4 h-4 accent-red-500 rounded focus:ring-red-500 mr-2"
                            />
                            <span className="text-sm">{brand.name}</span>
                          </div>
                          <span className="text-xs text-gray-500">{brand.count}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sección de categorías */}
                <div className="border-b border-gray-800">
                  <button 
                    onClick={() => toggleSection('categories')}
                    className="flex items-center justify-between w-full p-4 text-left"
                  >
                    <span className="font-medium">Categorías</span>
                    {expandedSections.categories ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  
                  {expandedSections.categories && (
                    <div className="p-4 pt-0 space-y-2">
                      {categories.map(category => (
                        <label key={category.id} className="flex items-center cursor-pointer hover:bg-gray-800/50 p-1 rounded transition-colors">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category.id)}
                            onChange={() => handleCategoryChange(category.id)}
                            className="w-4 h-4 accent-red-500 rounded focus:ring-red-500 mr-2"
                          />
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">{category.icon}</span>
                            <span className="text-sm">{category.name}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sección de rango de precio */}
                <div>
                  <button 
                    onClick={() => toggleSection('price')}
                    className="flex items-center justify-between w-full p-4 text-left"
                  >
                    <span className="font-medium">Precio</span>
                    {expandedSections.price ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  
                  {expandedSections.price && (
                    <div className="p-4 pt-0 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Mínimo:</span>
                        <span className="text-sm font-medium">${priceRange.min}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="5000"
                        step="50"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
                      />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Máximo:</span>
                        <span className="text-sm font-medium">${priceRange.max}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="5000"
                        step="50"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
                      />
                      
                      <div className="flex justify-between gap-2 pt-2">
                        <div className="flex-1 relative">
                          <span className="absolute text-xs text-gray-500 -top-5">Min</span>
                          <input
                            type="number"
                            value={priceRange.min}
                            onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                            className="w-full p-2 bg-gray-800 rounded border border-gray-700 text-sm"
                            min="0"
                            max={priceRange.max}
                          />
                        </div>
                        <div className="flex-1 relative">
                          <span className="absolute text-xs text-gray-500 -top-5">Max</span>
                          <input
                            type="number"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                            className="w-full p-2 bg-gray-800 rounded border border-gray-700 text-sm"
                            min={priceRange.min}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Banner promocional */}
              <div className="bg-gradient-to-r from-red-900/40 to-red-600/40 backdrop-blur-sm p-5 rounded-xl border border-red-700/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/img/dota2-bg.jpg')] opacity-10"></div>
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-white mb-2">
                    ¡Oferta Exclusiva!
                  </h3>
                  <p className="text-sm text-gray-200 mb-4">
                    Hasta 30% de descuento en periféricos Razer
                  </p>
                  <Link href="/promociones" className="inline-block bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
                    Ver ofertas
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="flex-1">
            {/* Filtros móviles - desplegable */}
            <div className={`md:hidden fixed inset-0 z-40 transform ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)}></div>
              
              <div className="absolute top-0 bottom-0 left-0 w-80 bg-gray-900 overflow-y-auto">
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <FaFilter />
                    <span>Filtros</span>
                  </h2>
                  <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 text-gray-400 hover:text-white">
                    <FaTimes />
                  </button>
                </div>
                
                {/* Contenido del filtro móvil - mismo que en escritorio */}
                <div className="p-4">
                  <button 
                    onClick={clearAllFilters}
                    className="w-full py-2 mb-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-sm font-medium rounded-lg border border-red-500/20 transition-colors"
                  >
                    Limpiar todos los filtros
                  </button>
                  
                  {/* Filtros móviles - mismo contenido que en escritorio */}
                  {/* ... pero en formato móvil */}
                  {/* Sección de marcas */}
                  <div className="mb-6 border-b border-gray-800 pb-6">
                    <h3 className="font-medium mb-3">Marcas</h3>
                    <div className="space-y-2">
                      {brands.map(brand => (
                        <label key={brand.id} className="flex items-center justify-between cursor-pointer">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedBrands.includes(brand.id)}
                              onChange={() => handleBrandChange(brand.id)}
                              className="w-4 h-4 accent-red-500 rounded focus:ring-red-500 mr-2"
                            />
                            <span className="text-sm">{brand.name}</span>
                          </div>
                          <span className="text-xs text-gray-500">{brand.count}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Resto de los filtros móviles... */}
                </div>
                
                <div className="p-4 border-t border-gray-800 bg-gray-900/80 backdrop-blur-sm">
                  <button 
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="w-full py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-300"
                  >
                    Ver {filteredProducts.length} resultados
                  </button>
                </div>
              </div>
            </div>

            {/* Área de resultados */}
            <div>
              {/* Estado de los filtros */}
              <div className="mb-6 flex flex-wrap gap-2">
                {selectedBrands.length > 0 && (
                  <div className="flex items-center text-sm bg-gray-800/80 py-1 px-3 rounded-full border border-gray-700">
                    <span className="mr-2">Marcas:</span> 
                    <span className="font-medium">{selectedBrands.length}</span>
                  </div>
                )}
                
                {selectedCategories.length > 0 && (
                  <div className="flex items-center text-sm bg-gray-800/80 py-1 px-3 rounded-full border border-gray-700">
                    <span className="mr-2">Categorías:</span> 
                    <span className="font-medium">{selectedCategories.length}</span>
                  </div>
                )}
                
                {(priceRange.min > 0 || priceRange.max < 5000) && (
                  <div className="flex items-center text-sm bg-gray-800/80 py-1 px-3 rounded-full border border-gray-700">
                    <span className="mr-2">Precio:</span> 
                    <span className="font-medium">${priceRange.min} - ${priceRange.max}</span>
                  </div>
                )}
                
                {searchTerm && (
                  <div className="flex items-center text-sm bg-gray-800/80 py-1 px-3 rounded-full border border-gray-700">
                    <span className="mr-2">Búsqueda:</span> 
                    <span className="font-medium">{searchTerm}</span>
                  </div>
                )}
              </div>

              {/* Resultados */}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-16 h-16 border-4 border-gray-800 border-t-red-500 rounded-full animate-spin"></div>
                  <p className="mt-4 text-gray-400">Cargando productos...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="text-6xl text-gray-700 mb-4">
                    <FaSearch />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">No se encontraron productos</h2>
                  <p className="text-gray-400 max-w-md mb-6">
                    No hay productos que coincidan con tus criterios de búsqueda. Intenta cambiar los filtros o buscar con otros términos.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
                  >
                    Limpiar filtros
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-400 mb-4">
                    Mostrando {filteredProducts.length} de {products.length} productos
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredProducts.map(product => (
                      <ProductCardDos key={product.id} product={product} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}