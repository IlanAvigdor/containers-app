import React, { useState, useEffect } from 'react';
import { Package, Plus, Minus, AlertTriangle, Calendar, Sun, Moon, CheckCircle, TrendingDown, TrendingUp, History, ClipboardList, ArrowRight, Refrigerator, Archive, Flame } from 'lucide-react';
import { initialInventory, initialTransactions } from './mockData';
import Presentation from './Presentation';
import './index.css';

function App() {
  const [viewMode, setViewMode] = useState('presentation'); // 'presentation' has priority
  const [theme, setTheme] = useState('dark');
  const [inventory, setInventory] = useState(initialInventory);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [activeTab, setActiveTab] = useState('inventory'); // inventory, transactions, expiry
  const [selectedCategory, setSelectedCategory] = useState(null); // null, 'מכולת קשות', 'מקרר'
  const [showModal, setShowModal] = useState(false);
  const [transactionForm, setTransactionForm] = useState({ itemId: '', type: 'out', amount: '', note: '' });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  const handleTransactionSubmit = (e) => {
    e.preventDefault();
    if (!transactionForm.itemId || !transactionForm.amount) return;
    
    const amountNum = parseFloat(transactionForm.amount);
    if (amountNum <= 0) return;

    const newTx = {
      id: Date.now(),
      itemId: parseInt(transactionForm.itemId),
      type: transactionForm.type,
      amount: amountNum,
      date: new Date().toISOString().split('T')[0],
      note: transactionForm.note || (transactionForm.type === 'in' ? 'קבלת אספקה' : 'יציאת מלאי')
    };

    setTransactions([newTx, ...transactions]);

    setInventory(inventory.map(item => {
      if (item.id === newTx.itemId) {
        return { 
          ...item, 
          quantity: newTx.type === 'in' ? item.quantity + amountNum : Math.max(0, item.quantity - amountNum)
        };
      }
      return item;
    }));

    setShowModal(false);
    setTransactionForm({ itemId: '', type: 'out', amount: '', note: '' });
  };

  const isExpiringSoon = (dateStr) => {
    const expDate = new Date(dateStr);
    const today = new Date('2026-10-03'); // Using current context time
    const diffTime = expDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 14 && diffDays >= 0;
  };
  
  const isExpired = (dateStr) => {
    return new Date(dateStr) < new Date('2026-10-03');
  };

  const getStatusBadge = (dateStr) => {
    if (isExpired(dateStr)) return <span className="status-badge status-expired"><AlertTriangle size={14}/> פג תוקף</span>;
    if (isExpiringSoon(dateStr)) return <span className="status-badge status-warning"><AlertTriangle size={14}/> פג תוקף בקרוב</span>;
    return <span className="status-badge status-ok"><CheckCircle size={14}/> תקין</span>;
  };

  if (viewMode === 'presentation') {
    return <Presentation onSwitchToInventory={() => setViewMode('inventory')} />;
  }

  return (
    <div className="app-container">
      <header className="glass-panel main-header">
        <div className="header-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h1><Package className="mr-2" /> ניהול מלאי - ליעד</h1>
            <button 
              className="btn btn-primary" 
              onClick={() => setViewMode('presentation')}
              style={{ background: 'linear-gradient(135deg, #b91c1c, #ef4444)', border: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem', borderRadius: '8px', cursor: 'pointer', color: '#fff', fontWeight: 600 }}
            >
              <Flame size={16} /> מצגת גדוד רשף
            </button>
          </div>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
        
        <nav className="tabs">
          <button className={`tab ${activeTab === 'inventory' ? 'active' : ''}`} onClick={() => setActiveTab('inventory')}>
            <ClipboardList size={18}/> מלאי עדכני
          </button>
          <button className={`tab ${activeTab === 'transactions' ? 'active' : ''}`} onClick={() => setActiveTab('transactions')}>
            <History size={18}/> היסטוריית תנועות
          </button>
          <button className={`tab ${activeTab === 'expiry' ? 'active' : ''}`} onClick={() => setActiveTab('expiry')}>
            <AlertTriangle size={18}/> התראות תוקף
          </button>
        </nav>
      </header>

      <main className="content-area">
        {activeTab === 'inventory' && (
          <section className="fade-in">
            {selectedCategory === null ? (
              <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                <div className="glass-panel card" style={{ cursor: 'pointer', textAlign: 'center', padding: '4rem 2rem', transition: 'transform 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={() => setSelectedCategory('מכולת קשות')}>
                  <Archive size={48} style={{ marginBottom: '1rem', color: 'var(--primary-color)' }} />
                  <h2 style={{ fontSize: '1.5rem' }}>מכולת קשות</h2>
                  <p style={{ marginTop: '1rem', opacity: 0.7 }}>ניהול מלאי יבש, שימורים וקופסאות</p>
                </div>
                <div className="glass-panel card" style={{ cursor: 'pointer', textAlign: 'center', padding: '4rem 2rem', transition: 'transform 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={() => setSelectedCategory('מקרר')}>
                  <Refrigerator size={48} style={{ marginBottom: '1rem', color: 'var(--primary-color)' }} />
                  <h2 style={{ fontSize: '1.5rem' }}>מקרר</h2>
                  <p style={{ marginTop: '1rem', opacity: 0.7 }}>ניהול מלאי בקירור ומוצרי חלב</p>
                </div>
              </div>
            ) : (
              <>
                <div className="action-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-primary" onClick={() => { setTransactionForm({...transactionForm, type: 'in'}); setShowModal(true); }}>
                      <TrendingUp size={18}/> קבלת אספקה (כניסה)
                    </button>
                    <button className="btn btn-secondary" onClick={() => { setTransactionForm({...transactionForm, type: 'out'}); setShowModal(true); }}>
                      <TrendingDown size={18}/> דיווח צריכה (יציאה)
                    </button>
                  </div>
                  <button className="btn btn-outline" onClick={() => setSelectedCategory(null)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowRight size={18}/> חזור לאזורים
                  </button>
                </div>
                
                <div className="category-section" style={{marginTop: '2rem'}}>
                  <h2 style={{marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', color: 'var(--text-color)'}}>{selectedCategory}</h2>
                  {inventory.filter(item => item.category === selectedCategory).length === 0 ? (
                    <div style={{opacity: 0.7, padding: '1rem 0'}}>אין כרגע מלאי רשום באזור זה.</div>
                  ) : (
                    <div className="grid">
                      {inventory.filter(item => item.category === selectedCategory).map(item => (
                        <div key={item.id} className="glass-panel card">
                          <div className="card-header">
                            <h3>{item.name}</h3>
                            {getStatusBadge(item.expirationDate)}
                          </div>
                          <div className="card-body">
                            <div className="stat">
                              <span className="label">כמות נוכחית:</span>
                              <span className="value">{item.quantity} {item.unit}</span>
                            </div>
                            <div className="stat">
                              <span className="label">פג תוקף:</span>
                              <span className="value flex items-center gap-2"><Calendar size={14}/> {item.expirationDate}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </section>
        )}

        {activeTab === 'transactions' && (
          <section className="fade-in glass-panel table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>תאריך</th>
                  <th>פריט</th>
                  <th>סוג תנועה</th>
                  <th>כמות</th>
                  <th>הערות</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(tx => {
                  const item = inventory.find(i => i.id === tx.itemId);
                  return (
                    <tr key={tx.id}>
                      <td>{tx.date}</td>
                      <td>{item?.name || 'לא ידוע'}</td>
                      <td>
                        <span className={`badge ${tx.type === 'in' ? 'badge-green' : 'badge-red'}`}>
                          {tx.type === 'in' ? 'כניסה' : 'יציאה'}
                        </span>
                      </td>
                      <td>{tx.amount} {item?.unit}</td>
                      <td>{tx.note}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        )}

        {activeTab === 'expiry' && (
          <section className="fade-in grid">
            {inventory.filter(item => isExpired(item.expirationDate) || isExpiringSoon(item.expirationDate)).map(item => (
              <div key={item.id} className={`glass-panel card ${isExpired(item.expirationDate) ? 'card-danger' : 'card-warning'}`}>
                <div className="card-header">
                  <h3>{item.name}</h3>
                  <AlertTriangle size={24} className={isExpired(item.expirationDate) ? 'text-red' : 'text-orange'}/>
                </div>
                <div className="card-body">
                  <p><strong>פג תוקף:</strong> {item.expirationDate}</p>
                  <p><strong>כמות במלאי:</strong> {item.quantity} {item.unit}</p>
                  {isExpired(item.expirationDate) ? 
                    <p className="text-red font-bold mt-2">המוצר פג תוקף! אין להשתמש.</p> :
                    <p className="text-orange font-bold mt-2">לשימוש בהקדם!</p>
                  }
                </div>
              </div>
            ))}
            {inventory.filter(item => isExpired(item.expirationDate) || isExpiringSoon(item.expirationDate)).length === 0 && (
              <div className="empty-state">
                <CheckCircle size={48} className="text-green mb-4"/>
                <h2>אין מוצרים שפגי תוקף בקרוב</h2>
              </div>
            )}
          </section>
        )}
      </main>

      {/* Transaction Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="glass-panel modal">
            <h2>{transactionForm.type === 'in' ? 'קבלת אספקה (כניסת מלאי)' : 'דיווח צריכה (יציאת מלאי)'}</h2>
            <form onSubmit={handleTransactionSubmit} className="form">
              <div className="form-group">
                <label>בחר פריט:</label>
                <select 
                  value={transactionForm.itemId} 
                  onChange={e => setTransactionForm({...transactionForm, itemId: e.target.value})}
                  required
                >
                  <option value="">-- בחר פריט --</option>
                  {inventory.map(item => (
                    <option key={item.id} value={item.id}>{item.name} (במלאי: {item.quantity} {item.unit})</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>כמות:</label>
                <input 
                  type="number" 
                  min="0.1" 
                  step="0.1"
                  value={transactionForm.amount} 
                  onChange={e => setTransactionForm({...transactionForm, amount: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>הערות:</label>
                <input 
                  type="text" 
                  value={transactionForm.note} 
                  onChange={e => setTransactionForm({...transactionForm, note: e.target.value})}
                  placeholder="אופציונלי"
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>ביטול</button>
                <button type="submit" className="btn btn-primary">שמור תנועה</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
