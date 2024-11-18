import React, { useState } from 'react';
import { Heart, Calendar, Gift, Wallet, Image, Plus, X, Grid, List, ShoppingCart, Notebook } from 'lucide-react';
import { format } from 'date-fns';
import clsx from 'clsx';

const CouplesPlanner = () => {
  const [activeTab, setActiveTab] = useState('dates');
  const [dates, setDates] = useState([
    { id: 1, title: 'Прогулянка', date: '2024-03-20', budget: 200, location: 'Піти в Софіївку', notes: 'Тепло одягнись киць' }
  ]);
  const [wishlist, setWishlist] = useState([

  ]);
  const [memories, setMemories] = useState([
    { 
      id: 1, 
      title: 'Перше побачення', 
      date: '2024-02-14',
      image: 'https://i.pinimg.com/474x/51/76/e2/5176e2e23cf66beaed7ce63454e3344f.jpg',
      description: 'З 25 грудня все більше подобається цьомати тебе'
    }
  ]);
  const [budget, setBudget] = useState({
    total: 10000,
    categories: {
      dates: { limit: 3000, spent: 1500 },
      gifts: { limit: 5000, spent: 2000 },
      savings: { limit: 2000, spent: 500 }
    }
  });

  const [newDate, setNewDate] = useState({ title: '', date: '', budget: '', location: '', notes: '' });
  const [newWishItem, setNewWishItem] = useState({ item: '', price: '', priority: 'Середній', forWhom: '' });
  const [newMemory, setNewMemory] = useState({ title: '', date: '', image: '', description: '' });
  const [viewMode, setViewMode] = useState('grid');

  const addDate = () => {
    if (newDate.title && newDate.date) {
      setDates([...dates, { ...newDate, id: dates.length + 1 }]);
      setNewDate({ title: '', date: '', budget: '', location: '', notes: '' });
    }
  };

  const addWishItem = () => {
    if (newWishItem.item && newWishItem.price) {
      setWishlist([...wishlist, { ...newWishItem, id: wishlist.length + 1 }]);
      setNewWishItem({ item: '', price: '', priority: 'Середній', forWhom: '' });
    }
  };

  const addMemory = () => {
    if (newMemory.title && newMemory.date) {
      setMemories([...memories, { ...newMemory, id: memories.length + 1 }]);
      setNewMemory({ title: '', date: '', image: '' , description: '' });
    }
  };

  const deleteDate = (id: number) => {
    setDates(dates.filter(date => date.id !== id));
  };

  const deleteWishItem = (id: number) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  const deleteMemory = (id: number) => {
    setMemories(memories.filter(memory => memory.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-rose-700 flex items-center justify-center gap-2">
          <Heart className="text-rose-500" fill="currentColor" />
          Наша Історія Кохання
        </h1>
        <p className="text-rose-600 mt-2">Плануємо наші особливі моменти разом</p>
      </header>

      <nav className="mb-8">
        <ul className="flex gap-4 justify-center flex-wrap">
          {[
            { id: 'dates', icon: Calendar, label: 'Побачення' },
            { id: 'wishlist', icon: Gift, label: 'Бажання' },
            { id: 'budget', icon: Wallet, label: 'Бюджет' },
            { id: 'memories', icon: Image, label: 'Спогади' }
          ].map(({ id, icon: Icon, label }) => (
            <li key={id}>
              <button
                onClick={() => setActiveTab(id)}
                className={clsx(
                  'flex items-center gap-2 px-4 py-2 rounded-full transition-colors',
                  activeTab === id
                    ? 'bg-rose-500 text-white'
                    : 'bg-white text-rose-600 hover:bg-rose-100'
                )}
              >
                <Icon size={18} />
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <main className="bg-white rounded-xl shadow-xl p-6">
        {activeTab === 'dates' && (
          <div className="space-y-6">
            <div className="flex gap-4 mb-6">
              <input
                type="text"
                placeholder="Назва побачення"
                value={newDate.title}
                onChange={(e) => setNewDate({ ...newDate, title: e.target.value })}
                className="flex-1 input-primary"
              />
              <input
                type="date"
                value={newDate.date}
                onChange={(e) => setNewDate({ ...newDate, date: e.target.value })}
                className="input-primary"
              />
              <input
                type="number"
                placeholder="Бюджет"
                value={newDate.budget}
                onChange={(e) => setNewDate({ ...newDate, budget: e.target.value })}
                className="w-32 input-primary"
              />
              <button onClick={addDate} className="btn-primary">
                <Plus size={20} />
              </button>
            </div>

            <div className="grid gap-4">
              {dates.map((date) => (
                <div key={date.id} className="bg-rose-50 p-4 rounded-lg border border-rose-200 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-rose-700">{date.title}</h3>
                    <p className="text-rose-600 text-sm">
                      {format(new Date(date.date), 'dd.MM.yyyy')}
                    </p>
                    {date.location && (
                      <p className="text-gray-600 text-sm mt-1">{date.location}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    {date.budget && (
                      <span className="text-rose-600 font-medium">{date.budget}₴</span>
                    )}
                    <button 
                      onClick={() => deleteDate(date.id)}
                      className="text-rose-500 hover:text-rose-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            <div className="flex gap-4 mb-6">
              <input
                type="text"
                placeholder="Назва подарунку"
                value={newWishItem.item}
                onChange={(e) => setNewWishItem({ ...newWishItem, item: e.target.value })}
                className="flex-1 input-primary"
              />
              <input
                type="number"
                placeholder="Ціна"
                value={newWishItem.price}
                onChange={(e) => setNewWishItem({ ...newWishItem, price: e.target.value })}
                className="w-32 input-primary"
              />
              <select
                value={newWishItem.priority}
                onChange={(e) => setNewWishItem({ ...newWishItem, priority: e.target.value })}
                className="input-primary"
              >
                <option value="Низький">Низький</option>
                <option value="Середній">Середній</option>
                <option value="Високий">Високий</option>
              </select>
              <select
                value={newWishItem.forWhom}
                onChange={(e) => setNewWishItem({ ...newWishItem, forWhom: e.target.value })}
                className="input-primary"
              >
                <option value="">Для кого</option>
                <option value="Коханому">Коханому</option>
                <option value="Коханій">Коханій</option>
                <option value="Обом">Обом</option>
              </select>
              <button onClick={addWishItem} className="btn-primary">
                <Plus size={20} />
              </button>
            </div>

            <div className="grid gap-4">
              {wishlist.map((item) => (
                <div key={item.id} className="bg-rose-50 p-4 rounded-lg border border-rose-200 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-rose-700">{item.item}</h3>
                    <p className="text-gray-600 text-sm">Для: {item.forWhom}</p>
                    <span className="inline-block px-2 py-1 text-xs rounded bg-rose-100 text-rose-700 mt-1">
                      Пріоритет: {item.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-rose-600 font-medium">{item.price}₴</span>
                    <button 
                      onClick={() => deleteWishItem(item.id)}
                      className="text-rose-500 hover:text-rose-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'budget' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-rose-50 p-4 rounded-lg border border-rose-200">
                <h3 className="font-semibold text-rose-700 mb-2">Загальний бюджет</h3>
                <p className="text-2xl font-bold text-rose-600">{budget.total}₴</p>
              </div>
              <div className="bg-rose-50 p-4 rounded-lg border border-rose-200">
                <h3 className="font-semibold text-rose-700 mb-2">Витрачено</h3>
                <p className="text-2xl font-bold text-rose-600">
                  {Object.values(budget.categories).reduce((acc, cat) => acc + cat.spent, 0)}₴
                </p>
              </div>
              <div className="bg-rose-50 p-4 rounded-lg border border-rose-200">
                <h3 className="font-semibold text-rose-700 mb-2">Залишилось</h3>
                <p className="text-2xl font-bold text-rose-600">
                  {budget.total - Object.values(budget.categories).reduce((acc, cat) => acc + cat.spent, 0)}₴
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {Object.entries(budget.categories).map(([category, data]) => (
                <div key={category} className="bg-white p-4 rounded-lg border border-rose-200">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-rose-700 capitalize">
                      {category === 'dates' ? 'Побачення' : 
                       category === 'gifts' ? 'Подарунки' : 'Заощадження'}
                    </h3>
                    <span className="text-rose-600">{data.spent}₴ / {data.limit}₴</span>
                  </div>
                  <div className="w-full bg-rose-100 rounded-full h-2">
                    <div
                      className="bg-rose-500 h-2 rounded-full transition-all"
                      style={{ width: `${(data.spent / data.limit) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'memories' && (
          <div className="space-y-6">
            <div className="flex gap-4 mb-6">
              <input
                type="text"
                placeholder="Назва спогаду"
                value={newMemory.title}
                onChange={(e) => setNewMemory({ ...newMemory, title: e.target.value })}
                className="flex-1 input-primary"
              />
              <input
                type="date"
                value={newMemory.date}
                onChange={(e) => setNewMemory({ ...newMemory, date: e.target.value })}
                className="input-primary"
              />
              <input
                type="text"
                placeholder="URL зображення"
                value={newMemory.image}
                onChange={(e) => setNewMemory({ ...newMemory, image: e.target.value })}
                className="flex-1 input-primary"
              />
              <button onClick={addMemory} className="btn-primary">
                <Plus size={20} />
              </button>
            </div>

            <div className="flex justify-end mb-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={clsx(
                    'p-2 rounded-lg',
                    viewMode === 'grid' ? 'bg-rose-100 text-rose-700' : 'text-gray-500'
                  )}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={clsx(
                    'p-2 rounded-lg',
                    viewMode === 'list' ? 'bg-rose-100 text-rose-700' : 'text-gray-500'
                  )}
                >
                  <List size={20} />
                </button>
              </div>
            </div>

            <div className={clsx(
              viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'
            )}>
              {memories.map((memory) => (
                <div key={memory.id} className="bg-rose-50 rounded-lg border border-rose-200 overflow-hidden">
                  <img
                    src={memory.image}
                    alt={memory.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-rose-700">{memory.title}</h3>
                    <p className="text-rose-600 text-sm">
                      {format(new Date(memory.date), 'dd.MM.yyyy')}
                    </p>
                    {memory.description && (
                      <p className="text-gray-600 text-sm mt-2">{memory.description}</p>
                    )}
                    <button
                      onClick={() => deleteMemory(memory.id)}
                      className="mt-2 text-rose-500 hover:text-rose-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CouplesPlanner;