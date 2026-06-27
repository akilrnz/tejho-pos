# Tejho POS 🥟🥢

A web-based Point of Sale (POS) system developed for Tejho Dimsum Manufacturing. The system helps manage products, process sales transactions, and generate transaction records through a simple and user-friendly interface.

## Features

### Point of Sale (POS)
- Add products to receipt
- Automatic pricing tier computation
- Retail, Wholesale, and Partner pricing
- Receipt preview
- Customer name recording
- Transaction saving

### Product Management
- Add products
- Edit products
- Archive products
- Restore archived products
- Search products
- Multiple pricing tiers

### Transaction History
- View transaction records
- Search transactions by customer
- View transaction details
- Transaction date and time tracking

### Settings
- Business information management
- Pricing threshold configuration
- System settings

## Technologies Used

### Frontend
- React.js
- Vite
- Tailwind CSS

### Backend & Database
- Supabase
- PostgreSQL

### Deployment
- Vercel

## Database Tables

- products
- transactions
- transaction_items
- businessinfo

## Pricing Tiers (Thresholds)

Retail - Below 20 kg 
Wholesale - 20 kg and above 
Partner - 200 kg and above 

*Thresholds can be configured in Settings.*

**Live Demo**

https://tejho-pos.vercel.app

**Author**

- Jorich Rance L. Anday
