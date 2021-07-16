import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model
  },
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Desenvolvimento de Site',
          amount: 12000,
          category: 'Dev',
          type: 'deposit',
          createdAt: new Date('2021-07-14 14:00')
        },
        {
          id: 2,
          title: 'Pagamento de pedras',
          amount: 84,
          category: 'Reforma',
          type: 'withdraw',
          createdAt: new Date('2021-07-14 10:00')
        }
      ],
    })
  },
  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, response) => {
      const data = JSON.parse(response.requestBody);
      return schema.create('transaction', data);
    });
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
