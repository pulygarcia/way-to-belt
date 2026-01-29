# Martial Arts Events and Management Platform - API 🥊

This API powers the events, real time news, fights, fighters management, and statistics platform for martial arts. Built with a focus on **scalability, data integrity, and security**, it handles everything from fighter registries to complex fight-card statistics.

---

## Stack

* **Framework:** [NestJS](https://nestjs.com/)
* **Language:** TypeScript
* **Database:** PostgreSQL
* **ORM:** TypeORM
* **Security:** JWT (JSON Web Tokens) & Bcrypt
* **Validation:** Class-validator & Class-transformer

---

## Features

* **Authentication & RBAC:** Secure login and registration with Role-Based Access Control (User vs. Admin).
* **Admin Dashboard Logic:** Dedicated endpoints to manage the entire ecosystem: events, fight cards, fighters, and rankings.
* **Events Management:** Comprehensive CRUD for upcoming and past events, including fights detail.
* **Fight Cards & Main Events:** Logical structuring of whole events.
* **Fighter Profiles:** Detailed tracking of physical stats, weight classes, and professional bout history.
* **Fight Results & Advanced Stats:** Post-event data processing for strikes landed, knockdowns, method of victory and more data.
* **Data Integrity:** Strict validation layers to ensure consistency across fighters' records and event results.

---

## Getting Started

### 1. Prerequisites
* Node.js (v18 or higher)
* A running PostgreSQL instance

### 2. Installation
```bash
npm i

```env
# Example .env file
DATABASE_HOST=examplehost
DATABASE_PORT=0000
DATABASE_USER=username
DATABASE_PASS=examplepass
DATABASE_NAME=examplename

JWT_SECRET_KEY=examplesecurekey